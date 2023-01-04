import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createMockRetrieveOrderItems } from "src/squads/payment/test-utils/mocks/order-items";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import TranslationProvider from "src/providers/TranslationProvider";
import OrderDetailProductListTable, {
    OrderDetailProductListTableProps,
} from "src/squads/payment/domains/OrderManagement/components/Tables/OrderDetailProductListTable";

import { MaterialType } from "manabuf/payment/v1/enums_pb";

import { render, RenderResult, screen, within } from "@testing-library/react";
import OrderDetailsPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/order-details/OrderDetailsPluginsProvider";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockOrderItems = createMockRetrieveOrderItems();
const mockPagination = createMockPaginationWithTotalObject(5);

const { currentCurrency } = getCurrentCurrency();

const defaultOrderDetailProductListTableProps: OrderDetailProductListTableProps = {
    dataSource: [],
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

const notImplementedYetColumns = 1;

const defaultNumberOfRowsPerPage = "5";

describe("<OrderDetailProductListTable />", () => {
    it("should render table UI include product name, amount,  default number of rows per page, number of products", () => {
        renderOrderDetailProductListTable({
            dataSource: mockOrderItems,
            loading: false,
            pagination: mockPagination,
        });

        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Amount")).toBeInTheDocument();
        expect(screen.getAllByTestId("TableBase__row")).toHaveLength(mockOrderItems.length);
        expect(screen.getAllByTestId("TableIndexCell__index")).toHaveLength(
            mockOrderItems.length + 1 // index column
        );

        const footer = screen.getByTestId("TableBaseFooter");
        expect(footer.querySelector("input")).toHaveValue(defaultNumberOfRowsPerPage);
    });

    it("should render skeleton when loading", () => {
        renderOrderDetailProductListTable({
            dataSource: mockOrderItems,
            loading: true,
            pagination: mockPagination,
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

    it("should render product list table with one-time material product", () => {
        const productMaterialOneTime = mockOrderItems[0];

        renderOrderDetailProductListTable({
            dataSource: [productMaterialOneTime],
            loading: false,
            pagination: mockPagination,
        });

        expect(screen.getByTestId("ProductListCell__productName")).toHaveTextContent(
            productMaterialOneTime.productName!
        );

        expect(screen.getByTestId("ProductListCell__discountRow")).toHaveTextContent(
            productMaterialOneTime.discountInfo?.discountName!
        );

        const amount = getFormattedItemPrice(currentCurrency, false, productMaterialOneTime.amount);

        expect(screen.getByTestId("OrderDetailProductListTable__amount")).toHaveTextContent(amount);
    });

    it("should render product list table with recurring material product", () => {
        const productMateriaRecurring = mockOrderItems.find(
            ({ productId }) => productId === "product_id_5"
        )!;

        expect(productMateriaRecurring).toBeTruthy();

        renderOrderDetailProductListTable({
            dataSource: [productMateriaRecurring],
            loading: false,
            pagination: mockPagination,
        });

        expect(screen.getByTestId("ProductListCell__productName")).toHaveTextContent(
            productMateriaRecurring.productName!
        );

        expect(screen.getByTestId("ProductListCell__discountRow")).toHaveTextContent(
            productMateriaRecurring.discountInfo?.discountName!
        );

        const startDate = formatDate(
            convertTimestampToDate(productMateriaRecurring.startDate),
            "yyyy/LL/dd"
        );

        expect(screen.getByTestId("ProductListCell__startDateRow")).toHaveTextContent(startDate);

        const amount = getFormattedItemPrice(
            currentCurrency,
            false,
            productMateriaRecurring.amount
        );

        expect(screen.getByTestId("OrderDetailProductListTable__amount")).toHaveTextContent(amount);
    });

    it("should render product list table with one-time package product", () => {
        const productOneTimePackage = mockOrderItems.find(
            ({ productId }) => productId === "product_id_6"
        )!;

        expect(productOneTimePackage).toBeTruthy();

        renderOrderDetailProductListTable({
            dataSource: [productOneTimePackage],
            loading: false,
            pagination: mockPagination,
        });

        const { productName, courseItemsList, discountInfo } = productOneTimePackage;

        expect(screen.getByTestId("ProductListCell__productName")).toHaveTextContent(productName);

        screen.getAllByTestId("ProductListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(courseItemsList[index].courseName);
        });

        expect(screen.getByTestId("ProductListCell__discountRow")).toHaveTextContent(
            discountInfo?.discountName!
        );

        const amount = getFormattedItemPrice(currentCurrency, false, productOneTimePackage.amount);

        expect(screen.getByTestId("OrderDetailProductListTable__amount")).toHaveTextContent(amount);
    });

    it("should render product list table with slot-based package product", () => {
        const productSlotBasedPackage = mockOrderItems.find(
            ({ productId }) => productId === "product_id_7"
        )!;

        expect(productSlotBasedPackage).toBeTruthy();

        renderOrderDetailProductListTable({
            dataSource: [productSlotBasedPackage],
            loading: false,
            pagination: mockPagination,
        });

        const { productName, courseItemsList, discountInfo } = productSlotBasedPackage;

        expect(screen.getByTestId("ProductListCell__productName")).toHaveTextContent(productName);

        screen.getAllByTestId("ProductListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(
                `${courseItemsList[index].courseName} (${courseItemsList[index].slot.value})`
            );
        });

        expect(screen.getByTestId("ProductListCell__discountRow")).toHaveTextContent(
            discountInfo?.discountName!
        );

        const amount = getFormattedItemPrice(
            currentCurrency,
            false,
            productSlotBasedPackage.amount
        );

        expect(screen.getByTestId("OrderDetailProductListTable__amount")).toHaveTextContent(amount);
    });

    it("should render product list table without type of material product", async () => {
        const productItemWithNoneType = mockOrderItems[0];

        productItemWithNoneType.materialType = MaterialType.MATERIAL_TYPE_NONE;

        renderOrderDetailProductListTable({
            dataSource: [productItemWithNoneType],
            loading: false,
            pagination: mockPagination,
        });

        expect(screen.getAllByTestId("NotImplementYet__label")).toHaveLength(
            notImplementedYetColumns
        );

        expect(await screen.findByText("Not implemented yet")).toBeInTheDocument();
    });
});
