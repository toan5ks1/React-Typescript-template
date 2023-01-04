import { UseFormProps } from "react-hook-form";
import { pick1stElement } from "src/common/utils/other";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import {
    getCurrentCurrency,
    getDiscountPriceByType,
    getFormattedItemPrice,
} from "src/squads/payment/helpers/price";
import { createMockCompleteOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import {
    mockUpdateProducts,
    mockHasUpdateProducts,
} from "src/squads/payment/test-utils/mocks/order-form-update";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import { getDateWithZeroMilliseconds } from "src/squads/payment/utils/date";

import BilledAtOrderSection from "src/squads/payment/components/Sections/BilledAtOrderSection";
import { updateOrderNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import { getOneTimeProductAffectedBillingItem } from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/billingItem";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

const defaultMockOrderFormValues = createMockCompleteOrderFormValues();
const updateOrderMockFormValues = mockUpdateProducts()[0];
const hasUpdateOrderMockFormValues = mockHasUpdateProducts()[0];

const currentDate = getDateWithZeroMilliseconds();
const isCancelledOrderMockFormValues = mockHasUpdateProducts(
    currentDate,
    ProductListItemStatus.CANCELLED
)[0];
const { currentCurrency: currency } = getCurrentCurrency();
const firstStudentIndex = 0;

const updateFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: defaultMockOrderFormValues.students[firstStudentIndex].studentInfo,
                productFieldArrayItems: [updateOrderMockFormValues],
            },
        ],
        location: defaultMockOrderFormValues.location,
    },
};

const hasUpdateFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: defaultMockOrderFormValues.students[firstStudentIndex].studentInfo,
                productFieldArrayItems: [hasUpdateOrderMockFormValues],
            },
        ],
        location: defaultMockOrderFormValues.location,
    },
};

const isCancelledFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: defaultMockOrderFormValues.students[firstStudentIndex].studentInfo,
                productFieldArrayItems: [isCancelledOrderMockFormValues],
            },
        ],
        location: defaultMockOrderFormValues.location,
    },
};

const renderUpdateOrderBilledAtOrderSection = (
    useFormOptions: UseFormProps<OrderFormValues> = updateFormOptions
) => {
    return render(
        <TranslationProvider>
            <ProductExtensionPluginsProvider
                currency={currency}
                orderType={OrderType.ORDER_TYPE_UPDATE}
                notImplementedYetPlugins={updateOrderNotImplementedYetPlugins}
            >
                <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                    <BilledAtOrderSection studentIndex={firstStudentIndex} />
                </TestHookFormProvider>
            </ProductExtensionPluginsProvider>
        </TranslationProvider>
    );
};

describe("<BilledAtOrderSection /> Update Order One Time Material", () => {
    it("should display no information when no changes are made", () => {
        const wrapper = renderUpdateOrderBilledAtOrderSection();

        expect(wrapper.getByTestId("BilledAtOrderSection__noDataContainer")).toBeInTheDocument();
        expect(wrapper.getByText("No Information")).toBeInTheDocument();
    });

    it("should display adjustment billing item details when changes are made", () => {
        const wrapper = renderUpdateOrderBilledAtOrderSection(hasUpdateFormOptions);

        const { product, productPrices, discount } = hasUpdateOrderMockFormValues;

        const firstProductPrice = pick1stElement<ProductPriceType>(productPrices ?? []);

        expect(firstProductPrice).toBeTruthy();

        const discountPrice = getDiscountPriceByType(discount, firstProductPrice!.price);

        const affectedBillItem = getOneTimeProductAffectedBillingItem(
            hasUpdateOrderMockFormValues.updateOrderDetails!.billItems
        );

        const { price, discount_amount } = affectedBillItem!;

        const oldProductPrice = price ?? 0;
        const oldDiscountAmount = discount_amount ?? 0;
        const billItemPrice = oldProductPrice - oldDiscountAmount;
        const billingRatio = 1;

        const finalPrice =
            (firstProductPrice!.price - discountPrice - billItemPrice) * billingRatio;

        const formattedProductPrice = getFormattedItemPrice(currency, false, finalPrice);

        expect(wrapper.getByText(`[Adjustment] ${product!.name}`)).toBeInTheDocument();
        expect(wrapper.getAllByText(formattedProductPrice)).toHaveLength(
            ["Product Price", "Sub-total", "Total"].length
        );
        expect(wrapper.queryByText(discount!.name)).not.toBeInTheDocument();
    });

    it("should display adjustment billing item when item is cancelled", () => {
        const wrapper = renderUpdateOrderBilledAtOrderSection(isCancelledFormOptions);

        const { product, discount } = isCancelledOrderMockFormValues;

        const affectedBillItem = getOneTimeProductAffectedBillingItem(
            isCancelledOrderMockFormValues.updateOrderDetails!.billItems
        );

        const { price, discount_amount } = affectedBillItem!;

        const oldProductPrice = price ?? 0;
        const oldDiscountAmount = discount_amount ?? 0;
        const billItemPrice = oldProductPrice - oldDiscountAmount;
        const billingRatio = 1;

        const finalPrice = (0 - billItemPrice) * billingRatio;

        const formattedProductPrice = getFormattedItemPrice(currency, false, finalPrice);

        expect(wrapper.getByText(`[Adjustment] ${product!.name}`)).toBeInTheDocument();
        expect(wrapper.getAllByText(formattedProductPrice)).toHaveLength(
            ["Product Price", "Sub-total", "Total"].length
        );
        expect(wrapper.queryByText(discount!.name)).not.toBeInTheDocument();
    });
});
