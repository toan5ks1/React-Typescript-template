import { FieldPath, InternalFieldName, UseFormGetValues } from "react-hook-form";
import { ModeOpenDialog } from "src/common/constants/enum";
import { UpsertStudentFormProps } from "src/squads/user/common/types";
import { createMockStudentUpsertInfoForm } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import TranslationProvider from "src/providers/TranslationProvider";
import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import StudentGeneralInfoUpsert from "../StudentGeneralInfoUpsert";

import { render, screen, within } from "@testing-library/react";
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

describe("<StudentGeneralInfoUpsert.edit.test />", () => {
    // Render components
    type RenderFormStudentInfoHookFormProps = {
        defaultValues?: UpsertStudentFormProps;
    };

    const renderFormStudentInfoHookForm = (props?: RenderFormStudentInfoHookFormProps) => {
        const getValues: UseFormGetValues<UpsertStudentFormProps> = mockGetValue;

        const FormStudentInfoHookForm = withReactHookForm(
            StudentGeneralInfoUpsert,
            { mode: ModeOpenDialog.EDIT, getValues },
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
    it("should match snapshot on edit mode", () => {
        const wrapper = renderFormStudentInfoHookForm({
            defaultValues: defaultStudentFormDefaultValues,
        });
        expect(wrapper.container).toMatchSnapshot();
        expect(screen.getByText("General Info"));
    });

    it("should render full fields when STUDENT_MANAGEMENT_STUDENT_PHONETIC_NAME is enabled", () => {
        renderFormStudentInfoHookForm({ defaultValues: defaultStudentFormDefaultValues });
        expect(screen.getByTestId("FormStudentInfo__inputFirstName")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputLastName")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputFirstNamePhonetic")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputLastNamePhonetic")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputEmail")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__autocompleteStatus")).toBeInTheDocument();
        expect(screen.getByTestId("PhoneInputHF__selectCountry")).toBeInTheDocument();
        expect(screen.getByTestId("PhoneInputHF__inputPhoneNumber")).toBeInTheDocument();
        expect(screen.getByTestId("PhoneInputHF__inputPhoneNumber")).toHaveAttribute("readonly");
        expect(screen.getByTestId("FormStudentInfo__autoCompleteGrade")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputExternalStudentID")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputStudentNote")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputStudentGender")).toBeInTheDocument();
        expect(screen.getByTestId("FormStudentInfo__inputStudentBirthday")).toBeInTheDocument();
        expect(screen.getByTestId("LocationSelectInputHF")).toBeInTheDocument();
    });

    it("Should render default values on mode edit", () => {
        renderFormStudentInfoHookForm({
            defaultValues: defaultStudentFormDefaultValues,
        });
        const inputEmail = screen.getByTestId("FormStudentInfo__inputEmail");
        const inputFirstName = screen.getByTestId("FormStudentInfo__inputFirstName");
        const inputLastName = screen.getByTestId("FormStudentInfo__inputLastName");
        const inputFirstNamePhonetic = screen.getByTestId(
            "FormStudentInfo__inputFirstNamePhonetic"
        );
        const inputLastNamePhonetic = screen.getByTestId("FormStudentInfo__inputLastNamePhonetic");

        const inputStatus = document.getElementById(
            "EnrollmentStatusAutocompleteHF__autocomplete"
        ) as HTMLInputElement;

        const inputPhone = screen.getByTestId("PhoneInputHF__inputPhoneNumber");
        const inputStudentNote = screen.getByTestId("FormStudentInfo__inputStudentNote");
        const inputGrade = document.getElementById("GradeAutocompleteHF__autocomplete");
        const inputExternalStudentID = screen.getByTestId(
            "FormStudentInfo__inputExternalStudentID"
        );
        const inputBirthday = screen.getByTestId(
            "FormStudentInfo__inputStudentBirthday"
        ) as HTMLInputElement;

        const inputLocations = screen.getByTestId("LocationSelectInputHF");
        const tags = within(inputLocations).getAllByTestId("LocationSelectInputHF__tagBox");

        const inputStudentGender = screen.getByTestId("Radio__MALE");
        const checkboxGender = within(inputStudentGender).getByRole("radio");

        expect(inputEmail).toHaveValue(defaultStudentFormDefaultValues.generalInfo.email);
        expect(inputFirstName).toHaveValue(defaultStudentFormDefaultValues.generalInfo.firstName);
        expect(inputLastName).toHaveValue(defaultStudentFormDefaultValues.generalInfo.lastName);
        expect(inputFirstNamePhonetic).toHaveValue(
            defaultStudentFormDefaultValues.generalInfo.firstNamePhonetic
        );
        expect(inputLastNamePhonetic).toHaveValue(
            defaultStudentFormDefaultValues.generalInfo.lastNamePhonetic
        );
        expect(inputStatus.value).toContain(
            defaultStudentFormDefaultValues.generalInfo.enrollmentStatus.value
        );
        expect(inputPhone).toHaveValue(defaultStudentFormDefaultValues.generalInfo.phoneNumber);
        expect(inputStudentNote).toHaveValue(
            defaultStudentFormDefaultValues.generalInfo.studentNote
        );
        expect(inputExternalStudentID).toHaveValue(
            defaultStudentFormDefaultValues.generalInfo.studentExternalId
        );
        expect(inputGrade).toHaveValue(defaultStudentFormDefaultValues.generalInfo.grade?.name);
        expect(inputPhone).toHaveAttribute("readonly");
        expect(inputBirthday.querySelector("input")).toHaveValue("2021/01/01");
        expect(checkboxGender).toBeChecked();
        expect(tags).toHaveLength(1);
        expect(tags[0]).toHaveTextContent("Location 13");
    });

    it("Should change when user edit email on mode edit", () => {
        renderFormStudentInfoHookForm({
            defaultValues: defaultStudentFormDefaultValues,
        });

        const inputEmail = screen.getByTestId("FormStudentInfo__inputEmail") as HTMLInputElement;
        expect(inputEmail).toHaveValue(defaultStudentFormDefaultValues.generalInfo.email);

        userEvent.clear(inputEmail);
        userEvent.type(inputEmail, "mail-edit@mail.com");

        expect(inputEmail).toHaveValue("mail-edit@mail.com");
    });
});
