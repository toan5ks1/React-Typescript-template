import { UseFormProps } from "react-hook-form";
import { createMockOrderFormValueWithPackageCourses } from "src/squads/payment/test-utils/mocks/order-form";
import {
    createMockPackageCourseFeeList,
    createMockPackageCourseMaterialList,
} from "src/squads/payment/test-utils/mocks/package-course";
import {
    createMockProductChoices,
    createMockProductFeeList,
    createMockProductMaterialList,
    createMockProductPriceList,
} from "src/squads/payment/test-utils/mocks/products";
import { createMockGetManyTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import AssociatedProducts, {
    AssociatedProductsProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/AssociateProducts";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const defaultOrderFormValues = createMockOrderFormValueWithPackageCourses();
const defaultOrderFormProductOption: UseFormProps<OrderFormValues> = {
    defaultValues: { ...defaultOrderFormValues },
};

const productIndex = 0;
const firstStudentIndex = 0;

const mockPackageCourseFeeList = createMockPackageCourseFeeList();
const mockPackageCourseMaterialList = createMockPackageCourseMaterialList();
const mockProductChoices = createMockProductChoices();
const mockProductMaterial = createMockProductMaterialList();
const mockProductFee = createMockProductFeeList();
const mockProductPrice = createMockProductPriceList();
const mockProductTaxList = createMockGetManyTaxDataList();

const defaultAssociatedProductsProps: AssociatedProductsProps = {
    productFieldArrayItem:
        defaultOrderFormValues.students[firstStudentIndex].productFieldArrayItems[productIndex],
    productFieldItemIndex: productIndex,
    studentIndex: firstStudentIndex,
};

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useAssociatedProducts", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                packageCourseMaterials: mockPackageCourseMaterialList,
                packageCourseFees: mockPackageCourseFeeList,
                productDetails: mockProductChoices,
                productFees: mockProductFee,
                productMaterials: mockProductMaterial,
                productPrices: mockProductPrice,
                productTaxes: mockProductTaxList,
                isFetchedAll: true,
            };
        },
    };
});

const renderAssociatedProducts = (
    associatedProductsProps: AssociatedProductsProps = defaultAssociatedProductsProps,
    useFormOptions: UseFormProps<OrderFormValues> = defaultOrderFormProductOption
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                    <AssociatedProducts {...associatedProductsProps} />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<AssociatedProducts />", () => {
    it("should render package course details root ", () => {
        const wrapper = renderAssociatedProducts();
        expect(wrapper.getByTestId("AssociatedProducts__root")).toBeInTheDocument();
    });

    it("should add associated products row when clicking add associated products button", () => {
        const wrapper = renderAssociatedProducts();
        const unselectedProductIndex = 1;

        const addAssociatedProductButton = wrapper.getByTestId("AssociatedProducts__addButton");
        userEvent.click(addAssociatedProductButton);

        expect(
            wrapper.getByText(mockProductChoices[unselectedProductIndex].name)
        ).toBeInTheDocument();
        expect(wrapper.getByTestId("AssociatedProducts__select")).toBeInTheDocument();
    });

    it("should delete associated products row when clicking delete button", () => {
        const wrapper = renderAssociatedProducts();

        const addAssociatedProductButton = wrapper.getByTestId("AssociatedProducts__addButton");
        userEvent.click(addAssociatedProductButton);

        const deleteAssociatedProductButton = wrapper.getByTestId("AssociatedProducts__delete");
        userEvent.click(deleteAssociatedProductButton);

        const selectFields = wrapper.queryAllByTestId("AssociatedProducts__select");

        expect(selectFields.length).toBe(0);
    });

    it("should disable add associated products button when product option limit is reached", () => {
        const wrapper = renderAssociatedProducts();

        const addAssociatedProductButton = wrapper.getByTestId("AssociatedProducts__addButton");

        mockProductChoices.forEach((mockProduct) => {
            if (mockProduct.product_type === "PRODUCT_TYPE_PACKAGE") return;
            userEvent.click(addAssociatedProductButton);
        });

        const selectFields = wrapper.queryAllByTestId("AssociatedProducts__select");
        // -1 because one of the products is already selected as a product
        expect(selectFields.length).toBe(mockProductChoices.length - 1);

        expect(addAssociatedProductButton).toBeDisabled();

        expect(
            wrapper.getByLabelText(
                "Can't add more associated products because maximum associated products reached"
            )
        ).toBeInTheDocument();
    });

    it("should update select field when user selects another product", () => {
        const unselectedProductIndex = 2;
        const wrapper = renderAssociatedProducts();

        const addAssociatedProductButton = wrapper.getByTestId("AssociatedProducts__addButton");
        userEvent.click(addAssociatedProductButton);

        const selectField = wrapper.getByTestId("AssociatedProducts__select");
        userEvent.click(selectField);
        userEvent.keyboard("{ArrowDown}");
        userEvent.keyboard("{Enter}");

        expect(
            wrapper.getByText(mockProductChoices[unselectedProductIndex].name)
        ).toBeInTheDocument();
    });
});
