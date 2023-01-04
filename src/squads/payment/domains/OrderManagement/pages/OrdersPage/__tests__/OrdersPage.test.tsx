import { createCategoryOptions } from "src/squads/payment/test-utils/mocks/order";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import OrdersPage from "src/squads/payment/domains/OrderManagement/pages/OrdersPage/OrdersPage";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useOrderList", () => {
    return {
        __esModule: true,
        default: () => ({
            orders: [],
            pagination: mockPagination,
            isLoadingOrder: false,
            onSearch: jest.fn(),
            onFilter: jest.fn(),
            refreshPage: jest.fn(),
            onCategorize: jest.fn(),
        }),
    };
});

const mockPagination = createMockPaginationWithTotalObject();
const mockCategoryOptions = createCategoryOptions();

const renderOrderManagementList = () => {
    return render(
        <TestApp>
            <TestThemeProvider>
                <MuiPickersUtilsProvider>
                    <TestQueryWrapper>
                        <OrdersPage />
                    </TestQueryWrapper>
                </MuiPickersUtilsProvider>
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<OrdersPage />", () => {
    test("render UI with title, search filter, category buttons and table on initial load", () => {
        renderOrderManagementList();

        expect(screen.getByTestId("OrderManagementList")).toBeInTheDocument();
        expect(screen.getByText("Order Management")).toBeInTheDocument();
        expect(screen.getByTestId("FormFilterAdvanced__root")).toBeInTheDocument();
        expect(screen.getByTestId("ToggleButtonGroupBase")).toBeInTheDocument();
    });

    it("should have correct category options, children", () => {
        renderOrderManagementList();

        mockCategoryOptions.forEach((category) => {
            expect(screen.getByTestId(category["data-testid"])).toBeInTheDocument();
            expect(screen.getByTestId(category["data-testid"])).toHaveValue(`${category.value}`);
        });
    });

    it("should be able to select category options", () => {
        renderOrderManagementList();

        mockCategoryOptions.forEach((category) => {
            const categoryOptionsButton = screen.getByTestId(
                category["data-testid"]
            ) as HTMLButtonElement;

            userEvent.click(categoryOptionsButton);

            expect(categoryOptionsButton).toHaveClass("Mui-selected");
            const style = window.getComputedStyle(categoryOptionsButton);
            expect(style.color).toEqual("rgb(33, 150, 243)");
            expect(style.backgroundColor).toEqual("rgb(237, 247, 254)");
            expect(style.borderColor).toEqual("#90caf9"); //rgb(144, 202, 249)

            const categoryContainer = screen.getByTestId("ToggleButtonGroupBase");
            expect(categoryContainer.getElementsByClassName("Mui-selected")).toHaveLength(1);
        });
    });
});
