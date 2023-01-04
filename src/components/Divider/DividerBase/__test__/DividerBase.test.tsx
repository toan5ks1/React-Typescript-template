import DividerBase from "../DividerBase";

import { render, RenderResult } from "@testing-library/react";

describe("<DividerBase />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<DividerBase />);
    });
    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
