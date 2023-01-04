import DotCharacter from "../DotCharacter";

import { render } from "@testing-library/react";

describe(DotCharacter.name, () => {
    it("should match snapshot", () => {
        const { container } = render(<DotCharacter />);

        expect(container).toMatchSnapshot();
    });
});
