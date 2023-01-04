import { TestContext } from "ra-test";

import { Button } from "@mui/material";

import MenuComponent, { MenuComponentProps } from "../MenuComponent";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import TestThemeProvider from "src/test-utils/TestThemeProvider";

const itemData = [
    {
        key: "1",
        name: "Disabled Item",
        disabled: true,
    },
    {
        key: "2",
        name: "Enabled Item",
        disabled: false,
    },
];

describe("<MenuComponent />", () => {
    let wrapper: RenderResult;
    const defaultProps: MenuComponentProps = {};

    beforeEach(() => {
        wrapper = render(
            <TestContext>
                <TestThemeProvider>
                    <MenuComponent {...defaultProps}>
                        {itemData.map((e) => {
                            return (
                                <Button key={e.key} disabled={e.disabled}>
                                    {e.name}
                                </Button>
                            );
                        })}
                    </MenuComponent>
                </TestThemeProvider>
            </TestContext>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(screen.queryByTestId("MenuComponent__controlButton")).toBeInTheDocument();
        expect(screen.queryByTestId("MenuComponent__controlButton")).toHaveTextContent("Action");
    });

    it("should render action correctly", async () => {
        fireEvent.click(screen.getByTestId("MenuComponent__expandMoreIcon"));

        expect(await screen.findByTestId("MenuComponent__expandLessIcon")).toBeInTheDocument();
        expect(screen.getByTestId("MenuComponent__expandLessIcon")).toBeInTheDocument();
        expect(screen.getByTestId("MenuComponent__popper")).toBeInTheDocument();
    });

    it("should render disabled and enabled menu items correctly", () => {
        const disabledClass = "Mui-disabled";
        fireEvent.click(screen.getByTestId("MenuComponent__expandMoreIcon"));
        const menuItems = screen.getAllByRole("menuitem");
        const disabledItem = menuItems[0];
        const enabledItem = menuItems[1];

        expect(disabledItem).toBeInTheDocument();
        expect(enabledItem).toBeInTheDocument();
        expect(disabledItem).toHaveClass(disabledClass);
        expect(enabledItem).not.toHaveClass(disabledClass);
    });
});
