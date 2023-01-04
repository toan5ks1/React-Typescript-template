import { FieldArrayWithId, UseFormProps } from "react-hook-form";
import { OptionSelectType } from "src/common/constants/types";
import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";
import { createMockOrderFormValueWithPackageCoursesAndAssociatedProducts } from "src/squads/payment/test-utils/mocks/order-form";
import {
    createMockProductChoices,
    createMockProductMaterialList,
    createMockProductFeeList,
    createMockProductPriceList,
} from "src/squads/payment/test-utils/mocks/products";
import { createMockGetManyTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import AssociatedProductsList, {
    AssociatedProductsListProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/AssociateProducts/AssociatedProductsList";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const defaultOrderFormValues = createMockOrderFormValueWithPackageCoursesAndAssociatedProducts();
const defaultOrderFormProductOption: UseFormProps = {
    defaultValues: { ...defaultOrderFormValues },
};

const productIndex = 0;
const firstStudentIndex = 0;
const mockMaterialProductChoice = createMockProductChoices()[1];
const mockFeeProductChoice = createMockProductChoices()[2];
const mockProductMaterial = createMockProductMaterialList()[0];
const mockProductPrice = createMockProductPriceList();
const mockDiscount = createMockDiscountChoices()[0];
const mockProductTaxList = createMockGetManyTaxDataList()[0];
const mockProductFee = createMockProductFeeList()[0];

const associatedProducts: FieldArrayWithId<
    OrderFormValues,
    `students.${number}.productFieldArrayItems.${number}.associatedProducts`,
    "id"
>[] = [
    {
        id: "form_id_1",
        product: mockMaterialProductChoice,
        material: mockProductMaterial,
        productPrices: mockProductPrice,
        productTax: mockProductTaxList,
        discount: mockDiscount,
    },
    {
        id: "form_id_2",
        product: mockFeeProductChoice,
        fee: mockProductFee,
        productPrices: mockProductPrice,
        productTax: mockProductTaxList,
        discount: mockDiscount,
    },
];

const associatedProductsOptions: OptionSelectType[] = [
    {
        id: mockMaterialProductChoice.product_id,
        value: mockMaterialProductChoice.name,
        label: mockMaterialProductChoice.name,
        disabled: false,
    },
    {
        id: mockFeeProductChoice.product_id,
        value: mockFeeProductChoice.name,
        label: mockFeeProductChoice.name,
        disabled: false,
    },
    {
        id: 4,
        value: "product_4",
        label: "product_2",
        disabled: false,
    },
    {
        id: 5,
        value: "product_5",
        label: "product_3",
        disabled: false,
    },
];

const onAssociatedProductSelect = jest.fn();
const handleDeleteAssociatedProduct = jest.fn();

const defaultAssociatedProductsListProps: AssociatedProductsListProps = {
    associatedProducts,
    associatedProductsOptions,
    productFieldItemIndex: productIndex,
    studentIndex: firstStudentIndex,
    onAssociatedProductSelect: onAssociatedProductSelect,
    handleDeleteAssociatedProduct: handleDeleteAssociatedProduct,
};

const renderAssociatedProductsList = (
    associatedProductsListProps: AssociatedProductsListProps = defaultAssociatedProductsListProps,
    useFormOptions: UseFormProps = defaultOrderFormProductOption
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <TestHookFormProvider useFormOptions={useFormOptions}>
                    <AssociatedProductsList {...associatedProductsListProps} />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<AssociatedProductsList />", () => {
    it("should render associated product names", () => {
        const wrapper = renderAssociatedProductsList();

        expect(wrapper.getByText(mockMaterialProductChoice.name)).toBeInTheDocument();
        expect(wrapper.getByText(mockFeeProductChoice.name)).toBeInTheDocument();
    });

    it("should call handleDeleteAssociatedProduct with product index when user clicks delete button", () => {
        const wrapper = renderAssociatedProductsList();

        const deleteButtons = wrapper.getAllByTestId("AssociatedProducts__delete");

        deleteButtons.forEach((deleteButton, index) => {
            userEvent.click(deleteButton);
            expect(handleDeleteAssociatedProduct).toHaveBeenCalledWith(index);
        });
    });

    it("should call onAssociatedProductSelect with product id when user changes select input", () => {
        const optionIndex = 2;
        const wrapper = renderAssociatedProductsList();

        const selectFieldMaterialProduct = wrapper.getByText(mockMaterialProductChoice.name);
        userEvent.click(selectFieldMaterialProduct);

        const productOption = wrapper.getByText(associatedProductsOptions[optionIndex].value);
        userEvent.click(productOption);

        const selectFieldMaterialProductIndex = associatedProducts.findIndex(
            (associatedProduct) =>
                associatedProduct.product.product_id === mockMaterialProductChoice.product_id
        );

        expect(onAssociatedProductSelect).toHaveBeenCalledWith(
            associatedProductsOptions[optionIndex].id,
            selectFieldMaterialProductIndex
        );
    });
});
