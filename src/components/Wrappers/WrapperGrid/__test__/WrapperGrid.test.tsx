import WrapperGrid from "../WrapperGrid";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<WrapperGrid />", () => {
    let wrapper: RenderResult;

    const props = {
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(<WrapperGrid {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
