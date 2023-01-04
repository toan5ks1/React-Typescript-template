import BaseBox from "../BaseBox";

import { render } from "@testing-library/react";

describe(BaseBox.name, () => {
    it("should match snapshot", () => {
        const { container } = render(<BaseBox />);

        expect(container).toMatchSnapshot();
    });
});
