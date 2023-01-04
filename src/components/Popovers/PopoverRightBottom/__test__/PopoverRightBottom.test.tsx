import { TestThemeProvider } from "src/test-utils";

import PopoverRightBottom from "../PopoverRightBottom";

import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<PopoverRightBottom />", () => {
    const div = document.createElement("div");
    const content = "123";
    it("should have correct content", () => {
        render(
            <PopoverRightBottom anchorEl={div} onClose={() => {}} open={true}>
                <div data-testid="PopoverRightBottom__exist">{content}</div>
            </PopoverRightBottom>
        );

        expect(screen.getByTestId("PopoverRightBottom__exist")).toBeInTheDocument();
        expect(screen.getByTestId("PopoverRightBottom__exist")).toHaveTextContent(content);
    });

    it("should trigger close on click away", async () => {
        const handler = jest.fn();
        render(
            <TestThemeProvider>
                <PopoverRightBottom anchorEl={div} onClose={handler} open={true}>
                    <div>{content}</div>
                </PopoverRightBottom>
            </TestThemeProvider>
        );
        userEvent.click(document.body);

        await waitFor(() => handler.mock.calls.length > 0);
    });
});
