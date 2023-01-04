import CircularProgressBase, { CircularProgressBaseProps } from "../CircularProgressBase";

import { render, RenderResult } from "@testing-library/react";

describe("<CircularProgressBase />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<CircularProgressBase />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});

describe("<CircularProgressBase />", () => {
    let wrapper: RenderResult;

    const props: CircularProgressBaseProps = {
        sizeVariant: "button",
    };

    beforeEach(() => {
        wrapper = render(<CircularProgressBase {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should have the height of 18px", () => {
        expect(wrapper.getByTestId("Loading__root")).toHaveStyle({
            height: "18px",
        });
    });
});
