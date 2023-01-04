import { UseFormProps } from "react-hook-form";
import { dateIsAfter } from "src/common/utils/time";
import { KeyProductFeeTypes, KeyProductMaterialTypes } from "src/squads/payment/constants/const";
import {
    getCurrentCurrency,
    getDiscountPriceByType,
    getFormattedItemPrice,
} from "src/squads/payment/helpers/price";
import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";
import { createMockCompleteOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import {
    createMockProductChoices,
    createMockProductMaterialList,
    createMockProductPriceList,
} from "src/squads/payment/test-utils/mocks/products";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import { pick1stElement } from "src/squads/payment/utils/array";

import BilledAtOrderSection from "src/squads/payment/components/Sections/BilledAtOrderSection";
import { BilledAtOrderSectionProps } from "src/squads/payment/components/Sections/BilledAtOrderSection/BilledAtOrderSection";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

const defaultMockOrderFormValues = createMockCompleteOrderFormValues();
const { currentCurrency: currency } = getCurrentCurrency();
const firstStudentIndex = 0;

const defaultBilledAtOrderSectionProps: BilledAtOrderSectionProps = {
    studentIndex: firstStudentIndex,
};

const defaultFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: defaultMockOrderFormValues,
};

const renderBilledAtOrderSection = (
    useFormOptions: UseFormProps<OrderFormValues> = defaultFormOptions,
    billedAtOrderSectionProps: BilledAtOrderSectionProps = defaultBilledAtOrderSectionProps
) => {
    return render(
        <TranslationProvider>
            <ProductExtensionPluginsProvider
                currency={currency}
                orderType={OrderType.ORDER_TYPE_NEW}
                notImplementedYetPlugins={defaultNotImplementedYetPlugins}
            >
                <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                    <BilledAtOrderSection {...billedAtOrderSectionProps} />
                </TestHookFormProvider>
            </ProductExtensionPluginsProvider>
        </TranslationProvider>
    );
};

describe("<BilledAtOrderSection />", () => {
    it("should render billed at order title and list", () => {
        const wrapper = renderBilledAtOrderSection();

        expect(wrapper.getByTestId("BilledAtOrderSection__titleContainer")).toBeInTheDocument();
        expect(wrapper.getByTestId("BilledAtOrderList__container")).toBeInTheDocument();
    });

    it("should render billed at order without title", () => {
        const wrapper = renderBilledAtOrderSection(defaultFormOptions, {
            ...defaultBilledAtOrderSectionProps,
            showBilledAtOrderSectionTitle: false,
        });

        expect(wrapper.queryByText("Billed at order")).not.toBeInTheDocument();
    });

    //TODO update logic when we show products with type of package and fees
    it("should show items given products with price", () => {
        const wrapper = renderBilledAtOrderSection();

        const defaultProductItems =
            defaultMockOrderFormValues.students[firstStudentIndex].productFieldArrayItems;
        const oneTimeMaterialProductItems = defaultProductItems.filter(
            (product) =>
                product.material?.material_type ===
                    KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME &&
                !dateIsAfter(new Date(product.material.custom_billing_date), new Date())
        );

        expect(oneTimeMaterialProductItems.length).toBe(2);

        const oneTimeFeeProductItems = defaultProductItems.filter(
            (product) => product.fee?.fee_type === KeyProductFeeTypes.FEE_TYPE_ONE_TIME
        );

        expect(oneTimeFeeProductItems.length).toBe(1);

        const totalItems = oneTimeMaterialProductItems.length + oneTimeFeeProductItems.length;

        expect(wrapper.getAllByTestId("BilledAtOrderProduct__productContainer")).toHaveLength(
            totalItems
        );
        expect(wrapper.getAllByTestId("BilledAtOrderProduct__discountContainer")).toHaveLength(
            totalItems
        );
    });

    it("should show products with no tax", () => {
        const product = createMockProductChoices()[1];
        const productPrices = createMockProductPriceList();
        const discount = createMockDiscountChoices()[0];
        const material = createMockProductMaterialList()[0];

        const firstProductPrice = pick1stElement<ProductPriceType>(productPrices);

        expect(firstProductPrice).toBeTruthy();

        const discountPrice = getDiscountPriceByType(discount, firstProductPrice!.price);

        const wrapper = renderBilledAtOrderSection({
            defaultValues: createMockCompleteOrderFormValues([
                {
                    product,
                    material,
                    productPrices,
                    productTax: undefined,
                    discount,
                },
            ]),
        });

        const formattedProductPrice = getFormattedItemPrice(
            currency,
            false,
            firstProductPrice!.price
        );
        const formattedDiscountPrice = getFormattedItemPrice(currency, true, discountPrice);

        expect(wrapper.getByText(product.name)).toBeInTheDocument();
        expect(wrapper.getByText(formattedProductPrice)).toBeInTheDocument();
        expect(wrapper.getByText(discount.name)).toBeInTheDocument();
        expect(wrapper.getByText(formattedDiscountPrice)).toBeInTheDocument();
    });

    it("should not show products with no product and price", () => {
        const wrapper = renderBilledAtOrderSection({
            defaultValues: createMockCompleteOrderFormValues([
                {
                    product: createMockProductChoices()[0],
                    productPrices: undefined,
                },
            ]),
        });

        expect(
            wrapper.queryByTestId("BilledAtOrderProduct__productContainer")
        ).not.toBeInTheDocument();
        expect(
            wrapper.queryByTestId("BilledAtOrderProduct__discountContainer")
        ).not.toBeInTheDocument();
    });

    it("should not show products with billing date > current date", () => {
        const product = createMockProductChoices()[1];
        const productPrices = createMockProductPriceList();

        const date = new Date();
        date.setDate(date.getDate() + 1);

        const wrapper = renderBilledAtOrderSection({
            defaultValues: createMockCompleteOrderFormValues([
                {
                    product,
                    productPrices,
                    material: {
                        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
                        custom_billing_date: date.toISOString(),
                    },
                },
            ]),
        });

        expect(wrapper.queryByText(product.name)).not.toBeInTheDocument();
    });

    it("should show total and subtotal values", () => {
        const wrapper = renderBilledAtOrderSection();

        expect(wrapper.getByTestId("BilledAtOrderList__subtotal")).toBeInTheDocument();
        expect(wrapper.getByTestId("BilledAtOrderList__total")).toBeInTheDocument();
    });

    it("should group tax values according to value", async () => {
        const taxPercentages = defaultMockOrderFormValues.students[
            firstStudentIndex
        ].productFieldArrayItems.map((productItem) => {
            return productItem.productTax?.tax_percentage;
        });

        const uniqueTaxPercentages = [...new Set(taxPercentages)];
        const wrapper = renderBilledAtOrderSection();

        for (const taxPercentage of uniqueTaxPercentages) {
            expect(await wrapper.findByText(`Tax (${taxPercentage}% incl)`)).toBeInTheDocument();
        }
    });
});
