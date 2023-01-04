import TextFieldBase from "../TextFieldBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<TextFieldBase />", () => {
    let wrapper: RenderResult;

    const props = {
        label: "Name",
        value: "Test",
    };

    beforeEach(() => {
        wrapper = render(<TextFieldBase {...props} />);
    });

    it("should exist label", () => {
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });

    it("should exist value", () => {
        expect(screen.getByDisplayValue("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
