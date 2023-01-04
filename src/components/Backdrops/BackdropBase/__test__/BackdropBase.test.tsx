import BackdropBase, { BackdropBaseProps } from "../BackdropBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<BackdropBase />", () => {
    let wrapper: RenderResult;

    const props: BackdropBaseProps = {
        children: <div>Test</div>,
        open: true,
    };

    beforeEach(() => {
        wrapper = render(<BackdropBase {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
