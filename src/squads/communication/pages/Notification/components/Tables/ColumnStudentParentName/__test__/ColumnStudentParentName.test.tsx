import ColumnStudentParentName from "../ColumnStudentParentName";

import { render, RenderResult } from "@testing-library/react";

describe("<ColumnStudentParentName />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<ColumnStudentParentName />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
