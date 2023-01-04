import ButtonEdit, { ButtonEditProps } from "../ButtonEdit";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<ButtonEdit />", () => {
    let wrapper: RenderResult;

    const props: ButtonEditProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(<ButtonEdit {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
