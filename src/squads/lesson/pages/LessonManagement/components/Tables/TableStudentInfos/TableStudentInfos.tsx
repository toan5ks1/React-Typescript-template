import { useMemo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { LessonManagementStudentInfo } from "src/squads/lesson/common/types";
import { PaginationWithTotal } from "src/squads/lesson/service/service-creator";

import { Skeleton } from "@mui/material";
import TableWithCheckbox, { TableColumn } from "src/components/Table/TableWithCheckbox";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";
import { TypographyMaxLinesProps } from "src/squads/lesson/components/Typographys/TypographyMaxLines";

import useGetStudentGradeNameByCountry from "src/squads/lesson/hooks/useGetStudentGradeNameByCountry";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import useGetManyLocations from "src/squads/lesson/pages/LessonManagement/hooks/useGetManyLocations";

export interface TableStudentInfosProps {
    studentInfosList: LessonManagementStudentInfo[];
    selectedStudentInfoList: LessonManagementStudentInfo[];
    pagination: PaginationWithTotal;
    onSelect: (studentInfosList: LessonManagementStudentInfo[]) => void;
    isLoadingStudentsCourses: boolean;
    isLoadingGrades: boolean;
}

export const transformBetweenSkeletonAndTypography = ({
    content,
    loading = false,
    dataTestId = "TableStudentInfos__rowContent",
}: {
    content: TypographyMaxLinesProps["children"] | undefined;
    loading?: boolean;
    dataTestId?: string;
}) => {
    if (loading) return <Skeleton />;

    if (!content) {
        return (
            <TypographyBase variant="body2" sx={(theme) => ({ color: theme.palette.grey[400] })}>
                --
            </TypographyBase>
        );
    }

    return (
        <TypographyMaxLines variant="body2" maxLines={2} data-testid={dataTestId}>
            {content}
        </TypographyMaxLines>
    );
};

const TableStudentInfos = (props: TableStudentInfosProps) => {
    const {
        studentInfosList,
        pagination,
        onSelect,
        selectedStudentInfoList,
        isLoadingStudentsCourses,
        isLoadingGrades,
    } = props;

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const { getStudentGradeName } = useGetStudentGradeNameByCountry();

    const locationIdsList = useMemo(() => {
        return studentInfosList.reduce((locationIds: string[], student) => {
            const locationId = student?.locationId;
            if (locationId) locationIds.push(locationId);

            return locationIds;
        }, []);
    }, [studentInfosList]);

    const { data: locations, isLoading: isLoadingLocations } = useGetManyLocations(locationIdsList);

    const columns: TableColumn<LessonManagementStudentInfo>[] = useMemo(() => {
        const tableColumns: TableColumn<LessonManagementStudentInfo>[] = [
            {
                key: "colStudentName",
                title: tLessonManagement("columns.studentName"),
                render: (record) => (
                    <TypographyMaxLines
                        variant="body2"
                        maxLines={2}
                        data-testid="TableStudentInfos__studentName"
                    >
                        {record.student.studentName}
                    </TypographyMaxLines>
                ),
                cellProps: {
                    style: { width: "auto" },
                },
            },
            {
                key: "colGrade",
                title: tLessonManagement("columns.grade"),
                render: (record) =>
                    transformBetweenSkeletonAndTypography({
                        content: t(getStudentGradeName(record.grade) || ""),
                        loading: isLoadingGrades,
                        dataTestId: "TableStudentInfos__grade",
                    }),
                cellProps: {
                    style: { width: "11%" },
                },
            },
            {
                key: "colCourseName",
                title: tLessonManagement("columns.course"),
                render: (record) => (
                    <TypographyMaxLines
                        variant="body2"
                        maxLines={2}
                        data-testid="TableStudentInfos__courseName"
                    >
                        {record.course.courseName}
                    </TypographyMaxLines>
                ),
                cellProps: {
                    style: { width: "23%" },
                },
            },
            {
                key: "colClassName",
                title: tLessonManagement("columns.class"),
                render: (record) =>
                    transformBetweenSkeletonAndTypography({
                        content: record.classData?.name,
                        loading: isLoadingGrades,
                        dataTestId: "TableStudentInfos__className",
                    }),
                cellProps: {
                    style: { width: "18%" },
                },
            },
            {
                key: "colLocationName",
                title: tLessonManagement("columns.location"),
                render: (record) => {
                    const location = locations.find(
                        (location) => location.location_id === record.locationId
                    );

                    return transformBetweenSkeletonAndTypography({
                        content: location?.name,
                        loading: isLoadingLocations,
                        dataTestId: "TableStudentInfos__locationName",
                    });
                },
                cellProps: {
                    style: { width: "14%" },
                },
            },
        ];

        return tableColumns;
    }, [tLessonManagement, t, getStudentGradeName, isLoadingGrades, locations, isLoadingLocations]);

    return (
        <TableWithCheckbox<LessonManagementStudentInfo>
            columns={columns}
            data={studentInfosList}
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
            footer={{ pagination }}
            withIndex
            tableProps={{ "data-testid": "TableStudentInfos__tableContainer" }}
        />
    );
};

export default TableStudentInfos;
