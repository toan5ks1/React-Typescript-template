import FormControlLabelBase from "../FormControlLabelBase";

import { render } from "@testing-library/react";

const defaultFormControlLabelBaseProps = {
    name: "switchLabel",
    label: "Switch Label",
    disableMarginLeft: false,
    disableMarginRight: false,
    control: <input />,
};

describe(FormControlLabelBase.name, () => {
    it("should match snapshot", () => {
        const { container } = render(<FormControlLabelBase control={<input />} label="label" />);
        expect(container).toMatchSnapshot();
    });
});

describe("<FormControlLabelBase />", () => {
    it("render component with disableMarginRight should have margin-right = 0px", () => {
        const wrapper = render(
            <FormControlLabelBase
                {...defaultFormControlLabelBaseProps}
                disableMarginRight
                data-testid="FormControlLabelBase"
            />
        );

        expect(wrapper.getByTestId("FormControlLabelBase")).toHaveStyle("margin-right: 0px");
    });

    it("render component with disableMarginLeft should have margin-left = 0px", () => {
        const wrapper = render(
            <FormControlLabelBase
                {...defaultFormControlLabelBaseProps}
                disableMarginLeft
                data-testid="FormControlLabelBase"
            />
        );

        expect(wrapper.getByTestId("FormControlLabelBase")).toHaveStyle("margin-left: 0px");
    });

    it("render component with disableMarginLeft & disableMarginRight should have margin-left = 0px & margin-right: 0px", () => {
        const wrapper = render(
            <FormControlLabelBase
                {...defaultFormControlLabelBaseProps}
                disableMarginLeft
                disableMarginRight
                sx={{ color: "red" }}
                data-testid="FormControlLabelBase"
            />
        );

        expect(wrapper.getByTestId("FormControlLabelBase")).toHaveStyle(
            `margin-left: 0px; margin-right: 0px; color: red;`
        );
    });
});
