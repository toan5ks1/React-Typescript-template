import { formatDate } from "src/common/utils/time";
import studentService from "src/squads/user/service/define-service/student-service";
import { inferMutation } from "src/squads/user/service/infer-service";
import { UseMutationOptions } from "src/squads/user/service/service-creator";
import { createMockListStudentCourse } from "src/squads/user/test-utils/mocks/student";
import { mockDefaultStudentCourse } from "src/squads/user/test-utils/mocks/student-course-package";
import { TestQueryWrapper, TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import { StudentCourse } from "../StudentCourse";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFetchCourseAutocomplete, {
    useFetchCourseAutocompleteReturns,
} from "src/squads/user/modules/student-course-upsert/hooks/useFetchCourseAutocomplete";
import useQueryStudentCourse, {
    UseQueryStudentCourseReturn,
} from "src/squads/user/modules/student-course/hooks/useQueryStudentCourse";

const mockQueryStudentCourses = createMockListStudentCourse(10);

jest.mock("src/squads/user/hooks/useUserFeatureFlag");
jest.mock("src/squads/user/modules/student-course/hooks/useQueryStudentCourse", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/modules/student-course-upsert/hooks/useFetchCourseAutocomplete", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferMutation: jest.fn(),
    inferStandaloneQuery: jest.fn(),
}));

const renderComponent = () => {
    return render(
        <TestCommonAppProvider>
            <MuiPickersUtilsProvider>
                <TestQueryWrapper>
                    <StudentCourse id="01" />
                </TestQueryWrapper>
            </MuiPickersUtilsProvider>
        </TestCommonAppProvider>
    );
};

const refetch = jest.fn();

describe("<StudentCourse />", () => {
    beforeEach(() => {
        (useQueryStudentCourse as jest.Mock<UseQueryStudentCourseReturn>).mockReturnValue({
            courses: mockQueryStudentCourses,
            loaded: true,
            refetch,
        });

        (
            useFetchCourseAutocomplete as jest.Mock<useFetchCourseAutocompleteReturns>
        ).mockReturnValue({
            options: [],
            setInputValDebounced: jest.fn(),
        });
    });

    it("should match snapshot", () => {
        const { container } = renderComponent();
        //TODO: Need to update toMatchSnapshot when we clone component TableBaseFooter in Phase-2
        expect(container).toMatchSnapshot();
        expect(screen.getByTestId("StudentCourse")).toBeInTheDocument();
    });

    it("should render correct UI if have no data", () => {
        (useQueryStudentCourse as jest.Mock<UseQueryStudentCourseReturn>).mockReturnValue({
            courses: [],
            loaded: true,
            refetch,
        });
        renderComponent();

        expect(screen.getByTestId("NoData__message")).toBeInTheDocument();
        expect(screen.getByTestId("StudentCourseNavbar__btnEdit")).toBeInTheDocument();
        expect(screen.getByTestId("StudentCourseTable")).toBeInTheDocument();
    });

    it("should open popup edit course ", () => {
        (useQueryStudentCourse as jest.Mock<UseQueryStudentCourseReturn>).mockReturnValue({
            courses: [],
            loaded: true,
            refetch,
        });
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
        renderComponent();

        const buttonEdit = screen.getByTestId("StudentCourseNavbar__btnEdit");

        userEvent.click(buttonEdit);

        expect(screen.getByTestId("DialogWithHeaderFooter_wrapper")).toBeInTheDocument();
    });

    it("should render correct course list length", () => {
        renderComponent();

        expect(screen.getAllByTestId("TableBase__row")).toHaveLength(
            mockQueryStudentCourses.length
        );
    });

    it("should render correct course data", () => {
        renderComponent();

        const names = screen.getAllByTestId("StudentCourseTable__name");
        const classes = screen.getAllByTestId("StudentCourseTable__class");
        const startDates = screen.getAllByTestId("StudentCourseTable__startDate");
        const endDates = screen.getAllByTestId("StudentCourseTable__endDate");
        mockQueryStudentCourses.forEach((course, index) => {
            expect(names[index]).toHaveTextContent(course.course.name);
            expect(classes[index]).toHaveTextContent(course.class?.name || "--");
            expect(startDates[index]).toHaveTextContent(formatDate(course.start, "yyyy/LL/dd"));
            expect(endDates[index]).toHaveTextContent(formatDate(course.end, "yyyy/LL/dd"));
        });
    });

    it("should close popup and refetch after save", async () => {
        (useQueryStudentCourse as jest.Mock<UseQueryStudentCourseReturn>).mockReturnValue({
            courses: mockDefaultStudentCourse,
            loaded: true,
            refetch,
        });
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
        renderComponent();

        const buttonEdit = screen.getByTestId("StudentCourseNavbar__btnEdit");
        userEvent.click(buttonEdit);
        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        expect(saveButton).toBeInTheDocument();
        userEvent.click(saveButton);
        await waitFor(() => expect(refetch).toBeCalledTimes(1));
        expect(screen.queryByTestId("DialogWithHeaderFooter_wrapper")).not.toBeInTheDocument();
    });
});
