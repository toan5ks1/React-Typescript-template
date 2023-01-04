import ChipFileDescriptionConversionErrorIcon from "../ChipFileDescriptionConversionErrorIcon";

import { render, RenderResult } from "@testing-library/react";

describe("<ChipFileDescriptionConversionErrorIcon /> component", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<ChipFileDescriptionConversionErrorIcon />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
