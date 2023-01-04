import { useWatch } from "react-hook-form";
import { TestThemeProvider } from "src/squads/lesson/test-utils";
import { createLessonReportDetail } from "src/squads/lesson/test-utils/lesson-report";
import { selectAutocompleteOptionByLabel } from "src/squads/lesson/test-utils/utils";

import { useFormContext } from "src/components/Forms/HookForm";
import DialogBulkUpdateAttendance, {
    DialogBulkUpdateAttendanceProps,
} from "src/squads/lesson/pages/LessonManagement/components/Dialogs/DialogBulkUpdateAttendance/DialogBulkUpdateAttendance";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: jest.fn(),
        useWatch: jest.fn(),
    };
});

const mockReactHookForm = (haveAttendanceStatus: boolean = true) => {
    const mockLessonReportDetails = [
        createLessonReportDetail("1", haveAttendanceStatus),
        createLessonReportDetail("2", haveAttendanceStatus),
    ];
    const mockStudentsList = mockLessonReportDetails.map((report) => report.student);

    const mockSetValueHF = jest.fn();
    const mockClearErrorsHF = jest.fn();

    (useFormContext as jest.Mock).mockImplementation(() => {
        return { setValue: mockSetValueHF, clearErrors: mockClearErrorsHF };
    });

    (useWatch as jest.Mock).mockReturnValue(mockLessonReportDetails);

    return { mockStudentsList, mockSetValueHF, mockClearErrorsHF, mockLessonReportDetails };
};

const renderComponent = (props: DialogBulkUpdateAttendanceProps) => {
    render(
        <TranslationProvider>
            <TestThemeProvider>
                <TestHookFormProvider>
                    <DialogBulkUpdateAttendance {...props} />)
                </TestHookFormProvider>
            </TestThemeProvider>
        </TranslationProvider>
    );
};

describe("<DialogBulkUpdateAttendance />", () => {
    it("should have default value is Attend when form value is null", () => {
        const { mockStudentsList } = mockReactHookForm(false);

        const props: DialogBulkUpdateAttendanceProps = {
            students: mockStudentsList,
            onClose: jest.fn(),
            onSave: jest.fn(),
            open: true,
        };

        renderComponent(props);

        const attendanceAutocompleteInputs = screen.getAllByRole("combobox");

        attendanceAutocompleteInputs.forEach((attendanceAutocompleteInput) => {
            expect(attendanceAutocompleteInput).toHaveValue("Attend");
        });
    });

    it("should have default value match with form value", () => {
        const { mockStudentsList, mockLessonReportDetails } = mockReactHookForm();

        const props: DialogBulkUpdateAttendanceProps = {
            students: mockStudentsList,
            onClose: jest.fn(),
            onSave: jest.fn(),
            open: true,
        };

        renderComponent(props);

        const attendanceAutocompleteInputs = screen.getAllByRole("combobox");

        attendanceAutocompleteInputs.forEach((attendanceAutocompleteInput, index) => {
            const expectAttendanceValue =
                mockLessonReportDetails[index].dynamicFields.attendance_status!["label"];

            expect(attendanceAutocompleteInput).toHaveValue(expectAttendanceValue);
        });
    });

    it("should apply attendance values to hook form", () => {
        const { mockStudentsList, mockClearErrorsHF, mockSetValueHF } = mockReactHookForm();

        const props: DialogBulkUpdateAttendanceProps = {
            students: mockStudentsList,
            onClose: jest.fn(),
            onSave: jest.fn(),
            open: true,
        };

        renderComponent(props);

        const attendanceAutocompleteInputs = screen.getAllByRole("combobox");

        attendanceAutocompleteInputs.forEach((attendanceAutocompleteInput) => {
            userEvent.click(attendanceAutocompleteInput);
            selectAutocompleteOptionByLabel("Absent");
        });

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveButton);

        attendanceAutocompleteInputs.forEach((_, index) => {
            expect(mockSetValueHF).toBeCalledWith(
                `lessonReportDetails.${index}.dynamicFields.attendance_status`,
                { key: "STUDENT_ATTEND_STATUS_ABSENT", label: "Absent" }
            );
        });

        expect(mockClearErrorsHF).toBeCalledWith("lessonReportDetails");
        expect(props.onSave).toBeCalled();
    });
});
