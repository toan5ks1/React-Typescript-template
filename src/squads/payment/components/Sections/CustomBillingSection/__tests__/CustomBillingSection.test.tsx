import { UseFormProps } from "react-hook-form";
import { Payment_GetManyTaxesReferenceQuery } from "src/squads/payment/service/fatima/fatima-types";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { createMockGetManyTaxesReference } from "src/squads/payment/test-utils/mocks/tax";
import {
    changeAutocompleteInput,
    getAutocompleteInputByTestId,
} from "src/squads/payment/test-utils/utils";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import CustomBillingSection, {
    CustomBillingSectionProps,
} from "src/squads/payment/components/Sections/CustomBillingSection/CustomBillingSection";

import { render, RenderResult, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const mockStudentInfo = createMockStudentInfo();
const mockCenterChoices = createMockCenterChoices();
const numberOfBillingItems: number = 3;
const mockTaxChoices = createMockGetManyTaxesReference();

const billingItemInputFieldValues = [
    {
        name: "Billing Item 1",
        taxItem: mockTaxChoices[0].name,
        price: "1000",
    },
    {
        name: "Billing Item 1",
        taxItem: "",
        price: "-1000",
    },
];

jest.mock(
    "src/squads/payment/components/Autocompletes/TaxAutocompleteHF/useTaxAutocomplete",
    () =>
        (): MAutocompleteServiceHookReturn<
            ArrayElement<Payment_GetManyTaxesReferenceQuery["tax"]>
        > => ({
            data: mockTaxChoices,
            isFetching: false,
        })
);

const defaultCustomBillingSectionProps: CustomBillingSectionProps = {
    billingErrorMessage: null,
};

const defaultCustomBillingSectionFormOptions: UseFormProps<CustomBillingOrderFormValue> = {
    defaultValues: {
        student: mockStudentInfo,
        billingFieldArrayItem: [],
        location: mockCenterChoices[0],
    },
};

const handleClickAddButton = (wrapper: RenderResult, times: number) => {
    const addButton = wrapper.getByTestId("CustomBillingSection__addButton");
    Array(times)
        .fill("")
        .forEach(() => {
            userEvent.click(addButton);
        });
};

const handleClickDeleteButton = (wrapper: RenderResult) => {
    const deleteButton = wrapper.getByTestId("CustomBillingSection__deleteButton");
    userEvent.click(deleteButton);
};

const handleInputTextField = (wrapper: RenderResult, dataTestId: string, value: string) => {
    const inputElement = wrapper.getByTestId(dataTestId) as HTMLInputElement;

    userEvent.type(inputElement, value);
};

const renderCustomBillingSection = (
    customBillingSectionProps: CustomBillingSectionProps = defaultCustomBillingSectionProps,
    useFormOptions: UseFormProps<CustomBillingOrderFormValue> = defaultCustomBillingSectionFormOptions
) => {
    return render(
        <TestApp>
            <TestHookFormProvider<CustomBillingOrderFormValue> useFormOptions={useFormOptions}>
                <TestQueryWrapper>
                    <CustomBillingSection {...customBillingSectionProps} />
                </TestQueryWrapper>
            </TestHookFormProvider>
        </TestApp>
    );
};

describe("<CustomBillingSection />", () => {
    it("should display no record of billing items as default", () => {
        const wrapper = renderCustomBillingSection();

        const tableHeaderWithCheckboxContainer = wrapper.getByTestId(
            "TableHeaderWithCheckbox__checkboxHeader"
        );
        const tableHeaderWithCheckboxInput = within(tableHeaderWithCheckboxContainer).getByRole(
            "checkbox"
        );

        expect(wrapper.getByTestId("NoData__icon")).toBeInTheDocument();
        expect(wrapper.getByTestId("NoData__message")).toBeInTheDocument();
        expect(tableHeaderWithCheckboxInput).toHaveAttribute("disabled");
    });

    it("should be added one or multiple billing items and render Name, Tax, Price after click", () => {
        const wrapper = renderCustomBillingSection();

        handleClickAddButton(wrapper, 1);

        expect(wrapper.getByTestId("TableBase__row")).toBeInTheDocument();

        handleClickAddButton(wrapper, 1);

        const billingItemRowList = wrapper.getAllByTestId("TableBase__row");

        const expectedNumberOfBillingItemsAdded: number = 2;

        expect(wrapper.getAllByTestId("TableBase__row")).toHaveLength(
            expectedNumberOfBillingItemsAdded
        );
        billingItemRowList.forEach((billingItem) => {
            expect(
                within(billingItem).getByTestId("TableRowWithCheckbox__checkboxRow")
            ).toBeInTheDocument();
            expect(
                within(billingItem).getByTestId("CustomBillingOrderTable__nameField")
            ).toBeInTheDocument();
            expect(
                within(billingItem).getByTestId("TaxAutocompleteHF_autocomplete")
            ).toBeInTheDocument();
            expect(
                within(billingItem).getByTestId("CustomBillingOrderTable__priceField")
            ).toBeInTheDocument();
        });
    });

    it("should disable “Delete” button with no record of billing items", () => {
        const wrapper = renderCustomBillingSection();

        expect(wrapper.getByTestId("CustomBillingSection__deleteButton")).toHaveAttribute(
            "type",
            "button"
        );
        expect(wrapper.getByTestId("CustomBillingSection__deleteButton")).toHaveAttribute(
            "disabled"
        );
    });

    it("should remove one or mutiple checked items when user clicks delete button", () => {
        const wrapper = renderCustomBillingSection();

        handleClickAddButton(wrapper, numberOfBillingItems);

        const billingItemRowList = wrapper.getAllByTestId("TableBase__row");
        expect(wrapper.getAllByTestId("TableBase__row")).toHaveLength(numberOfBillingItems);

        const firstBillingItemCheckBox = within(billingItemRowList[0]).getByTestId(
            "TableRowWithCheckbox__checkboxRow"
        );
        userEvent.click(firstBillingItemCheckBox);

        handleClickDeleteButton(wrapper);

        expect(wrapper.getAllByTestId("TableBase__row")).toHaveLength(numberOfBillingItems - 1);

        billingItemRowList.forEach((billingItem) => {
            const othersBillingItemCheckBox = within(billingItem).getByTestId(
                "TableRowWithCheckbox__checkboxRow"
            );
            userEvent.click(othersBillingItemCheckBox);
        });

        handleClickDeleteButton(wrapper);

        expect(wrapper.getByTestId("NoData__icon")).toBeInTheDocument();
        expect(wrapper.getByTestId("NoData__message")).toBeInTheDocument();
    });

    it("should remove all billing items when user selects header checkbox and clicks delete button", () => {
        const wrapper = renderCustomBillingSection();

        handleClickAddButton(wrapper, numberOfBillingItems);

        const headerCheckbox = wrapper.getByTestId("TableHeaderWithCheckbox__checkboxHeader");

        userEvent.click(headerCheckbox);
        handleClickDeleteButton(wrapper);

        expect(wrapper.getByTestId("NoData__icon")).toBeInTheDocument();
        expect(wrapper.getByTestId("NoData__message")).toBeInTheDocument();
    });

    test.each(billingItemInputFieldValues)(
        "it should correctly input Name, Tax and Price field",
        ({ name, taxItem, price }) => {
            const wrapper = renderCustomBillingSection();

            handleClickAddButton(wrapper, 1);

            handleInputTextField(wrapper, "CustomBillingOrderTable__nameField", name);

            const { autocompleteInput } = getAutocompleteInputByTestId(
                "TaxAutocompleteHF_autocomplete"
            );
            if (taxItem) {
                changeAutocompleteInput("TaxAutocompleteHF_autocomplete", taxItem);
            }

            handleInputTextField(wrapper, "CustomBillingOrderTable__priceField", price);

            expect(wrapper.getByTestId("CustomBillingOrderTable__nameField")).toHaveValue(name);
            expect(autocompleteInput).toHaveValue(taxItem);
            expect(wrapper.getByTestId("CustomBillingOrderTable__priceField")).toHaveValue(price);
        }
    );
});
