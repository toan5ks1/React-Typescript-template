import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import NameColumn, { NameColumnProps } from "../NameColumn";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useDisplayTooltip from "src/squads/user/hooks/useDisplayTooltip";

jest.mock("src/squads/user/hooks/useDisplayTooltip", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<NameColumn />", () => {
    const handleMouseEnter = jest.fn();

    const renderComponent = (props: NameColumnProps) => {
        return render(
            <TestCommonAppProvider>
                <NameColumn {...props} />
            </TestCommonAppProvider>
        );
    };

    beforeEach(() => {
        (useDisplayTooltip as jest.Mock<ReturnType<typeof useDisplayTooltip>>).mockReturnValue({
            handleMouseEnter,
            shouldDisplayTooltip: false,
        });
    });

    it("should not render UI", () => {
        renderComponent({
            isLoggedIn: true,
            redirectUrl: "",
            content: "",
            maxLines: 2,
        });

        expect(screen.queryByTestId("TableColumnName__content")).not.toBeInTheDocument();
    });

    it("should only render name ", () => {
        renderComponent({
            isLoggedIn: true,
            redirectUrl: "",
            content: "faked name",
            maxLines: 2,
        });

        expect(screen.getByTestId("TableColumnName__content")).toBeInTheDocument();
    });

    it("should render both name and neverLoggedIn tag UI", () => {
        renderComponent({
            isLoggedIn: false,
            redirectUrl: "",
            content: "faked name",
            maxLines: 2,
        });

        expect(screen.getByTestId("TableCellWithChip__chip")).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnName__content")).toBeInTheDocument();
    });

    it("should have props title with value and call fun handleMouseEnter", () => {
        (useDisplayTooltip as jest.Mock<ReturnType<typeof useDisplayTooltip>>).mockReturnValue({
            handleMouseEnter,
            shouldDisplayTooltip: true,
        });

        renderComponent({
            content: "Line 1 \n Line 2 \n Line 3",
            isLoggedIn: false,
            redirectUrl: "",
            maxLines: 2,
        });
        userEvent.hover(screen.getByText(/Line 3/i));

        expect(handleMouseEnter).toBeCalledTimes(1);
        expect(screen.getByText(/Line 3/i)).toBeInTheDocument();
        expect(screen.getByTitle(/Line 3/i)).toBeInTheDocument();
    });

    it("should redirect to school detail page when clicking name", () => {
        const history = createMemoryHistory();
        history.push = jest.fn();

        render(
            <TestCommonAppProvider>
                <Router history={history}>
                    <NameColumn
                        isLoggedIn={true}
                        content="faked name"
                        redirectUrl="/student/123"
                        maxLines={2}
                    />
                </Router>
            </TestCommonAppProvider>
        );

        userEvent.click(screen.getByText("faked name"));
        expect(history.push).toHaveBeenCalledWith("/student/123");
    });
});
