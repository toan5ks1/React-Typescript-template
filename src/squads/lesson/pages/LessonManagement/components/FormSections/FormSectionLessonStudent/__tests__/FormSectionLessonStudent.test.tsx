import { LessonManagementStudentInfo } from "src/squads/lesson/common/types";
import { TestThemeProvider } from "src/squads/lesson/test-utils";
import { mockStudentInfoList } from "src/squads/lesson/test-utils/lesson-management";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";
import { selectAutocompleteOptionByLabel } from "src/squads/lesson/test-utils/utils";

import FormSectionLessonStudent from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonStudent";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useLessonStudentInfoListFilter, {
    UseLessonStudentInfoListFilterReturn,
} from "src/squads/lesson/hooks/useLessonStudentInfoListFilter";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/TestQueryWrapper";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useLessonStudentInfoListFilter", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const renderComponent = (defaultLearners: LessonManagementStudentInfo[] = []) => {
    (useLessonStudentInfoListFilter as jest.Mock).mockImplementation(() => {
        const data: UseLessonStudentInfoListFilterReturn = {
            data: mockStudentInfoList,
            isFetchingStudentsCourses: false,
            isLoadingGrades: false,
            pagination: createMockPaginationWithTotalObject(5, 0),
            handleEnterSearchBar: jest.fn(),
            handleApplyFilterCriteria: jest.fn(),
        };

        return data;
    });

    const mockShowSnackbar = jest.fn();

    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);

    render(
        <TestQueryWrapper>
            <TestThemeProvider>
                <TranslationProvider>
                    <TestHookFormProvider
                        useFormOptions={{
                            defaultValues: {
                                learners: defaultLearners,
                            },
                        }}
                    >
                        <FormSectionLessonStudent isSavingDraftLesson={false} />
                    </TestHookFormProvider>
                </TranslationProvider>
            </TestThemeProvider>
        </TestQueryWrapper>
    );

    const submitButton = screen.getByTestId("TextFieldHF__submit");
    return { submitButton, mockShowSnackbar };
};

describe("FormSectionLessonStudent", () => {
    it("should validate when added no student", async () => {
        const { submitButton } = renderComponent();
        userEvent.click(submitButton);

        expect(await screen.findByText("This field is required")).toBeInTheDocument();
    });

    it("should add students to student table", async () => {
        const { submitButton, mockShowSnackbar } = renderComponent();

        const addButton = screen.getByTestId("TableAction__buttonAdd");
        userEvent.click(addButton);

        const addStudentsDialog = screen.getByTestId(
            "DialogAddStudentSubscriptions__dialogContainer"
        );
        expect(addStudentsDialog).toBeVisible();

        const dialogContainer = within(addStudentsDialog);

        const tableRows = dialogContainer.getAllByTestId("TableRowWithCheckbox__checkboxRow");
        const studentCheckboxes = tableRows.map((row) => {
            return row.querySelector('input[type="checkbox"]');
        });

        expect(studentCheckboxes).toHaveLength(2);
        studentCheckboxes.forEach((checkbox) => userEvent.click(checkbox!));

        const checkedBoxes = dialogContainer.queryAllByRole("checkbox", { checked: true });
        expect(checkedBoxes).toHaveLength(3); // Include checkbox header

        const addStudentsButton = dialogContainer.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(addStudentsButton);

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have added students successfully!")
        );

        const allAttendanceAutocomplete = screen.getAllByTestId(
            "TableStudentInfo__autocompleteAttendance"
        );

        allAttendanceAutocomplete.forEach((autocomplete) => {
            const autocompleteInput = within(autocomplete).getByRole("combobox");

            if (!autocompleteInput) throw Error("Attendance status is not found");
            userEvent.click(autocompleteInput);

            selectAutocompleteOptionByLabel("Attend");
            expect(autocompleteInput).toHaveValue("Attend");
        });

        userEvent.click(submitButton);
        await waitFor(() => expect(screen.queryByText("This field is required")).toBeNull());
    }, 10000);
});
