import { ERPModules } from "src/common/constants/enum";
import { DynamicAutocompleteOptionProps } from "src/squads/lesson/common/types";

import { TableBase, TableColumn } from "src/components/Table";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import AutocompleteAttendanceStatus from "src/squads/lesson/components/Autocompletes/AutocompleteAttendanceStatus";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import { StudentWithAttendanceStatus } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface TableBulkUpdateAttendanceProps {
    attendanceValues: StudentWithAttendanceStatus[];
    onChangeAttendanceValue: (
        student: StudentWithAttendanceStatus["student"],
        value: DynamicAutocompleteOptionProps
    ) => void;
}

const TableBulkUpdateAttendance = (props: TableBulkUpdateAttendanceProps) => {
    const { attendanceValues, onChangeAttendanceValue } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const columns: TableColumn<StudentWithAttendanceStatus>[] = [
        {
            key: "colStudentName",
            title: tLessonManagement("columns.studentName"),
            cellProps: {
                style: {
                    width: "20%",
                },
            },
            render: (record) => (
                <TypographyPrimary
                    variant="body2"
                    data-testid="TableBulkUpdateAttendanceTable__studentName"
                >
                    {record.student.user.name}
                </TypographyPrimary>
            ),
        },
        {
            key: "colAttendanceStatus",
            title: tLessonManagement("attendanceStatus"),
            cellProps: {
                style: {
                    width: "auto",
                },
            },
            render: ({ key, label, student }) => {
                return (
                    <AutocompleteAttendanceStatus
                        value={{ key, label }}
                        onChange={(statusOption) => {
                            onChangeAttendanceValue(student, statusOption);
                        }}
                        data-testid="TableBulkUpdateAttendanceTable__autocompleteAttendance"
                        limitChipText="Ellipsis"
                        getOptionSelectedField="key"
                    />
                );
            },
        },
    ];

    return (
        <TableBase<StudentWithAttendanceStatus>
            withIndex
            columns={columns}
            data={attendanceValues}
            body={{ loading: false, rowKey: "student.user.user_id" }}
        />
    );
};

export default TableBulkUpdateAttendance;
