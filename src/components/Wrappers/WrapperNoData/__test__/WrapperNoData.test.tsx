import WrapperNoData, { WrapperNoDataProps } from "../WrapperNoData";

import { RenderResult, render } from "@testing-library/react";

describe("<WrapperNoData /> component", () => {
    const testIdIcon: string = "NoData__icon";
    const testIdMessage: string = "NoData__message";

    let wrapper: RenderResult;
    const defaultProps: WrapperNoDataProps = {
        noDataMessage: "No Information",
    };

    beforeEach(() => {
        wrapper = render(<WrapperNoData {...defaultProps} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render UI correctly", () => {
        expect(wrapper.getByTestId(testIdIcon)).toBeInTheDocument();
        expect(wrapper.getByTestId(testIdMessage)).toHaveTextContent("No Information");
    });
});
