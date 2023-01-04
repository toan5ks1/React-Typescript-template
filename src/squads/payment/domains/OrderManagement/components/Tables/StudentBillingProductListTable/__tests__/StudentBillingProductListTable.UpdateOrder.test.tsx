import { useHistory, useLocation } from "react-router";
import { createMockOrderProducts } from "src/squads/payment/test-utils/mocks/order-products";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import StudentBillingProductListTable, {
    StudentBillingProductListTableProps,
} from "src/squads/payment/domains/OrderManagement/components/Tables/StudentBillingProductListTable/StudentBillingProductListTable";

import { StudentProductLabel, StudentProductStatus } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StudentBillingPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/student-billing/StudentBillingPluginsProvider";
import useFeatureToggle from "src/squads/payment/hooks/useFeatureToggle";
import TestApp from "src/squads/payment/test-utils/TestApp";

const mockOrderProducts = createMockOrderProducts();
const mockPagination = createMockPaginationWithTotalObject();

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

const mockShowSnackbar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackbar,
}));

const historyPush = jest.fn();

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

const clickUpdateButtonByProductStatus = (
    status: StudentProductStatus,
    studentProductLabel: StudentProductLabel = StudentProductLabel.CREATED
): number => {
    const wrapper = renderStudentBillingProductListTable();

    const productRowList = wrapper.getAllByTestId("TableBase__row");
    expect(productRowList).toHaveLength(numberOfMockData);

    const orderedProductIndex = mockOrderProducts.findIndex(
        (mockOrderProduct) =>
            mockOrderProduct.status === status &&
            mockOrderProduct.studentProductLabel === studentProductLabel
    );

    const actionButton = wrapper.getAllByTestId("ActionPanel__trigger")[orderedProductIndex];
    userEvent.click(actionButton);

    const updateButton = wrapper.getByText("Update");
    userEvent.click(updateButton);

    return orderedProductIndex;
};

describe("<StudentBillingProductListTable />", () => {
    const locationIncludeRedirect = {
        pathname: "/student",
        search: "?tab=studentPageTab",
    } as Location;

    beforeEach(() => {
        (useLocation as jest.Mock).mockImplementation(() => locationIncludeRedirect);
    });
    it("should call history.push when clicking update button for products with ordered status", () => {
        const orderedProductIndex = clickUpdateButtonByProductStatus(StudentProductStatus.ORDERED);

        const studentId = defaultStudentBillingProductListTableProps.studentId;
        const studentProductId = mockOrderProducts[orderedProductIndex].studentProductId;
        const locationId = mockOrderProducts[orderedProductIndex].locationInfo?.locationId;
        const redirectUrl = `${locationIncludeRedirect.pathname}${locationIncludeRedirect.search}`;

        expect(historyPush).toBeCalledWith({
            pathname: "/payment/orders/update",
            search: `?studentId=${studentId}&studentProductId=${studentProductId}&locationId=${locationId}&redirectUrl=${redirectUrl}`,
        });
    });

    it("should show error snackbar when clicking update button for products with cancelled status", () => {
        clickUpdateButtonByProductStatus(StudentProductStatus.CANCELLED);

        expect(mockShowSnackbar).toBeCalledWith(
            "Only able to update products with status ordered.",
            "error"
        );
    });

    it("should show error snackbar when clicking update button for products with pending status", () => {
        clickUpdateButtonByProductStatus(StudentProductStatus.PENDING);

        expect(mockShowSnackbar).toBeCalledWith(
            "Only able to update products with status ordered.",
            "error"
        );
    });

    it("should show error snackbar when clicking update button for products with update scheduled", () => {
        clickUpdateButtonByProductStatus(
            StudentProductStatus.ORDERED,
            StudentProductLabel.UPDATE_SCHEDULED
        );

        expect(mockShowSnackbar).toBeCalledWith(
            "Unable to update the product as it has an Update Scheduled tag.",
            "error"
        );
    });

    it("should show error snackbar when clicking update button for products withdrawal scheduled", () => {
        clickUpdateButtonByProductStatus(
            StudentProductStatus.ORDERED,
            StudentProductLabel.WITHDRAWAL_SCHEDULED
        );

        expect(mockShowSnackbar).toBeCalledWith(
            "Unable to update the product as it has a pending withdrawal/graduate order.",
            "error"
        );
    });

    it("should show error snackbar when clicking update button for products graduate scheduled", () => {
        clickUpdateButtonByProductStatus(
            StudentProductStatus.ORDERED,
            StudentProductLabel.GRADUATION_SCHEDULED
        );

        expect(mockShowSnackbar).toBeCalledWith(
            "Unable to update the product as it has a pending withdrawal/graduate order.",
            "error"
        );
    });
});
