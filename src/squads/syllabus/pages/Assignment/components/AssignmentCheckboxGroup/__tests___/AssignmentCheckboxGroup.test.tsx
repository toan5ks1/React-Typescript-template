import AssignmentCheckboxGroup, { AssignmentCheckboxGroupProps } from "../AssignmentCheckboxGroup";

import { render } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

describe(AssignmentCheckboxGroup.name, () => {
    it("should render unchecked checkbox", () => {
        const defaultProps: AssignmentCheckboxGroupProps = {
            checkedSetting: false,
            keySetting: "require_video_submission",
        };

        const wrapper = render(
            <TestApp>
                <AssignmentCheckboxGroup {...defaultProps} />
            </TestApp>
        );

        expect(
            wrapper.container.querySelector("input[name='require_video_submission']")
        ).not.toBeChecked();
        expect(wrapper.getByText("Require Recorded Video Submission")).toBeInTheDocument();
    });

    it("should render checked checkbox", () => {
        const defaultProps: AssignmentCheckboxGroupProps = {
            checkedSetting: true,
            keySetting: "require_assignment_note",
        };

        const wrapper = render(
            <TestApp>
                <AssignmentCheckboxGroup {...defaultProps} />
            </TestApp>
        );

        expect(
            wrapper.container.querySelector("input[name='require_assignment_note']")
        ).toBeChecked();
        expect(wrapper.getByText("Require Text Note Submission")).toBeInTheDocument();
    });
});
