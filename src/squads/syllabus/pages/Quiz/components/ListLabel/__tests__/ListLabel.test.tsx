import { LabelTypes } from "src/common/utils/label-generator";

import ListType from "../ListLabel";

import { render } from "@testing-library/react";

describe("<ListType />", () => {
    it("should match snapshot", () => {
        const { container } = render(<ListType type={LabelTypes.NUMBER} label={"5"} />);

        expect(container).toMatchSnapshot();
    });
});
