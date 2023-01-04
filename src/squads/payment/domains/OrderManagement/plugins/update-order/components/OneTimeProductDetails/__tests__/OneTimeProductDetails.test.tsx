import { UseFormProps } from "react-hook-form";
import { createMockUpdateOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form-update";
import { getAutocompleteInputByTestId } from "src/squads/payment/test-utils/utils";
import { getFormattedDate } from "src/squads/payment/utils/date";

import OneTimeProductDetails, {
    OneTimeProductDetailsProps,
} from "src/squads/payment/domains/OrderManagement/plugins/update-order/components/OneTimeProductDetails";

import { render } from "@testing-library/react";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

jest.mock(
    "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete"
);

const defaultOrderFormValues = createMockUpdateOrderFormValues();
const defaultOrderFormProductOption: UseFormProps = {
    defaultValues: { ...defaultOrderFormValues },
};
const activeProductIndex = 0;
const cancelledProductIndex = 1;
const firstStudentIndex = 0;

const defaultOneTimeProductDetailsProps: OneTimeProductDetailsProps = {
    productFieldArrayItem:
        defaultOrderFormValues.students[firstStudentIndex].productFieldArrayItems[
            activeProductIndex
        ],
    productFieldItemIndex: activeProductIndex,
    studentIndex: firstStudentIndex,
};

const noUpdateOrderDetailsOneTimeProductDetailsProps: OneTimeProductDetailsProps = {
    productFieldArrayItem: {
        ...defaultOrderFormValues.students[firstStudentIndex].productFieldArrayItems[
            activeProductIndex
        ],
        updateOrderDetails: undefined,
    },
    productFieldItemIndex: activeProductIndex,
    studentIndex: firstStudentIndex,
};

const cancelledOrderDetailsOneTimeProductDetailsProps: OneTimeProductDetailsProps = {
    productFieldArrayItem:
        defaultOrderFormValues.students[firstStudentIndex].productFieldArrayItems[
            cancelledProductIndex
        ],
    productFieldItemIndex: cancelledProductIndex,
    studentIndex: firstStudentIndex,
};

const renderOneTimeProductDetails = (
    oneTimeProductDetailsProps: OneTimeProductDetailsProps = defaultOneTimeProductDetailsProps,
    useFormOptions: UseFormProps = defaultOrderFormProductOption
) => {
    return render(
        <MuiPickersUtilsProvider>
            <TestHookFormProvider useFormOptions={useFormOptions}>
                <OneTimeProductDetails {...oneTimeProductDetailsProps} />
            </TestHookFormProvider>
        </MuiPickersUtilsProvider>
    );
};

describe("<OneTimeProductDetails/> for Update Order", () => {
    it("should render one time product details if there are update details", () => {
        const wrapper = renderOneTimeProductDetails();

        const formattedEffectiveDate = getFormattedDate(
            defaultOrderFormValues.students[firstStudentIndex].productFieldArrayItems[
                activeProductIndex
            ].updateOrderDetails!.effectiveDate.toISOString()
        );

        expect(wrapper.getByTestId("ProductListItemDetails__productInfo")).toBeInTheDocument();

        const discountName =
            defaultOrderFormValues.students[firstStudentIndex].productFieldArrayItems[
                activeProductIndex
            ].discount!.name;

        const { autocompleteInput } = getAutocompleteInputByTestId(
            "DiscountsAutocompleteHF__autocomplete"
        );
        expect(autocompleteInput).toHaveValue(discountName);

        const billingDateInput = wrapper.getByTestId("DatePickerHF__input");
        expect(billingDateInput).toHaveValue(formattedEffectiveDate);
        expect(billingDateInput).toHaveAttribute("readonly");
    });

    it("should not render product details if there are no update details", () => {
        const wrapper = renderOneTimeProductDetails(noUpdateOrderDetailsOneTimeProductDetailsProps);

        expect(
            wrapper.queryByTestId("ProductListItemDetails__productInfo")
        ).not.toBeInTheDocument();
        expect(
            wrapper.queryByTestId("DiscountsAutocompleteHF__autocomplete")
        ).not.toBeInTheDocument();
        expect(wrapper.queryByTestId("DatePickerHF__input")).not.toBeInTheDocument();
    });

    it("should have readonly for discount autocomplete when it is cancelled", () => {
        const wrapper = renderOneTimeProductDetails(
            cancelledOrderDetailsOneTimeProductDetailsProps
        );

        const formattedEffectiveDate = getFormattedDate(
            defaultOrderFormValues.students[firstStudentIndex].productFieldArrayItems[
                cancelledProductIndex
            ].updateOrderDetails!.effectiveDate.toISOString()
        );

        expect(wrapper.getByTestId("ProductListItemDetails__productInfo")).toBeInTheDocument();

        const discountName =
            defaultOrderFormValues.students[firstStudentIndex].productFieldArrayItems[
                activeProductIndex
            ].discount!.name;

        const { autocompleteInput } = getAutocompleteInputByTestId(
            "DiscountsAutocompleteHF__autocomplete"
        );
        expect(autocompleteInput).toHaveValue(discountName);
        expect(autocompleteInput).toHaveAttribute("readonly");

        const billingDateInput = wrapper.getByTestId("DatePickerHF__input");
        expect(billingDateInput).toHaveValue(formattedEffectiveDate);
        expect(billingDateInput).toHaveAttribute("readonly");
    });
});
