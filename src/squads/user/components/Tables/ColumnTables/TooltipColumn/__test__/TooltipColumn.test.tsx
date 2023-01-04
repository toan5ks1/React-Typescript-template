import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import TooltipColumn, { TooltipColumnProps } from "../TooltipColumn";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useDisplayTooltip from "src/squads/user/hooks/useDisplayTooltip";

jest.mock("src/squads/user/hooks/useDisplayTooltip", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("TooltipColumn/>", () => {
    const handleMouseEnter = jest.fn();

    const renderComponent = (props?: Partial<TooltipColumnProps>) => {
        return render(
            <TestCommonAppProvider>
                <TooltipColumn
                    content={"Test"}
                    dataTestIdContent="TooltipColumn__content"
                    dataTestIdLoading="TooltipColumn__loading"
                    isLoading={false}
                    maxLines={2}
                    {...props}
                />
            </TestCommonAppProvider>
        );
    };

    beforeEach(() => {
        (useDisplayTooltip as jest.Mock<ReturnType<typeof useDisplayTooltip>>).mockReturnValue({
            handleMouseEnter,
            shouldDisplayTooltip: false,
        });
    });

    it("should match snapshot and have props title with value", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
        expect(screen.queryByTitle(/Line 3/i)).not.toBeInTheDocument();
    });
    it("should have props title with value and call fun handleMouseEnter", () => {
        (useDisplayTooltip as jest.Mock<ReturnType<typeof useDisplayTooltip>>).mockReturnValue({
            handleMouseEnter,
            shouldDisplayTooltip: true,
        });

        renderComponent({ content: "Line 1 \n Line 2 \n Line 3" });
        userEvent.hover(screen.getByTestId("TooltipColumn__content"));

        expect(handleMouseEnter).toBeCalledTimes(1);
        expect(screen.getByText(/Line 3/i)).toBeInTheDocument();
        expect(screen.getByTitle(/Line 3/i)).toBeInTheDocument();
    });
});
