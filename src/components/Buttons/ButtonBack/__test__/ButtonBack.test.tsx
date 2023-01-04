import ButtonBack from "../ButtonBack";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<ButtonBack />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<ButtonBack />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should have text back", () => {
        expect(screen.getByText("ra.common.back")).toBeInTheDocument();
    });
});
