import { PropsWithChildren } from "react";

import DialogLOs, { DialogLOsProps } from "../DialogLOs";

import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useParams: () => {
            return { id: "topic1" };
        },
    };
});

// Mock to avoid render CreateLOsTab
jest.mock("../../CreateLOsTab", () => ({
    __esModule: true,
    default: () => <div data-testid="CreateLOsTab__root" />,
}));

const defaultProps: DialogLOsProps = {
    topicId: "topic_id",
    onClose: jest.fn(),
    open: true,
    searchURL: "/default-url",
};

describe("<DialogLOs />", () => {
    const testIdTab: string = "Tab";
    const testIdTabPanel: string = "TabPanel";
    const testIdTabCreate: string = "CreateLOsTab__root";
    let wrapper: RenderResult;

    beforeEach(async () => {
        wrapper = render(<DialogLOs {...defaultProps} />, {
            wrapper: ({ children }: PropsWithChildren<{}>) => (
                <TestApp>
                    <TestHookFormProvider>{children}</TestHookFormProvider>
                </TestApp>
            ),
        });

        await waitFor(() => wrapper.queryAllByTestId(testIdTabCreate).length > 0);
    });

    it("should render correctly UI with default tab", () => {
        const tabs = screen.getAllByTestId(testIdTab);
        const tabPanels = screen.getAllByTestId(testIdTabPanel);
        const tabCreateLOs = screen.getByTestId(testIdTabCreate);

        expect(tabs.length).toEqual(1);
        expect(tabs[0]).toHaveTextContent("Add new");
        expect(tabPanels[0]).toContainElement(tabCreateLOs);
        expect(wrapper.getByTestId("DialogWithHeaderFooter_wrapper")).toHaveStyle(
            "min-width: 960px"
        );
    });
});
