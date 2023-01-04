import CheckboxBase from "../CheckboxBase";

import { render } from "@testing-library/react";

describe(CheckboxBase.name, () => {
    it("should match snapshot", () => {
        const { container } = render(<CheckboxBase />);

        expect(container).toMatchSnapshot();
    });
});
