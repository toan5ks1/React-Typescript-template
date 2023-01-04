import { generateMockCourseMany } from "src/squads/lesson/test-utils/class-course";

import AutocompleteCoursesOfLocationHF, {
    AutocompleteCoursesOfLocationHFProps,
} from "src/squads/lesson/pages/LessonManagement/components/Autocompletes/AutocompleteCoursesOfLocationHF";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useCourseManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useCourseManyReference";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useCourseManyReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("AutocompleteCoursesOfLocationHF", () => {
    const mockCourses = generateMockCourseMany().map((data) => data.course);

    const props: AutocompleteCoursesOfLocationHFProps = {
        name: "course",
        location: {
            locationId: "location_id",
            name: "location name",
        },
        course: undefined,
    };

    it("should query course by course name", async () => {
        const mockQueryCourse = jest.fn();

        (useCourseManyReference as jest.Mock).mockImplementation(
            mockQueryCourse.mockImplementation(() => {
                return {
                    courses: mockCourses,
                    isLoading: false,
                };
            })
        );

        render(
            <TestHookFormProvider>
                <AutocompleteCoursesOfLocationHF {...props} />
            </TestHookFormProvider>
        );

        userEvent.type(screen.getByTestId("AutocompleteBase__input"), "test course name");

        await waitFor(() =>
            expect(mockQueryCourse).toBeCalledWith({
                courseName: "test course name",
                isEnabled: true,
                locationId: "location_id",
            })
        );
    });

    it("should select course options", () => {
        (useCourseManyReference as jest.Mock).mockImplementation(() => {
            return {
                courses: mockCourses,
                isLoading: false,
            };
        });

        render(
            <TestHookFormProvider>
                <AutocompleteCoursesOfLocationHF {...props} />
            </TestHookFormProvider>
        );

        const selectedCourseName = mockCourses[0].name;

        userEvent.click(screen.getByTestId("AutocompleteBase__input"));
        userEvent.click(screen.getByText(selectedCourseName));

        expect(screen.getByTestId("AutocompleteBase__input")).toHaveValue(selectedCourseName);
    });

    it("should have default form value", () => {
        (useCourseManyReference as jest.Mock).mockImplementation(() => {
            return {
                courses: mockCourses,
                isLoading: false,
            };
        });

        render(
            <TestHookFormProvider
                useFormOptions={{
                    defaultValues: { course: mockCourses[0] },
                }}
            >
                <AutocompleteCoursesOfLocationHF {...props} />
            </TestHookFormProvider>
        );

        expect(screen.getByTestId("AutocompleteBase__input")).toHaveValue(mockCourses[0].name);
    });
});
