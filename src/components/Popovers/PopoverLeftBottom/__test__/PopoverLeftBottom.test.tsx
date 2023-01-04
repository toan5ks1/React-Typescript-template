import { TestThemeProvider } from "src/test-utils";

import PopoverLeftBottom from "../PopoverLeftBottom";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<PopoverLeftBottom />", () => {
    const div = document.createElement("div");

    it("should render correctly", async () => {
        render(
            <PopoverLeftBottom anchorEl={div} onClose={() => {}} open={true}>
                <div>data</div>
            </PopoverLeftBottom>
        );

        expect(await screen.findByTestId("PopoverLeftBottom__container")).toBeInTheDocument();
    });

    it("should have correct content", async () => {
        render(
            <PopoverLeftBottom anchorEl={div} onClose={() => {}} open={true}>
                <div data-testid="PopoverLeftBottom__divContent">data</div>
            </PopoverLeftBottom>
        );

        expect(await screen.findByTestId("PopoverLeftBottom__divContent")).toBeInTheDocument();
    });

    it("should trigger close on click away", async () => {
        const handler = jest.fn();
        render(
            <TestThemeProvider>
                <PopoverLeftBottom anchorEl={div} onClose={handler} open={true}>
                    <div>data</div>
                </PopoverLeftBottom>
            </TestThemeProvider>
        );
        userEvent.click(document.body);

        await waitFor(() => handler.mock.calls.length > 0);
    });
});
