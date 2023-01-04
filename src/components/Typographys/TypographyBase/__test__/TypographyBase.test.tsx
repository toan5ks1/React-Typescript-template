import TypographyBase, { TypographyBaseProps } from "../TypographyBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<TypographyBase />", () => {
    let wrapper: RenderResult;

    const props: TypographyBaseProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(<TypographyBase {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
