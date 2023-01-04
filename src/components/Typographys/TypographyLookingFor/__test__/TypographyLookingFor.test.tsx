import TypographyLookingFor, { TypographyLookingForProps } from "../TypographyLookingFor";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<TypographyLookingFor />", () => {
    let wrapper: RenderResult;

    const props: TypographyLookingForProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(<TypographyLookingFor {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
