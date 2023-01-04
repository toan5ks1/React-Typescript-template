import SwitchBase from "../SwitchBase";

import { render } from "@testing-library/react";

describe(SwitchBase.name, () => {
    it("should match snapshot", () => {
        const { container } = render(<SwitchBase />);

        expect(container).toMatchSnapshot();
    });
});
