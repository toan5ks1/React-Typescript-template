import Popper from "../Popper";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

describe("<Popper />", () => {
    const mockAnchorEl = document.createElement("div");
    const content = "123";
    it("should have correct content", () => {
        render(
            <Popper anchorEl={mockAnchorEl} onClose={() => {}} open={true}>
                <div data-testid="Popper__exist">{content}</div>
            </Popper>
        );

        expect(screen.getByTestId("Popper__exist")).toBeInTheDocument();
        expect(screen.getByTestId("Popper__exist")).toHaveTextContent(content);
    });

    it("should trigger close on click away", async () => {
        const handler = jest.fn();

        render(
            <TestThemeProvider>
                <Popper anchorEl={mockAnchorEl} onClose={handler} open={true}>
                    <div>{content}</div>
                </Popper>
            </TestThemeProvider>
        );
        userEvent.click(document.body);

        await waitFor(() => handler.mock.calls.length > 0);
    });
});
