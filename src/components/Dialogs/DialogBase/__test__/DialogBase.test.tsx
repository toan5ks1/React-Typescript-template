import DialogBase, { DialogBaseProps } from "../DialogBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<DialogBase />", () => {
    let wrapper: RenderResult;

    const props: DialogBaseProps = {
        open: true,
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(<DialogBase data-testid="DialogBase__Dialog" {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.getByTestId("DialogBase__Dialog")).toMatchSnapshot();
    });
});
