import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createMockRetrieveOrderItems } from "src/squads/payment/test-utils/mocks/order-items";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import TranslationProvider from "src/providers/TranslationProvider";
import OrderDetailProductListTable, {
    OrderDetailProductListTableProps,
} from "src/squads/payment/domains/OrderManagement/components/Tables/OrderDetailProductListTable";

import { render, RenderResult, screen, within } from "@testing-library/react";
import OrderDetailsPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/order-details/OrderDetailsPluginsProvider";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockScheduleBasedPackageOrderItems = createMockRetrieveOrderItems()[3];
const mockPagination = createMockPaginationWithTotalObject();

const { currentCurrency } = getCurrentCurrency();

const defaultOrderDetailProductListTableProps: OrderDetailProductListTableProps = {
    dataSource: [mockScheduleBasedPackageOrderItems],
    loading: false,
    pagination: mockPagination,
};

const renderOrderDetailProductListTable = (
    orderDetailProductListTableProps: OrderDetailProductListTableProps = defaultOrderDetailProductListTableProps
) => {
    const wrapper: RenderResult = render(
        <TranslationProvider>
            <OrderDetailsPluginsProvider>
                <TestApp>
                    <TestThemeProvider>
                        <OrderDetailProductListTable {...orderDetailProductListTableProps} />
                    </TestThemeProvider>
                </TestApp>
            </OrderDetailsPluginsProvider>
        </TranslationProvider>
    );

    expect(screen.getByTestId("OrderDetailProductListTable__root")).toBeInTheDocument();

    expect(screen.getByTestId("TableBase__header").getElementsByTagName("th")).toHaveLength(
        numberOfColumns
    );

    return wrapper;
};

const numberOfColumns = 3;

describe("<OrderDetailProductListTable />", () => {
    it("should render product list table with schedule based package product data correctly", () => {
        renderOrderDetailProductListTable();

        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Amount")).toBeInTheDocument();
        expect(screen.getByText("Discount")).toBeInTheDocument();
        expect(screen.getByText("Start Date")).toBeInTheDocument();

        const ProductItemRow = screen.getByTestId("TableBase__row");

        expect(
            within(ProductItemRow).getByTestId("ProductListCell__productName")
        ).toHaveTextContent(mockScheduleBasedPackageOrderItems.productName);
        expect(
            within(ProductItemRow).getByTestId("ProductListCell__discountRow")
        ).toHaveTextContent("--");
        expect(
            within(ProductItemRow).getByTestId("ProductListCell__startDateRow")
        ).toHaveTextContent(
            formatDate(
                convertTimestampToDate(mockScheduleBasedPackageOrderItems.startDate),
                "yyyy/LL/dd"
            )
        );
        expect(
            within(ProductItemRow).getByTestId("OrderDetailProductListTable__amount")
        ).toHaveTextContent(
            getFormattedItemPrice(currentCurrency, false, mockScheduleBasedPackageOrderItems.amount)
        );
    });

    it("should render skeleton when loading", () => {
        renderOrderDetailProductListTable({
            ...defaultOrderDetailProductListTableProps,
            loading: true,
        });

        expect(screen.getAllByTestId("TableSke__item").length).toBeGreaterThan(0);
    });

    it("should render no data message when there is no data", () => {
        renderOrderDetailProductListTable({
            dataSource: [],
            loading: false,
            pagination: mockPagination,
        });

        const table = screen.getByTestId("OrderDetailProductListTable__root");

        expect(table).toBeInTheDocument();
        expect(within(table).getByText("No Information")).toBeInTheDocument();
    });

    it("should render schedule based package product list table with discount when discount is available", () => {
        const discountInfo = {
            discountName: "Discount 2",
            discountId: "discount_id_2",
        };
        renderOrderDetailProductListTable({
            ...defaultOrderDetailProductListTableProps,
            dataSource: [{ ...mockScheduleBasedPackageOrderItems, discountInfo }],
        });

        expect(screen.getByText("Discount")).toBeInTheDocument();

        const ProductItemRow = screen.getByTestId("TableBase__row");

        expect(
            within(ProductItemRow).getByTestId("ProductListCell__discountRow")
        ).toHaveTextContent(discountInfo.discountName);
    });
});
