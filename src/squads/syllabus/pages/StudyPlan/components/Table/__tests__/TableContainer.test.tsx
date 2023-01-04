import { TableContainer } from "../TableContainer";

import { render } from "@testing-library/react";

describe(TableContainer.name, () => {
    it("should render correctly", () => {
        const { baseElement } = render(<TableContainer />);
        expect(baseElement).toBeTruthy();
        expect(baseElement).toMatchSnapshot();
    });
});
