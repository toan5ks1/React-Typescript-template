import IconButtonWithAnchorMenu from "../IconButtonWithAnchorMenu";

import { render, RenderResult } from "@testing-library/react";

describe("IconButtonWithAnchorMenu component", () => {
    let wrapper: RenderResult;
    beforeEach(() => {
        wrapper = render(<IconButtonWithAnchorMenu />);
    });

    it("should match screenshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
