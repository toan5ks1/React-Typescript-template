import SelectBase from "../SelectBase";

import { render, RenderResult, fireEvent, getByRole } from "@testing-library/react";

describe("<SelectBase />", () => {
    let wrapper: RenderResult;

    const options = [
        {
            id: "id",
            label: "Label",
            value: `resources.hello`,
        },
    ];
    const props = {
        options: options,
        name: "opening_status",
        label: "Opening Status",
        defaultValue: "",
        inputProps: { "data-testid": "FormSetTime__selectOpeningStatus" },
        onChange: jest.fn(),
    };

    beforeEach(() => {
        wrapper = render(<SelectBase data-testid="SelectBase__options" {...props} />);
    });

    it("should render SelectBase", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render list of Options", async () => {
        const listOptions = wrapper.getByTestId("SelectBase__options");
        fireEvent.mouseDown(getByRole(listOptions, "button"));

        const listbox = wrapper.queryByRole("listbox");
        expect(listbox).not.toBeNull();
        expect(listbox).toHaveStyle("max-height: 400px");
    });
});
