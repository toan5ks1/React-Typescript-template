import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import OrderDetailProductListSection from "src/squads/payment/domains/OrderManagement/components/Sections/OrderDetailProductListSection";

import { OrderDetailProductListSectionProps } from "../OrderDetailProductListSection";

import { render, screen } from "@testing-library/react";
import useOrderItemsInfoListV2 from "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsInfoListV2";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockPagination = createMockPaginationWithTotalObject();

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useOrderItemsInfoListV2", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
const defaultOrderDetailBillingItemSectionProps: OrderDetailProductListSectionProps = {
    orderId: "order_id_1",
};
const renderOrderDetailProductListSection = (
    orderDetailProductListSectionProps: OrderDetailProductListSectionProps = defaultOrderDetailBillingItemSectionProps
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <TestThemeProvider>
                    <OrderDetailProductListSection {...orderDetailProductListSectionProps} />
                </TestThemeProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<OrderDetailProductListSection />", () => {
    it("should render view previous button, product list table and product list table", () => {
        (useOrderItemsInfoListV2 as jest.Mock).mockImplementation(() => ({
            isFetching: true,
            pagination: mockPagination,
        }));

        renderOrderDetailProductListSection();
        const prevVersionBtn = screen.getByTestId("OrderDetail__buttonViewPreviousVersion");
        expect(prevVersionBtn).toBeInTheDocument();
        expect(prevVersionBtn).toBeDisabled();
        expect(prevVersionBtn).toHaveTextContent("View Previous Version");
        expect(screen.getByText("Product List")).toBeInTheDocument();
        expect(screen.getByTestId("OrderDetailProductListTable__root")).toBeInTheDocument();
    });
});
