import AudioButtonBase from "../AudioButtonBase";

import { render } from "@testing-library/react";

describe(AudioButtonBase.name, () => {
    it("should match snapshot", () => {
        const { container } = render(<AudioButtonBase />);

        expect(container).toMatchSnapshot();
    });
});
