import { useMemo, useState } from "react";

import { Entities, Features } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { MicroFrontendTypes } from "src/routing/type";
import { getPrimaryKey } from "src/squads/syllabus/common/helpers/legacy";
import logger from "src/squads/syllabus/internals/logger";
import { Lesson_CoursesListQuery } from "src/squads/syllabus/services/bob/bob-types";
import { inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import { Box } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import FormFilterAdvanced from "src/components/Forms/FormFilterAdvanced";
import Avatar from "src/components/RelatedUser/Avatar";
import StyledLink from "src/components/StyledLink";
import TableBase, { TableColumn } from "src/components/Table/TableBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";
import { CourseFormData } from "src/squads/syllabus/pages/Course/components/CourseForm";
import DialogUpsertCourse from "src/squads/syllabus/pages/Course/components/DialogUpsertCourse";

import Can from "src/contexts/Can";
import useDialog from "src/squads/syllabus/hooks/useDialog";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import useUpsertCourse from "src/squads/syllabus/pages/Course/hooks/useUpsertCourse";

const CourseTable = () => {
    const rowKey = getPrimaryKey(Entities.COURSES);
    const t = useTranslate();
    const tCourse = useResourceTranslate(Entities.COURSES);

    const [search, setSearch] = useState("");
    const showSnackbar = useShowSnackbar();

    const { isEnabled: enabledTeachingMethod } = useFeatureToggle(
        Features.LESSON_COURSE_BACK_OFFICE_TEACHING_METHOD
    );

    const {
        result: { isFetching, isLoading, refetch },
        data: courseData,
        pagination,
        resetPaginationOffset,
    } = inferQueryPagination({
        entity: "courses",
        action: "lessonCourseGetListV2",
    })(
        { name: search },
        {
            enabled: true,
            onError: (error) => {
                logger.warn("[lessonCourseGetListV2]", error);

                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const columns: TableColumn<ArrayElement<Lesson_CoursesListQuery["courses"]>>[] = useMemo(
        () => [
            {
                key: "colName",
                title: tCourse("courseName"),
                render: (record) => (
                    <StyledLink
                        data-testid="CourseTable__courseNameLink"
                        to={`/${MicroFrontendTypes.SYLLABUS}/${Entities.COURSES}/${record.course_id}/show`}
                        title={record.name}
                    >
                        <Avatar
                            src={convertString(record.icon)}
                            sx={(theme) => ({
                                display: "inline-block",
                                marginRight: theme.spacing(1),
                                verticalAlign: "middle",
                            })}
                            size="medium"
                        />
                        <TypographyShortenStr
                            variant="body2"
                            display="inline"
                            data-testid="CourseTable__courseName"
                            maxLength={60}
                        >
                            {record.name}
                        </TypographyShortenStr>
                    </StyledLink>
                ),
            },
            ...(enabledTeachingMethod
                ? [
                      {
                          key: "colTeachingMethod",
                          title: tCourse("teachingMethod"),
                          cellProps: {
                              style: {
                                  width: "35%",
                              },
                          },
                          render: (record: ArrayElement<Lesson_CoursesListQuery["courses"]>) =>
                              record.teaching_method ? (
                                  <TypographyPrimary
                                      variant="body2"
                                      data-testid="CourseTable__teachingMethod"
                                      pl={0.5}
                                  >
                                      {tCourse(record.teaching_method)}
                                  </TypographyPrimary>
                              ) : (
                                  <TypographyBase
                                      variant="body2"
                                      data-testid="CourseTable__noTeachingMethod"
                                      sx={(theme) => ({
                                          color: theme.palette.grey[400],
                                      })}
                                      pl={0.5}
                                  >
                                      --
                                  </TypographyBase>
                              ),
                      },
                  ]
                : []),
        ],
        [tCourse, enabledTeachingMethod]
    );

    const onEnter = (value: string) => {
        if (search !== value) resetPaginationOffset();
        setSearch(value);
    };

    const { open, onOpen, onClose } = useDialog();
    const { onCreate, isSubmiting } = useUpsertCourse();

    const onSave = async (formData: CourseFormData) => {
        const { iconFile, name, locations, teachingMethod } = formData;
        const locationIdsList = locations?.map((location) => location.locationId);
        await onCreate(
            {
                name,
                files: iconFile,
                locationIdsList,
                teachingMethod: teachingMethod?.id,
            },
            {
                onSuccess: () => {
                    void refetch();
                    onClose();
                },
            }
        );
    };

    return (
        <>
            {open && (
                <DialogUpsertCourse
                    open={open}
                    onClose={onClose}
                    onSave={onSave}
                    isSubmiting={isSubmiting}
                />
            )}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <FormFilterAdvanced onEnterSearchBar={onEnter} />
                <Can I="create" a="courses">
                    <ButtonCreate
                        data-testid="CourseTable__addButton"
                        resource={Entities.COURSES}
                        onClick={onOpen}
                    >
                        {t("ra.common.action.add")}
                    </ButtonCreate>
                </Can>
            </Box>
            <TableBase
                body={{
                    rowKey,
                    loading: isLoading || isFetching,
                    pagination,
                }}
                data={courseData?.data || []}
                columns={columns}
                tableProps={{
                    "data-testid": "CourseTable__table",
                }}
                footer={{
                    pagination,
                    labelRowsPerPage: t("ra.navigation.page_rows_per_page"),
                }}
                withIndex
            />
        </>
    );
};

export default CourseTable;
