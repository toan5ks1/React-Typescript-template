import DrawerBase, { DrawerBaseProps } from "../DrawerBase";

import { render, screen } from "@testing-library/react";

describe("<DrawerBase />", () => {
    const props: DrawerBaseProps = {
        open: true,
        children: <div>Test</div>,
    };

    beforeEach(() => {
        render(<DrawerBase data-testid="DrawerBase__container" {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });
});
