import { useEffect, useMemo, useState } from "react";

import { ERPModules, Features } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { MicroFrontendTypes } from "src/routing/type";
import { StudentAttendStatusKeys } from "src/squads/lesson/common/types";
import { Lesson_LessonByLessonIdForLessonManagementV3Query } from "src/squads/lesson/service/bob/bob-types";
import { PaginationWithTotal } from "src/squads/lesson/service/service-creator";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StyledLink from "src/components/StyledLink";
import { TableBase, TableColumn } from "src/components/Table";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";

import usePagination from "src/squads/lesson/hooks/data/usePagination";
import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useGetStudentGradeNameByCountry from "src/squads/lesson/hooks/useGetStudentGradeNameByCountry";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface DetailSectionLessonStudentsProps {
    isLoading: boolean;
    lessonMembers: ArrayElement<
        Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]
    >["lesson_members"];
}
const DetailSectionLessonStudents = (props: DetailSectionLessonStudentsProps) => {
    const { isLoading, lessonMembers } = props;
    const [studentsList, setStudentsList] = useState(lessonMembers);
    const pagination = usePagination({
        defaultOffset: 0,
        defaultLimit: 5,
    });

    const { setLimit, setOffset, ...restPagination } = pagination;

    const paginationWithTotal: PaginationWithTotal = {
        ...restPagination,
        count: lessonMembers.length,
    };

    useEffect(() => {
        const membersList = [...lessonMembers];
        const currentOffset = paginationWithTotal.page * paginationWithTotal.limit;
        const membersListPerPage = membersList.slice(
            currentOffset,
            currentOffset + paginationWithTotal.limit
        );
        setStudentsList(membersListPerPage);
    }, [lessonMembers, paginationWithTotal.limit, paginationWithTotal.page]);

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const t = useTranslate();
    const { isEnabled: isShowLessonGroup } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_LESSON_GROUP
    );

    const { isEnabled: isEnabledAttachHyperLinkStudent } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_ATTACH_HYPERLINK_STUDENT
    );
    const { getStudentGradeName } = useGetStudentGradeNameByCountry();
    const theme = useTheme();
    const columns: TableColumn<
        ArrayElement<
            ArrayElement<
                Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]
            >["lesson_members"]
        >
    >[] = useMemo(() => {
        return [
            {
                title: tLessonManagement("columns.studentName"),
                key: "colName",
                cellProps: {
                    style: {
                        width: "30%",
                    },
                },
                render: (record) =>
                    isEnabledAttachHyperLinkStudent ? (
                        <StyledLink
                            target="_blank"
                            to={`/${MicroFrontendTypes.USER}/${ERPModules.STUDENTS}/${record.user.user_id}/show`}
                            data-testid="DetailSectionLessonStudents__columnStudentName"
                        >
                            <TypographyMaxLines variant="body2" maxLines={2}>
                                {record.user.name}
                            </TypographyMaxLines>
                        </StyledLink>
                    ) : (
                        <TypographyMaxLines
                            variant="body2"
                            maxLines={2}
                            data-testid="DetailSectionLessonStudents__columnStudentName"
                        >
                            {record.user.name}
                        </TypographyMaxLines>
                    ),
            },
            {
                title: tLessonManagement("columns.grade"),
                key: "colGrade",
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
                render: (record) => (
                    <TypographyPrimary
                        variant="body2"
                        data-testid="DetailSectionLessonStudents__columnGrade"
                    >
                        {t(getStudentGradeName(record.user.student?.current_grade) || "")}
                    </TypographyPrimary>
                ),
            },
            {
                title: tLessonManagement("course"),
                key: "colCourse",
                cellProps: {
                    style: {
                        width: "40%",
                    },
                },
                render: (record) => (
                    <TypographyMaxLines
                        variant="body2"
                        maxLines={2}
                        data-testid="DetailSectionLessonStudents__columnCourseName"
                    >
                        {record.course?.name || ""}
                    </TypographyMaxLines>
                ),
            },
            {
                title: tLessonManagement("attendance"),
                key: "colAttendance",
                cellProps: {
                    style: {
                        width: "15%",
                    },
                },
                render: (record) => {
                    const isStudentHasNoAttendanceStatus =
                        record.attendance_status ===
                            StudentAttendStatusKeys.STUDENT_ATTEND_STATUS_EMPTY ||
                        !record.attendance_status;

                    const attendanceStatusValue = isStudentHasNoAttendanceStatus
                        ? "--"
                        : tLessonManagement(`studentAttendanceStatus.${record.attendance_status}`);

                    return (
                        <TypographyPrimary
                            variant="body2"
                            data-testid="DetailSectionLessonStudents__columnAttendanceStatus"
                            color={
                                isStudentHasNoAttendanceStatus ? theme.palette.grey[400] : "inherit"
                            }
                        >
                            {attendanceStatusValue}
                        </TypographyPrimary>
                    );
                },
            },
        ];
    }, [
        tLessonManagement,
        t,
        getStudentGradeName,
        theme.palette.grey,
        isEnabledAttachHyperLinkStudent,
    ]);

    return (
        <Box data-testid="DetailSectionLessonStudents__root">
            <Box mb={2}>
                <TypographyPrimary variant="subtitle1">
                    {tLessonManagement("studentInfo")}
                    {isShowLessonGroup ? ` (${studentsList.length})` : null}
                </TypographyPrimary>
            </Box>

            <TableBase
                data={studentsList}
                columns={columns}
                tableProps={{
                    "data-testid": "DetailSectionLessonStudents__table",
                }}
                withIndex
                body={{
                    rowKey: "user.user_id",
                    loading: isLoading,
                    pagination: paginationWithTotal,
                }}
                footer={{
                    pagination: paginationWithTotal,
                }}
            />
        </Box>
    );
};

export default DetailSectionLessonStudents;
