import { formatDate } from "src/common/utils/time";
import { StudentPackageClientWithLocation } from "src/squads/user/common/types";
import { inferStandaloneQuery, inferMutation } from "src/squads/user/service/infer-service";
import { selectFullDatePicker } from "src/squads/user/test-utils/date-time-picker-helper";
import { createMockStudent } from "src/squads/user/test-utils/mocks/student";
import { mockDefaultStudentCourse } from "src/squads/user/test-utils/mocks/student-course-package";
import {
    TestQueryWrapper,
    TestCommonAppProvider,
    TestHookFormProvider,
    TestStudentDetailProvider,
} from "src/squads/user/test-utils/providers";

import TranslationProvider from "src/providers/TranslationProvider";
import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import { StudentCourseUpsertDialog } from "../StudentCourseUpsertDialog";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useCourseClasses from "src/squads/user/modules/student-course-upsert/hooks/useCourseClasses";
import useCourseLocations from "src/squads/user/modules/student-course-upsert/hooks/useCourseLocations";
import useFetchCourseAutocomplete, {
    useFetchCourseAutocompleteReturns,
} from "src/squads/user/modules/student-course-upsert/hooks/useFetchCourseAutocomplete";
import useNormalizeStudentDetail, {
    UseNormalizeStudentDetailReturn,
} from "src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail";

jest.mock("src/squads/user/hooks/useUserFeatureFlag");
jest.mock("src/squads/user/hooks/useShowSnackbar");
jest.mock("src/squads/user/modules/student-course-upsert/hooks/useFetchCourseAutocomplete", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
    inferMutation: jest.fn(),
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
    //Render Component
    const renderComponent = (courses?: StudentPackageClientWithLocation[]) => {
        return render(
            <TranslationProvider>
                <TestCommonAppProvider>
                    <MuiPickersUtilsProvider>
                        <TestQueryWrapper>
                            <TestHookFormProvider>
                                <TestStudentDetailProvider>
                                    <StudentCourseUpsertDialog
                                        courses={courses || []}
                                        open={true}
                                        onClose={jest.fn()}
                                        studentId="1"
                                        onSuccess={jest.fn()}
                                    />
                                </TestStudentDetailProvider>
                            </TestHookFormProvider>
                        </TestQueryWrapper>
                    </MuiPickersUtilsProvider>
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
        (inferMutation as jest.Mock).mockImplementation(() => () => {
            return {
                mutateAsync: jest.fn(),
            };
        });
    });

    it(`should show error "Required fields cannot be blank!"`, async () => {
        renderComponent();

        userEvent.click(screen.getByTestId("StudentCourseUpsert__addButton"));

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        expect(checkBox).toHaveLength(1);

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);

        const errorMessageBlank = await screen.findByText("Required fields cannot be blank!");

        expect(errorMessageBlank).toBeInTheDocument();
    });
    it(`should show 2 errors related to "location student " and "location course"`, async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            ({ entity }: { entity: "courseAccessPath" | "userAccessPath" }) => {
                return () => {
                    switch (entity) {
                        case "courseAccessPath":
                            return [];
                        case "userAccessPath":
                            return [];
                    }
                };
            }
        );

        const wrapper = renderComponent(mockDefaultStudentCourse);

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        expect(checkBox).toHaveLength(1);

        const now = new Date();

        const endDate = screen.getAllByTestId("StudentCourseUpsertTable__endDate")[0];

        await selectFullDatePicker(wrapper, endDate, now);

        expect(endDate.querySelector("input")).toHaveValue(formatDate(now, "yyyy/LL/dd"));

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);

        const errorMessageStudent = await screen.findByText(
            "Please add the student course location back to student to activate student course"
        );
        const errorMessageCourse = await screen.findByText(
            "Please add the student course location back to course to activate student course"
        );

        expect(errorMessageStudent).toBeInTheDocument();
        expect(errorMessageCourse).toBeInTheDocument();
    });

    it(`should only show error related to "location student"`, async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            ({ entity }: { entity: "courseAccessPath" | "userAccessPath" }) => {
                return () => {
                    switch (entity) {
                        case "courseAccessPath":
                            return [{ course_id: "course_id", location_id: "location_id" }];
                        case "userAccessPath":
                            return [];
                    }
                };
            }
        );

        const wrapper = renderComponent(mockDefaultStudentCourse);

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        expect(checkBox).toHaveLength(1);

        const now = new Date();

        const endDate = screen.getAllByTestId("StudentCourseUpsertTable__endDate")[0];

        await selectFullDatePicker(wrapper, endDate, now);

        expect(endDate.querySelector("input")).toHaveValue(formatDate(now, "yyyy/LL/dd"));

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);

        const errorMessageStudent = await screen.findByText(
            "Please add the student course location back to student to activate student course"
        );

        expect(errorMessageStudent).toBeInTheDocument();
    });

    it(`should only show error related to "location course"`, async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            ({ entity }: { entity: "courseAccessPath" | "userAccessPath" }) => {
                return () => {
                    switch (entity) {
                        case "courseAccessPath":
                            return [];
                        case "userAccessPath":
                            return [{ user_id: "user_id", location_id: "location_id" }];
                    }
                };
            }
        );

        const wrapper = renderComponent(mockDefaultStudentCourse);

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        expect(checkBox).toHaveLength(1);

        const now = new Date();

        const endDate = screen.getAllByTestId("StudentCourseUpsertTable__endDate")[0];

        await selectFullDatePicker(wrapper, endDate, now);

        expect(endDate.querySelector("input")).toHaveValue(formatDate(now, "yyyy/LL/dd"));

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);

        const errorMessageCourse = await screen.findByText(
            "Please add the student course location back to course to activate student course"
        );

        expect(errorMessageCourse).toBeInTheDocument();
    });

    it(`should only show three error related to "blank", "student", "course" `, async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            ({ entity }: { entity: "courseAccessPath" | "userAccessPath" }) => {
                return () => {
                    switch (entity) {
                        case "courseAccessPath":
                            return [];
                        case "userAccessPath":
                            return [];
                    }
                };
            }
        );

        const wrapper = renderComponent(mockDefaultStudentCourse);

        userEvent.click(screen.getByTestId("StudentCourseUpsert__addButton"));

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        expect(checkBox).toHaveLength(2);

        const now = new Date();

        const endDate = screen.getAllByTestId("StudentCourseUpsertTable__endDate")[0];

        await selectFullDatePicker(wrapper, endDate, now);

        expect(endDate.querySelector("input")).toHaveValue(formatDate(now, "yyyy/LL/dd"));

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);

        const errorMessageStudent = await screen.findByText(
            "Please add the student course location back to student to activate student course"
        );
        const errorMessageCourse = await screen.findByText(
            "Please add the student course location back to course to activate student course"
        );
        const errorMessageBlank = await screen.findByText("Required fields cannot be blank!");

        expect(errorMessageBlank).toBeInTheDocument();
        expect(errorMessageStudent).toBeInTheDocument();
        expect(errorMessageCourse).toBeInTheDocument();
    });

    it(`should only show error related to "location student" when we change start date`, async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            ({ entity }: { entity: "courseAccessPath" | "userAccessPath" }) => {
                return () => {
                    switch (entity) {
                        case "courseAccessPath":
                            return [{ course_id: "course_id", location_id: "location_id" }];
                        case "userAccessPath":
                            return [];
                    }
                };
            }
        );

        const wrapper = renderComponent(mockDefaultStudentCourse);

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        expect(checkBox).toHaveLength(1);

        const now = new Date();

        const startDate = screen.getAllByTestId("StudentCourseUpsertTable__startDate")[0];
        const endDate = screen.getAllByTestId("StudentCourseUpsertTable__endDate")[0];

        await selectFullDatePicker(wrapper, startDate, now);

        expect(startDate.querySelector("input")).toHaveValue(formatDate(now, "yyyy/LL/dd"));
        expect(endDate.querySelector("input")).toHaveValue(formatDate(now, "yyyy/LL/dd"));

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(saveButton).toBeInTheDocument();

        userEvent.click(saveButton);

        const errorMessageStudent = await screen.findByText(
            "Please add the student course location back to student to activate student course"
        );

        expect(errorMessageStudent).toBeInTheDocument();
    });
});
