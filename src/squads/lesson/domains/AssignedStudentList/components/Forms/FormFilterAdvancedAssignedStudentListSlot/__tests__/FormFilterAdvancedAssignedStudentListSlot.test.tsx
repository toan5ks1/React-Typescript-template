import { Entities } from "src/common/constants/enum";
import { TestApp } from "src/squads/lesson/test-utils";
import { showPopover, submitFormFilter } from "src/squads/lesson/test-utils/filter";
import {
    mockLocationsAutocompleteList,
    mockCourseAutocompleteList,
    mockDefaultSearchKeyword,
    mockStudentAutocompleteList,
} from "src/squads/lesson/test-utils/lesson-management";

import FormFilterAdvancedAssignedStudentListSlot, {
    FormFilterAdvancedAssignedStudentListSlotProps,
} from "src/squads/lesson/domains/AssignedStudentList/components/Forms/FormFilterAdvancedAssignedStudentListSlot";

import { render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    FormFilterAdvancedAssignedStudentListSlotValues,
    formFilterAssignedStudentListSlotDefaultValues,
} from "src/squads/lesson/domains/AssignedStudentList/common/types";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const renderComponent = (
    formData: FormFilterAdvancedAssignedStudentListSlotValues,
    defaultKeyword?: string
) => {
    const props: FormFilterAdvancedAssignedStudentListSlotProps = {
        onApplySubmit: jest.fn(),
        onEnterSearchBar: jest.fn(),
        defaultKeyword: defaultKeyword || "",
    };

    (useAutocompleteReference as jest.Mock).mockImplementation(({ resource }) => {
        switch (resource) {
            case Entities.LOCATIONS:
                return {
                    options: mockLocationsAutocompleteList,
                    loading: false,
                    setInputVal: jest.fn(),
                };
            case Entities.STUDENTS:
                return {
                    options: mockStudentAutocompleteList,
                    loading: false,
                    setInputVal: jest.fn(),
                };
            case Entities.COURSES:
                return {
                    options: mockCourseAutocompleteList,
                    loading: false,
                    setInputVal: jest.fn(),
                };
        }
    });

    const wrapper: RenderResult = render(
        <TestApp>
            <TestHookFormProvider
                useFormOptions={{
                    defaultValues: formData,
                }}
            >
                <FormFilterAdvancedAssignedStudentListSlot {...props} />
            </TestHookFormProvider>
        </TestApp>
    );

    return { wrapper, props };
};

describe("<FormFilterAdvancedAssignedStudentListSlot /> render correctly", () => {
    it("should render correctly all field of form filter", () => {
        const { wrapper } = renderComponent(formFilterAssignedStudentListSlotDefaultValues);
        showPopover(wrapper);

        const filterFormContainer = screen.getByTestId(
            "FormFilterAdvancedAssignedStudentListSlot__root"
        );
        expect(filterFormContainer).toBeInTheDocument();

        const autocompleteAssignedStudentStatusElm = screen.getByTestId(
            "AutocompleteAssignedStudentStatusHF__autocomplete"
        );
        expect(autocompleteAssignedStudentStatusElm).toBeInTheDocument();

        const locationsAutoCompleteElm = screen.getByTestId(
            "AutocompleteLowestLevelLocationsHF__autocomplete"
        );
        expect(locationsAutoCompleteElm).toBeInTheDocument();

        const studentsAutoCompleteElm = screen.getByTestId("AutocompleteStudentsHF__autocomplete");
        expect(studentsAutoCompleteElm).toBeInTheDocument();

        const coursesAutoCompleteElm = screen.getByTestId("AutocompleteCoursesHF__autocomplete");
        expect(coursesAutoCompleteElm).toBeInTheDocument();
    });
});

describe("<FormFilterAdvancedAssignedStudentListSlot /> handle search correctly", () => {
    it("should call search function when enter input search", () => {
        const { props } = renderComponent(
            formFilterAssignedStudentListSlotDefaultValues,
            mockDefaultSearchKeyword
        );
        const searchELm = screen.getByTestId("FormFilterAdvanced__textField");
        const searchInput = within(searchELm).getByRole("textbox");
        userEvent.type(searchInput, "{enter}");

        expect(props.onEnterSearchBar).toBeCalledWith(mockDefaultSearchKeyword);
    });
});

describe("<FormFilterAdvancedAssignedStudentListSlot /> handle filter correctly", () => {
    it("should not call onApplySubmit after don't mutate any field in filter form", async () => {
        const { wrapper, props } = renderComponent(formFilterAssignedStudentListSlotDefaultValues);
        showPopover(wrapper);
        submitFormFilter();
        await waitFor(() => expect(props.onApplySubmit).not.toBeCalled());
    });
});
