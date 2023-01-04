import { EurekaEntities } from "src/common/constants/enum";

import FormFilterAdvancedStudyPlan from "../FormFilterAdvancedStudyPlan";

import { fireEvent, render, waitFor } from "@testing-library/react";
import { withReactHookForm } from "src/squads/syllabus/test-utils/HOCs";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("src/squads/syllabus/hooks/useAutocompleteReference");

const defaultValues = { grades: [], books: [], archived: false };
const noop = () => {};

describe("<FormFilterAdvancedStudyPlan />", () => {
    it("should render correct control based on resource", () => {
        const CourseStudyPlanForm = withReactHookForm(
            FormFilterAdvancedStudyPlan,
            {
                resource: EurekaEntities.COURSE_STUDY_PLANS,
                onApplySubmit: noop,
                onEnterSearchBar: noop,
            },
            { defaultValues }
        );
        const masterWrapper = render(<CourseStudyPlanForm />, { wrapper: TestApp });

        fireEvent.click(masterWrapper.getByTestId("ButtonDropdownWithPopover__button"));
        expect(masterWrapper.getByRole("checkbox")).toBeInTheDocument();
        masterWrapper.unmount();

        const IndividualStudyPlanForm = withReactHookForm(
            FormFilterAdvancedStudyPlan,
            {
                resource: EurekaEntities.STUDENT_STUDY_PLANS,
                onApplySubmit: noop,
                onEnterSearchBar: noop,
            },
            { defaultValues }
        );
        const individualWrapper = render(<IndividualStudyPlanForm />, { wrapper: TestApp });

        fireEvent.click(individualWrapper.getByTestId("ButtonDropdownWithPopover__button"));
        expect(individualWrapper.queryByRole("checkbox")).toBeNull();
    });

    it("should call passed functions", async () => {
        const onApplySubmit = jest.fn();
        const onEnterSearchBar = jest.fn();
        const FormFilter = withReactHookForm(
            FormFilterAdvancedStudyPlan,
            { resource: EurekaEntities.COURSE_STUDY_PLANS, onApplySubmit, onEnterSearchBar },
            { defaultValues: { ...defaultValues, archived: true } }
        );
        const { getByTestId } = render(<FormFilter />, { wrapper: TestApp });
        const textField = getByTestId("FormFilterAdvanced__textField").querySelector("input")!;

        fireEvent.change(textField, { target: { value: "Test" } });
        fireEvent.keyPress(textField, { key: "Enter", code: 13, charCode: 13 });
        expect(onEnterSearchBar).toHaveBeenCalled();

        fireEvent.click(getByTestId("ButtonDropdownWithPopover__button"));
        fireEvent.click(getByTestId("ButtonDropdownWithPopover__buttonApply"));
        await waitFor(() => expect(onApplySubmit).toHaveBeenCalled());
    });
});
