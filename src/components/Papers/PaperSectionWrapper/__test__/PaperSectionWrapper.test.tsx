import PaperSectionWrapper, { PaperSectionWrapperProps } from "../PaperSectionWrapper";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<PaperSectionWrapper />", () => {
    let wrapper: RenderResult;

    const props: PaperSectionWrapperProps = {
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(<PaperSectionWrapper {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
