import TaskAssignmentDetailField, {
    TaskAssignmentDetailFieldProps,
} from "../TaskAssignmentDetailField";

import { render, RenderResult, screen } from "@testing-library/react";

describe(TaskAssignmentDetailField.name, () => {
    let wrapper: RenderResult;

    const props: TaskAssignmentDetailFieldProps = {
        label: "Name",
        value: "Test",
        dataTestId: "Test_Id",
    };

    beforeEach(() => {
        wrapper = render(<TaskAssignmentDetailField {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct label, value and data-testid", () => {
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Test")).toBeInTheDocument();
        expect(screen.getByTestId("Test_Id")).toBeInTheDocument();
    });
});
