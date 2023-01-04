import { createMockMappedUseOrderActionLogListData } from "src/squads/payment/test-utils/mocks/order-action-log";
import { createMockUsersList } from "src/squads/payment/test-utils/mocks/student";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import OrderDetailActionLogSection, {
    OrderDetailActionLogSectionProps,
} from "src/squads/payment/domains/OrderManagement/components/Sections/OrderDetailActionLogSection";

import { render } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useOrderActionLogList", () => {
    return {
        __esModule: true,
        default: () => ({
            mappedUseOrderActionLogListData: mockMappedUseOrderActionLogListData,
            usersList: mockUsersList,
            isOrderActionLogListLoadingAll: false,
            pagination: mockPagination,
        }),
    };
});

const mockMappedUseOrderActionLogListData = createMockMappedUseOrderActionLogListData();
const mockUsersList = createMockUsersList();
const mockPagination = createMockPaginationWithTotalObject();

const defaultOrderDetailActionLogSectionProps: OrderDetailActionLogSectionProps = {
    orderId: "order_id_1",
};

const renderOrderDetailActionLogSection = (
    orderDetailActionLogSectionProps: OrderDetailActionLogSectionProps = defaultOrderDetailActionLogSectionProps
) => {
    return render(
        <TestApp>
            <TestThemeProvider>
                <OrderDetailActionLogSection {...orderDetailActionLogSectionProps} />
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<OrderDetailActionLogSection />", () => {
    it("should render action log title and action log table", () => {
        const wrapper = renderOrderDetailActionLogSection();

        expect(wrapper.getByText("Action Log")).toBeInTheDocument();
        expect(wrapper.getByTestId("OrderDetailActionLogTable__root")).toBeInTheDocument();
    });
});
