import TypographyPageTitle, { TypographyPageTitleProps } from "../TypographyPageTitle";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<TypographyPageTitle/>", () => {
    let wrapper: RenderResult;

    const props: TypographyPageTitleProps = {
        title: "Test",
        "data-testid": "TypographyPageTitle__root",
    };

    beforeEach(() => {
        wrapper = render(<TypographyPageTitle {...props} />);
    });

    it("should exist data-testid", () => {
        expect(screen.getByTestId("TypographyPageTitle__root")).toBeInTheDocument();
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
