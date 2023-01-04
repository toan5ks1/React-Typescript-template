import { formatDate } from "src/common/utils/time";
import { StudentPackageClientWithLocation } from "src/squads/user/common/types";
import studentService from "src/squads/user/service//define-service/student-service";
import { inferMutation } from "src/squads/user/service/infer-service";
import { UseMutationOptions } from "src/squads/user/service/service-creator";
import { selectFullDatePicker } from "src/squads/user/test-utils/date-time-picker-helper";
import { createMockStudent } from "src/squads/user/test-utils/mocks/student";
import { mockDefaultStudentCourse } from "src/squads/user/test-utils/mocks/student-course-package";
import {
    TestQueryWrapper,
    TestCommonAppProvider,
    TestHookFormProvider,
    TestStudentDetailProvider,
    TestThemeProvider,
} from "src/squads/user/test-utils/providers";

import TranslationProvider from "src/providers/TranslationProvider";
import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import { StudentCourseUpsertDialog } from "../StudentCourseUpsertDialog";

import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useCourseClasses from "src/squads/user/modules/student-course-upsert/hooks/useCourseClasses";
import useCourseLocations from "src/squads/user/modules/student-course-upsert/hooks/useCourseLocations";
import useFetchCourseAutocomplete, {
    useFetchCourseAutocompleteReturns,
} from "src/squads/user/modules/student-course-upsert/hooks/useFetchCourseAutocomplete";
import useNormalizeStudentDetail, {
    UseNormalizeStudentDetailReturn,
} from "src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferMutation: jest.fn(),
    inferStandaloneQuery: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/modules/student-course-upsert/hooks/useFetchCourseAutocomplete", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/student-course-upsert/hooks/useCourseLocations", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/student-course-upsert/hooks/useCourseClasses", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const student = createMockStudent({ id: "student_id_01", current_grade: 10 });

describe("<StudentCourseUpsertDialog />", () => {
    const showSnackbar = jest.fn((str: string) => str);
    const onClose = jest.fn();
    const mutateAsync = jest.fn();
    const onSuccess = jest.fn();

    //Render Component
    const renderComponent = (courses?: StudentPackageClientWithLocation[]) => {
        return render(
            <TranslationProvider>
                <TestCommonAppProvider>
                    <TestThemeProvider>
                        <MuiPickersUtilsProvider>
                            <TestQueryWrapper>
                                <TestHookFormProvider>
                                    <TestStudentDetailProvider>
                                        <StudentCourseUpsertDialog
                                            courses={courses || []}
                                            open={true}
                                            onClose={onClose}
                                            studentId="1"
                                            onSuccess={onSuccess}
                                        />
                                    </TestStudentDetailProvider>
                                </TestHookFormProvider>
                            </TestQueryWrapper>
                        </MuiPickersUtilsProvider>
                    </TestThemeProvider>
                </TestCommonAppProvider>
            </TranslationProvider>
        );
    };

    beforeEach(() => {
        (useNormalizeStudentDetail as jest.Mock<UseNormalizeStudentDetailReturn>).mockReturnValue({
            isLoading: false,
            student,
            refetch: jest.fn(),
        });
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "student"; action: keyof typeof studentService.mutation }) =>
                (_options: UseMutationOptions<string, string>) => {
                    return {
                        mutateAsync,
                    };
                }
        );

        (
            useFetchCourseAutocomplete as jest.Mock<useFetchCourseAutocompleteReturns>
        ).mockReturnValue({
            options: [],
            setInputValDebounced: jest.fn(),
        });

        (useCourseLocations as jest.Mock<ReturnType<typeof useCourseLocations>>).mockReturnValue({
            options: [],
            loading: false,
        });

        (useCourseClasses as jest.Mock<ReturnType<typeof useCourseClasses>>).mockReturnValue({
            options: [],
            loading: false,
        });
    });

    it("should match snapshot", () => {
        renderComponent(mockDefaultStudentCourse);
        expect(screen.getByTestId("StudentCourseUpsert__dialog"));
    });

    it("should render correctly UI", () => {
        renderComponent();

        expect(screen.getByTestId("DialogWithHeaderFooter__dialogTitle")).toBeInTheDocument();
        expect(screen.getByTestId("DialogWithHeaderFooter__dialogContent")).toBeInTheDocument();
        expect(screen.getByTestId("StudentCourseUpsertTable")).toBeInTheDocument();
        expect(screen.getByTestId("FooterDialogConfirm__buttonClose")).toBeInTheDocument();
        expect(screen.getByTestId("FooterDialogConfirm__buttonSave")).toBeInTheDocument();
    });

    it("onClose should called when clicking cancel button", () => {
        renderComponent();

        const cancelButton = screen.getByTestId("FooterDialogConfirm__buttonClose");

        expect(cancelButton).toBeInTheDocument();

        userEvent.click(cancelButton);

        expect(onClose).toHaveBeenCalledTimes(1);
    });
    it("mutateAsync shouldn't called when clicking save button without data", async () => {
        renderComponent();

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);

        await waitFor(() => {
            expect(mutateAsync).not.toBeCalledTimes(1);
        });
    });

    it("mutateAsync should called when clicking save button with data", async () => {
        renderComponent(mockDefaultStudentCourse);

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);

        await waitFor(() => {
            expect(mutateAsync).toBeCalledTimes(1);
        });
    });

    it("should be render correct error messages", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "student"; action: keyof typeof studentService.mutation }) =>
                (_options: UseMutationOptions<string, string>) => {
                    return {
                        mutateAsync: jest.fn(() =>
                            Promise.reject(new Error("Error Course Upsert"))
                        ),
                    };
                }
        );
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderComponent(mockDefaultStudentCourse);
        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);

        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith("Error Course Upsert", "error");
        });
    });

    it("should be render correct successful messages", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "student"; action: keyof typeof studentService.mutation }) =>
                (options: UseMutationOptions<string, string>) => {
                    return {
                        mutateAsync: jest.fn(async () => {
                            await options?.onSuccess?.("", "", undefined);
                        }),
                    };
                }
        );
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderComponent(mockDefaultStudentCourse);
        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);
        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith("You have updated the courses successfully!");
        });

        expect(onSuccess).toBeCalledTimes(1);
    });

    it("end date should follow start date when change start date >=end date on edit course", async () => {
        const wrapper = renderComponent(mockDefaultStudentCourse);

        const now = new Date();

        const startDate = screen.getAllByTestId("StudentCourseUpsertTable__startDate")[0];
        const endDate = screen.getAllByTestId("StudentCourseUpsertTable__endDate")[0];

        await selectFullDatePicker(wrapper, startDate, now);

        expect(startDate.querySelector("input")).toHaveValue(formatDate(now, "yyyy/LL/dd"));
        expect(endDate.querySelector("input")).toHaveValue(formatDate(now, "yyyy/LL/dd"));
    });

    it("should add and delete daft course", () => {
        renderComponent(mockDefaultStudentCourse);

        userEvent.dblClick(screen.getByTestId("StudentCourseUpsert__addButton"));

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");
        const checkBoxAll = screen.getByTestId("TableHeaderWithCheckbox__checkboxHeader");

        expect(checkBox).toHaveLength(3);

        userEvent.click(checkBox[2]);

        userEvent.click(checkBoxAll);

        userEvent.click(screen.getByTestId("StudentCourseUpsert__deleteAction"));

        expect(screen.getAllByTestId("TableRowWithCheckbox__checkboxRow")).toHaveLength(1);
    });

    it("should render BackdropLoading", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "student"; action: keyof typeof studentService.mutation }) =>
                (_options: UseMutationOptions<string, string>) => {
                    return {
                        mutateAsync: jest.fn(),
                        isLoading: true,
                    };
                }
        );
        renderComponent(mockDefaultStudentCourse);

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        userEvent.click(saveButton);

        expect(
            await screen.findByTestId("StudentCourseUpsert__BackdropLoading")
        ).toBeInTheDocument();
    });

    it("should be call 1 time when db click button add course and button save be disable", async () => {
        renderComponent(mockDefaultStudentCourse);

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();
        expect(saveButton).not.toBeDisabled();

        userEvent.click(saveButton);

        expect(saveButton).toBeDisabled();

        await waitFor(() => {
            expect(mutateAsync).toBeCalledTimes(1);
        });
    });

    it("should not change date when adjust start date < end date on mode add", async () => {
        const wrapper = renderComponent();

        userEvent.click(screen.getByTestId("StudentCourseUpsert__addButton"));

        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        const endDate = screen.getAllByTestId("StudentCourseUpsertTable__endDate")[0];
        await selectFullDatePicker(wrapper, endDate, nextYear);
        expect(endDate.querySelector("input")).toHaveValue(formatDate(nextYear, "yyyy/LL/dd"));

        const now = new Date();
        now.setFullYear(now.getFullYear());
        const startDate = screen.getAllByTestId("StudentCourseUpsertTable__startDate")[0];
        await selectFullDatePicker(wrapper, startDate, now);
        expect(startDate.querySelector("input")).toHaveValue(formatDate(now, "yyyy/LL/dd"));
    });
});
