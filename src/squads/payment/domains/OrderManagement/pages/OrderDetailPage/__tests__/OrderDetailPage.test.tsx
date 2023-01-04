import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { Entities } from "src/common/constants/enum";
import { KeyOrderTypes } from "src/squads/payment/constants/const";
import { getOrderSequenceNumberPrefix } from "src/squads/payment/helpers/order-details";
import { createMockLocation } from "src/squads/payment/test-utils/mocks/location";
import { createMockOrderData } from "src/squads/payment/test-utils/mocks/order";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useOrderDetailInfo, {
    OrderDetailInfoReturn,
} from "src/squads/payment/domains/OrderManagement/hooks/useOrderDetailInfo";
import OrderDetailPage from "src/squads/payment/domains/OrderManagement/pages/OrderDetailPage/OrderDetailPage";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

jest.mock("src/hooks/useBreadcrumb", () => {
    return {
        __esModule: true,
        default: () => ({
            breadcrumbs: [
                {
                    url: "/orders",
                    name: "OD-1",
                },
            ],
        }),
    };
});

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useOrderDetailInfo", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const history = createMemoryHistory();

const order = createMockOrderData();
const locations = createMockLocation();
const student = createMockStudentInfo();
const defaultUseOrderDetailInfoData: OrderDetailInfoReturn = {
    order: order,
    locations: locations,
    student: student,
    isFetchingAll: false,
    refetch: jest.fn(),
};

const mockUseOrderDetailInfo = (
    useOrderDetailInfoData: OrderDetailInfoReturn = defaultUseOrderDetailInfoData
) => {
    (useOrderDetailInfo as jest.Mock).mockReturnValue(useOrderDetailInfoData);
};

const renderOrderDetailComponent = () => {
    return render(
        <TestApp>
            <Router history={history}>
                <TestQueryWrapper>
                    <OrderDetailPage />
                </TestQueryWrapper>
            </Router>
        </TestApp>
    );
};

describe("<OrderDetail />", () => {
    it("should render Breadcrumbs, General Information", () => {
        mockUseOrderDetailInfo();

        renderOrderDetailComponent();

        expect(screen.getByTestId("OrderDetail__breadcrumbs")).toBeInTheDocument();
        expect(screen.getByText("General Info")).toBeInTheDocument();
    });

    it("should render billing item table, product list table and action log table", () => {
        mockUseOrderDetailInfo();

        renderOrderDetailComponent();

        expect(screen.getByTestId("OrderDetail__root")).toBeInTheDocument();
        expect(screen.getByText("Billing Item")).toBeInTheDocument();
        expect(screen.getByTestId("OrderDetailProductListTable__root")).toBeInTheDocument();
        expect(screen.getByText("Action Log")).toBeInTheDocument();
        expect(screen.getByTestId("OrderDetailBillingItemTable__root")).toBeInTheDocument();
        expect(screen.getByText("Product List")).toBeInTheDocument();
        expect(screen.getByTestId("OrderDetailActionLogTable__root")).toBeInTheDocument();
    });

    it("should render UI breadcrumb with name have to format OD-XX and href have the attribute  '/orders'", () => {
        mockUseOrderDetailInfo();

        renderOrderDetailComponent();

        expect(screen.getByTestId("BreadcrumbItem")).toBeInTheDocument();
        expect(screen.getByTestId("BreadcrumbItem")).toHaveAttribute("href", `/${Entities.ORDERS}`);

        expect(screen.getByTestId("Breadcrumbs__entityName")).toBeInTheDocument();
        expect(screen.getByTestId("Breadcrumbs__entityName")).toHaveTextContent(
            getOrderSequenceNumberPrefix(order.order_sequence_number)
        );
    });

    it("should go to order management page when click breadcrumbs", () => {
        mockUseOrderDetailInfo();

        renderOrderDetailComponent();

        userEvent.click(screen.getByTestId("BreadcrumbItem"));

        expect(history.location.pathname).toEqual(`/${Entities.ORDERS}`);
    });

    it("should render loading icon when data is fetching", () => {
        mockUseOrderDetailInfo({
            ...defaultUseOrderDetailInfoData,
            isFetchingAll: true,
        });

        renderOrderDetailComponent();

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should render notfound component when order is undefined", () => {
        mockUseOrderDetailInfo({
            ...defaultUseOrderDetailInfoData,
            order: undefined,
        });

        renderOrderDetailComponent();

        expect(screen.getByTestId("OrderDetail__notfound")).toBeInTheDocument();
    });

    it("should not displayed product list section if orderType is ORDER_TYPE_CUSTOM_BILLING", () => {
        mockUseOrderDetailInfo({
            ...defaultUseOrderDetailInfoData,
            order: { ...order, order_type: KeyOrderTypes.ORDER_TYPE_CUSTOM_BILLING },
        });

        renderOrderDetailComponent();

        expect(screen.queryByText("Product List")).not.toBeInTheDocument();
    });
});
