import PaperBase, { PaperBaseProps } from "../PaperBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<PaperBase />", () => {
    let wrapper: RenderResult;

    const props: PaperBaseProps = {
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(<PaperBase {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
