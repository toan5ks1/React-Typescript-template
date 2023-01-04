import { Grade } from "src/squads/user/models/grade";
import { CoursesManyQuery } from "src/squads/user/service/bob/bob-types";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import FormFilterAdvancedStudent, {
    FormFilterAdvancedStudentProps,
} from "../FormFilterAdvancedStudent";

import { fireEvent, render, RenderResult, waitFor } from "@testing-library/react";

jest.mock("src/hooks/useFormFilterAdvanced", () => {
    return () => ({
        filterApplied: [],
        onDelete: jest.fn(),
        onApply: jest.fn(),
        onReset: jest.fn(),
        onClosePopover: jest.fn(),
    });
});

jest.mock("src/hooks/useAutocompleteReference");

describe("<FormFilterAdvancedStudent />", () => {
    let wrapper: RenderResult;

    const props: FormFilterAdvancedStudentProps = {
        defaultFilters: {
            grades: [
                {
                    id: 1,
                    name: "Grade 1",
                },
            ] as Grade[],
            courses: [] as CoursesManyQuery["courses"],
            isNotLogged: true,
        },
        onEnterSearchBar: jest.fn(),
        onApplySubmit: jest.fn(),
    };

    beforeEach(async () => {
        wrapper = render(
            <TestCommonAppProvider>
                <MuiPickersUtilsProvider>
                    <FormFilterAdvancedStudent {...props} />
                </MuiPickersUtilsProvider>
            </TestCommonAppProvider>
        );

        await waitFor(() => {
            expect(wrapper.getByTestId("FormFilterAdvanced__root")).toBeInTheDocument();
        });
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render Checkbox never logged in", async () => {
        fireEvent.click(wrapper.getByTestId("ButtonDropdownWithPopover__button"));

        await waitFor(() => {
            const gradesAutocomplete = wrapper.getByTestId("GradesAutocompleteHF__autocomplete");
            const gradeChip = gradesAutocomplete.querySelector('[data-testid="ChipAutocomplete"]');
            expect(gradeChip).toHaveTextContent("Grade 1");
        });
        expect(wrapper.getByTestId("CheckboxLabelHF_isNotLogged")).toBeInTheDocument();
        expect(wrapper.getByTestId("CheckboxLabelHF_isNotLogged").firstChild).toHaveClass(
            "Mui-checked"
        );
    });
});
