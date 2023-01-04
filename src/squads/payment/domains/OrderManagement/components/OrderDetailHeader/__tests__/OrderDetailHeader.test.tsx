import { KeyOrderStatus } from "src/squads/payment/constants/const";
import { getOrderSequenceNumberPrefix } from "src/squads/payment/helpers/order-details";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import OrderDetailHeader, {
    OrderDetailHeaderProps,
} from "src/squads/payment/domains/OrderManagement/components/OrderDetailHeader";

import { render, screen } from "@testing-library/react";
import useOrderItemsInfoListV2 from "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsInfoListV2";
import TestApp from "src/squads/payment/test-utils/TestApp";

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useOrderItemsInfoListV2", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const mockPagination = createMockPaginationWithTotalObject();

const defaultOrderDetailHeaderProps: OrderDetailHeaderProps = {
    orderSequenceNumber: 1,
    orderStatus: KeyOrderStatus.ORDER_STATUS_SUBMITTED,
    menuItems: [],
};

const renderOrderDetailHeaderComponent = (
    orderDetailHeaderProps: OrderDetailHeaderProps = defaultOrderDetailHeaderProps
) => {
    return render(
        <TestApp>
            <OrderDetailHeader {...orderDetailHeaderProps} />
        </TestApp>
    );
};

describe("<OrderDetailHeader />", () => {
    it("should render chip order state and order title", () => {
        (useOrderItemsInfoListV2 as jest.Mock).mockImplementation(() => ({
            isFetching: true,
            pagination: mockPagination,
        }));

        renderOrderDetailHeaderComponent();

        const orderTitle = getOrderSequenceNumberPrefix(
            defaultOrderDetailHeaderProps.orderSequenceNumber
        );

        expect(screen.getByTestId("OrderDetailHeader__root")).toBeInTheDocument();
        expect(screen.getByTestId("ChipOrderStatus__root")).toBeInTheDocument();
        expect(screen.getByTestId("ChipOrderStatus__root")).toHaveTextContent("Submitted");
        expect(screen.getByText(orderTitle)).toBeInTheDocument();
    });
});
