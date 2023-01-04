import { MutationMenus } from "src/common/constants/enum";

import ActionPanel from "../ActionPanel";
import { ActionPanelProps, CustomAction } from "../types";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import TestApp from "src/test-utils/TestApp";
import TestThemeProvider from "src/test-utils/TestThemeProvider";

const renderUtil = (override: Partial<ActionPanelProps> = {}) => {
    const defaultProps: ActionPanelProps = {
        loading: false,
        actions: [],
        size: "inherit",
        recordName: <>Name</>,
        onClose: () => jest.fn(),
        onAction: () => jest.fn(),
    };

    const finalProps: ActionPanelProps = { ...defaultProps, ...override };

    return render(
        <TestApp>
            <TestThemeProvider>
                <ActionPanel {...finalProps} />
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<ActionPanel /> close", () => {
    let wrapper: RenderResult;
    const customAction: CustomAction = {
        action: MutationMenus.DELETE,
        onClick: jest.fn(),
        render: (label) => <span>{label}</span>,
    };
    beforeEach(() => {
        wrapper = renderUtil({ actions: [MutationMenus.EDIT, customAction] });
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(screen.queryByTestId("ActionPanel__root")).toBeInTheDocument();
        expect(screen.queryByTestId("ActionPanel__trigger")).toBeInTheDocument();
    });

    it("should render custom action correctly", () => {
        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));

        const deleteButton = screen
            .getByTestId("ActionPanel__popover--open")
            .querySelector("button:last-child")!;

        expect(deleteButton).toHaveTextContent("Delete");
        fireEvent.click(deleteButton);
        expect(customAction.onClick).toHaveBeenCalled();
    });
});

describe("Action panel for delete action", () => {
    it("should render suffix delete title when passed", () => {
        const suffixDeleteTitle = "Your name delete title";
        renderUtil({
            actions: [MutationMenus.DELETE],
            suffixDeleteTitle,
        });
        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));

        const deleteButton = screen
            .getByTestId("ActionPanel__popover--open")
            .querySelector("button:last-child")!;

        fireEvent.click(deleteButton);
        screen.getByText(`Delete ${suffixDeleteTitle}`);
    });
});
