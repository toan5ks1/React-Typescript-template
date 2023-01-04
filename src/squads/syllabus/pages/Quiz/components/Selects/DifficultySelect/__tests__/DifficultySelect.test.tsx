import DifficultySelect from "../DifficultySelect";

import { render } from "@testing-library/react";

describe("<DifficultySelect />", () => {
    it("should match snapshot", () => {
        const wrapper = render(<DifficultySelect value={1} onChange={() => {}} />);

        expect(wrapper.container).toMatchSnapshot();
    });
});
