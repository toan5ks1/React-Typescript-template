import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";
import { createRetrieveListOfOrderProducts } from "src/squads/payment/test-utils/mocks/order-products";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import StudentBillingProductListSection from "src/squads/payment/domains/OrderManagement/components/Sections/StudentBillingProductListSection/StudentBillingProductListSection";

import { render } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useStudentBillingProductList/useStudentBillingProductList",
    () => {
        return {
            __esModule: true,
            default: () => ({
                studentBillingProductListData: mockRetrieveListOfOrderProducts,
                isLoadingStudentBillingProductList: false,
                pagination: mockPagination,
            }),
        };
    }
);

const mockRetrieveListOfOrderProducts = createRetrieveListOfOrderProducts();
const mockPagination = createMockPaginationWithTotalObject();

const defaultStudentBillingProductListSectionProps: NsFatimaOrderService.RetrieveListOfOrderProductsRequest =
    {
        studentId: "student_id_1",
    };

const renderStudentBillingProductListSection = (
    studentBillingProductListSectionProps: NsFatimaOrderService.RetrieveListOfOrderProductsRequest = defaultStudentBillingProductListSectionProps
) => {
    return render(
        <TestApp>
            <TestThemeProvider>
                <StudentBillingProductListSection {...studentBillingProductListSectionProps} />
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<StudentBillingProductListSection />", () => {
    it("should render product list title and table of student billing", () => {
        const wrapper = renderStudentBillingProductListSection();

        expect(wrapper.getByText("Product List")).toBeInTheDocument();
        expect(wrapper.getByTestId("StudentBillingProductListTable__root")).toBeInTheDocument();
    });
});
