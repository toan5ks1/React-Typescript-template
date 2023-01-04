import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { getOrderSequenceNumberPrefix } from "src/squads/payment/helpers/order-details";
import { createMockOrders } from "src/squads/payment/test-utils/mocks/order-items";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import StudentBillingOrdersTable, {
    getProductDetailsOrderList,
    StudentBillingOrdersTableProps,
} from "src/squads/payment/domains/OrderManagement/components/Tables/StudentBillingOrdersTable/StudentBillingOrdersTable";

import { render, within } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";

const mockOrders = createMockOrders();
const mockPagination = createMockPaginationWithTotalObject();

const numberOfColumns = 7;
const numberOfMockData = mockOrders.length;

const defaultStudentBillingOrdersTableProps: StudentBillingOrdersTableProps = {
    dataSource: mockOrders,
    loading: false,
    pagination: mockPagination,
};

const renderStudentBillingOrdersTable = (
    studentBillingOrdersTableProps: StudentBillingOrdersTableProps = defaultStudentBillingOrdersTableProps
) => {
    return render(
        <TestApp>
            <StudentBillingOrdersTable {...studentBillingOrdersTableProps} />
        </TestApp>
    );
};

describe("<StudentBillingOrdersTable />", () => {
    it("should render orders table and column correctly", () => {
        const wrapper = renderStudentBillingOrdersTable();

        expect(wrapper.getByTestId("StudentBillingOrdersTable__root")).toBeInTheDocument();

        const columns = wrapper.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns).toHaveLength(numberOfColumns);

        expect(wrapper.getAllByTestId("TableBase__row")).toHaveLength(numberOfMockData);

        expect(wrapper.getByText("Location")).toBeInTheDocument();
        expect(wrapper.getByText("Order No.")).toBeInTheDocument();
        expect(wrapper.getByText("Order Type")).toBeInTheDocument();
        expect(wrapper.getByText("Status")).toBeInTheDocument();
        expect(wrapper.getByText("Product Details")).toBeInTheDocument();
        expect(wrapper.getByText("Created Date")).toBeInTheDocument();
    });

    it("should render correctly orders table with data", () => {
        const wrapper = renderStudentBillingOrdersTable();

        const OrdersRowList = wrapper.getAllByTestId("TableBase__row");

        expect(OrdersRowList.length).toBeGreaterThan(0);
        expect(OrdersRowList).toHaveLength(numberOfMockData);

        OrdersRowList.forEach((OrdersRow, index) => {
            expect(
                within(OrdersRow).getByTestId("StudentBillingOrdersTable__location")
            ).toHaveTextContent(mockOrders[index].locationInfo?.locationName!);
            expect(
                within(OrdersRow).getByTestId("StudentBillingOrdersTable__orderNumber")
            ).toHaveTextContent(getOrderSequenceNumberPrefix(mockOrders[index].orderNo));
            expect(
                within(OrdersRow).getByTestId("StudentBillingOrdersTable__orderType")
            ).toHaveTextContent("New");
            expect(
                within(OrdersRow).getByTestId("StudentBillingOrdersTable__status")
            ).toBeInTheDocument();
            expect(
                within(OrdersRow).getByTestId("StudentBillingOrdersTable__productDetails")
            ).toHaveTextContent(getProductDetailsOrderList(mockOrders[index].productDetailsList));
            expect(
                within(OrdersRow).getByTestId("StudentBillingOrdersTable__createdDate")
            ).toHaveTextContent(
                formatDate(convertTimestampToDate(mockOrders[index].createDate), "yyyy/LL/dd")
            );
        });
    });

    it("should render no data message when there is no data", () => {
        const wrapper = renderStudentBillingOrdersTable({
            ...defaultStudentBillingOrdersTableProps,
            dataSource: [],
        });

        expect(wrapper.getByTestId("StudentBillingOrdersTable__root")).toBeInTheDocument();
        expect(wrapper.getByTestId("TableBase__noDataMessage")).toHaveTextContent(
            "ra.message.noDataInformation"
        );
    });
});
