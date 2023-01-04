import ButtonPrimaryOutlined, { ButtonPrimaryOutlinedProps } from "../ButtonPrimaryOutlined";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<ButtonPrimaryOutlined />", () => {
    let wrapper: RenderResult;

    const props: ButtonPrimaryOutlinedProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(<ButtonPrimaryOutlined {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
