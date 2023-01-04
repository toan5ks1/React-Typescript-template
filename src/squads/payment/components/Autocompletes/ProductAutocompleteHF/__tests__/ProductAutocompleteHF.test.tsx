import { UseFormProps } from "react-hook-form";
import { Payment_GetManyProductsReferenceQuery } from "src/squads/payment/service/fatima/fatima-types";
import { createMockProductsManyChoices } from "src/squads/payment/test-utils/mocks/products";
import { getAutocompleteInputByTestId } from "src/squads/payment/test-utils/utils";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import useProductAutocomplete from "src/squads/payment/components/Autocompletes/ProductAutocompleteHF/useProductAutocomplete";

import ProductAutocompleteHF, { ProductAutocompleteHFProps } from "..";

import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockProductsManyChoices = createMockProductsManyChoices();
jest.mock(
    "src/squads/payment/components/Autocompletes/ProductAutocompleteHF/useProductAutocomplete",
    () => jest.fn()
);

interface TestForm {
    product: ArrayElement<Payment_GetManyProductsReferenceQuery["product"]>;
}
const defaultProps: ProductAutocompleteHFProps<TestForm> = {
    controllerProps: {
        name: "product",
    },
};

const defaultUseFormOptions: UseFormProps = {
    defaultValues: {
        product: [],
    },
};

const renderProductAutocomplete = (
    props: ProductAutocompleteHFProps<TestForm> = defaultProps,
    useFormOptions: UseFormProps = defaultUseFormOptions,
    options: Payment_GetManyProductsReferenceQuery["product"] = mockProductsManyChoices
) => {
    (useProductAutocomplete as jest.Mock).mockImplementation(
        (): MAutocompleteServiceHookReturn<
            ArrayElement<Payment_GetManyProductsReferenceQuery["product"]>
        > => ({
            data: options,
            isFetching: false,
        })
    );
    return render(
        <TestApp>
            <TestThemeProvider>
                <TestHookFormProvider useFormOptions={useFormOptions}>
                    <ProductAutocompleteHF {...props} />
                </TestHookFormProvider>
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<ProductAutocompleteHF />", () => {
    it("should render correct UI", () => {
        const wrapper = renderProductAutocomplete();

        expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument();
        getAutocompleteInputByTestId("ProductAutocompleteHF_autocomplete");
        expect(wrapper.getByLabelText("Product")).toBeInTheDocument();
    });

    it("should render correct with default value", () => {
        const wrapper = renderProductAutocomplete(defaultProps, {
            defaultValues: {
                product: mockProductsManyChoices,
            },
        });

        expect(wrapper.getAllByTestId("ChipAutocomplete")).toHaveLength(
            mockProductsManyChoices.length
        );

        const { autocompleteWrapper } = getAutocompleteInputByTestId(
            "ProductAutocompleteHF_autocomplete"
        );
        mockProductsManyChoices.forEach((product) => {
            expect(within(autocompleteWrapper).getByLabelText(product.name)).toBeInTheDocument();
        });
        wrapper.getAllByTestId("ChipAutocomplete").forEach((option) => {
            expect(within(option).getByTestId("ChipAutocomplete__iconDelete")).toBeInTheDocument();
        });
    });

    it("should delete correct option", () => {
        const wrapper = renderProductAutocomplete(defaultProps, {
            defaultValues: {
                product: mockProductsManyChoices,
            },
        });

        expect(wrapper.getByLabelText("Product 1")).toBeInTheDocument();
        expect(wrapper.getByLabelText("Product 2")).toBeInTheDocument();
        const deleteButton = within(wrapper.getAllByTestId("ChipAutocomplete")[0]).getByTestId(
            "ChipAutocomplete__iconDelete"
        );
        userEvent.click(deleteButton);
        expect(wrapper.queryByLabelText("Product 1")).not.toBeInTheDocument();
        expect(wrapper.getByLabelText("Product 2")).toBeInTheDocument();
    });

    it("should delete all option", () => {
        const wrapper = renderProductAutocomplete(defaultProps, {
            defaultValues: {
                product: mockProductsManyChoices,
            },
        });
        const deleteAllButton = wrapper.getByTitle(/clear/i);
        userEvent.click(deleteAllButton);

        const { autocompleteInput } = getAutocompleteInputByTestId(
            "ProductAutocompleteHF_autocomplete"
        );

        expect(autocompleteInput).toHaveValue("");
    });

    it("should render correct options with data", () => {
        const wrapper = renderProductAutocomplete({
            controllerProps: {
                name: "product",
            },
            open: true,
        });

        expect(wrapper.getByRole("listbox")).toBeInTheDocument();
        expect(wrapper.getAllByRole("option")).toHaveLength(mockProductsManyChoices.length);
        wrapper.getAllByRole("option").forEach((option, index) => {
            expect(option).toHaveTextContent(mockProductsManyChoices[index].name);
        });
    });

    it("should render correct options without data", () => {
        const wrapper = renderProductAutocomplete(
            {
                controllerProps: {
                    name: "product",
                },
                open: true,
            },
            { defaultValues: { product: [] } },
            []
        );

        expect(wrapper.getByText("No options"));
    });
});
