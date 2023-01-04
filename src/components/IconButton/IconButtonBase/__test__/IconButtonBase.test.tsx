import IconButtonBase from "../IconButtonBase";

import { render, screen } from "@testing-library/react";

describe(IconButtonBase.name, () => {
    beforeEach(() => {
        render(
            <IconButtonBase>
                <span data-testid="CHILDREN_TEST_ID"></span>
            </IconButtonBase>
        );
    });

    it("should render children", () => {
        expect(screen.getByTestId("CHILDREN_TEST_ID")).toBeInTheDocument();
    });
});
