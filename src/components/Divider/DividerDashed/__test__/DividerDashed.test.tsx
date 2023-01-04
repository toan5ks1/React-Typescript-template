import DividerDashed from "../DividerDashed";

import { render, RenderResult } from "@testing-library/react";

describe("<DividerDashed />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<DividerDashed />);
    });
    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
