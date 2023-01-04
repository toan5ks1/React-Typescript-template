import { Entities } from "src/common/constants/enum";
import { TestApp } from "src/squads/lesson/test-utils";
import { selectDatePicker } from "src/squads/lesson/test-utils/date-time-picker-helper";
import { showPopover, submitFormFilter } from "src/squads/lesson/test-utils/filter";
import {
    mockLocationsAutocompleteList,
    mockCourseAutocompleteList,
    mockDefaultSearchKeyword,
    mockStudentAutocompleteList,
} from "src/squads/lesson/test-utils/lesson-management";

import FormFilterAdvancedAssignedStudentListRecurring, {
    FormFilterAdvancedAssignedStudentListRecurringProps,
} from "src/squads/lesson/domains/AssignedStudentList/components/Forms/FormFilterAdvancedAssignedStudentListRecurring";

import { render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    FormFilterAdvancedAssignedStudentListRecurringValues,
    formFilterAssignedStudentListRecurringDefaultValues,
} from "src/squads/lesson/domains/AssignedStudentList/common/types";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/hooks/useDataProvider", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const renderComponent = (
    formData: FormFilterAdvancedAssignedStudentListRecurringValues,
    defaultKeyword?: string
) => {
    const props: FormFilterAdvancedAssignedStudentListRecurringProps = {
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
                <FormFilterAdvancedAssignedStudentListRecurring {...props} />
            </TestHookFormProvider>
        </TestApp>
    );

    return { wrapper, props };
};

describe("<FormFilterAdvancedAssignedStudentListRecurring /> render correctly", () => {
    it("should render correctly all field of form filter", () => {
        const { wrapper } = renderComponent(formFilterAssignedStudentListRecurringDefaultValues);
        showPopover(wrapper);

        const filterFormContainer = screen.getByTestId(
            "FormFilterAdvancedAssignedStudentListRecurring__root"
        );
        expect(filterFormContainer).toBeInTheDocument();

        const fromDateElm = screen.getByTestId(
            "FormFilterAdvancedAssignedStudentListRecurring__fromDate"
        );
        expect(fromDateElm).toBeInTheDocument();

        const toDateElm = screen.getByTestId(
            "FormFilterAdvancedAssignedStudentListRecurring__toDate"
        );
        expect(toDateElm).toBeInTheDocument();

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

describe("<FormFilterAdvancedAssignedStudentListRecurring /> handle search correctly", () => {
    it("should call search function when enter input search", () => {
        const { props } = renderComponent(
            formFilterAssignedStudentListRecurringDefaultValues,
            mockDefaultSearchKeyword
        );
        const searchELm = screen.getByTestId("FormFilterAdvanced__textField");
        const searchInput = within(searchELm).getByRole("textbox");
        userEvent.type(searchInput, "{enter}");

        expect(props.onEnterSearchBar).toBeCalledWith(mockDefaultSearchKeyword);
    });
});

describe("<FormFilterAdvancedAssignedStudentListRecurring /> handle filter correctly", () => {
    it("should not call onApplySubmit after don't mutate any field in filter form", async () => {
        const { wrapper, props } = renderComponent(
            formFilterAssignedStudentListRecurringDefaultValues
        );
        showPopover(wrapper);
        submitFormFilter();
        await waitFor(() => expect(props.onApplySubmit).not.toBeCalled());
    });

    it("should allow to submit when select fromDate and not toDate", async () => {
        const { wrapper, props } = renderComponent(
            formFilterAssignedStudentListRecurringDefaultValues
        );
        showPopover(wrapper);
        await selectDatePicker(
            wrapper,
            "FormFilterAdvancedAssignedStudentListRecurring__fromDate",
            20
        );
        submitFormFilter();
        await waitFor(() => expect(props.onApplySubmit).toBeCalled());
    });

    it("should allow to submit when select toDate and not fromDate", async () => {
        const { wrapper, props } = renderComponent(
            formFilterAssignedStudentListRecurringDefaultValues
        );
        showPopover(wrapper);
        await selectDatePicker(
            wrapper,
            "FormFilterAdvancedAssignedStudentListRecurring__toDate",
            20
        );
        submitFormFilter();
        await waitFor(() => expect(props.onApplySubmit).toBeCalled());
    });
});
