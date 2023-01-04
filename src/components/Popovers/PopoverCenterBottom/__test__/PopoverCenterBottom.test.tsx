import { TestThemeProvider } from "src/test-utils";

import PopoverCenterBottom from "../PopoverCenterBottom";

import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<PopoverCenterBottom />", () => {
    const div = document.createElement("div");
    const content = "123";
    it("should have correct content", () => {
        render(
            <PopoverCenterBottom anchorEl={div} onClose={() => {}} open={true}>
                <div data-testid="PopoverCenterBottom__exist">{content}</div>
            </PopoverCenterBottom>
        );

        expect(screen.getByTestId("PopoverCenterBottom__exist")).toBeInTheDocument();
        expect(screen.getByTestId("PopoverCenterBottom__exist")).toHaveTextContent(content);
    });

    it("should trigger close on click away", async () => {
        const handler = jest.fn();
        render(
            <TestThemeProvider>
                <PopoverCenterBottom anchorEl={div} onClose={handler} open={true}>
                    <div>{content}</div>
                </PopoverCenterBottom>
            </TestThemeProvider>
        );
        userEvent.click(document.body);

        await waitFor(() => handler.mock.calls.length > 0);
    });
});
