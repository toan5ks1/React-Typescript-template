import { UseFormProps } from "react-hook-form";
import { createMockCompleteOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import { getFormattedDate } from "src/squads/payment/utils/date";

import OneTimeProductDetails, {
    OneTimeProductDetailsProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/OneTimeProductDetails/OneTimeProductDetails";

import { render, within } from "@testing-library/react";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

jest.mock(
    "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete"
);

const defaultOrderFormValues = createMockCompleteOrderFormValues();
const defaultOrderFormProductOption: UseFormProps = {
    defaultValues: { ...defaultOrderFormValues },
};
const productIndex = 1;
const firstStudentIndex = 0;

const defaultOneTimeProductDetailsProps: OneTimeProductDetailsProps = {
    productFieldArrayItem:
        defaultOrderFormValues.students[firstStudentIndex].productFieldArrayItems[productIndex],
    productFieldItemIndex: productIndex,
    studentIndex: firstStudentIndex,
};

const renderOneTimeProductDetails = (
    oneTimeProductDetailsProps: OneTimeProductDetailsProps = defaultOneTimeProductDetailsProps,
    useFormOptions: UseFormProps = defaultOrderFormProductOption
) => {
    return render(
        <TestHookFormProvider useFormOptions={useFormOptions}>
            <OneTimeProductDetails {...oneTimeProductDetailsProps} />
        </TestHookFormProvider>
    );
};

describe("<OneTimeProductDetails />", () => {
    it("should render one time product details", () => {
        const wrapper = renderOneTimeProductDetails();

        const formattedBillingDate = getFormattedDate(
            defaultOrderFormValues.students[firstStudentIndex].productFieldArrayItems[productIndex]
                .material?.custom_billing_date
        );

        expect(wrapper.getByTestId("ProductListItemDetails__productInfo")).toBeInTheDocument();
        expect(wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete")).toBeInTheDocument();

        const billingDateElement = wrapper.getByTestId("ProductListItemDetails__billingDate");
        expect(within(billingDateElement).getByText(formattedBillingDate)).toBeInTheDocument();
    });
});
