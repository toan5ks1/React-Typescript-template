import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";
import { createRetrieveListOfOrders } from "src/squads/payment/test-utils/mocks/order-items";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import StudentBillingOrdersSection from "src/squads/payment/domains/OrderManagement/components/Sections/StudentBillingOrdersSection/StudentBillingOrdersSection";

import { render } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useStudentBillingOrders/useStudentBillingOrders",
    () => {
        return {
            __esModule: true,
            default: () => ({
                studentBillingOrdersData: mockRetrieveListOfOrders,
                isLoadingStudentBillingOrders: false,
                pagination: mockPagination,
            }),
        };
    }
);

const mockRetrieveListOfOrders = createRetrieveListOfOrders();
const mockPagination = createMockPaginationWithTotalObject();

const defaultStudentBillingOrdersSectionProps: NsFatimaOrderService.RetrieveListOfBillItemsRequest =
    {
        studentId: "student_id_1",
    };

const renderStudentBillingOrdersSection = (
    studentBillingOrdersSectionProps: NsFatimaOrderService.RetrieveListOfBillItemsRequest = defaultStudentBillingOrdersSectionProps
) => {
    return render(
        <TestApp>
            <TestThemeProvider>
                <StudentBillingOrdersSection {...studentBillingOrdersSectionProps} />
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<StudentBillingOrdersSection />", () => {
    it("should render orders title and table of student billing", () => {
        const wrapper = renderStudentBillingOrdersSection();

        expect(wrapper.getByText("Orders History")).toBeInTheDocument();
        expect(wrapper.getByTestId("StudentBillingOrdersTable__root")).toBeInTheDocument();
    });
});
