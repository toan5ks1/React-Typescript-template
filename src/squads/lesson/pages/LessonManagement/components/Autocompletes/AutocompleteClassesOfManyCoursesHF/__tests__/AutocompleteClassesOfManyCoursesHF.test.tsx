import {
    generateCourseManyQuery,
    generateMockClassMany,
} from "src/squads/lesson/test-utils/class-course";

import AutocompleteClassesOfManyCoursesHF, {
    AutocompleteClassesOfManyCoursesHFProps,
} from "src/squads/lesson/pages/LessonManagement/components/Autocompletes/AutocompleteClassesOfManyCoursesHF";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useClassManyWithNullableCourse from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyWithNullableCourse";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useClassManyWithNullableCourse", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("AutocompleteClassesOfManyCoursesHF", () => {
    const mockQueryClass = jest.fn();

    const mockClasses = generateMockClassMany();

    beforeEach(() => {
        (useClassManyWithNullableCourse as jest.Mock).mockImplementation(
            mockQueryClass.mockImplementation(() => {
                return {
                    classes: mockClasses,
                    isLoading: false,
                };
            })
        );
    });

    const props: AutocompleteClassesOfManyCoursesHFProps = {
        name: "classData",
        courses: [],
    };

    it("should query class by class name", async () => {
        render(
            <TestHookFormProvider>
                <AutocompleteClassesOfManyCoursesHF {...props} />
            </TestHookFormProvider>
        );

        userEvent.type(screen.getByTestId("AutocompleteBase__input"), "test class name");

        await waitFor(() =>
            expect(mockQueryClass).toBeCalledWith({
                className: "test class name",
                courseIds: undefined,
            })
        );
    });

    it("should query class by class name and courses", async () => {
        const courses = generateCourseManyQuery(2);

        render(
            <TestHookFormProvider>
                <AutocompleteClassesOfManyCoursesHF {...props} courses={courses} />
            </TestHookFormProvider>
        );

        userEvent.type(screen.getByTestId("AutocompleteBase__input"), "test class name");

        await waitFor(() =>
            expect(mockQueryClass).toBeCalledWith({
                className: "test class name",
                courseIds: courses.map((course) => course.course_id),
            })
        );
    });

    it("should select class options", () => {
        render(
            <TestHookFormProvider>
                <AutocompleteClassesOfManyCoursesHF {...props} />
            </TestHookFormProvider>
        );

        const selectedClassName = mockClasses[0].name;

        userEvent.click(screen.getByTestId("AutocompleteBase__input"));
        userEvent.click(screen.getByText(selectedClassName));

        expect(screen.getByTestId("AutocompleteBase__input")).toHaveValue(selectedClassName);
    });

    it("should have default form value", () => {
        const defaultValue = mockClasses[0];

        render(
            <TestHookFormProvider
                useFormOptions={{
                    defaultValues: { classData: defaultValue },
                }}
            >
                <AutocompleteClassesOfManyCoursesHF {...props} />
            </TestHookFormProvider>
        );

        expect(screen.getByTestId("AutocompleteBase__input")).toHaveValue(defaultValue.name);
    });
});
