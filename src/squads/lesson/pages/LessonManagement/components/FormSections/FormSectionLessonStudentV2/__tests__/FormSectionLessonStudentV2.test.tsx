import { TestThemeProvider } from "src/squads/lesson/test-utils";
import { makeAStudentInfo } from "src/squads/lesson/test-utils/class-course";
import { selectAutocompleteOptionByLabel } from "src/squads/lesson/test-utils/utils";

import FormSectionLessonStudentV2 from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonStudentV2";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/TestQueryWrapper";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: () => jest.fn(),
    };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useGetManyLocations", () => {
    return {
        __esModule: true,
        default: (locationIds: string[]) => {
            return {
                data: locationIds.map((id) => ({ location_id: id, name: "Location Name" })),
                isLoading: false,
            };
        },
    };
});

const renderComponent = () => {
    render(
        <TestQueryWrapper>
            <TestThemeProvider>
                <TranslationProvider>
                    <TestHookFormProvider
                        useFormOptions={{
                            defaultValues: {
                                learners: [makeAStudentInfo(1), makeAStudentInfo(2)],
                            },
                        }}
                    >
                        <FormSectionLessonStudentV2 isSavingDraftLesson={false} />
                    </TestHookFormProvider>
                </TranslationProvider>
            </TestThemeProvider>
        </TestQueryWrapper>
    );

    const submitButton = screen.getByTestId("TextFieldHF__submit");
    return { submitButton };
};

describe("FormSectionLessonStudentV2", () => {
    //TODO: after catch multiple error in https://manabie.atlassian.net/browse/LT-18801, @lesson will fix under case
    it.skip("should see error message when there are no students", async () => {
        const { submitButton } = renderComponent();

        const checkboxHeader = screen.getByTestId("TableHeaderWithCheckbox__checkboxHeader");
        userEvent.click(within(checkboxHeader).getByRole("checkbox"));
        userEvent.click(screen.getByTestId("TableAction__buttonDelete"));

        userEvent.click(submitButton);
        expect(await screen.findByText("This field is required")).toBeInTheDocument();
    });

    it("should update student's attendance status", async () => {
        const { submitButton } = renderComponent();

        const attendanceStatusAutocompleteInput = screen.getAllByRole("combobox");

        attendanceStatusAutocompleteInput.forEach((input) => {
            userEvent.click(input);
            selectAutocompleteOptionByLabel("Attend");
        });

        userEvent.click(submitButton);
        await waitFor(() =>
            expect(screen.queryByText("This field is required")).not.toBeInTheDocument()
        );
    });
});
