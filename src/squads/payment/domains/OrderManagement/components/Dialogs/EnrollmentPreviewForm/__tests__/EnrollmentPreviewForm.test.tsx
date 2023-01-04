import { formatDate } from "src/common/utils/time";
import { OrderCurrency } from "src/squads/payment/constants/enum";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import EnrollmentPreviewForm from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentPreviewForm";
import { EnrollmentPreviewFormProps } from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentPreviewForm/EnrollmentPreviewForm";

import { render } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockStudentName = "Student 1";
const mockTotalValue: number = 200;
const mockBilledAtOrderProducts: BilledAtOrderItemType[] = [
    {
        productName: "Product 1",
        productPrice: 200,
        discountPrice: 0,
        currency: OrderCurrency.JAPANESE_YEN,
        productAndProductExtension: {
            productEntityType: "fee",
            productExtensionType: "FEE_TYPE_ONE_TIME",
        },
    },
    {
        productName: "Product 2",
        productPrice: 400,
        discountName: "Discount 2",
        discountPrice: 200,
        currency: OrderCurrency.JAPANESE_YEN,
        productAndProductExtension: {
            productEntityType: "fee",
            productExtensionType: "FEE_TYPE_ONE_TIME",
        },
    },
];
const mockBilledAtOrderTaxInclusions: Record<number, number> = {
    10: 10,
    20: 20,
};

const renderEnrollmentForm = () => {
    const enrollmentPreviewFormProps: EnrollmentPreviewFormProps = {
        studentName: mockStudentName,
        billedAtOrderProducts: mockBilledAtOrderProducts,
        billedAtOrderTaxInclusions: mockBilledAtOrderTaxInclusions,
        totalValue: mockTotalValue,
    };

    return render(
        <TestApp>
            <TestThemeProvider>
                <EnrollmentPreviewForm {...enrollmentPreviewFormProps} />
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<EnrollmentForm />", () => {
    it("should render enrollment form with correct student name and enrollment date", () => {
        const wrapper = renderEnrollmentForm();
        const enrollmentFormDate = formatDate(new Date(), "yyyy/LL/dd");

        expect(wrapper.getByTestId("EnrollmentForm__previewForm")).toBeInTheDocument();
        expect(wrapper.getByText("Enrollment Form")).toBeInTheDocument();
        expect(wrapper.getByText("Preview the Form")).toBeInTheDocument();
        expect(wrapper.getByText(mockStudentName)).toBeInTheDocument();
        expect(wrapper.getByText(enrollmentFormDate)).toBeInTheDocument();
        mockBilledAtOrderProducts.forEach((product) =>
            expect(wrapper.getByText(product.productName)).toBeInTheDocument()
        );
    });
});
