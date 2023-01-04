import { useHistory, useLocation } from "react-router";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createMockOrderProducts } from "src/squads/payment/test-utils/mocks/order-products";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import StudentBillingProductListTable, {
    StudentBillingProductListTableProps,
} from "src/squads/payment/domains/OrderManagement/components/Tables/StudentBillingProductListTable/StudentBillingProductListTable";

import { render, within } from "@testing-library/react";
import StudentBillingPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/student-billing/StudentBillingPluginsProvider";
import useFeatureToggle from "src/squads/payment/hooks/useFeatureToggle";
import TestApp from "src/squads/payment/test-utils/TestApp";

const mockOrderProducts = createMockOrderProducts();
const mockPagination = createMockPaginationWithTotalObject(5);

const numberOfColumns = 8;
const numberOfMockData = mockOrderProducts.length;

const defaultStudentBillingProductListTableProps: StudentBillingProductListTableProps = {
    studentId: "student_id_1",
    dataSource: mockOrderProducts,
    loading: false,
    pagination: mockPagination,
};

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useHistory: jest.fn(() => ({
            push: jest.fn(),
        })),
        useLocation: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsByStudentProductIds",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

const historyPush = jest.fn();

const { currentCurrency } = getCurrentCurrency();

const renderStudentBillingProductListTable = (
    studentBillingProductListTableProps: StudentBillingProductListTableProps = defaultStudentBillingProductListTableProps
) => {
    (useHistory as jest.Mock).mockImplementation(() => ({
        push: historyPush,
    }));

    (useFeatureToggle as jest.Mock).mockImplementation(() => {
        return {
            isEnabled: true,
        };
    });

    return render(
        <StudentBillingPluginsProvider>
            <TestApp>
                <StudentBillingProductListTable {...studentBillingProductListTableProps} />
            </TestApp>
        </StudentBillingPluginsProvider>
    );
};

describe("<StudentBillingProductListTable />", () => {
    const locationIncludeRedirect = {
        pathname: "/student",
        search: "?tab=studentPageTab",
    } as Location;

    beforeEach(() => {
        (useLocation as jest.Mock).mockImplementation(() => locationIncludeRedirect);
    });
    it("should render product list table and column correctly", () => {
        const wrapper = renderStudentBillingProductListTable();

        expect(wrapper.getByTestId("StudentBillingProductListTable__root")).toBeInTheDocument();

        const columns = wrapper.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns).toHaveLength(numberOfColumns);

        expect(wrapper.getAllByTestId("TableBase__row")).toHaveLength(numberOfMockData);

        expect(wrapper.getByText("Location")).toBeInTheDocument();
        expect(wrapper.getByText("Product Details")).toBeInTheDocument();
        expect(wrapper.getByText("Status")).toBeInTheDocument();
        expect(wrapper.getByText("Duration")).toBeInTheDocument();
        expect(wrapper.getByText("Upcoming Billing Date")).toBeInTheDocument();
        expect(wrapper.getByText("Amount")).toBeInTheDocument();
        expect(wrapper.getByText("Action")).toBeInTheDocument();
    });

    it("should render correctly product list table with one-time product data", () => {
        const wrapper = renderStudentBillingProductListTable();

        const productRowList = wrapper.getAllByTestId("TableBase__row");

        expect(productRowList.length).toBeGreaterThan(0);
        expect(productRowList).toHaveLength(numberOfMockData);

        productRowList.forEach((productRow, index) => {
            expect(
                within(productRow).getByTestId("StudentBillingProductListTable__location")
            ).toHaveTextContent(mockOrderProducts[index].locationInfo?.locationName!);
            expect(
                within(productRow).getByTestId("ProductListCell__productName")
            ).toHaveTextContent(mockOrderProducts[index].productName);
            expect(
                within(productRow).getByTestId("ProductListCell__discountRow")
            ).toHaveTextContent(mockOrderProducts[index].discountInfo?.discountName!);
            expect(
                within(productRow).getByTestId("StudentBillingProductListTable__duration")
            ).toHaveTextContent("--");
            expect(
                within(productRow).getByTestId(
                    "StudentBillingProductListTable__upcomingBillingDate"
                )
            ).toHaveTextContent(
                formatDate(
                    convertTimestampToDate(mockOrderProducts[index].upcomingBillingDate),
                    "yyyy/LL/dd"
                )
            );
            expect(
                within(productRow).getByTestId("StudentBillingProductListTable__amount")
            ).toHaveTextContent(
                getFormattedItemPrice(currentCurrency, false, mockOrderProducts[index].amount)
            );
            expect(within(productRow).getByTestId("ActionPanel__root")).toBeInTheDocument();
        });
    });

    it("should render no data message when there is no data", () => {
        const wrapper = renderStudentBillingProductListTable({
            ...defaultStudentBillingProductListTableProps,
            dataSource: [],
        });

        expect(wrapper.getByTestId("StudentBillingProductListTable__root")).toBeInTheDocument();
        expect(wrapper.getByTestId("TableBase__noDataMessage")).toHaveTextContent(
            "ra.message.noDataInformation"
        );
    });

    it("should show double dash when table don't have upcomingBillingDate", () => {
        const mockProductListTableWithoutUpcomingBillingDate = mockOrderProducts.map(
            ({ upcomingBillingDate, ...rest }) => ({
                ...rest,
                upcomingBillingDate: undefined,
            })
        );
        const wrapper = renderStudentBillingProductListTable({
            ...defaultStudentBillingProductListTableProps,
            dataSource: mockProductListTableWithoutUpcomingBillingDate,
        });

        const upcomingBillingDateColumns = wrapper.getAllByTestId(
            "StudentBillingProductListTable__upcomingBillingDate"
        );
        upcomingBillingDateColumns.forEach((upcomingBillingDate) => {
            expect(upcomingBillingDate).toHaveTextContent("--");
        });
    });
});
