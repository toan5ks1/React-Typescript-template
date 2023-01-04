import { Entities } from "src/common/constants/enum";
import { TestThemeProvider } from "src/squads/lesson/test-utils";
import {
    getAutocompleteInputByTestId,
    selectAutocompleteOptionByLabel,
} from "src/squads/lesson/test-utils/utils";

import FormFilterAdvancedStudentInfos, {
    FormFilterAdvancedStudentInfosProps,
} from "src/squads/lesson/pages/LessonManagement/components/Forms/FormFilterAdvancedStudentInfos";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, waitFor, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useClassManyWithNullableCourse from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyWithNullableCourse";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useClassManyWithNullableCourse", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const setupMocks = () => {
    (useAutocompleteReference as jest.Mock).mockImplementation(
        ({ resource }: { resource: string }) => {
            if (resource === Entities.COURSES) {
                return {
                    loading: false,
                    setInputVal: jest.fn(),
                    options: [{ course_id: "Course_Id", name: "Course Name", school_id: 123 }],
                };
            }

            return {
                loading: false,
                setInputVal: jest.fn(),
                options: [{ locationId: "Location_Id", name: "Location Name" }],
            };
        }
    );

    (useClassManyWithNullableCourse as jest.Mock).mockImplementation(() => {
        return {
            classes: [{ class_id: "Class_Id", name: "Class Name" }],
            isLoading: false,
        };
    });
};

const renderFormFilterAdvancedStudentInfos = (props: FormFilterAdvancedStudentInfosProps) => {
    setupMocks();

    render(
        <TestThemeProvider>
            <TranslationProvider>
                <TestHookFormProvider>
                    <FormFilterAdvancedStudentInfos {...props} />
                </TestHookFormProvider>
            </TranslationProvider>
        </TestThemeProvider>
    );
};

describe("FormFilterAdvancedStudentInfos", () => {
    const props: FormFilterAdvancedStudentInfosProps = {
        onApplySubmit: jest.fn(),
        onEnterSearchBar: jest.fn(),
    };

    it("should filter by text", () => {
        renderFormFilterAdvancedStudentInfos(props);

        const inputField = within(screen.getByTestId("FormFilterAdvanced__textField")).getByRole(
            "textbox"
        );
        const searchText = "Sample Search Text";

        userEvent.type(inputField, searchText);
        userEvent.keyboard("{enter}");

        expect(props.onEnterSearchBar).toBeCalledWith(searchText);
    });

    it("should filter by course, grade, location and class", async () => {
        renderFormFilterAdvancedStudentInfos(props);

        const dropdownButton = screen.getByTestId("ButtonDropdownWithPopover__button");
        userEvent.click(dropdownButton);
        expect(screen.getByTestId("ButtonDropdownWithPopover__popover")).toBeInTheDocument();

        const gradeAutocompleteInput = getAutocompleteInputByTestId(
            "AutocompleteGradesHF__autocomplete"
        );
        const courseAutocompleteInput = getAutocompleteInputByTestId(
            "AutocompleteCoursesHF__autocomplete"
        );
        const locationAutocompleteInput = getAutocompleteInputByTestId(
            "AutocompleteLowestLevelLocationsHF__autocomplete"
        );
        const classAutocompleteInput = getAutocompleteInputByTestId(
            "AutocompleteClassesOfManyCoursesHF__autocomplete"
        );

        userEvent.click(gradeAutocompleteInput);
        selectAutocompleteOptionByLabel("Grade 1");

        userEvent.click(courseAutocompleteInput);
        selectAutocompleteOptionByLabel("Course Name");

        userEvent.click(locationAutocompleteInput);
        selectAutocompleteOptionByLabel("Location Name");

        userEvent.click(classAutocompleteInput);
        selectAutocompleteOptionByLabel("Class Name");

        const applyButton = screen.getByTestId("ButtonDropdownWithPopover__buttonApply");
        userEvent.click(applyButton);

        await waitFor(() => {
            expect(props.onApplySubmit).toBeCalledWith({
                courses: [{ course_id: "Course_Id", name: "Course Name", school_id: 123 }],
                grades: [{ id: 1, name: "resources.choices.grades.1" }],
                locations: [{ locationId: "Location_Id", name: "Location Name" }],
                classes: [{ class_id: "Class_Id", name: "Class Name" }],
            });
        });
    });
});
