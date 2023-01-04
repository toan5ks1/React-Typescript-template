import DoubleDash from "../DoubleDash";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<DoubleDash />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<DoubleDash />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should have double dash", () => {
        const doubleDash = screen.getByText("--");
        expect(doubleDash).toBeInTheDocument();
        expect(doubleDash).toHaveStyle("color:rgba(0, 0, 0, 0.6)");
    });

    it("should be <span> tag", () => {
        const doubleDash = screen.getByText("--");
        expect(doubleDash.tagName).toBe("SPAN");
    });
});
