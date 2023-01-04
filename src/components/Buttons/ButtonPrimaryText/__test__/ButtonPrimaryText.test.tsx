import ButtonPrimaryText, { ButtonPrimaryTextProps } from "../ButtonPrimaryText";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<ButtonPrimaryText />", () => {
    let wrapper: RenderResult;

    const props: ButtonPrimaryTextProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(<ButtonPrimaryText {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
