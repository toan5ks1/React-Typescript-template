import WrapperDividerSection, {
    WrapperDividerSectionProps,
} from "src/squads/lesson/components/Wrappers/WrapperDividerSection";

import { render } from "@testing-library/react";

describe("<WrapperDividerSection />", () => {
    const props: WrapperDividerSectionProps = {
        children: <div></div>,
    };

    it("should match snapshot", () => {
        const wrapper = render(<WrapperDividerSection {...props} />);
        expect(wrapper.container).toMatchSnapshot();
    });
});
