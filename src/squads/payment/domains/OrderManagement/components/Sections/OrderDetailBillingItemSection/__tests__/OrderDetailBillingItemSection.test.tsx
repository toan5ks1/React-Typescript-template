import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import OrderDetailBillingItemSection, {
    OrderDetailBillingItemSectionProps,
} from "../OrderDetailBillingItemSection";

import { render, screen } from "@testing-library/react";
import useBillItemListV2 from "src/squads/payment/domains/OrderManagement/hooks/useBillItemListV2";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const mockPagination = createMockPaginationWithTotalObject();

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useBillItemListV2", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const defaultOrderDetailBillingItemSectionProps: OrderDetailBillingItemSectionProps = {
    orderId: "order_id_1",
};

const renderOrderDetailBillingItemSection = (
    orderDetailBillingItemSectionProps: OrderDetailBillingItemSectionProps = defaultOrderDetailBillingItemSectionProps
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <OrderDetailBillingItemSection {...orderDetailBillingItemSectionProps} />
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<OrderManagementBillingItemSection />", () => {
    it("should render billing item title and billing item table", () => {
        (useBillItemListV2 as jest.Mock).mockImplementation(() => ({
            isFetching: true,
            pagination: mockPagination,
        }));
        renderOrderDetailBillingItemSection();
        expect(screen.getByText("Billing Item")).toBeInTheDocument();
        expect(screen.getByTestId("OrderDetailBillingItemTable__root")).toBeInTheDocument();
    });
});
