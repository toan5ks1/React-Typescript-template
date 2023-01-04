import ChipBase, { ChipBaseProps } from "../ChipBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<ChipBase />", () => {
    let wrapper: RenderResult;

    const props: ChipBaseProps = {
        label: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(<ChipBase {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
