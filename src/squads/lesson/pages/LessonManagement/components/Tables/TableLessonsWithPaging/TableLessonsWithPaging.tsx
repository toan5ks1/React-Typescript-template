import { useCallback, useMemo } from "react";

import { ERPModules, Features } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { arrayHasItem } from "src/common/utils/other";
import { MicroFrontendTypes } from "src/routing/type";
import { emptyValue } from "src/squads/lesson/common/utils";
import { PaginationWithTotal } from "src/squads/lesson/service/service-creator";

import { Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StyledLink from "src/components/StyledLink";
import { StyleKeys, TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TableBaseTableObserveVisible from "src/squads/lesson/components/Tables/TableObserveVisible/TableBaseTableObserveVisible";
import TypographyMaxLines from "src/squads/lesson/components/Typographys/TypographyMaxLines";
import ChipLessonReportStatus from "src/squads/lesson/pages/LessonManagement/components/Chips/ChipLessonReportStatus";
import ChipLessonStatus from "src/squads/lesson/pages/LessonManagement/components/Chips/ChipLessonStatus";

import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import {
    LessonItem,
    LessonTeachingMethodType,
} from "src/squads/lesson/pages/LessonManagement/common/types";

export interface TableLessonsWithPagingProps {
    data: LessonItem[];
    pagination: PaginationWithTotal;
    isLoadingLesson: boolean;
    isLoadingLessonReport: boolean;
    isLoadingCenter: boolean;
    isLoadingTeacher: boolean;
    isLoadingCourse: boolean;
    isLoadingClass: boolean;
}

const TableLessonsWithPaging = (props: TableLessonsWithPagingProps) => {
    const {
        data,
        pagination,
        isLoadingLesson,
        isLoadingLessonReport,
        isLoadingCenter,
        isLoadingTeacher,
        isLoadingClass,
        isLoadingCourse,
    } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const renderTypographyWithLoading = (
        isLoading: boolean,
        value: string = "",
        testId: string,
        textColor?: string
    ) => {
        if (isLoading) return <Skeleton data-testid="TableLessonsWithPaging__loadingSkeleton" />;

        return (
            <TypographyMaxLines variant="body2" maxLines={2} data-testid={testId} color={textColor}>
                {value}
            </TypographyMaxLines>
        );
    };

    const theme = useTheme();
    const textColorOfCourseValue = useCallback(
        (teachingMethod: LessonTeachingMethodType) => {
            return teachingMethod === "LESSON_TEACHING_METHOD_INDIVIDUAL"
                ? theme.palette.grey["400"]
                : "inherit";
        },
        [theme.palette.grey]
    );

    const textColorOfClassValue = useCallback(
        (teachingMethod: LessonTeachingMethodType, className: string | undefined) => {
            if (teachingMethod === "LESSON_TEACHING_METHOD_GROUP") {
                return className ? "inherit" : theme.palette.grey["400"];
            } else {
                return theme.palette.grey["400"];
            }
        },
        [theme.palette.grey]
    );

    const textColorOfLessonReportValue = useCallback(() => {
        return theme.palette.grey["400"];
    }, [theme.palette.grey]);

    const textColorOfTeacherValue = useCallback(
        (lesson: LessonItem) => {
            return !lesson.teacherNames ? theme.palette.grey["400"] : "inherit";
        },
        [theme.palette.grey]
    );

    const courseNameOfLesson = (lesson: LessonItem) => {
        return lesson.teachingMethod === "LESSON_TEACHING_METHOD_GROUP"
            ? lesson.courseName
            : emptyValue;
    };
    const classNameOfLesson = (lesson: LessonItem) => {
        return lesson.teachingMethod === "LESSON_TEACHING_METHOD_GROUP" && lesson.className
            ? lesson.className
            : emptyValue;
    };

    const teacherOfLesson = (teacher: LessonItem) => {
        return teacher.teacherNames || emptyValue;
    };

    const { isEnabled: isEnabledLessonGroup } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_LESSON_GROUP
    );

    const { isEnabled: isEnabledStatusLesson } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_DRAFT_OR_PUBLISHED_LESSON
    );

    const isRenderFooter = () => {
        if (arrayHasItem(data)) return true;
        return isEnabledLessonGroup ? false : true;
    };

    const columns: TableColumn<LessonItem>[] = useMemo(() => {
        return [
            {
                title: tLessonManagement("columns.lessonDate"),
                key: "colLessonDate",
                cellProps: {
                    style: {
                        width: !isEnabledLessonGroup ? "15%" : "10%",
                    },
                },
                render: (record) => (
                    <StyledLink
                        data-testid="TableLessonsWithPaging__lessonDate"
                        to={`/${MicroFrontendTypes.LESSON}/${ERPModules.LESSON_MANAGEMENT}/${record.id}/show`}
                    >
                        {convertString(record.lessonDate)}
                    </StyledLink>
                ),
            },
            ...(isEnabledStatusLesson
                ? [
                      {
                          title: tLessonManagement("columns.lessonStatus"),
                          key: "colLessonStatus",
                          cellProps: {
                              style: {
                                  width: !isEnabledLessonGroup ? "15%" : "10%",
                              },
                          },
                          render: (record: LessonItem) => (
                              <ChipLessonStatus
                                  status={record.lessonStatus}
                                  isLoading={isLoadingLesson}
                              />
                          ),
                      },
                  ]
                : []),
            {
                title: tLessonManagement("columns.lessonTime"),
                key: "colLessonTime",
                cellProps: {
                    style: {
                        width: "15%",
                    },
                },
                render: (record) => (
                    <TypographyBase
                        variant="body2"
                        data-testid="TableLessonsWithPaging__lessonTime"
                    >
                        {convertString(record.lessonTime)}
                    </TypographyBase>
                ),
            },
            ...(isEnabledStatusLesson
                ? [
                      {
                          title: tLessonManagement("columns.reportStatus"),
                          key: "colReportStatus",
                          cellProps: {
                              style: {
                                  width: !isEnabledLessonGroup ? "15%" : "10%",
                              },
                          },
                          render: (record: LessonItem) =>
                              record.lessonReportStatus ? (
                                  <ChipLessonReportStatus
                                      status={record.lessonReportStatus}
                                      isLoading={isLoadingLessonReport}
                                  />
                              ) : (
                                  renderTypographyWithLoading(
                                      isLoadingLessonReport,
                                      emptyValue,
                                      "TableLessonsWithPaging__noneReportStatus",
                                      textColorOfLessonReportValue()
                                  )
                              ),
                      },
                  ]
                : []),
            {
                title: tLessonManagement(`columns.${isEnabledLessonGroup ? "location" : "center"}`),
                key: "colCenter",
                cellProps: {
                    style: {
                        width: !isEnabledLessonGroup ? "20%" : "10%",
                    },
                },
                render: (record) =>
                    renderTypographyWithLoading(
                        isLoadingCenter,
                        record.centerName,
                        "TableLessonsWithPaging__center"
                    ),
            },
            {
                title: tLessonManagement("columns.teacher"),
                key: "colTeacher",
                cellProps: {
                    style: {
                        width: !isEnabledLessonGroup ? "20%" : "15%",
                    },
                },
                render: (record) =>
                    renderTypographyWithLoading(
                        isLoadingTeacher,
                        teacherOfLesson(record),
                        "TableLessonsWithPaging__teacher",
                        textColorOfTeacherValue(record)
                    ),
            },
            {
                title: tLessonManagement("columns.teachingMethod"),
                key: "colTeachingMethod",
                cellProps: {
                    style: {
                        width: "15%",
                    },
                },
                render: (record) => (
                    <TypographyBase
                        variant="body2"
                        data-testid="TableLessonsWithPaging__teachingMethod"
                    >
                        {tLessonManagement(record.teachingMethod)}
                    </TypographyBase>
                ),
            },
            {
                title: tLessonManagement("columns.teachingMedium"),
                key: "colTeachingMedium",
                cellProps: {
                    style: {
                        width: !isEnabledLessonGroup ? "15%" : "12%",
                    },
                },
                render: (record) => (
                    <TypographyBase
                        variant="body2"
                        data-testid="TableLessonsWithPaging__teachingMedium"
                    >
                        {tLessonManagement(record.teachingMedium)}
                    </TypographyBase>
                ),
            },
            ...(isEnabledLessonGroup
                ? [
                      {
                          title: tLessonManagement("columns.course"),
                          key: "colCourse",
                          cellProps: {
                              style: {
                                  width: "15%",
                              },
                          },
                          render: (record: LessonItem) =>
                              renderTypographyWithLoading(
                                  isLoadingCourse,
                                  courseNameOfLesson(record),
                                  "TableLessonsWithPaging__course",
                                  textColorOfCourseValue(record.teachingMethod)
                              ),
                      },
                      {
                          title: tLessonManagement("columns.class"),
                          key: "colClass",
                          cellProps: {
                              style: {
                                  width: "10%",
                              },
                          },
                          render: (record: LessonItem) =>
                              renderTypographyWithLoading(
                                  isLoadingClass,
                                  classNameOfLesson(record),
                                  "TableLessonsWithPaging__class",
                                  textColorOfClassValue(record.teachingMethod, record.className)
                              ),
                      },
                  ]
                : []),
        ];
    }, [
        tLessonManagement,
        isEnabledLessonGroup,
        isEnabledStatusLesson,
        isLoadingLesson,
        isLoadingLessonReport,
        textColorOfLessonReportValue,
        isLoadingCenter,
        isLoadingTeacher,
        textColorOfTeacherValue,
        isLoadingCourse,
        textColorOfCourseValue,
        isLoadingClass,
        textColorOfClassValue,
    ]);

    const styles: Partial<StyleKeys> = {
        table: {
            width: "105%",
        },
    };
    return (
        <TableBaseTableObserveVisible
            withIndex
            tableProps={{
                "data-testid": "TableLessonsWithPaging__root",
            }}
            data={data}
            columns={columns}
            showHeader={true}
            body={{
                rowKey: "id",
                loading: isLoadingLesson,
                pagination: pagination,
            }}
            footer={isRenderFooter() ? { pagination } : undefined}
            styles={isEnabledLessonGroup ? styles : undefined}
        />
    );
};

export default TableLessonsWithPaging;
