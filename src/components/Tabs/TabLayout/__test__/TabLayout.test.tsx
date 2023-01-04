import { Tab } from "@mui/material";

import TabLayout, { TabLayoutProps } from "../TabLayout";

import { fireEvent, render, RenderResult, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const renderTabLayout = (props: TabLayoutProps) => {
    return render(<TabLayout {...props} />);
};

describe("<TabLayout /> non action", () => {
    const tabLayoutTestId: string = "TabLayout";
    const tabTestId: string = "Tab";
    const tabPanelTestId: string = "TabPanel";
    let wrapper: RenderResult;

    const defaultProps: TabLayoutProps = {
        mapTabs: [
            { tabName: <Tab label="Tab 1" />, tabPanel: <div>Tab Panel 1</div> },
            { tabName: <Tab label="Tab 2" />, tabPanel: <div>Tab Panel 2</div> },
        ],
    };

    it("should match snapshot", () => {
        wrapper = renderTabLayout(defaultProps);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correctly UI with default tab", () => {
        wrapper = renderTabLayout(defaultProps);

        const tabLayout = screen.getByTestId(tabLayoutTestId);
        const defaultTab = screen.queryAllByTestId(tabTestId)[0];
        const defaultTabPanel = screen.queryAllByTestId(tabPanelTestId)[0];
        const otherTabPanel = screen.queryAllByTestId(tabPanelTestId)[1];

        expect(tabLayout).toBeInTheDocument();
        expect(defaultTab).toHaveAttribute("aria-selected", "true");
        expect(defaultTabPanel).toHaveTextContent("Tab Panel 1");
        expect(otherTabPanel).toHaveAttribute("hidden");
    });

    it("should render correctly UI when choosing another tab", () => {
        wrapper = renderTabLayout(defaultProps);

        const otherTab = screen.queryAllByTestId(tabTestId)[1];
        const defaultTabPanel = screen.queryAllByTestId(tabPanelTestId)[0];
        const otherTabPanel = screen.queryAllByTestId(tabPanelTestId)[1];

        fireEvent.click(otherTab);
        expect(otherTab).toHaveAttribute("aria-selected", "true");
        expect(otherTabPanel).toHaveTextContent("Tab Panel 2");
        expect(defaultTabPanel).toHaveAttribute("hidden");
    });
});

describe("<TabLayout /> have action", () => {
    const tabName1 = "Tab 1";
    const tabName2 = "Tab 2";
    const tabPanel1 = "Tab Panel 1";
    const tabPanel2 = "Tab Panel 2";
    const buttonText = "Action button";

    let wrapper: RenderResult;

    const onClickFunc = jest.fn();

    const withActionProps: TabLayoutProps = {
        mapTabs: [
            { tabName: <Tab label={tabName1} />, tabPanel: <div>{tabPanel1}</div> },
            { tabName: <Tab label={tabName2} />, tabPanel: <div>{tabPanel2}</div> },
        ],
        tabHeaderAction: <button onClick={onClickFunc}>{buttonText}</button>,
    };

    it("should match snapshot", () => {
        wrapper = renderTabLayout(withActionProps);
        expect(wrapper.container).toMatchSnapshot("with action button");
    });

    it("should render correct UI", () => {
        wrapper = renderTabLayout(withActionProps);

        expect(wrapper.getByText(tabName1)).toBeInTheDocument();
        expect(wrapper.getByText(tabName2)).toBeInTheDocument();
        expect(wrapper.getByText(buttonText)).toBeInTheDocument();
    });

    it("should change tab still see correct UI", async () => {
        wrapper = renderTabLayout(withActionProps);

        const tabOne = wrapper.getByText(tabName1);
        userEvent.click(tabOne);
        await waitFor(() => {
            expect(wrapper.getByText(tabPanel1)).toBeInTheDocument();
        });

        const tabTwo = wrapper.getByText(tabName2);
        userEvent.click(tabTwo);
        await waitFor(() => {
            expect(wrapper.getByText(tabPanel2)).toBeInTheDocument();
        });
    });

    it("should apply tabHeaderAction props", async () => {
        wrapper = renderTabLayout(withActionProps);

        const actionButton = wrapper.getByText(buttonText);
        expect(actionButton).toBeInTheDocument();

        userEvent.click(actionButton);
        expect(onClickFunc).toBeCalled();
    });
});
