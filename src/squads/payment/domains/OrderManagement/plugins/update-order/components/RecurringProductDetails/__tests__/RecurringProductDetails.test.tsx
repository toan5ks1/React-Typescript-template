import { UseFormProps } from "react-hook-form";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import { mockUpdateProductFormRecurringMaterial } from "src/squads/payment/test-utils/mocks/recurring-products-update";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import RecurringProductDetails, {
    RecurringProductDetailsProps,
} from "src/squads/payment/domains/OrderManagement/plugins/update-order/components/RecurringProductDetails";

import { render } from "@testing-library/react";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

jest.mock(
    "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete"
);

const defaultOrderFormValues: OrderFormValues = {
    students: [
        {
            studentInfo: createMockStudentInfo(),
            productFieldArrayItems: mockUpdateProductFormRecurringMaterial({
                startDate: new Date().toISOString(),
            }),
            comment: "test comment",
        },
    ],
    location: createMockCenterChoices()[0],
};
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

const noStartDateOrderFormValues: OrderFormValues = {
    students: [
        {
            studentInfo: createMockStudentInfo(),
            productFieldArrayItems: mockUpdateProductFormRecurringMaterial({}),
            comment: "test comment",
        },
    ],
    location: createMockCenterChoices()[0],
};
const noStartDateOrderUpsertFormProductOption: UseFormProps = {
    defaultValues: { ...noStartDateOrderFormValues },
};

const noStartDateRecurringProductDetailsProps: RecurringProductDetailsProps = {
    productFieldArrayItem:
        noStartDateOrderFormValues.students[firstStudentIndex].productFieldArrayItems[productIndex],
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

    it("should not render recurring product details if there is no start date", () => {
        const wrapper = renderRecurringProductDetails(
            noStartDateRecurringProductDetailsProps,
            noStartDateOrderUpsertFormProductOption
        );

        expect(
            wrapper.queryByTestId("ProductListItemDetails__productInfo")
        ).not.toBeInTheDocument();
        expect(
            wrapper.queryByTestId("DiscountsAutocompleteHF__autocomplete")
        ).not.toBeInTheDocument();
        expect(wrapper.queryByTestId("DatePickerHF__input")).not.toBeInTheDocument();
    });
});
