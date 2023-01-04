import WrapperPageHeader, { WrapperPageHeaderProps } from "../WrapperPageHeader";

import { render, screen, RenderResult } from "@testing-library/react";

describe(WrapperPageHeader.name, () => {
    const defaultProps: WrapperPageHeaderProps = {
        action: <div data-testid="MoreAction__passed"></div>,
        title: "Page title detail passed",
        status: <div data-testid="ChipStatus__passed"></div>,
        isNeverLoggedIn: true,
    };

    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<WrapperPageHeader {...defaultProps} />);
    });

    it("should match snap shot", () => {
        expect(wrapper.container).toMatchSnapshot();

        expect(screen.getByTestId("WrapperPageHeader__root")).toHaveStyle("margin-bottom: 24px");
    });

    it("should render the title", () => {
        expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    });

    it("should render action element", () => {
        expect(screen.getByTestId("MoreAction__passed")).toBeInTheDocument();
    });

    it("should render action element", () => {
        expect(screen.getByTestId("ChipStatus__passed")).toBeInTheDocument();
    });

    it("should render chit never logged in", () => {
        expect(wrapper.getByTestId("ChipAutocomplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("ChipAutocomplete")).toHaveTextContent(
            "resources.students_erp.titles.neverLoggedIn"
        );
    });
});
