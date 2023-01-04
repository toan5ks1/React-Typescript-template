import TabPanel from "../TabPanel";

import { render, RenderResult } from "@testing-library/react";

describe("<TabPanel />", () => {
    it("should render children", () => {
        const children = "CHILDREN";
        const { getByText }: RenderResult = render(
            <TabPanel value={1} index={1}>
                {children}
            </TabPanel>
        );

        expect(getByText(/CHILDREN/)).toBeInTheDocument();
    });

    it("shouldn't render children", () => {
        const children = "CHILDREN";
        const { queryByText }: RenderResult = render(
            <TabPanel value={1} index={2}>
                {children}
            </TabPanel>
        );
        expect(queryByText(/CHILDREN/)).toBeNull();
    });
});
