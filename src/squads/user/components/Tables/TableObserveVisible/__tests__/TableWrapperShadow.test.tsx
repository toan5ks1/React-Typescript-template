import TableWrapperShadow from "../TableWrapperShadow";

import { render } from "@testing-library/react";

describe("<TableWrapperShadow />", () => {
    it("should match snapshot", () => {
        const { container } = render(
            <TableWrapperShadow>
                <table />
            </TableWrapperShadow>
        );

        expect(container).toMatchSnapshot();
    });
});
