import { useMemo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { LessonManagementStudentInfo } from "src/squads/lesson/common/types";
import { PaginationWithTotal } from "src/squads/lesson/service/service-creator";

import { Skeleton } from "@mui/material";
import TableWithCheckbox, { TableColumn } from "src/components/Table/TableWithCheckbox";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";
import TypographyPrimary, {
    TypographyPrimaryProps,
} from "src/components/Typographys/TypographyPrimary";

import useGetStudentGradeNameByCountry from "src/squads/lesson/hooks/useGetStudentGradeNameByCountry";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface TableStudentSubscriptionsProps {
    studentInfoList: LessonManagementStudentInfo[];
    selectedStudentInfoList: LessonManagementStudentInfo[];
    pagination: PaginationWithTotal;
    onSelect: (list: LessonManagementStudentInfo[]) => void;
    isLoadingStudentsCourses: boolean;
    isLoadingGrades: boolean;
}

export const transformBetweenSkeletonAndTypography = ({
    content,
    loading = false,
    dataTestId = "TableStudentSubscriptions__rowContent",
}: {
    content: TypographyPrimaryProps["children"];
    loading?: boolean;
    dataTestId?: string;
}) => {
    if (loading) return <Skeleton />;

    return (
        <TypographyPrimary variant="body2" data-testid={dataTestId}>
            {content}
        </TypographyPrimary>
    );
};

const TableStudentSubscriptions = (props: TableStudentSubscriptionsProps) => {
    const {
        studentInfoList,
        pagination,
        onSelect,
        selectedStudentInfoList,
        isLoadingStudentsCourses,
        isLoadingGrades,
    } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const t = useTranslate();

    const { getStudentGradeName } = useGetStudentGradeNameByCountry();

    const columns: TableColumn<LessonManagementStudentInfo>[] = useMemo(() => {
        const tableColumns: TableColumn<LessonManagementStudentInfo>[] = [
            {
                key: "studentNameKey",
                title: tLessonManagement("columns.studentName"),
                render: (record) => (
                    <TypographyMaxLines
                        variant="body2"
                        maxLines={2}
                        data-testid="TableStudentSubscriptions__studentName"
                    >
                        {record.student.studentName}
                    </TypographyMaxLines>
                ),
                cellProps: {
                    style: {
                        width: "auto",
                    },
                },
            },
            {
                key: "courseNameKey",
                title: tLessonManagement("columns.courseName"),
                render: (record) => (
                    <TypographyMaxLines
                        variant="body2"
                        maxLines={2}
                        data-testid="TableStudentSubscriptions__courseName"
                    >
                        {record.course.courseName}
                    </TypographyMaxLines>
                ),
                cellProps: {
                    style: {
                        width: "35%",
                    },
                },
            },
            {
                key: "gradeNameKey",
                title: tLessonManagement("columns.grade"),
                render: (record) =>
                    transformBetweenSkeletonAndTypography({
                        content: t(getStudentGradeName(record.grade) || ""),
                        loading: isLoadingGrades,
                        dataTestId: "TableStudentSubscriptions__grade",
                    }),
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
            },
            // TODO: In Phase 1, We don't have teaching type. Will update it in the future.
            // {
            //     key: "teachingTypeKey",
            //     title: tLessonManagement("columns.teachingType"),
            //     render: (record) =>
            //         transformBetweenSkeletonAndTypography({
            //             content: record.teachingType,
            //             loading: isLoadingStudentsCourses,
            //             dataTestId: "TableStudentSubscriptions__teachingType",
            //         }),
            //     cellProps: {
            //         style: {
            //             width: "15%",
            //         },
            //     },
            // },
        ];

        return tableColumns;
    }, [getStudentGradeName, isLoadingGrades, tLessonManagement, t]);

    return (
        <TableWithCheckbox<LessonManagementStudentInfo>
            columns={columns}
            data={studentInfoList}
            listSelectedItems={selectedStudentInfoList}
            onSelect={(selectingStudentSubscriptionsList) =>
                onSelect(selectingStudentSubscriptionsList)
            }
            body={{
                loading: isLoadingStudentsCourses,
                skeCount: 3,
                rowKey: "studentSubscriptionId",
                pagination,
            }}
            footer={{
                pagination,
            }}
            withIndex
            tableProps={{
                "data-testid": "TableStudentSubscriptions__tableContainer",
            }}
        />
    );
};

export default TableStudentSubscriptions;
