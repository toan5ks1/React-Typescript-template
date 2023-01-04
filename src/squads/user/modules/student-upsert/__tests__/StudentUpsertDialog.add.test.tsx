import { ERPModules, ModeOpenDialog } from "src/common/constants/enum";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";
import {
    createMockUsersFilterByEmail,
    expectedResultCreateStudent,
    mockDialogAccountInfo,
} from "src/squads/user/test-utils/mocks/student";
import {
    TestCommonAppProvider,
    TestQueryWrapper,
    TestHookFormProvider,
} from "src/squads/user/test-utils/providers";
import { changeTextInput, checkErrorMessage } from "src/squads/user/test-utils/utils";

import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import StudentUpsertDialog, { StudentUpsertDialogProps } from "../StudentUpsertDialog";

import { render, RenderResult, screen, within, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useRedirect from "src/squads/user/hooks/useRedirect";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useCreateStudent, {
    UseCreateStudentReturn,
} from "src/squads/user/modules/student-upsert/hooks/useCreateStudent";
import useUpdateStudent, {
    UseUpdateStudentReturn,
} from "src/squads/user/modules/student-upsert/hooks/useUpdateStudent";

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useMapTreeLocations");

jest.mock("src/squads/user/hooks/useRedirect", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
}));

jest.mock("src/squads/user/modules/student-upsert/hooks/useCreateStudent", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/student-upsert/hooks/useUpdateStudent", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<StudentUpsert /> add new student", () => {
    const respUserByEmailOrPhone = createMockUsersFilterByEmail();

    const onClose = jest.fn();
    const onSuccess = jest.fn();
    const showSnackbar = jest.fn();
    const createStudent = jest.fn();
    const setStudentAccountInfo = jest.fn();
    const updateStudent = jest.fn();

    const renderComponent = (): RenderResult => {
        const props: StudentUpsertDialogProps = {
            mode: ModeOpenDialog.ADD,
            open: true,
            onClose,
            onSuccess,
        };

        return render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <TestHookFormProvider>
                        <MuiPickersUtilsProvider>
                            <StudentUpsertDialog {...props} />
                        </MuiPickersUtilsProvider>
                    </TestHookFormProvider>
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );
    };

    beforeEach(() => {
        (useUserFeatureToggle as jest.Mock<boolean>).mockReturnValue(true);
        (useCreateStudent as jest.Mock<UseCreateStudentReturn>).mockReturnValue({
            createStudent,
            setStudentAccountInfo,
            studentAccountInfo: undefined,
        });
        (useUpdateStudent as jest.Mock<UseUpdateStudentReturn>).mockReturnValue({ updateStudent });

        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => []);
    });

    it("should render titles on mode ADD when all feature flag is enable", () => {
        renderComponent();

        expect(screen.getByText("Add Student")).toBeInTheDocument();
        expect(screen.getByText("School History")).toBeInTheDocument();
        expect(screen.getByText("General Info")).toBeInTheDocument();
    });

    it("should open dialog cancel confirm and function onClose have been called", () => {
        renderComponent();

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        const dialogConfirm = screen.getByTestId("DialogWithHeaderFooter_wrapper");
        expect(dialogConfirm).toBeInTheDocument();
        userEvent.click(within(dialogConfirm).getByTestId("FooterDialogConfirm__buttonSave"));

        // X button
        userEvent.click(screen.getByTestId("DialogFullScreen__buttonClose"));
        userEvent.click(within(dialogConfirm).getByTestId("FooterDialogConfirm__buttonSave"));

        expect(onClose).toBeCalledTimes(2);
    });

    it("should render empty form on mode ADD", () => {
        renderComponent();

        const inputFirstName = screen.getByTestId("FormStudentInfo__inputFirstName");
        const inputLastName = screen.getByTestId("FormStudentInfo__inputLastName");
        const inputFirstNamePhonetic = screen.getByTestId(
            "FormStudentInfo__inputFirstNamePhonetic"
        );
        const inputLastNamePhonetic = screen.getByTestId("FormStudentInfo__inputLastNamePhonetic");
        const inputEmail = screen.getByTestId("FormStudentInfo__inputEmail");
        const inputPhone = screen.getByTestId("PhoneInputHF__inputPhoneNumber");
        const inputStudentNote = screen.getByTestId("FormStudentInfo__inputStudentNote");
        const inputExternalID = screen.getByTestId("FormStudentInfo__inputExternalStudentID");
        const inputGrade = document.getElementById("GradeAutocompleteHF__autocomplete");
        const inputBirthday = screen.getByTestId("FormStudentInfo__inputStudentBirthday");
        const inputStatus = document.getElementById("EnrollmentStatusAutocompleteHF__autocomplete");

        const inputLocationWrapper = screen.getByTestId("LocationSelectInputHF");
        const inputLocation = within(inputLocationWrapper).getByTestId("AutocompleteBase__input");

        const inputMale = screen.getByTestId("Radio__MALE");
        const inputFemale = screen.getByTestId("Radio__FEMALE");
        const checkboxMale = within(inputMale).getByRole("radio");
        const checkboxFemale = within(inputFemale).getByRole("radio");

        expect(inputFirstName).toHaveValue("");
        expect(inputLastName).toHaveValue("");
        expect(inputFirstNamePhonetic).toHaveValue("");
        expect(inputLastNamePhonetic).toHaveValue("");
        expect(inputEmail).toHaveValue("");
        expect(inputPhone).toHaveValue("");
        expect(inputStudentNote).toHaveValue("");
        expect(inputExternalID).toHaveValue("");
        expect(inputGrade).toHaveValue("");
        expect(inputBirthday.querySelector("input")).toHaveValue("");
        expect(checkboxMale).not.toBeChecked();
        expect(checkboxFemale).not.toBeChecked();
        expect(inputStatus).toHaveValue("");
        expect(inputLocation).toHaveValue("");
    });

    it("should render error messages input mode ADD", async () => {
        renderComponent();

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        // // Expect 4 errors are prompted (First Name, Last Name, Email, Enrollment Status, Grade)
        await checkErrorMessage(5, "This field is required");
        // check email format validation
        changeTextInput("FormStudentInfo__inputEmail", "test");
        await checkErrorMessage(1, "Email address is not valid");
        // check phone number format validation
        changeTextInput("PhoneInputHF__inputPhoneNumber", "123");
        await checkErrorMessage(1, "Phone number is not valid");
    });

    it("should render error message email and phone existed", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => [
            respUserByEmailOrPhone,
        ]);
        renderComponent();

        changeTextInput("FormStudentInfo__inputEmail", "test@gmail.com");

        changeTextInput("PhoneInputHF__inputPhoneNumber", "0364570988");

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await checkErrorMessage(1, "Email address already exists");
        await checkErrorMessage(1, "Phone number already exists");
    });

    it("should be call fn createStudent when create student successfully", async () => {
        renderComponent();

        await typeValuesAndSubmitCreateStudent();

        await waitFor(() => {
            expect(createStudent).toBeCalledTimes(1);
        });
        expect(createStudent).toBeCalledWith(expectedResultCreateStudent);
    }, 10000);

    it("should render dialog account student and redirect to detail student page", async () => {
        const mockHistoryPush = jest.fn();
        (useRedirect as jest.Mock).mockReturnValue({ push: mockHistoryPush });

        (useCreateStudent as jest.Mock<UseCreateStudentReturn>).mockReturnValue({
            createStudent,
            setStudentAccountInfo,
            studentAccountInfo: mockDialogAccountInfo,
        });

        renderComponent();

        expect(await screen.findByTestId("DialogStudentAccountInfo")).toBeInTheDocument();
        userEvent.click(screen.getByTestId("DialogStudentAccountInfoFooter__buttonClose"));

        expect(onClose).toBeCalledTimes(1);
        expect(onSuccess).toBeCalledTimes(1);
        expect(setStudentAccountInfo).toBeCalledTimes(1);
        expect(setStudentAccountInfo).toBeCalledWith(undefined);
        expect(mockHistoryPush).toHaveBeenCalledWith(
            `/user/${ERPModules.STUDENTS}/${mockDialogAccountInfo?.userId}/show`
        );
    });

    it("should call snackbar error message when create student fail", async () => {
        (useShowSnackbar as jest.Mock<ReturnType<typeof useShowSnackbar>>).mockImplementation(
            () => showSnackbar
        );

        (useCreateStudent as jest.Mock<UseCreateStudentReturn>).mockImplementation(() => {
            return {
                createStudent: jest.fn().mockRejectedValue(new Error("error message")),
                setStudentAccountInfo,
                studentAccountInfo: undefined,
            };
        });

        renderComponent();

        await typeValuesAndSubmitCreateStudent();

        await waitFor(() => {
            expect(showSnackbar).toBeCalledTimes(1);
        });
        expect(showSnackbar).toBeCalledWith("error message", "error");
    }, 10000);

    it("should not should school history when feature toggle school history is disable", () => {
        (useUserFeatureToggle as jest.Mock<boolean>).mockReturnValue(false);

        renderComponent();

        expect(screen.queryByTestId("StudentSchoolHistoryUpsert__root")).not.toBeInTheDocument();
    });
});

async function typeValuesAndSubmitCreateStudent() {
    const inputFirstName = screen.getByTestId("FormStudentInfo__inputFirstName");
    const inputLastName = screen.getByTestId("FormStudentInfo__inputLastName");
    const inputFirstNamePhonetic = screen.getByTestId("FormStudentInfo__inputFirstNamePhonetic");
    const inputLastNamePhonetic = screen.getByTestId("FormStudentInfo__inputLastNamePhonetic");
    const inputEmail = screen.getByTestId("FormStudentInfo__inputEmail");
    const inputPhone = screen.getByTestId("PhoneInputHF__inputPhoneNumber");

    const inputStudentNote = screen.getByTestId("FormStudentInfo__inputStudentNote");
    const inputExternalStudentID = screen.getByTestId("FormStudentInfo__inputExternalStudentID");

    const autocompleteStatus = screen.getByTestId("FormStudentInfo__autocompleteStatus");
    const inputStatus = document.getElementById(
        "EnrollmentStatusAutocompleteHF__autocomplete"
    ) as HTMLInputElement;

    const autocompleteGrade = screen.getByTestId("FormStudentInfo__autoCompleteGrade");
    const inputGrade = document.getElementById(
        "GradeAutocompleteHF__autocomplete"
    ) as HTMLInputElement;
    const wrapperLocation = screen.getByTestId("LocationSelectInputHF");
    const inputLocation = document.getElementById("LocationSelectInputHF") as HTMLInputElement;

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
    userEvent.type(inputFirstNamePhonetic, "first name phonetic");
    userEvent.type(inputLastNamePhonetic, "last name phonetic");

    userEvent.type(inputEmail, "name@email.com");
    userEvent.type(inputPhone, "0364561918");
    userEvent.type(inputStudentNote, "note");
    userEvent.type(inputExternalStudentID, "ExternalStudentID 1");

    //add location
    userEvent.click(inputLocation);
    expect(await screen.findByTestId("DialogWithHeaderFooter_wrapper")).toBeInTheDocument();
    userEvent.click(screen.getByText("Location 12"));
    userEvent.click(
        within(screen.getByTestId("DialogWithHeaderFooter_wrapper")).getByTestId(
            "FooterDialogConfirm__buttonSave"
        )
    );

    expect(inputFirstName).toHaveValue("first name");
    expect(inputLastName).toHaveValue("last name");
    expect(inputFirstNamePhonetic).toHaveValue("first name phonetic");
    expect(inputLastNamePhonetic).toHaveValue("last name phonetic");
    expect(inputEmail).toHaveValue("name@email.com");
    expect(inputStatus).toHaveValue("Potential");
    expect(inputPhone).toHaveValue("0364561918");
    expect(inputStudentNote).toHaveValue("note");
    expect(inputExternalStudentID).toHaveValue("ExternalStudentID 1");
    expect(inputGrade).toHaveValue("Grade 1");
    expect(within(wrapperLocation).getByText("Location 12")).toBeInTheDocument();

    userEvent.click(
        within(screen.getByTestId("DialogFullScreen__footer")).getByTestId(
            "FooterDialogConfirm__buttonSave"
        )
    );
}
