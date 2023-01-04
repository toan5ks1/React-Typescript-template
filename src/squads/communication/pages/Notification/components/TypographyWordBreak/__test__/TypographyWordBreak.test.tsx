import TypographyWordBreak from "../TypographyWordBreak";

import { render } from "@testing-library/react";

describe("<TypographyWordBreak />", () => {
    it("should match snapshot", () => {
        const wrapper = render(<TypographyWordBreak />);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should match snapshot when typography's text is in accordion", () => {
        const wrapper = render(<TypographyWordBreak isTextInAccordion={true} />);
        expect(wrapper.container).toMatchSnapshot();
    });
});
