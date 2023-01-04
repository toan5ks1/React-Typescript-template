import { gridClasses } from "@mui/material/Grid";

import DialogTabPanel from "../DialogTabPanel";

import { render, screen } from "@testing-library/react";

describe(DialogTabPanel.name, () => {
    it("should render correctly with 2 grid columns", () => {
        const { container } = render(<DialogTabPanel tabValue={0} index={0} columns={[]} />);

        expect(screen.getByRole(/tabpanel/)).toBeInTheDocument();
        expect(container.getElementsByClassName(gridClasses["grid-xs-6"]).length).toBe(2);
    });

    it("should not render over 2 columns", () => {
        const { container } = render(
            <DialogTabPanel tabValue={0} index={0} columns={["one", "two", "three"]} />
        );
        expect(container.getElementsByClassName(gridClasses["grid-xs-6"]).length).not.toBe(3);
    });
});
