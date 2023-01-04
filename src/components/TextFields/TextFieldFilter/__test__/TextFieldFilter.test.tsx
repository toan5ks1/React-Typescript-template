import TextFieldFilter, { TextFieldFilterProps } from "../TextFieldFilter";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";

describe("<FormFilterAdvanced /> has isCustom equal true", () => {
    let wrapper: RenderResult;

    const props: TextFieldFilterProps = {
        onEnter: jest.fn(),
        isCustom: true,
        inputProps: { "data-testid": "TextFieldFilter__root" },
    };

    beforeEach(() => {
        wrapper = render(<TextFieldFilter {...props} />);
    });

    it("should call handleChange", () => {
        const textField = screen.getByTestId("TextFieldFilter__root");
        fireEvent.change(textField as HTMLInputElement, {
            target: { value: "Test TextField" },
        });
    });

    it("should call handleKeyPress", () => {
        const textField = screen.getByTestId("TextFieldFilter__root");
        fireEvent.keyPress(textField, { key: "Enter", code: 13, charCode: 13 });

        fireEvent.keyPress(textField, { key: "Escape", code: 27, charCode: 27 });
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});

describe("<FormFilterAdvanced /> has isCustom equal false", () => {
    let wrapper: RenderResult;

    const props: TextFieldFilterProps = {
        onEnter: jest.fn(),
        isCustom: false,
    };

    beforeEach(() => {
        wrapper = render(<TextFieldFilter {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
