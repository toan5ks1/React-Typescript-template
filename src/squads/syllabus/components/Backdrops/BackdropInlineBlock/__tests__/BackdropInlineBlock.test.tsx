import BackdropInlineBlock, { BackdropInlineBlockProps } from "../BackdropInlineBlock";

import { render, RenderResult, screen } from "@testing-library/react";

describe(BackdropInlineBlock.name, () => {
    let wrapper: RenderResult;

    const props: BackdropInlineBlockProps = {
        overlayContent: <div>Test</div>,
        mode: "absolute",
        open: true,
    };

    beforeEach(() => {
        wrapper = render(<BackdropInlineBlock {...props} />);
    });

    it("should have overlayContent", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should have correct styles", () => {
        expect(wrapper.getByTestId(/__BackdropBase/)).toHaveStyle(
            `position:absolute;width:100%;height:100%`
        );
    });
});
