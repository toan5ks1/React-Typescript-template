import { TestThemeProvider } from "src/test-utils";

import ButtonDropdownWithPopover, {
    ButtonDropdownWithPopoverProps,
} from "../ButtonDropdownWithPopover";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";

describe("<ButtonDropdownWithPopover /> position bottom right", () => {
    let wrapper: RenderResult;

    const props: ButtonDropdownWithPopoverProps = {
        children: "Button Text",
        dropdownContent: <div>Dropdown Content</div>,
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <ButtonDropdownWithPopover {...props} />
            </TestThemeProvider>
        );
    });

    it("should exist children", () => {
        expect(screen.getByText("Button Text")).toBeInTheDocument();
    });

    it("should call handleOpenPopover", () => {
        const button = screen.getByText("Button Text");
        fireEvent.click(button);

        expect(wrapper.container).toMatchSnapshot("position bottom right");
    });
});

describe("<ButtonDropdownWithPopover /> position bottom left", () => {
    let wrapper: RenderResult;

    const props: ButtonDropdownWithPopoverProps = {
        children: "Button Text",
        popoverPosition: "bottom-left",
        dropdownContent: <div>Dropdown Content</div>,
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <ButtonDropdownWithPopover {...props} />
            </TestThemeProvider>
        );
    });

    it("should exist children", () => {
        expect(screen.getByText("Button Text")).toBeInTheDocument();
    });

    // it("should call handleOpenPopover", () => {
    //     const button = screen.getByText("Button Text");
    //     fireEvent.click(button);
    // });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot("position bottom left");
    });
});
