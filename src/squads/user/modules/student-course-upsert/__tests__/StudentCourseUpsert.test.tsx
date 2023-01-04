import {
    createMockStudentCourseUpsert,
    mockDraftCourses,
} from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import { StudentCourseUpsert } from "../StudentCourseUpsert";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useCourseClasses from "src/squads/user/modules/student-course-upsert/hooks/useCourseClasses";
import useCourseFieldArray, {
    UseCourseFieldArrayReturn,
} from "src/squads/user/modules/student-course-upsert/hooks/useCourseFieldArray";
import useCourseFormValidation, {
    UseCourseFormValidationReturn,
} from "src/squads/user/modules/student-course-upsert/hooks/useCourseFormValidation";
import useCourseLocations from "src/squads/user/modules/student-course-upsert/hooks/useCourseLocations";
import useFetchCourseAutocomplete, {
    useFetchCourseAutocompleteReturns,
} from "src/squads/user/modules/student-course-upsert/hooks/useFetchCourseAutocomplete";

const mockCourse = createMockStudentCourseUpsert();

jest.mock("src/squads/user/hooks/useUserFeatureFlag");

jest.mock("src/squads/user/modules/student-course-upsert/hooks/useCourseFieldArray", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/modules/student-course-upsert/hooks/useCourseFormValidation", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/modules/student-course-upsert/hooks/useFetchCourseAutocomplete", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    const { mockErrorStudentCoursePackage } = jest.requireActual(
        "src/squads/user/test-utils/mocks/student-course-package"
    );

    return {
        __esModule: true,
        ...originalModule,
        useFormState: () => ({ errors: mockErrorStudentCoursePackage }),
    };
});

jest.mock("src/squads/user/modules/student-course-upsert/hooks/useCourseLocations", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/student-course-upsert/hooks/useCourseClasses", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderComponent = () => {
    return render(
        <TestCommonAppProvider>
            <MuiPickersUtilsProvider>
                <TestHookFormProvider>
                    <StudentCourseUpsert />
                </TestHookFormProvider>
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

describe("<StudentCourseUpsert />", () => {
    const onAdd = jest.fn();
    const onDelete = jest.fn();
    const mockCourseFieldArrayReturn: UseCourseFieldArrayReturn = {
        onAdd,
        onDelete,
        courses: [mockCourse, mockDraftCourses],
        append: jest.fn(),
        remove: jest.fn(),
        update: jest.fn(),
    };

    beforeEach(() => {
        (useCourseFieldArray as jest.Mock).mockImplementation(() => {
            return mockCourseFieldArrayReturn;
        });
        (useCourseFormValidation as jest.Mock<UseCourseFormValidationReturn>).mockReturnValue({
            validate: {
                required: {
                    value: true,
                    message: "",
                },
                course: jest.fn(),
                validateStudentCourseLocationEndDate: jest.fn(),
            },
            validateCourse: jest.fn(),
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
    });

    it("should render correct UI with data", () => {
        renderComponent();

        const rows = screen.getAllByTestId("TableBase__row");
        const buttonDel = screen.getByTestId("StudentCourseUpsert__deleteAction");

        expect(rows.length).toEqual(2);
        expect(screen.getByTestId("StudentCourseUpsert__deleteAction")).toBeInTheDocument();
        expect(screen.getByTestId("StudentCourseUpsert__addButton")).toBeInTheDocument();
        expect(screen.getByTestId("TableBase__header")).toBeInTheDocument();
        expect(buttonDel).toBeDisabled();
    });

    it("should render correct UI without data", () => {
        (useCourseFieldArray as jest.Mock).mockImplementation(() => {
            return { ...mockCourseFieldArrayReturn, courses: [] };
        });
        renderComponent();

        expect(screen.getByText("ra.message.noDataInformation")).toBeInTheDocument();
        expect(screen.getByTestId("StudentCourseUpsert__deleteAction")).toBeInTheDocument();
        expect(screen.getByTestId("StudentCourseUpsert__addButton")).toBeInTheDocument();
        expect(screen.getByTestId("TableBase__header")).toBeInTheDocument();
        const buttonDel = screen.getByTestId("StudentCourseUpsert__deleteAction");
        expect(buttonDel).toBeDisabled();
    });

    it("should be call fn onAdd", () => {
        renderComponent();

        const buttonAdd = screen.getByTestId("StudentCourseUpsert__addButton");

        userEvent.click(buttonAdd);

        expect(onAdd).toBeCalledTimes(1);
    });

    it("should be call fn onDelete", () => {
        renderComponent();

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        const buttonDel = screen.getByTestId("StudentCourseUpsert__deleteAction");

        userEvent.click(checkBox[1]);

        userEvent.click(buttonDel);

        expect(onDelete).toBeCalledWith([mockDraftCourses]);
    });

    it("should render correct errors", () => {
        renderComponent();

        const errorMessageStudent = screen.getByText(
            "Please add the student course location back to student to activate student course"
        );
        const errorMessageCourse = screen.getByText(
            "Please add the student course location back to course to activate student course"
        );
        const errorMessageBlank = screen.getByText("Required fields cannot be blank!");

        expect(errorMessageStudent).toBeInTheDocument();
        expect(errorMessageCourse).toBeInTheDocument();
        expect(errorMessageBlank).toBeInTheDocument();
    });
});
