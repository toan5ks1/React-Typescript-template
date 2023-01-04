import { UseFormProps } from "react-hook-form";
import { KeyProductMaterialTypes } from "src/squads/payment/constants/const";
import { getCurrentCurrency, getTotalProductPrice } from "src/squads/payment/helpers/price";
import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";
import { createMockCompleteOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import {
    createMockProductChoices,
    createMockProductPriceList,
} from "src/squads/payment/test-utils/mocks/products";
import { createMockTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import UpcomingBillingSection from "src/squads/payment/components/Sections/UpcomingBillingSection";
import { UpcomingBillingSectionProps } from "src/squads/payment/components/Sections/UpcomingBillingSection/UpcomingBillingSection";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

const firstStudentIndex = 0;

const defaultMockOrderFormValues = createMockCompleteOrderFormValues();
const { currentCurrency: currency } = getCurrentCurrency();

const defaultFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: defaultMockOrderFormValues,
};

const defaultUpcomingBillingSectionProps: UpcomingBillingSectionProps = {
    studentIndex: firstStudentIndex,
};

const renderUpcomingBillingSection = (
    useFormOptions: UseFormProps<OrderFormValues> = defaultFormOptions,
    upcomingBillingSectionProps: UpcomingBillingSectionProps = defaultUpcomingBillingSectionProps
) => {
    return render(
        <ProductExtensionPluginsProvider
            currency={currency}
            orderType={OrderType.ORDER_TYPE_NEW}
            notImplementedYetPlugins={defaultNotImplementedYetPlugins}
        >
            <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                <UpcomingBillingSection {...upcomingBillingSectionProps} />
            </TestHookFormProvider>
        </ProductExtensionPluginsProvider>
    );
};

describe("<UpcomingBillingSection />", () => {
    it("should render upcoming billing section title", () => {
        const wrapper = renderUpcomingBillingSection();

        expect(wrapper.getByTestId("UpcomingBillingSection__title")).toBeInTheDocument();
    });

    it("should render upcoming billing section without title", () => {
        const wrapper = renderUpcomingBillingSection(defaultFormOptions, {
            ...defaultUpcomingBillingSectionProps,
            showUpcomingBillingSectionTitle: false,
        });

        expect(wrapper.queryByText("Upcoming Billing")).not.toBeInTheDocument();
    });

    it("should show products with billing date > current date", () => {
        const product = createMockProductChoices()[1];
        const productPrice = createMockProductPriceList()[0];
        const discount = createMockDiscountChoices()[0];
        const productTax = createMockTaxDataList()[0];

        const firstProduct = { ...product, name: "First Product" };
        const secondProduct = { ...product, name: "Second Product" };

        const firstProductPrice = { ...productPrice, price: 1000 };
        const secondProductPrice = { ...productPrice, price: 2000 };

        const firstProductdate = new Date();
        firstProductdate.setDate(firstProductdate.getDate() + 1);

        const secondProductDate = new Date();
        secondProductDate.setDate(secondProductDate.getDate() + 2);

        const wrapper = renderUpcomingBillingSection({
            defaultValues: createMockCompleteOrderFormValues([
                {
                    product: firstProduct,
                    productPrices: [firstProductPrice],
                    material: {
                        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
                        custom_billing_date: firstProductdate.toISOString(),
                    },
                    discount,
                    productTax,
                },
                {
                    product: secondProduct,
                    productPrices: [secondProductPrice],
                    material: {
                        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
                        custom_billing_date: secondProductDate.toISOString(),
                    },
                    discount,
                    productTax,
                },
            ]),
        });

        const firstTotalAmount = getTotalProductPrice(firstProductPrice.price, currency, discount);

        const secondTotalAmount = getTotalProductPrice(
            secondProductPrice.price,
            currency,
            discount
        );

        expect(wrapper.getAllByTestId("UpcomingBillingProduct__name")).toHaveLength(2);
        expect(wrapper.getAllByTestId("UpcomingBillingProduct__price")).toHaveLength(2);
        expect(wrapper.getByText(firstProduct.name)).toBeInTheDocument();
        expect(wrapper.getByText(firstTotalAmount)).toBeInTheDocument();
        expect(wrapper.getByText(secondProduct.name)).toBeInTheDocument();
        expect(wrapper.getByText(secondTotalAmount)).toBeInTheDocument();
    });

    it("should show products without tax", () => {
        const product = createMockProductChoices()[1];
        const productPrice = createMockProductPriceList()[0];
        const discount = createMockDiscountChoices()[0];

        const date = new Date();
        date.setDate(date.getDate() + 1);

        const wrapper = renderUpcomingBillingSection({
            defaultValues: createMockCompleteOrderFormValues([
                {
                    product,
                    productPrices: [productPrice],
                    material: {
                        material_type: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
                        custom_billing_date: date.toISOString(),
                    },
                    discount,
                },
            ]),
        });

        const totalAmount = getTotalProductPrice(productPrice.price, currency, discount);

        expect(wrapper.getByText(product.name)).toBeInTheDocument();
        expect(wrapper.getByText(totalAmount)).toBeInTheDocument();
    });

    it("should not show products with billing date < current date", () => {
        const product = createMockProductChoices()[1];
        const productPrices = createMockProductPriceList();

        const date = new Date();
        date.setDate(date.getDate() - 1);

        const wrapper = renderUpcomingBillingSection({
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

        expect(wrapper.getByTestId("UpcomingBillingSection__noDataContainer")).toBeInTheDocument();
    });

    it("should not show products with no product or price", () => {
        const wrapper = renderUpcomingBillingSection({
            defaultValues: createMockCompleteOrderFormValues([
                {
                    product: createMockProductChoices()[0],
                    productPrices: undefined,
                },
            ]),
        });

        expect(wrapper.getByTestId("UpcomingBillingSection__noDataContainer")).toBeInTheDocument();
    });
});
