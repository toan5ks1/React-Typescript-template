import ButtonCreate, { ButtonCreateProps } from "../ButtonCreate";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<ButtonCreate />", () => {
    let wrapper: RenderResult;

    const props: ButtonCreateProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(<ButtonCreate {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
