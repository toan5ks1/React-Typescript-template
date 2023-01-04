import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { getBillingItemNumberPrefix } from "src/squads/payment/helpers/order-details";
import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import {
    createMockRetrieveAdjustmentBillingItem,
    createMockRetrieveBillingItem,
} from "src/squads/payment/test-utils/mocks/bill-item";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import TranslationProvider from "src/providers/TranslationProvider";
import OrderDetailBillingItemTable, {
    OrderDetailBillingItemTableProps,
} from "src/squads/payment/domains/OrderManagement/components/Tables/OrderDetailBillingItemTable";

import { render, screen, within } from "@testing-library/react";
import OrderDetailsPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/order-details/OrderDetailsPluginsProvider";
import TestApp from "src/squads/payment/test-utils/TestApp";

const mockScheduleBasedPackageRetrieveBillingItem = createMockRetrieveBillingItem()[2];
const mockScheduleBasedPackageRetrieveAdjustmentBillingItem =
    createMockRetrieveAdjustmentBillingItem()[1];
const mockPagination = createMockPaginationWithTotalObject();

const defaultOrderDetailBillingItemTableProps: OrderDetailBillingItemTableProps = {
    dataSource: [mockScheduleBasedPackageRetrieveBillingItem],
    loading: false,
    pagination: mockPagination,
};

const { currentCurrency } = getCurrentCurrency();

const numberOfColumns = 6;

const renderOrderDetailBillingItemTable = (
    orderDetailBillingItemTableProps: OrderDetailBillingItemTableProps = defaultOrderDetailBillingItemTableProps
) => {
    return render(
        <TranslationProvider>
            <OrderDetailsPluginsProvider>
                <TestApp>
                    <OrderDetailBillingItemTable {...orderDetailBillingItemTableProps} />
                </TestApp>
            </OrderDetailsPluginsProvider>
        </TranslationProvider>
    );
};

describe("<OrderDetailBillingItemTable />", () => {
    it("should render schedule based package product with correct column and data", () => {
        renderOrderDetailBillingItemTable();
        expect(screen.getByTestId("TableBase__header").getElementsByTagName("th")).toHaveLength(
            numberOfColumns
        );
        expect(screen.getByTestId("OrderDetailBillingItemTable__root")).toBeInTheDocument();
        expect(screen.getByText("Billing No.")).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Billing Date")).toBeInTheDocument();
        expect(screen.getByText("Amount")).toBeInTheDocument();

        const billingItemRow = screen.getByTestId("TableBase__row");

        expect(
            within(billingItemRow).getByTestId("OrderDetailBillingItemTable__billingNumber")
        ).toHaveTextContent(
            getBillingItemNumberPrefix(
                mockScheduleBasedPackageRetrieveBillingItem.billItemSequenceNumber
            )
        );
        expect(mockScheduleBasedPackageRetrieveBillingItem.billItemDescription).toBeTruthy();
        expect(
            within(billingItemRow).getByTestId("BillingItemCell__productName")
        ).toHaveTextContent(
            mockScheduleBasedPackageRetrieveBillingItem.billItemDescription!.productName
        );
        expect(
            within(billingItemRow).getByTestId("OrderDetailBillingItemTable__status")
        ).toHaveTextContent("Pending");
        expect(
            within(billingItemRow).getByTestId("OrderDetailBillingItemTable__billingDate")
        ).toHaveTextContent(
            formatDate(
                convertTimestampToDate(mockScheduleBasedPackageRetrieveBillingItem.billingDate),
                "yyyy/LL/dd"
            )
        );
        expect(
            within(billingItemRow).getByTestId("OrderDetailBillingItemTable__amount")
        ).toHaveTextContent(
            getFormattedItemPrice(
                currentCurrency,
                false,
                mockScheduleBasedPackageRetrieveBillingItem.amount
            )
        );
    });

    it("should render skeleton when loading", () => {
        renderOrderDetailBillingItemTable({
            ...defaultOrderDetailBillingItemTableProps,
            loading: true,
        });
        expect(screen.getAllByTestId("TableSke__item").length).toBeGreaterThan(0);
    });

    it("should render no data message when there is no data", () => {
        renderOrderDetailBillingItemTable({
            ...defaultOrderDetailBillingItemTableProps,
            dataSource: [],
        });

        const table = screen.getByTestId("OrderDetailBillingItemTable__root");

        expect(table).toBeInTheDocument();
        expect(within(table).getByText("No Information")).toBeInTheDocument();
    });

    it("should render billing item cell with schedule based package product", () => {
        renderOrderDetailBillingItemTable();

        const { productName, billingPeriodName, billingRatioNumerator, billingRatioDenominator } =
            mockScheduleBasedPackageRetrieveBillingItem.billItemDescription!;
        const expectedProductName = `${productName!} - ${billingPeriodName.value} (billing ratio: ${
            billingRatioNumerator.value
        }/${billingRatioDenominator.value})`;

        expect(screen.getByTestId("BillingItemCell__productName")).toHaveTextContent(
            expectedProductName
        );

        const amount = getFormattedItemPrice(
            currentCurrency,
            false,
            mockScheduleBasedPackageRetrieveBillingItem.amount
        );
        expect(screen.getByTestId("OrderDetailBillingItemTable__amount")).toHaveTextContent(amount);
    });

    it("should render schedule based package name with adjustment tag for schedule based package adjustment bill items", () => {
        const wrapper = renderOrderDetailBillingItemTable({
            ...defaultOrderDetailBillingItemTableProps,
            dataSource: [mockScheduleBasedPackageRetrieveAdjustmentBillingItem],
        });

        const { productName, billingPeriodName, billingRatioNumerator, billingRatioDenominator } =
            mockScheduleBasedPackageRetrieveAdjustmentBillingItem.billItemDescription!;

        expect(
            within(wrapper.getByTestId("TableBase__row")).getByText(
                `[Adjustment] ${productName} - ${billingPeriodName.value} (billing ratio: ${billingRatioNumerator.value}/${billingRatioDenominator.value})`
            )
        );
    });
});
