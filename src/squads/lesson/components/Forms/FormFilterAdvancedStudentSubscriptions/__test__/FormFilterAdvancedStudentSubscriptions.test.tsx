import { TestApp } from "src/squads/lesson/test-utils";
import { mockCourseOptionsAutoCompleteReference } from "src/squads/lesson/test-utils/lesson-management";

import FormFilterAdvancedStudentSubscriptions, {
    FormFilterAdvancedStudentSubscriptionsProps,
} from "src/squads/lesson/components/Forms/FormFilterAdvancedStudentSubscriptions";

import { render, waitFor, screen, within, RenderResult, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => jest.fn());

const mockUseAutocompleteReference = () => {
    (useAutocompleteReference as jest.Mock).mockReset().mockImplementation(() => {
        return {
            loading: false,
            setInputVal: jest.fn(),
            options: mockCourseOptionsAutoCompleteReference,
            defaultValue: [],
        };
    });
};

const renderFormFilterAdvancedStudentInfoWrapper = (
    props: FormFilterAdvancedStudentSubscriptionsProps
) => {
    return render(
        <TestApp>
            <TestHookFormProvider>
                <FormFilterAdvancedStudentSubscriptions {...props} />
            </TestHookFormProvider>
        </TestApp>
    );
};

describe("<FormFilterAdvancedStudentSubscriptions />", () => {
    beforeEach(() => {
        mockUseAutocompleteReference();
    });

    const props: FormFilterAdvancedStudentSubscriptionsProps = {
        onApplySubmit: jest.fn(),
        onEnterSearchBar: jest.fn(),
    };

    const openDropdownContent = (wrapper: RenderResult) => {
        const dropdownButton = wrapper.getByTestId("ButtonDropdownWithPopover__button");
        userEvent.click(dropdownButton);
        expect(screen.getByTestId("ButtonDropdownWithPopover__popover")).toBeVisible();
    };

    it("should filter by text", async () => {
        const wrapper = renderFormFilterAdvancedStudentInfoWrapper(props);

        const inputField = wrapper
            .getByTestId("FormFilterAdvanced__textField")
            .querySelector("input")!;
        const searchText = "Sample Search Text";

        userEvent.type(inputField, searchText);
        userEvent.keyboard("{enter}");

        await waitFor(() => {
            expect(props.onEnterSearchBar).toBeCalledWith(searchText);
        });
    });

    it("should filter by grades", async () => {
        const wrapper = renderFormFilterAdvancedStudentInfoWrapper(props);

        openDropdownContent(wrapper);

        const gradeAutocomplete = screen.getByTestId("AutocompleteGradesHF__autocomplete");
        const autocompleteInput = within(gradeAutocomplete).getByTestId("AutocompleteBase__input");
        userEvent.click(autocompleteInput);
        userEvent.keyboard("{arrowdown}");
        userEvent.keyboard("{enter}");

        const applyButton = screen.getByTestId("ButtonDropdownWithPopover__buttonApply");
        fireEvent.click(applyButton);
        const submitData = {
            courses: [],
            grades: [{ id: 1, name: "resources.choices.grades.1" }],
        };
        await waitFor(() => {
            expect(props.onApplySubmit).toBeCalledWith(submitData);
        });
    });

    it("should filter by courses", async () => {
        const wrapper = renderFormFilterAdvancedStudentInfoWrapper(props);

        openDropdownContent(wrapper);

        const courseAutocomplete = screen.getByTestId("AutocompleteCoursesHF__autocomplete");
        const autocompleteInput = within(courseAutocomplete).getByTestId("AutocompleteBase__input");
        userEvent.click(autocompleteInput);
        userEvent.keyboard("{arrowdown}");
        userEvent.keyboard("{enter}");

        const applyButton = screen.getByTestId("ButtonDropdownWithPopover__buttonApply");
        fireEvent.click(applyButton);

        await waitFor(() => {
            expect(props.onApplySubmit).toBeCalledWith({
                courses: mockCourseOptionsAutoCompleteReference,
                grades: [],
            });
        });
    });
});
