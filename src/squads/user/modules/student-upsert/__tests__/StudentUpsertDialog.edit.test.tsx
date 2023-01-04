import { ModeOpenDialog } from "src/common/constants/enum";
import { AppError } from "src/internals/errors";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";
import {
    createMockStudent,
    expectedResultUpdateStudent,
    mockUpsetStudentResp,
} from "src/squads/user/test-utils/mocks/student";
import {
    TestCommonAppProvider,
    TestHookFormProvider,
    TestQueryWrapper,
} from "src/squads/user/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import StudentUpsertDialog, { StudentUpsertDialogProps } from "../StudentUpsertDialog";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useCreateStudent, {
    UseCreateStudentReturn,
} from "src/squads/user/modules/student-upsert/hooks/useCreateStudent";
import useUpdateStudent, {
    UseUpdateStudentReturn,
} from "src/squads/user/modules/student-upsert/hooks/useUpdateStudent";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
}));

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

jest.mock("src/squads/user/modules/student-upsert/hooks/useCreateStudent", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/student-upsert/hooks/useUpdateStudent", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<StudentUpsert /> edit student", () => {
    const mockStudentInfo = createMockStudent({ id: "student-01", current_grade: 1 });

    const onClose = jest.fn();
    const onSuccess = jest.fn();
    const showSnackbar = jest.fn();
    const createStudent = jest.fn();
    const setStudentAccountInfo = jest.fn();
    const updateStudent = jest.fn();

    const renderComponent = () => {
        const props: StudentUpsertDialogProps = {
            mode: ModeOpenDialog.EDIT,
            open: true,
            student: mockStudentInfo,
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

    it("should render titles on mode EDIT when all feature flag is enable", () => {
        renderComponent();

        expect(screen.getByText("Edit Student")).toBeInTheDocument();
        expect(screen.getByText("School History")).toBeInTheDocument();
        expect(screen.getByText("General Info")).toBeInTheDocument();
    });

    it("should call updateStudent and  render correct data on form on mode EDIT", async () => {
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
        const inputStatus = document.getElementById("EnrollmentStatusAutocompleteHF__autocomplete");
        const inputLocation = screen.getByTestId("LocationSelectInputHF");

        const inputBirthday = screen.getByTestId("FormStudentInfo__inputStudentBirthday");
        const inputGender = screen.getByTestId("Radio__MALE");
        const checkboxGender = inputGender.querySelector("input");

        expect(inputFirstName).toHaveValue(mockStudentInfo.user.first_name);
        expect(inputLastName).toHaveValue(mockStudentInfo.user.last_name);
        expect(inputFirstNamePhonetic).toHaveValue(mockStudentInfo.user.first_name_phonetic);
        expect(inputLastNamePhonetic).toHaveValue(mockStudentInfo.user.last_name_phonetic);

        expect(inputEmail).toHaveValue(mockStudentInfo.user.email);
        expect(inputPhone).toHaveValue(mockStudentInfo.user.phone_number);
        expect(inputStudentNote).toHaveValue(mockStudentInfo.student_note);
        expect(inputExternalID).toHaveValue(mockStudentInfo.student_external_id);
        expect(inputGrade).toHaveValue("Grade 1");
        expect(inputBirthday.querySelector("input")).toHaveValue("2021/01/01");
        expect(checkboxGender).toBeChecked();
        expect(inputStatus).toHaveValue("Enrolled");
        expect(within(inputLocation).getByText("Center 1")).toBeInTheDocument();
        expect(within(inputLocation).getByText("Center 2")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));
        await waitFor(() => {
            expect(updateStudent).toHaveBeenCalledTimes(1);
        });
        expect(updateStudent).toHaveBeenCalledWith(expectedResultUpdateStudent);
    });
    it("should call onSuccess, onClose", async () => {
        (useUpdateStudent as jest.Mock<UseUpdateStudentReturn>).mockImplementation((args) => {
            return {
                updateStudent: async () => {
                    args.onSuccess();
                    return mockUpsetStudentResp;
                },
            };
        });
        (useShowSnackbar as jest.Mock<ReturnType<typeof useShowSnackbar>>).mockImplementation(
            () => showSnackbar
        );
        renderComponent();

        const inputFirstName = screen.getByTestId("FormStudentInfo__inputFirstName");

        userEvent.type(inputFirstName, "edited");

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));
        await waitFor(() => {
            expect(onSuccess).toBeCalledTimes(1);
        });
        expect(onClose).toBeCalledTimes(1);
    });
    it("should render validation location student", async () => {
        (useUpdateStudent as jest.Mock<UseUpdateStudentReturn>).mockImplementation(() => {
            const appError = new AppError("Error");
            appError.originMessage = "INVALID_LOCATIONS";
            return {
                updateStudent: jest.fn().mockRejectedValue(appError),
            };
        });

        (useShowSnackbar as jest.Mock<ReturnType<typeof useShowSnackbar>>).mockImplementation(
            () => showSnackbar
        );

        renderComponent();

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));
        const wrapperLocation = screen.getByTestId("LocationSelectInputHF");
        expect(
            await within(wrapperLocation).findByText(
                "Unable to deselect the location. Please end the active student course under the location first"
            )
        ).toBeInTheDocument();
    });

    it("should show error message we update student fail", async () => {
        (useUpdateStudent as jest.Mock<UseUpdateStudentReturn>).mockImplementation(() => {
            return {
                updateStudent: jest.fn().mockRejectedValue(new Error("error message")),
            };
        });

        (useShowSnackbar as jest.Mock<ReturnType<typeof useShowSnackbar>>).mockImplementation(
            () => showSnackbar
        );

        renderComponent();

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(showSnackbar).toBeCalledTimes(1);
        });
        expect(showSnackbar).toBeCalledWith("error message", "error");
    });
});
