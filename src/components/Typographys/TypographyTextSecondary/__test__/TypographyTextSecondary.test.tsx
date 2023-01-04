import TypographyTextSecondary, { TypographyTextSecondaryProps } from "../TypographyTextSecondary";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<TypographyTextSecondary />", () => {
    let wrapper: RenderResult;

    const props: TypographyTextSecondaryProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(<TypographyTextSecondary {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
