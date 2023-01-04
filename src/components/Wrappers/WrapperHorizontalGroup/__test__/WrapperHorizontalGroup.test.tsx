import WrapperHorizontalGroup, { WrapperHorizontalGroupProps } from "../WrapperHorizontalGroup";

import { render, RenderResult } from "@testing-library/react";

describe("<WrapperHorizontalGroup /> array children", () => {
    let wrapper: RenderResult;
    const props: WrapperHorizontalGroupProps = {
        children: [<div key={1}>Text 1</div>, <div key={2}>Test 2</div>],
    };
    beforeEach(() => {
        wrapper = render(<WrapperHorizontalGroup {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});

describe("<WrapperHorizontalGroup /> single children", () => {
    let wrapper: RenderResult;
    const props: WrapperHorizontalGroupProps = {
        children: <div>Text 1</div>,
    };
    beforeEach(() => {
        wrapper = render(<WrapperHorizontalGroup {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
