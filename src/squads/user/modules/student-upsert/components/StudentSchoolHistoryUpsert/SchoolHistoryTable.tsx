import { useMemo } from "react";

import { StudentSchoolHistoryFormProps } from "src/squads/user/common/types/common";

import TableWithCheckbox, { TableColumn } from "src/components/Table/TableWithCheckbox";

import CourseColumn from "./Columns/CourseColumn";
import EndDateColumn from "./Columns/EndDateColumn";
import LevelColumn from "./Columns/LevelColumn";
import SchoolNameColumn from "./Columns/SchoolNameColumn";
import StartDateColumn from "./Columns/StartDateColumn";

interface SchoolHistoryTableProps {
    data: StudentSchoolHistoryFormProps[];
    selectedSchoolHistory: StudentSchoolHistoryFormProps[];
    onSelect: (selectedItems: StudentSchoolHistoryFormProps[]) => void;
}

export default function SchoolHistoryTable({
    data,
    selectedSchoolHistory,
    onSelect,
}: SchoolHistoryTableProps) {
    const columns: TableColumn[] = useMemo(() => {
        return [
            {
                key: "level",
                title: "Level",
                render: () => <LevelColumn name={``} />,
                cellProps: {
                    style: {
                        width: 170,
                    },
                },
            },
            {
                key: "schoolName",
                title: "School Name",
                render: () => <SchoolNameColumn name={""} />,
                cellProps: {
                    style: {
                        width: 283,
                    },
                },
            },
            {
                key: "course",
                title: "Course",
                render: () => <CourseColumn name={``} />,
                cellProps: {
                    style: {
                        width: 283,
                    },
                },
            },
            {
                key: "startDate",
                title: "Start Date",
                render: (_record: StudentSchoolHistoryFormProps, index?: number) => (
                    <StartDateColumn name={`schoolHistories.${index}.startDate`} />
                ),
                cellProps: {
                    style: {
                        width: 170,
                    },
                },
            },
            {
                key: "endDate",
                title: "End Date",
                render: (_record: StudentSchoolHistoryFormProps, index?: number) => (
                    <EndDateColumn name={`schoolHistories.${index}.endDate`} />
                ),
                cellProps: {
                    style: {
                        width: 170,
                    },
                },
            },
        ];
    }, []);

    return (
        <>
            <TableWithCheckbox
                tableProps={{
                    "data-testid": "SchoolHistoryTable",
                }}
                data={data}
                columns={columns}
                withIndex={{ width: "5%" }}
                body={{
                    loading: false,
                    rowKey: "id",
                }}
                errorMessage={""}
                onSelect={onSelect}
                listSelectedItems={selectedSchoolHistory}
            />
        </>
    );
}
