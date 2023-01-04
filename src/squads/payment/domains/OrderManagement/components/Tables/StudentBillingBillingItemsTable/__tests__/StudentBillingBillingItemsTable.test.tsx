import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { getBillingItemNumberPrefix } from "src/squads/payment/helpers/order-details";
import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import {
    createMockAdjustmentBillItems,
    createMockBillingItems,
} from "src/squads/payment/test-utils/mocks/bill-item";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import StudentBillingBillingItemsTable, {
    StudentBillingBillingItemsTableProps,
} from "src/squads/payment/domains/OrderManagement/components/Tables/StudentBillingBillingItemsTable/StudentBillingBillingItemsTable";

import { BillingType } from "manabuf/payment/v1/enums_pb";

import { render, within } from "@testing-library/react";
import StudentBillingPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/student-billing/StudentBillingPluginsProvider";
import TestApp from "src/squads/payment/test-utils/TestApp";

const mockBillingItems = createMockBillingItems();
const mockAdjustmentBillingItems = createMockAdjustmentBillItems();
const mockPagination = createMockPaginationWithTotalObject();

const numberOfColumns = 7;
const numberOfMockData = mockBillingItems.length;

const defaultStudentBillingBillingItemsTableProps: StudentBillingBillingItemsTableProps = {
    dataSource: mockBillingItems,
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
    it("should render billing items table and column correctly", () => {
        const wrapper = renderStudentBillingBillingTable();

        expect(wrapper.getByTestId("StudentBillingBillingItemsTable__root")).toBeInTheDocument();

        const columns = wrapper.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns).toHaveLength(numberOfColumns);

        expect(wrapper.getAllByTestId("TableBase__row")).toHaveLength(numberOfMockData);

        expect(wrapper.getByText("Location")).toBeInTheDocument();
        expect(wrapper.getByText("Billing No.")).toBeInTheDocument();
        expect(wrapper.getByText("Billing Item")).toBeInTheDocument();
        expect(wrapper.getByText("Status")).toBeInTheDocument();
        expect(wrapper.getByText("Billing Date")).toBeInTheDocument();
        expect(wrapper.getByText("Amount")).toBeInTheDocument();
    });

    it("should render correctly orders table with data", () => {
        const wrapper = renderStudentBillingBillingTable();

        const billingRowList = wrapper.getAllByTestId("TableBase__row");

        expect(billingRowList.length).toBeGreaterThan(0);
        expect(billingRowList).toHaveLength(numberOfMockData);

        billingRowList.forEach((billingItemsRow, index) => {
            const finalAmount =
                mockBillingItems[index].billingType === BillingType.BILLING_TYPE_ADJUSTMENT_BILLING
                    ? mockBillingItems[index].adjustmentPrice.value
                    : mockBillingItems[index].amount;
            expect(
                within(billingItemsRow).getByTestId("StudentBillingBillingItemsTable__location")
            ).toHaveTextContent(mockBillingItems[index].locationInfo?.locationName!);
            expect(
                within(billingItemsRow).getByTestId(
                    "StudentBillingBillingItemsTable__billingNumber"
                )
            ).toHaveTextContent(getBillingItemNumberPrefix(mockBillingItems[index].billingNo));
            expect(
                within(billingItemsRow).getByTestId(
                    "OnetimeAndSlotBasedBillItemDescriptionCell__productName"
                )
            ).toHaveTextContent(mockBillingItems[index].billItemDescription?.productName!);
            expect(
                within(billingItemsRow).getByTestId("StudentBillingBillingItemsTable__status")
            ).toBeInTheDocument();
            expect(
                within(billingItemsRow).getByTestId("StudentBillingBillingItemsTable__billingDate")
            ).toHaveTextContent(
                formatDate(
                    convertTimestampToDate(mockBillingItems[index].billingDate),
                    "yyyy/LL/dd"
                )
            );
            expect(
                within(billingItemsRow).getByTestId("StudentBillingBillingItemsTable__amount")
            ).toHaveTextContent(getFormattedItemPrice(currentCurrency, false, finalAmount));
        });
    });

    it("should render no data message when there is no data", () => {
        const wrapper = renderStudentBillingBillingTable({
            ...defaultStudentBillingBillingItemsTableProps,
            dataSource: [],
        });

        expect(wrapper.getByTestId("StudentBillingBillingItemsTable__root")).toBeInTheDocument();
        expect(wrapper.getByTestId("TableBase__noDataMessage")).toHaveTextContent(
            "ra.message.noDataInformation"
        );
    });

    it("should render name with adjustment tag for adjustment bill items", () => {
        const wrapper = renderStudentBillingBillingTable({
            ...defaultStudentBillingBillingItemsTableProps,
            dataSource: mockAdjustmentBillingItems,
        });

        const billingRowList = wrapper.getAllByTestId("TableBase__row");

        expect(billingRowList.length).toBeGreaterThan(0);

        billingRowList.forEach((billingItemsRow, index) => {
            expect(
                within(billingItemsRow).getByText(
                    `[Adjustment] ${mockAdjustmentBillingItems[index].billItemDescription?.productName}`
                )
            );
        });
    });
});
