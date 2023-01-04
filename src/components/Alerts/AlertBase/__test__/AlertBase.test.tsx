import AlertBase, { AlertBaseProps } from "../AlertBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<AlertBase />", () => {
    let wrapper: RenderResult;

    const props: AlertBaseProps = {
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(<AlertBase {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
