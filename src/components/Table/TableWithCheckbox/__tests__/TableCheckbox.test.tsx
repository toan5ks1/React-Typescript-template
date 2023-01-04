import TableCheckbox from "../TableCheckbox";

import { render } from "@testing-library/react";

describe("<TableCheckbox />", () => {
    it("should match snapshot", () => {
        const { container } = render(
            <TableCheckbox
                checkboxProps={{
                    checked: true,
                }}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
