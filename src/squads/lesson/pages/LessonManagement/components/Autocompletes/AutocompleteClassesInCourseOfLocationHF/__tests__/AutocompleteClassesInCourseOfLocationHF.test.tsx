import { generateMockClassMany } from "src/squads/lesson/test-utils/class-course";

import AutocompleteClassesInCourseOfLocationHF, {
    AutocompleteClassesInCourseOfLocationHFProps,
} from "src/squads/lesson/pages/LessonManagement/components/Autocompletes/AutocompleteClassesInCourseOfLocationHF";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useClassManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyReference";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useClassManyReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("AutocompleteClassesInCourseOfLocationHF", () => {
    const mockQueryClass = jest.fn();

    const mockClasses = generateMockClassMany();

    beforeEach(() => {
        (useClassManyReference as jest.Mock).mockImplementation(
            mockQueryClass.mockImplementation(() => {
                return {
                    classes: mockClasses,
                    isLoading: false,
                };
            })
        );
    });

    const props: AutocompleteClassesInCourseOfLocationHFProps = {
        name: "classData",
        location: {
            locationId: "location_id",
            name: "location name",
        },
        course: {
            course_id: "course_id",
            name: "course name",
        },
        classData: undefined,
    };

    it("should query class by class name", async () => {
        render(
            <TestHookFormProvider>
                <AutocompleteClassesInCourseOfLocationHF {...props} />
            </TestHookFormProvider>
        );

        userEvent.type(screen.getByTestId("AutocompleteBase__input"), "test class name");

        await waitFor(() =>
            expect(mockQueryClass).toBeCalledWith({
                className: "test class name",
                isEnabled: true,
                locationId: "location_id",
                courseId: "course_id",
            })
        );
    });

    it("should select class options", () => {
        render(
            <TestHookFormProvider>
                <AutocompleteClassesInCourseOfLocationHF {...props} />
            </TestHookFormProvider>
        );

        const selectedClassName = mockClasses[0].name;

        userEvent.click(screen.getByTestId("AutocompleteBase__input"));
        userEvent.click(screen.getByText(selectedClassName));

        expect(screen.getByTestId("AutocompleteBase__input")).toHaveValue(selectedClassName);
    });

    it("should have default form value", () => {
        render(
            <TestHookFormProvider
                useFormOptions={{
                    defaultValues: { classData: mockClasses[0] },
                }}
            >
                <AutocompleteClassesInCourseOfLocationHF {...props} />
            </TestHookFormProvider>
        );

        expect(screen.getByTestId("AutocompleteBase__input")).toHaveValue(mockClasses[0].name);
    });
});
