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

import { BillingStatus, MaterialType } from "manabuf/payment/v1/enums_pb";

import { render, screen, within } from "@testing-library/react";
import OrderDetailsPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/order-details/OrderDetailsPluginsProvider";
import TestApp from "src/squads/payment/test-utils/TestApp";

const mockRetrieveBillingItem = createMockRetrieveBillingItem();
const mockRetrieveAdjustmentBillingItem = createMockRetrieveAdjustmentBillingItem();
const mockPagination = createMockPaginationWithTotalObject(5);

const defaultOrderDetailBillingItemTableProps: OrderDetailBillingItemTableProps = {
    dataSource: mockRetrieveBillingItem,
    loading: false,
    pagination: mockPagination,
};

const { currentCurrency } = getCurrentCurrency();

const numberOfColumns = 6;
const notImplementedYetColumns = 1;
const defaultNumberOfRowsPerPage = "5";

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

const statusBillings = {
    [BillingStatus.BILLING_STATUS_PENDING]: "Pending",
    [BillingStatus.BILLING_STATUS_BILLED]: "Billed",
    [BillingStatus.BILLING_STATUS_CANCELLED]: "Cancelled",
    [BillingStatus.BILLING_STATUS_WAITING_APPROVAL]: "Waiting",
    [BillingStatus.BILLING_STATUS_INVOICED]: "Invoiced",
};

describe("<OrderDetailBillingItemTable />", () => {
    it("should render table UI include header, Billing No, Content, Status, Billing Date, Amount, default number of rows per page", () => {
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

        const footer = screen.getByTestId("TableBaseFooter");
        expect(footer.querySelector("input")).toHaveValue(defaultNumberOfRowsPerPage);

        const rows = screen.getAllByTestId("TableBase__row");

        expect(rows.length).toBeGreaterThan(0);
        expect(rows).toHaveLength(mockRetrieveBillingItem.length);

        rows.forEach((row, index) => {
            expect(
                within(row).getByTestId("OrderDetailBillingItemTable__billingNumber")
            ).toHaveTextContent(
                getBillingItemNumberPrefix(mockRetrieveBillingItem[index].billItemSequenceNumber)
            );

            expect(mockRetrieveBillingItem[index].billItemDescription).toBeTruthy();

            expect(within(row).getByTestId("BillingItemCell__productName")).toHaveTextContent(
                mockRetrieveBillingItem[index].billItemDescription!.productName
            );

            expect(
                within(row).getByTestId("OrderDetailBillingItemTable__billingDate")
            ).toHaveTextContent(
                formatDate(
                    convertTimestampToDate(mockRetrieveBillingItem[index].billingDate),
                    "yyyy/LL/dd"
                )
            );

            expect(
                within(row).getByTestId("OrderDetailBillingItemTable__status")
            ).toHaveTextContent(statusBillings[mockRetrieveBillingItem[index].billingStatus]);

            expect(
                within(row).getByTestId("OrderDetailBillingItemTable__amount")
            ).toHaveTextContent(
                getFormattedItemPrice(currentCurrency, false, mockRetrieveBillingItem[index].amount)
            );
        });
    });

    it("should render skeleton when loading", () => {
        renderOrderDetailBillingItemTable({
            dataSource: mockRetrieveBillingItem,
            loading: true,
            pagination: mockPagination,
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

    it("should render billing item table with one-time material product", () => {
        const productMaterialOneTime = mockRetrieveBillingItem[0];
        renderOrderDetailBillingItemTable({
            dataSource: [productMaterialOneTime],
            loading: false,
            pagination: mockPagination,
        });
        expect(screen.getByTestId("BillingItemCell__productName")).toHaveTextContent(
            productMaterialOneTime.billItemDescription!.productName
        );
        const amount = getFormattedItemPrice(currentCurrency, false, productMaterialOneTime.amount);
        expect(screen.getByTestId("OrderDetailBillingItemTable__amount")).toHaveTextContent(amount);
    });

    it("should render billing item table with recurring material product", () => {
        const billingItemMaterialRecurring = mockRetrieveBillingItem.find(
            ({ orderId }) => orderId === "order_id_4"
        )!;

        expect(billingItemMaterialRecurring).toBeTruthy();

        renderOrderDetailBillingItemTable({
            dataSource: [billingItemMaterialRecurring],
            loading: false,
            pagination: mockPagination,
        });

        const { productName, billingPeriodName, billingRatioNumerator, billingRatioDenominator } =
            billingItemMaterialRecurring.billItemDescription!;

        expect(screen.getByTestId("BillingItemCell__productName")).toHaveTextContent(
            `${productName} - ${billingPeriodName.value} (billing ratio: ${billingRatioNumerator.value}/${billingRatioDenominator.value})`
        );

        const amount = getFormattedItemPrice(
            currentCurrency,
            false,
            billingItemMaterialRecurring.amount
        );

        expect(screen.getByTestId("OrderDetailBillingItemTable__amount")).toHaveTextContent(amount);
    });

    it("should render billing item table with one-time package product", () => {
        const billingItemOneTimePackage = mockRetrieveBillingItem.find(
            ({ orderId }) => orderId === "order_id_5"
        )!;

        expect(billingItemOneTimePackage).toBeTruthy();

        renderOrderDetailBillingItemTable({
            dataSource: [billingItemOneTimePackage],
            loading: false,
            pagination: mockPagination,
        });

        const { productName, courseItemsList } = billingItemOneTimePackage.billItemDescription!;

        expect(screen.getByTestId("BillingItemCell__productName")).toHaveTextContent(productName);

        const amount = getFormattedItemPrice(
            currentCurrency,
            false,
            billingItemOneTimePackage.amount
        );

        expect(screen.getByTestId("OrderDetailBillingItemTable__amount")).toHaveTextContent(amount);

        screen.getAllByTestId("BillingListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(`${courseItemsList[index].courseName}`);
        });
    });

    it("should render billing item table with slot-based package product", () => {
        const billingItemSlotBasedPackage = mockRetrieveBillingItem.find(
            ({ orderId }) => orderId === "order_id_6"
        )!;

        expect(billingItemSlotBasedPackage).toBeTruthy();

        renderOrderDetailBillingItemTable({
            dataSource: [billingItemSlotBasedPackage],
            loading: false,
            pagination: mockPagination,
        });

        const { productName, courseItemsList } = billingItemSlotBasedPackage.billItemDescription!;

        expect(screen.getByTestId("BillingItemCell__productName")).toHaveTextContent(productName);

        const amount = getFormattedItemPrice(
            currentCurrency,
            false,
            billingItemSlotBasedPackage.amount
        );

        expect(screen.getByTestId("OrderDetailBillingItemTable__amount")).toHaveTextContent(amount);

        screen.getAllByTestId("BillingListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(
                `${courseItemsList[index].courseName} (${courseItemsList[index].slot.value})`
            );
        });
    });

    it("should render billing item table not implemented yet when without plugin", async () => {
        const productNoneType = mockRetrieveBillingItem[0];
        productNoneType.billItemDescription!.materialType = MaterialType.MATERIAL_TYPE_NONE;
        renderOrderDetailBillingItemTable({
            dataSource: [productNoneType],
            loading: false,
            pagination: mockPagination,
        });
        expect(screen.getAllByTestId("NotImplementYet__label")).toHaveLength(
            notImplementedYetColumns
        );
        expect(await screen.findByText("Not implemented yet")).toBeInTheDocument();
    });

    it("should render empty when billItemDescription is falsy", () => {
        const newMockRetrieveBillingItem = mockRetrieveBillingItem.map((item) => {
            item.billItemDescription = undefined;
            return { ...item };
        });
        const props = {
            ...defaultOrderDetailBillingItemTableProps,
            dataSource: newMockRetrieveBillingItem,
        };
        renderOrderDetailBillingItemTable({ ...props });
        const rows = screen.getAllByTestId("TableBase__row");

        expect(rows.length).toBeGreaterThan(0);
        expect(rows).toHaveLength(mockRetrieveBillingItem.length);

        rows.forEach((row) => {
            expect(within(row).getByTestId("BillingItemCell__noData")).toBeEmptyDOMElement();
        });
    });

    it("should render name with adjustment tag for adjustment bill items", () => {
        const wrapper = renderOrderDetailBillingItemTable({
            ...defaultOrderDetailBillingItemTableProps,
            dataSource: mockRetrieveAdjustmentBillingItem,
        });

        const billingRowList = wrapper.getAllByTestId("TableBase__row");

        expect(billingRowList.length).toBeGreaterThan(0);

        billingRowList.forEach((billingItemsRow, index) => {
            const {
                productName,
                billingPeriodName,
                billingRatioNumerator,
                billingRatioDenominator,
            } = mockRetrieveAdjustmentBillingItem[index].billItemDescription!;
            let expectedProductName = "[Adjustment] " + productName;

            if (billingPeriodName) {
                expectedProductName += ` - ${billingPeriodName.value} (billing ratio: ${billingRatioNumerator.value}/${billingRatioDenominator.value})`;
            }
            expect(within(billingItemsRow).getByText(expectedProductName));
        });
    });
});
