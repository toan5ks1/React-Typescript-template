import PaperRoundedBorders, { PaperRoundedBordersProps } from "../PaperRoundedBorders";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<PaperRoundedBorders />", () => {
    let wrapper: RenderResult;

    const props: PaperRoundedBordersProps = {
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(<PaperRoundedBorders {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
