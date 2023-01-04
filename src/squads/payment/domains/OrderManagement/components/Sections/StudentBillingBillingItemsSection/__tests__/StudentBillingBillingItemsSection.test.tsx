import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";
import { createRetrieveListOfBillItems } from "src/squads/payment/test-utils/mocks/bill-item";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import StudentBillingBillingItemsSection from "src/squads/payment/domains/OrderManagement/components/Sections/StudentBillingBillingItemsSection/StudentBillingBillingItemsSection";

import { render } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useStudentBillingBillingItems/useStudentBillingBillingItems",
    () => {
        return {
            __esModule: true,
            default: () => ({
                studentBillingBillingItemsData: mockRetrieveListOfBillItems,
                isLoadingStudentBillingBillingItems: false,
                pagination: mockPagination,
            }),
        };
    }
);

const mockRetrieveListOfBillItems = createRetrieveListOfBillItems();
const mockPagination = createMockPaginationWithTotalObject();

const defaultStudentBillingBillingItemsSectionProps: NsFatimaOrderService.RetrieveListOfBillItemsRequest =
    {
        studentId: "student_id_1",
    };

const renderStudentBillingBillingItemsSection = (
    studentBillingBillingItemsSectionProps: NsFatimaOrderService.RetrieveListOfBillItemsRequest = defaultStudentBillingBillingItemsSectionProps
) => {
    return render(
        <TestApp>
            <TestThemeProvider>
                <StudentBillingBillingItemsSection {...studentBillingBillingItemsSectionProps} />
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<StudentBillingBillingItemsSection />", () => {
    it("should render billing items title and table of student billing", () => {
        const wrapper = renderStudentBillingBillingItemsSection();

        expect(wrapper.getByText("Billing Items")).toBeInTheDocument();
        expect(wrapper.getByTestId("StudentBillingBillingItemsTable__root")).toBeInTheDocument();
    });
});
