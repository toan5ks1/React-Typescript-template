import ButtonPrimaryContained, { ButtonPrimaryContainedProps } from "../ButtonPrimaryContained";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<ButtonPrimaryContained />", () => {
    let wrapper: RenderResult;

    const props: ButtonPrimaryContainedProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(<ButtonPrimaryContained {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
