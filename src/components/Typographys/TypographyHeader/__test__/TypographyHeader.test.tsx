import TypographyHeader, { TypographyHeaderProps } from "../TypographyHeader";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<TypographyHeader />", () => {
    let wrapper: RenderResult;

    const props: TypographyHeaderProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(<TypographyHeader {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
