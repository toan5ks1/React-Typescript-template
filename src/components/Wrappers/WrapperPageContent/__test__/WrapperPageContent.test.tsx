import WrapperPageContent, { WrapperPageContentProps } from "../WrapperPageContent";

import { RenderResult, render } from "@testing-library/react";

describe("<WrapperPageContent /> component", () => {
    let wrapper: RenderResult;
    const props: WrapperPageContentProps = {
        children: <div>Test</div>,
    };
    beforeEach(() => {
        wrapper = render(<WrapperPageContent {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
