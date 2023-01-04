import { Tab } from "@mui/material";

import DialogWithHeaderFooterTabsLayout, {
    DialogWithHeaderFooterTabsLayoutProps,
} from "../DialogWithHeaderFooterTabsLayout";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

describe("<DialogWithHeaderFooterTabsLayout />", () => {
    const tabTestId: string = "Tab";
    const tabPanelTestId: string = "TabPanel";
    let wrapper: RenderResult;

    const defaultProps: DialogWithHeaderFooterTabsLayoutProps = {
        onClose: jest.fn(),
        open: true,
        title: "None Action Header and Footer",
        mapTabs: [
            { tabName: <Tab label="Tab 1" />, tabPanel: <div>Tab Panel 1</div> },
            { tabName: <Tab label="Tab 2" />, tabPanel: <div>Tab Panel 2</div> },
        ],
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <DialogWithHeaderFooterTabsLayout
                    data-testid="DialogWithHeaderFooterTabsLayout__container"
                    {...defaultProps}
                />
            </TestThemeProvider>
        );
    });

    it("should match snapshot", () => {
        expect(
            wrapper.getByTestId("DialogWithHeaderFooterTabsLayout__container")
        ).toMatchSnapshot();
    });

    it("should render correctly UI with default tab", () => {
        const defaultTab = screen.queryAllByTestId(tabTestId)[0];
        const defaultTabPanel = screen.queryAllByTestId(tabPanelTestId)[0];
        const otherTabPanel = screen.queryAllByTestId(tabPanelTestId)[1];

        expect(defaultTab).toHaveAttribute("aria-selected", "true");
        expect(defaultTabPanel).toHaveTextContent("Tab Panel 1");
        expect(otherTabPanel).toHaveAttribute("hidden");
    });

    it("should render correctly UI when choosing another tab", () => {
        const otherTab = screen.queryAllByTestId(tabTestId)[1];
        const defaultTabPanel = screen.queryAllByTestId(tabPanelTestId)[0];
        const otherTabPanel = screen.queryAllByTestId(tabPanelTestId)[1];

        fireEvent.click(otherTab);
        expect(otherTab).toHaveAttribute("aria-selected", "true");
        expect(otherTabPanel).toHaveTextContent("Tab Panel 2");
        expect(defaultTabPanel).toHaveAttribute("hidden");
    });
});
