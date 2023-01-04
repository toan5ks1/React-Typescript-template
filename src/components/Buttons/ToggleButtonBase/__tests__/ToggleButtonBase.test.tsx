import ToggleButtonBase, { ToggleButtonBaseProps } from "../ToggleButtonBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<ToggleButtonBase />", () => {
    let wrapper: RenderResult;

    const props: ToggleButtonBaseProps = {
        value: "test",
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(<ToggleButtonBase {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
