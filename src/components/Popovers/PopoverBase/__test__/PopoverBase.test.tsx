import PopoverBase from "../PopoverBase";

import { render, screen } from "@testing-library/react";

describe("<PopoverBase />", () => {
    it("should have correct content", () => {
        const div = document.createElement("div");
        const content = "123";

        render(
            <PopoverBase anchorEl={div} open={true}>
                <div data-testid="PopoverBase__exist">{content}</div>
            </PopoverBase>
        );

        expect(screen.getByTestId("PopoverBase__exist")).toBeInTheDocument();
        expect(screen.getByTestId("PopoverBase__exist")).toHaveTextContent(content);
    });
});
