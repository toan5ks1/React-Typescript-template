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
        expect(screen.getByText("--")).toBeInTheDocument();
    });
});
