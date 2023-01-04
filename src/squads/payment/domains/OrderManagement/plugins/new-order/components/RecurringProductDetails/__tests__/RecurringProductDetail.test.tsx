import { UseFormProps } from "react-hook-form";
import { createMockUpsertOrderFormValuesForRecurringProducts } from "src/squads/payment/test-utils/mocks/recurring-products";

import RecurringProductDetails, {
    RecurringProductDetailsProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/RecurringProductDetails/RecurringProductDetails";

import { render } from "@testing-library/react";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

jest.mock(
    "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete"
);

const defaultOrderFormValues = createMockUpsertOrderFormValuesForRecurringProducts();
const defaultOrderUpsertFormProductOption: UseFormProps = {
    defaultValues: { ...defaultOrderFormValues },
};
const productIndex = 0;
const firstStudentIndex = 0;

const defaultRecurringProductDetailsProps: RecurringProductDetailsProps = {
    productFieldArrayItem:
        defaultOrderFormValues.students[firstStudentIndex].productFieldArrayItems[productIndex],
    productFieldItemIndex: productIndex,
    studentIndex: firstStudentIndex,
};

const renderRecurringProductDetails = (
    recurringProductDetailsProps: RecurringProductDetailsProps = defaultRecurringProductDetailsProps,
    useFormOptions: UseFormProps = defaultOrderUpsertFormProductOption
) => {
    return render(
        <MuiPickersUtilsProvider>
            <TestHookFormProvider useFormOptions={useFormOptions}>
                <RecurringProductDetails {...recurringProductDetailsProps} />
            </TestHookFormProvider>
        </MuiPickersUtilsProvider>
    );
};

describe("<RecurringProductDetails />", () => {
    it("should render recurring product details with discount autocomplete and date picker", () => {
        const wrapper = renderRecurringProductDetails();

        expect(wrapper.getByTestId("ProductListItemDetails__productInfo")).toBeInTheDocument();
        expect(wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("DatePickerHF__input")).toBeInTheDocument();
    });
});
