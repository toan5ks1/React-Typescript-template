import DrawerBase, { DrawerBaseProps } from "../DrawerBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<DrawerBase />", () => {
    let wrapper: RenderResult;

    const props: DrawerBaseProps = {
        open: true,
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(<DrawerBase data-testid="DrawerBase__container" {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.getByTestId("DrawerBase__container")).toMatchSnapshot();
    });
});
