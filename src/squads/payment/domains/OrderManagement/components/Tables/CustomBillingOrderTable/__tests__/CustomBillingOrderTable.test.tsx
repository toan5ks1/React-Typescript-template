import { FieldArrayWithId, UseFormProps } from "react-hook-form";
import { createMockCustomBillingOrderFormValue } from "src/squads/payment/test-utils/mocks/order-form-custom-billing";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";

import CustomBillingOrderTable, {
    CustomBillingOrderTableProps,
} from "src/squads/payment/domains/OrderManagement/components/Tables/CustomBillingOrderTable/CustomBillingOrderTable";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

jest.mock("src/squads/payment/components/Autocompletes/TaxAutocompleteHF/useTaxAutocomplete");

const numberOfColumns = 3;
const mockCustomBillingOrderFormValue = createMockCustomBillingOrderFormValue();

const defaultCustomBillingOrderTableProps: CustomBillingOrderTableProps = {
    dataSource: [],
    onSelect: jest.fn(),
    listSelectedItems: [],
    errorMessage: null,
};

const defaultCustomBillingOrderTableFormOptions: UseFormProps<CustomBillingOrderFormValue> = {
    defaultValues: {
        billingFieldArrayItem: [],
    },
};

const renderCustomBillingOrderTable = (
    customBillingOrderTableProps: CustomBillingOrderTableProps = defaultCustomBillingOrderTableProps,
    useFormOptions: UseFormProps<CustomBillingOrderFormValue> = defaultCustomBillingOrderTableFormOptions
) => {
    return render(
        <TestApp>
            <TestHookFormProvider<CustomBillingOrderFormValue> useFormOptions={useFormOptions}>
                <CustomBillingOrderTable {...customBillingOrderTableProps} />
            </TestHookFormProvider>
        </TestApp>
    );
};

describe("<CustomBillingOrderTable />", () => {
    it("should render custom billing table and column correctly", () => {
        const { getByTestId, getByText } = renderCustomBillingOrderTable();

        expect(getByTestId("CustomBillingOrderTable__root")).toBeInTheDocument();
        const columns = getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns).toHaveLength(numberOfColumns);

        expect(getByText("Name")).toBeInTheDocument();
        expect(getByText("Tax")).toBeInTheDocument();
        expect(getByText("Price")).toBeInTheDocument();
    });

    it("should call onSelect function when billing item is clicked", () => {
        const dataSource: FieldArrayWithId<
            CustomBillingOrderFormValue,
            "billingFieldArrayItem",
            "id"
        >[] = [mockCustomBillingOrderFormValue[0]];

        const { getByTestId } = renderCustomBillingOrderTable({
            ...defaultCustomBillingOrderTableProps,
            dataSource,
        });

        const billingItemCheckbox = getByTestId("TableRowWithCheckbox__checkboxRow");
        userEvent.click(billingItemCheckbox);

        expect(defaultCustomBillingOrderTableProps.onSelect).toBeCalled();
    });
});
