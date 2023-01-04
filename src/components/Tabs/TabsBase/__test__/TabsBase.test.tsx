import { Tab } from "@mui/material";

import TabsBase, { TabsBaseProps } from "../TabsBase";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";

describe("<TabsBase />", () => {
    const tabTestId: string = "Tab";
    let wrapper: RenderResult;

    const defaultProps: TabsBaseProps = {
        indicatorColor: "primary",
        textColor: "primary",
        children: [
            <Tab label="Tab 1" key={0} data-testid="Tab" />,
            <Tab label="Tab 2" key={1} data-testid="Tab" />,
        ],
        value: 0,
        onChange: jest.fn(),
    };

    beforeEach(() => {
        wrapper = render(<TabsBase {...defaultProps} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correctly UI", () => {
        const defaultTab = screen.queryAllByTestId(tabTestId)[0];
        const otherTab = screen.queryAllByTestId(tabTestId)[1];

        expect(defaultTab).toBeInTheDocument();
        expect(defaultTab).toHaveAttribute("aria-selected", "true");
        expect(defaultTab).toHaveTextContent("Tab 1");

        expect(otherTab).toBeInTheDocument();
        expect(otherTab).toHaveAttribute("aria-selected", "false");
        expect(otherTab).toHaveTextContent("Tab 2");
    });

    it("should clickable on tab", () => {
        const otherTab = screen.queryAllByTestId(tabTestId)[1];

        fireEvent.click(otherTab);
        expect(defaultProps.onChange).toBeCalled();
    });
});
