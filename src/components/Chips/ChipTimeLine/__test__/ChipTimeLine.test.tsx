import ChipTimeLine, { ChipTimelineProps } from "../ChipTimeLine";

import { render, RenderResult } from "@testing-library/react";

describe("<ChipTimeLine /> with variant is all-day", () => {
    let wrapper: RenderResult;

    const props: ChipTimelineProps = {
        variant: "all-day",
        label: "30/4",
        onClick: () => {},
    };

    beforeEach(() => {
        wrapper = render(<ChipTimeLine {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.queryByTestId("ChipTimeLine__chip")).toMatchSnapshot();
    });
});

describe("<ChipTimeLine /> with variant is on-day", () => {
    let wrapper: RenderResult;

    const props: ChipTimelineProps = {
        variant: "on-day",
        label: "30/4",
        onClick: () => {},
    };

    beforeEach(() => {
        wrapper = render(<ChipTimeLine {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.queryByTestId("ChipTimeLine__chip")).toMatchSnapshot();
    });
});
