import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { getBillingItemNumberPrefix } from "src/squads/payment/helpers/order-details";
import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import StudentBillingBillingItemsTable, {
    StudentBillingBillingItemsTableProps,
} from "src/squads/payment/domains/OrderManagement/components/Tables/StudentBillingBillingItemsTable/StudentBillingBillingItemsTable";

import {
    BillingStatus,
    BillingType,
    FeeType,
    MaterialType,
    PackageType,
    ProductType,
    QuantityType,
} from "manabuf/payment/v1/enums_pb";
import {
    BillItemDescription,
    LocationInfo,
    RetrieveListOfBillItemsResponse,
} from "manabuf/payment/v1/order_pb";

import { render } from "@testing-library/react";
import StudentBillingPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/student-billing/StudentBillingPluginsProvider";
import TestApp from "src/squads/payment/test-utils/TestApp";

interface StudentBillingBillItemsMock extends RetrieveListOfBillItemsResponse.BillItems.AsObject {
    locationInfo: LocationInfo.AsObject;
    billItemDescription: BillItemDescription.AsObject;
}

const defaultMockBillItemRecurringMaterial: StudentBillingBillItemsMock = {
    index: 1,
    locationInfo: {
        locationId: "location_id_1",
        locationName: "location 1",
    },
    billingNo: 1,
    orderId: "",
    billItemDescription: {
        productId: "product_id_1",
        productName: "Product 1",
        productType: ProductType.PRODUCT_TYPE_MATERIAL,
        materialType: MaterialType.MATERIAL_TYPE_RECURRING,
        packageType: PackageType.PACKAGE_TYPE_NONE,
        feeType: FeeType.FEE_TYPE_ONE_TIME,
        quantityType: QuantityType.QUANTITY_TYPE_NONE,
        courseItemsList: [],
        billingPeriodName: { value: "Period 1" },
        billingRatioNumerator: { value: 1 },
        billingRatioDenominator: { value: 1 },
    },
    billingStatus: BillingStatus.BILLING_STATUS_BILLED,
    billingType: BillingType.BILLING_TYPE_BILLED_AT_ORDER,
    billingDate: {
        seconds: 1653082844,
        nanos: 222943000,
    },
    amount: 10000,
};

const createMockBillItemsRecurringMaterial = (): StudentBillingBillItemsMock[] => {
    return [
        {
            ...defaultMockBillItemRecurringMaterial,
        },
        {
            ...defaultMockBillItemRecurringMaterial,
            index: 2,
            billingNo: 2,
            billItemDescription: {
                ...defaultMockBillItemRecurringMaterial.billItemDescription,
                productId: "product_id_2",
                productName: "Product 2",
            },
            billingStatus: BillingStatus.BILLING_STATUS_BILLED,
            billingType: BillingType.BILLING_TYPE_UPCOMING_BILLING,
            amount: 10000,
        },
    ];
};

const mockRecurringBillingItems = createMockBillItemsRecurringMaterial();
const mockPagination = createMockPaginationWithTotalObject();

const numberOfMockRecurringData = mockRecurringBillingItems.length;

const defaultStudentBillingBillingItemsTableProps: StudentBillingBillingItemsTableProps = {
    dataSource: mockRecurringBillingItems,
    loading: false,
    pagination: mockPagination,
};

const { currentCurrency } = getCurrentCurrency();

const renderStudentBillingBillingTable = (
    studentBillingBillingTableProps: StudentBillingBillingItemsTableProps = defaultStudentBillingBillingItemsTableProps
) => {
    return render(
        <StudentBillingPluginsProvider>
            <TestApp>
                <StudentBillingBillingItemsTable {...studentBillingBillingTableProps} />
            </TestApp>
        </StudentBillingPluginsProvider>
    );
};

describe("<StudentBillingBillingItemsTable />", () => {
    it("should render orders table with recurring material data", () => {
        const wrapper = renderStudentBillingBillingTable();

        const billingRowList = wrapper.getAllByTestId("TableBase__row");

        expect(billingRowList.length).toBeGreaterThan(0);
        expect(billingRowList).toHaveLength(numberOfMockRecurringData);

        billingRowList.forEach((billingItemsRow, index) => {
            const tableColumns = billingItemsRow.getElementsByTagName("td");

            const columnLocation = tableColumns[1];
            expect(columnLocation).toHaveTextContent(
                mockRecurringBillingItems[index].locationInfo.locationName
            );

            const columnBillingNo = tableColumns[2];
            expect(columnBillingNo).toHaveTextContent(
                getBillingItemNumberPrefix(mockRecurringBillingItems[index].billingNo)
            );

            const columnBillingItem = tableColumns[3];
            const billItemDescription = mockRecurringBillingItems[index].billItemDescription;
            const billingItem = `${billItemDescription.productName} - ${billItemDescription.billingPeriodName.value} (billing ratio: ${billItemDescription.billingRatioNumerator.value}/${billItemDescription.billingRatioDenominator.value})`;
            expect(columnBillingItem).toHaveTextContent(billingItem);

            const columnBillingDate = tableColumns[5];
            expect(columnBillingDate).toHaveTextContent(
                formatDate(
                    convertTimestampToDate(mockRecurringBillingItems[index].billingDate),
                    "yyyy/LL/dd"
                )
            );
        });
    });
    it("should render orders table with Billed status and amount price", () => {
        const wrapper = renderStudentBillingBillingTable();

        const billingRowList = wrapper.getAllByTestId("TableBase__row");

        billingRowList.forEach((billingItemsRow, index) => {
            const tableColumns = billingItemsRow.getElementsByTagName("td");

            const columnStatus = tableColumns[4];
            expect(columnStatus).toHaveTextContent("Billed");

            const columnAmount = tableColumns[6];
            const amount = mockRecurringBillingItems[index].amount;
            expect(columnAmount).toHaveTextContent(
                getFormattedItemPrice(currentCurrency, false, amount)
            );
        });
    });

    const createMockBillItemsRecurringMaterialWithAdjustment =
        (): StudentBillingBillItemsMock[] => {
            return [
                {
                    ...defaultMockBillItemRecurringMaterial,
                    billingStatus: BillingStatus.BILLING_STATUS_PENDING,
                    billingType: BillingType.BILLING_TYPE_ADJUSTMENT_BILLING,
                    adjustmentPrice: { value: 20000 },
                },
                {
                    ...defaultMockBillItemRecurringMaterial,
                    index: 2,
                    billingNo: 2,
                    billItemDescription: {
                        ...defaultMockBillItemRecurringMaterial.billItemDescription,
                        productId: "product_id_2",
                        productName: "Product 2",
                    },
                    billingStatus: BillingStatus.BILLING_STATUS_PENDING,
                    billingType: BillingType.BILLING_TYPE_ADJUSTMENT_BILLING,
                    adjustmentPrice: { value: 20000 },
                },
            ];
        };
    const mockRecurringBillingItemsWithAdjustment =
        createMockBillItemsRecurringMaterialWithAdjustment();
    it("should render orders table with Pending status and adjustment price", () => {
        const wrapper = renderStudentBillingBillingTable({
            ...defaultStudentBillingBillingItemsTableProps,
            dataSource: mockRecurringBillingItemsWithAdjustment,
        });

        const billingRowList = wrapper.getAllByTestId("TableBase__row");

        billingRowList.forEach((billingItemsRow, index) => {
            const tableColumns = billingItemsRow.getElementsByTagName("td");

            const columnStatus = tableColumns[4];
            expect(columnStatus).toHaveTextContent("Pending");

            const columnAmount = tableColumns[6];
            const adjustedAmount =
                mockRecurringBillingItemsWithAdjustment[index].adjustmentPrice.value;
            expect(columnAmount).toHaveTextContent(
                getFormattedItemPrice(currentCurrency, false, adjustedAmount)
            );
        });
    });
});
