import Avatar from "../Avatar";

import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestThemeProvider from "src/test-utils/TestThemeProvider";

describe("<Avatar />", () => {
    const dataTestId = "Avatar__root";

    it("should match snapshot", () => {
        const wrapper = render(
            <TestThemeProvider>
                <Avatar
                    prefix="+"
                    src="thisIsSrc"
                    size="small"
                    alt="alt"
                    text="text"
                    tooltip="thisIsTooltip"
                    data-testid={dataTestId}
                />
            </TestThemeProvider>
        );

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct image source", () => {
        render(
            <TestThemeProvider>
                <Avatar
                    prefix="+"
                    src="thisIsSrc"
                    size="small"
                    alt="alt"
                    text="text"
                    tooltip="thisIsTooltip"
                    data-testid={dataTestId}
                />
            </TestThemeProvider>
        );

        expect(screen.getByRole("img").getAttribute("src")).toEqual("thisIsSrc");
    });

    it("should render tooltip on hover", async () => {
        render(
            <TestThemeProvider>
                <Avatar
                    prefix="+"
                    src="thisIsSrc"
                    size="small"
                    alt="alt"
                    text="text"
                    tooltip="thisIsTooltip"
                />
            </TestThemeProvider>
        );

        userEvent.hover(screen.getByRole("img"));
        // Tooltip will exist when prop tooltip is filled
        expect(await screen.findByText("thisIsTooltip")).toBeInTheDocument();
    });
});
