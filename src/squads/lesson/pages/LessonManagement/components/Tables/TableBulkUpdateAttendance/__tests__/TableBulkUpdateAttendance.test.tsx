import { generateSampleStudent } from "src/squads/lesson/test-utils/lesson-management";
import { selectAutocompleteOptionByLabel } from "src/squads/lesson/test-utils/utils";

import TableBulkUpdateAttendance, {
    TableBulkUpdateAttendanceProps,
} from "src/squads/lesson/pages/LessonManagement/components/Tables/TableBulkUpdateAttendance";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TableBulkUpdateAttendance", () => {
    const props: TableBulkUpdateAttendanceProps = {
        attendanceValues: [
            {
                key: "STUDENT_ATTEND_STATUS_ATTEND",
                label: "Attend",
                student: generateSampleStudent("1"),
            },
            {
                key: "STUDENT_ATTEND_STATUS_LATE",
                label: "Late",
                student: generateSampleStudent("2"),
            },
        ],
        onChangeAttendanceValue: jest.fn(),
    };

    const renderComponent = () => {
        render(
            <TranslationProvider>
                <TableBulkUpdateAttendance {...props} />
            </TranslationProvider>
        );
    };

    it("should render attendance status by default values", () => {
        renderComponent();

        const attendanceStatusAutoCompleteInputs = screen.getAllByRole("combobox");
        expect(attendanceStatusAutoCompleteInputs).toHaveLength(props.attendanceValues.length);

        expect(attendanceStatusAutoCompleteInputs[0]).toHaveValue("Attend");
        expect(attendanceStatusAutoCompleteInputs[1]).toHaveValue("Late");
    });

    it("should change attendance status value", () => {
        renderComponent();

        const attendanceStatusAutoCompleteInputs = screen.getAllByRole("combobox");

        attendanceStatusAutoCompleteInputs.forEach((autoCompleteInput, index) => {
            userEvent.click(autoCompleteInput);
            selectAutocompleteOptionByLabel("Absent");

            expect(props.onChangeAttendanceValue).toBeCalledWith(
                props.attendanceValues[index].student,
                { key: "STUDENT_ATTEND_STATUS_ABSENT", label: "Absent" }
            );
        });
    });
});
