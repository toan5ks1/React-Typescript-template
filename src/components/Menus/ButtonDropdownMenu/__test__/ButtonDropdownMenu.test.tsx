import ButtonDropdownMenu, { ButtonDropdownMenuProps } from "../ButtonDropdownMenu";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";

describe("<ButtonDropdownMenu />", () => {
    let wrapper: RenderResult;
    const props: ButtonDropdownMenuProps = {
        label: "ButtonDropdownMenu",
        options: [
            {
                id: 1,
                label: "label 1",
                value: "value 1",
            },
            {
                id: 2,
                label: "label 2",
                value: "value 2",
            },
            {
                id: 3,
                label: "label 3",
                value: "value 3",
                disabled: true,
            },
        ],
        onClick: jest.fn(),
    };

    beforeEach(() => {
        wrapper = render(<ButtonDropdownMenu {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render label", () => {
        const button = screen.getByTestId("ButtonDropdownMenu__button") as HTMLButtonElement;
        expect(button.textContent).toContain(props.label);
    });

    it("should call onClick", () => {
        const button = screen.getByTestId("ButtonDropdownMenu__button") as HTMLButtonElement;
        fireEvent.click(button);

        const optionItems = screen.getAllByRole("menuitem");

        const disabledItem = optionItems[2];
        expect(disabledItem).toHaveAttribute("aria-disabled", "true");

        const typeSelected = optionItems[1];
        expect(typeSelected.textContent).toContain("value 2");

        fireEvent.click(typeSelected);
        expect(props.onClick).toBeCalled();
    });
});
