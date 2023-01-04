import WrapperLookingFor, { WrapperLookingForProps } from "../WrapperLookingFor";

import { RenderResult, render } from "@testing-library/react";

describe("<WrapperLookingFor /> component", () => {
    let wrapper: RenderResult;
    const props: WrapperLookingForProps = {
        variant: "empty-icon",
        content: "Schedule",
        helperText: "test",
        children: <div></div>,
    };
    beforeEach(() => {
        wrapper = render(<WrapperLookingFor {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render searching icon correctly", () => {
        expect(wrapper.getByTestId("LookingFor__icon")).toBeInTheDocument();
    });

    it("should have helperText", () => {
        expect(wrapper.getByText("test")).toHaveTextContent("test");
    });
});
