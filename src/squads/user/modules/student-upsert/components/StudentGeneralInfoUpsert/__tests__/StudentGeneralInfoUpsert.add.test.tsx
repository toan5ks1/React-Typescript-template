import { FieldPath, InternalFieldName, UseFormGetValues } from "react-hook-form";
import { ModeOpenDialog } from "src/common/constants/enum";
import { formatDate } from "src/common/utils/time";
import { UpsertStudentFormProps } from "src/squads/user/common/types";
import { selectFullDatePicker } from "src/squads/user/test-utils/date-time-picker-helper";
import { createMockStudentUpsertInfoForm } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import TranslationProvider from "src/providers/TranslationProvider";
import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import StudentGeneralInfoUpsert from "../StudentGeneralInfoUpsert";

import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import { withReactHookForm } from "src/squads/user/test-utils/HOCs";

const defaultStudentFormDefaultValues = createMockStudentUpsertInfoForm({ id: "student_id_1" });

const mockGetValue: UseFormGetValues<UpsertStudentFormProps> = (
    fieldNames?:
        | FieldPath<UpsertStudentFormProps>
        | ReadonlyArray<FieldPath<UpsertStudentFormProps>>
) => {
    return defaultStudentFormDefaultValues[fieldNames as InternalFieldName];
};

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useMapTreeLocations");

describe("<StudentGeneralInfoUpsert.add.test />", () => {
    // Render components
    type RenderFormStudentInfoHookFormProps = {
        defaultValues?: UpsertStudentFormProps;
    };

    const renderFormStudentInfoHookForm = (props?: RenderFormStudentInfoHookFormProps) => {
        const getValues: UseFormGetValues<UpsertStudentFormProps> = mockGetValue;

        const FormStudentInfoHookForm = withReactHookForm(
            StudentGeneralInfoUpsert,
            { mode: ModeOpenDialog.ADD, getValues },
            { defaultValues: props?.defaultValues }
        );

        return render(
            <TranslationProvider>
                <TestQueryWrapper>
                    <TestCommonAppProvider>
                        <MuiPickersUtilsProvider>
                            <FormStudentInfoHookForm />
                        </MuiPickersUtilsProvider>
                    </TestCommonAppProvider>
                </TestQueryWrapper>
            </TranslationProvider>
        );
    };
    beforeEach(() => {
        (useUserFeatureToggle as jest.Mock).mockImplementation(() => true);
    });

    it("should render full fields when STUDENT_MANAGEMENT_STUDENT_PHONETIC_NAME is enabled", () => {
        renderFormStudentInfoHookForm();
        expect(screen.getByTestId("FormStudentInfo__inputFirstName")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputLastName")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputFirstNamePhonetic")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputLastNamePhonetic")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputEmail")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__autocompleteStatus")).toBeInTheDocument();
        expect(screen.getByTestId("PhoneInputHF__selectCountry")).toBeInTheDocument();
        expect(screen.getByTestId("PhoneInputHF__inputPhoneNumber")).toBeInTheDocument();
        expect(screen.getByTestId("PhoneInputHF__inputPhoneNumber")).not.toHaveAttribute(
            "readonly"
        );
        expect(screen.getByTestId("FormStudentInfo__autoCompleteGrade")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputExternalStudentID")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputStudentNote")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputStudentGender")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputStudentBirthday")).toBeInTheDocument();
        expect(screen.getByTestId("LocationSelectInputHF")).toBeInTheDocument();
    });
    it("should render full fields when STUDENT_MANAGEMENT_STUDENT_PHONETIC_NAME is not enabled", () => {
        (useUserFeatureToggle as jest.Mock).mockImplementation(() => false);
        renderFormStudentInfoHookForm();
        expect(screen.getByTestId("FormStudentInfo__inputName")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputEmail")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__autocompleteStatus")).toBeInTheDocument();
        expect(screen.getByTestId("PhoneInputHF__selectCountry")).toBeInTheDocument();
        expect(screen.getByTestId("PhoneInputHF__inputPhoneNumber")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__autoCompleteGrade")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputExternalStudentID")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputStudentNote")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputStudentGender")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputStudentBirthday")).toBeInTheDocument();
        expect(screen.getByTestId("LocationSelectInputHF")).toBeInTheDocument();
    });

    it("should render correct Enrollment Status: Potential Enrolled Withdrawn Graduated LOA", async () => {
        renderFormStudentInfoHookForm();
        const inputStatus = document.getElementById(
            "EnrollmentStatusAutocompleteHF__autocomplete"
        ) as HTMLInputElement;
        userEvent.click(inputStatus);

        expect(screen.getByText("Potential")).toBeInTheDocument();
        expect(screen.getByText("Enrolled")).toBeInTheDocument();
        expect(screen.getByText("Withdrawn")).toBeInTheDocument();
        expect(screen.getByText("Graduated")).toBeInTheDocument();
        expect(screen.getByText("LOA")).toBeInTheDocument();
    });

    it("should render correct values on each input when user type", async () => {
        const wrapper = renderFormStudentInfoHookForm();

        const inputFirstName = screen.getByTestId("FormStudentInfo__inputFirstName");
        const inputLastName = screen.getByTestId("FormStudentInfo__inputLastName");
        const inputEmail = screen.getByTestId("FormStudentInfo__inputEmail");
        const inputPhone = screen.getByTestId("PhoneInputHF__inputPhoneNumber");

        const inputStudentNote = screen.getByTestId("FormStudentInfo__inputStudentNote");
        const inputStudentGender = screen.getByTestId("Radio__MALE");
        const checkboxGender = within(inputStudentGender).getByRole("radio");
        const inputStudentBirthday = screen.getByTestId("FormStudentInfo__inputStudentBirthday");
        const inputLocations = screen.getByTestId("LocationSelectInputHF");

        const inputExternalStudentID = screen.getByTestId(
            "FormStudentInfo__inputExternalStudentID"
        );

        const autocompleteStatus = screen.getByTestId("FormStudentInfo__autocompleteStatus");
        const inputStatus = document.getElementById(
            "EnrollmentStatusAutocompleteHF__autocomplete"
        ) as HTMLInputElement;

        const autocompleteGrade = screen.getByTestId("FormStudentInfo__autoCompleteGrade");
        const inputGrade = document.getElementById(
            "GradeAutocompleteHF__autocomplete"
        ) as HTMLInputElement;

        const now = new Date(2000, 10, 10);
        //Select birthday
        await selectFullDatePicker(wrapper, inputStudentBirthday, now);
        //Choose status student
        userEvent.type(inputStatus, "p");
        fireEvent.keyDown(autocompleteStatus, { key: "ArrowDown" });
        fireEvent.keyDown(autocompleteStatus, { key: "Enter" });

        //Choose status grade
        userEvent.type(inputGrade, "Grade 1");
        fireEvent.keyDown(autocompleteGrade, { key: "ArrowDown" });
        fireEvent.keyDown(autocompleteGrade, { key: "Enter" });

        userEvent.type(inputFirstName, "first name");
        userEvent.type(inputLastName, "last name");
        userEvent.type(inputEmail, "name@email.com");
        userEvent.type(inputPhone, "123");
        userEvent.type(inputStudentNote, "note");
        userEvent.type(inputExternalStudentID, "ExternalStudentID 1");
        userEvent.click(inputStudentGender);

        // Add new locations
        const inputBaseLocation = within(inputLocations).getByTestId("AutocompleteBase__input");
        fireEvent.keyDown(inputBaseLocation, { key: "ArrowDown" });
        const treeLocationDialog = screen.getByTestId("DialogTreeLocations");
        expect(treeLocationDialog).toBeInTheDocument();
        userEvent.click(within(treeLocationDialog).getByText("Location 12"));
        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));
        expect(within(inputLocations).getByText("Location 12")).toBeInTheDocument();

        expect(inputFirstName).toHaveValue("first name");
        expect(inputLastName).toHaveValue("last name");
        expect(inputEmail).toHaveValue("name@email.com");
        expect(inputStatus).toHaveValue("Potential");
        expect(inputPhone).toHaveValue("123");
        expect(inputStudentNote).toHaveValue("note");
        expect(inputExternalStudentID).toHaveValue("ExternalStudentID 1");
        expect(inputGrade).toHaveValue("Grade 1");
        expect(checkboxGender).toBeChecked();
        expect(inputStudentBirthday.querySelector("input")).toHaveValue(
            formatDate(now, "yyyy/LL/dd")
        );
    }, 10000);
});
