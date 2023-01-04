import TypographyPrimary, { TypographyPrimaryProps } from "../TypographyPrimary";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<TypographyPrimary />", () => {
    let wrapper: RenderResult;

    const props: TypographyPrimaryProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(<TypographyPrimary {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
