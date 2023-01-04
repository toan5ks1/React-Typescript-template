import { StudyPlanStatusKey } from "../../../common/constants";
import Action, { ActionProps } from "../Action";

import { fireEvent, render } from "@testing-library/react";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

const defaultProps: ActionProps = {
    isEditing: false,
    studyPlanStatus: StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE,
    shouldShowArchived: true,
    onCancel: jest.fn(),
    onDisplayChange: jest.fn(),
    onEdit: jest.fn(),
    onSave: jest.fn(),
};

describe(Action.name, () => {
    it("should render controls correctly based on study plan status", () => {
        let wrapper = render(
            <TestThemeProvider>
                <Action {...defaultProps} />
            </TestThemeProvider>
        );

        expect(wrapper.getByRole("checkbox")).toBeEnabled();
        expect(wrapper.getByLabelText("ra.common.action.edit")).toBeEnabled();

        wrapper.unmount();
        wrapper = render(
            <Action
                {...defaultProps}
                studyPlanStatus={StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED}
            />
        );

        expect(wrapper.getByRole("checkbox")).toBeDisabled();
        expect(wrapper.getByLabelText("ra.common.action.edit")).toBeDisabled();
    });

    it("should render controls correctly based on isEditing state", () => {
        let wrapper = render(<Action {...defaultProps} />);

        expect(wrapper.getByRole("checkbox")).toBeInTheDocument();
        expect(wrapper.getByLabelText("ra.common.action.edit")).toBeInTheDocument();

        wrapper.unmount();
        wrapper = render(
            <TestThemeProvider>
                <Action {...defaultProps} isEditing={true} />
            </TestThemeProvider>
        );

        expect(wrapper.getAllByRole("button")).toHaveLength(2);
    });

    it("should call passed callbacks", () => {
        let wrapper = render(
            <TestThemeProvider>
                <Action {...defaultProps} />
            </TestThemeProvider>
        );

        fireEvent.click(wrapper.getByRole("checkbox"));
        expect(defaultProps.onDisplayChange).toHaveBeenCalled();

        fireEvent.click(wrapper.getByLabelText("ra.common.action.edit"));
        expect(defaultProps.onEdit).toHaveBeenCalled();

        wrapper.unmount();
        wrapper = render(
            <TestThemeProvider>
                <Action {...defaultProps} isEditing={true} />
            </TestThemeProvider>
        );

        fireEvent.click(wrapper.getByLabelText("ra.common.action.save"));
        expect(defaultProps.onSave).toHaveBeenCalled();

        fireEvent.click(wrapper.getByLabelText("ra.common.action.cancel"));
        expect(defaultProps.onCancel).toHaveBeenCalled();
    });
});
