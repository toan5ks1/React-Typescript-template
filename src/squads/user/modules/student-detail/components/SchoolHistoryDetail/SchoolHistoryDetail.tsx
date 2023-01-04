import { useMemo } from "react";

import type { PaginationWithTotal } from "src/squads/user/service/service-creator";

import Box from "@mui/material/Box";
import DividerDashed from "src/components/Divider/DividerDashed";
import TableBase, { TableColumn } from "src/components/Table/TableBase";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";

import CommonColumn from "./Columns/CommonColumn";
import SchoolNameColumn from "./Columns/SchoolNameColumn";

export const mockStudentSchoolHistoryDetail = [
    {
        level: "University",
        schoolId: "1",
        schoolName: "School Name 01",
        course: "Course Name 01",
        startDate: "2020/04/05",
        endDate: "2020/04/05",
    },
    {
        level: "High School",
        schoolId: "2",
        schoolName: "School Name 02",
        course: "Course Name 02",
        startDate: "2020/04/05",
        endDate: "2020/04/05",
    },
];
const mockPagination: PaginationWithTotal = {
    count: 2,
    limit: 10,
    offset: 0,
    onPageChange: () => {},
    onRowsPerPageChange: () => {},
    page: 0,
    rowsPerPage: 10,
};

export default function SchoolHistoryDetail() {
    const columns: TableColumn[] = useMemo(
        () => [
            {
                key: "level",
                title: "Level",
                render: (record) => <CommonColumn content={record.level} />,
                cellProps: {
                    sx: { width: 110 },
                    "data-testid": "SchoolHistoryDetail__levelCell",
                },
            },
            {
                key: "schoolName",
                title: "School Name",
                render: (record, index) => (
                    <SchoolNameColumn isCurrentSchool={index === 0} content={record.schoolName} />
                ),
                cellProps: {
                    sx: { width: 437 },
                    "data-testid": "SchoolHistoryDetail__schoolNameCell",
                },
            },
            {
                key: "course",
                title: "Course",
                render: (record) => <CommonColumn content={record.course} />,
                cellProps: {
                    sx: { width: 437 },
                    "data-testid": "SchoolHistoryDetail__courseCell",
                },
            },
            {
                key: "startDate",
                title: "Start Date",
                render: (record) => <CommonColumn content={record.startDate} />,
                cellProps: {
                    sx: { width: 130 },
                    "data-testid": "SchoolHistoryDetail__startDateCell",
                },
            },
            {
                key: "endDate",
                title: "End Date",
                render: (record) => <CommonColumn content={record.endDate} />,
                cellProps: {
                    sx: { width: 130 },
                    "data-testid": "SchoolHistoryDetail__endDateCell",
                },
            },
        ],
        []
    );

    return (
        <Box data-testid="SchoolHistoryDetail__root">
            <Box my={3}>
                <DividerDashed variant="fullWidth" />
            </Box>
            <Box mb={2}>
                <TypographyPrimary>School History</TypographyPrimary>
            </Box>
            <TableBase
                body={{
                    rowKey: "schoolId",
                    loading: false,
                    pagination: mockPagination,
                }}
                data={mockStudentSchoolHistoryDetail}
                columns={columns}
                footer={{
                    pagination: mockPagination,
                }}
                withIndex
                tableProps={{
                    "data-testid": "SchoolHistoryDetail__table",
                }}
            />
        </Box>
    );
}
