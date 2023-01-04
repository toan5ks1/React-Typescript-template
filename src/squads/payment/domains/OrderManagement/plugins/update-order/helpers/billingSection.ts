import { OrderCurrency, ProductListItemStatus } from "src/squads/payment/constants/enum";
import { getDiscountPriceByType } from "src/squads/payment/helpers/price";
import { getProductNameWithTag } from "src/squads/payment/helpers/product";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import { pick1stElement } from "src/squads/payment/utils/array";

import { BilledAtOrderRecurringProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingRecurringProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";

import { isOneTimeMaterialOrFeeValidBySection } from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/billingItem";
import {
    getBillingPeriods,
    getDiscountApplicablePeriodIds,
    getPeriodWithBillingRatio,
} from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";
import { getOneTimeProductAffectedBillingItem } from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/billingItem";
import { getAdjustmentPriceByOrderStatus } from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/price";
import {
    getRecurringProductInfo,
    getBillingPeriodDetails,
} from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/recurringProducts";

export const generateOneTimeProductAdjustmentBilledAtOrderItem = ({
    productFieldArrayItem,
    currency,
    orderStatus,
    adjustmentTag,
}: {
    productFieldArrayItem: ProductsFormValues;
    currency: OrderCurrency;
    orderStatus: ProductListItemStatus;
    adjustmentTag: string;
}) => {
    const { productPrices, product, updateOrderDetails } = productFieldArrayItem;
    const firstProductPrice = productPrices && pick1stElement<ProductPriceType>(productPrices);
    const affectedBillItem = getOneTimeProductAffectedBillingItem(
        updateOrderDetails?.billItems ?? []
    );

    if (
        !isOneTimeMaterialOrFeeValidBySection({
            productFieldArrayItem,
            section: "billedAtOrder",
        }) ||
        !affectedBillItem
    )
        return;

    const productName = product!.name;
    const productPriceAmount = firstProductPrice!.price;
    const productTax = productFieldArrayItem.productTax;
    const productDiscount = productFieldArrayItem.discount;

    const discountPrice = productDiscount
        ? getDiscountPriceByType(productDiscount, productPriceAmount)
        : 0;

    const productAndProductExtension = getProductAndProductExtensionType(productFieldArrayItem);
    const formattedProductName = getProductNameWithTag(adjustmentTag, productName);

    const oldProductPriceAmount = affectedBillItem.price ?? 0;
    const oldDiscountAmount = affectedBillItem.discount_amount ?? 0;
    const billingItemPrice = oldProductPriceAmount - oldDiscountAmount;

    const adjustmentPrice = getAdjustmentPriceByOrderStatus({
        productPriceAmount,
        discountPrice,
        billingItemPrice,
        orderStatus,
    });

    return {
        productName: formattedProductName,
        productPrice: adjustmentPrice,
        productTax,
        discountPrice: 0,
        currency,
        productAndProductExtension,
    };
};

export const generateRecurringMaterialAdjustmentBilledAtOrderItem = ({
    productFieldArrayItem,
    currency,
    orderStatus,
    adjustmentTag,
}: {
    productFieldArrayItem: ProductsFormValues;
    currency: OrderCurrency;
    orderStatus: ProductListItemStatus;
    adjustmentTag: string;
}): BilledAtOrderRecurringProduct[] => {
    const {
        product,
        productPrices,
        productTax,
        discount,
        billingPeriods,
        effectiveDate,
        proRatingFlagDisabled,
        productAndProductExtension,
    } = getRecurringProductInfo(productFieldArrayItem);

    const { updateOrderDetails } = productFieldArrayItem;

    if (!product || !effectiveDate || !productPrices || !updateOrderDetails) {
        return [];
    }

    const formattedEffectiveDate = effectiveDate.toISOString();

    const billedAtOrderBillingPeriods = getBillingPeriods({
        billingPeriods,
        startDate: formattedEffectiveDate,
        orderDate: new Date().toISOString(),
        billingSection: "billedAtOrder",
    });
    const periodWithBillingRatio = getPeriodWithBillingRatio(
        billingPeriods,
        formattedEffectiveDate
    );
    const discountApplicablePeriodIds = getDiscountApplicablePeriodIds(
        billingPeriods,
        formattedEffectiveDate,
        discount
    );

    const billedAtOrderBillingItems: BilledAtOrderRecurringProduct[] = [];

    billedAtOrderBillingPeriods.forEach((billingPeriod) => {
        const { billItems } = updateOrderDetails;

        const billingPeriodDetials = getBillingPeriodDetails({
            billingPeriod,
            billItems,
            productPrices,
            discountApplicablePeriodIds,
            discount,
            effectiveDate: formattedEffectiveDate,
            orderStatus,
            periodWithBillingRatio,
            proRatingFlagDisabled,
        });

        if (!billingPeriodDetials) return;

        const { adjustmentPrice, billingRatioNumerator, billingRatioDenominator } =
            billingPeriodDetials;

        const formattedProductName = getProductNameWithTag(adjustmentTag, product.name);

        billedAtOrderBillingItems.push({
            productName: formattedProductName,
            productPrice: adjustmentPrice,
            productTax,
            discountPrice: 0,
            currency,
            productAndProductExtension,
            billingSchedulePeriodName: billingPeriod.name,
            billingRatioNumerator,
            billingRatioDenominator,
        });
    });

    return billedAtOrderBillingItems;
};

export const generateRecurringMaterialAdjustmentUpcomingBillingItem = ({
    productFieldArrayItem,
    currency,
    orderStatus,
    adjustmentTag,
}: {
    productFieldArrayItem: ProductsFormValues;
    currency: OrderCurrency;
    orderStatus: ProductListItemStatus;
    adjustmentTag: string;
}): UpcomingBillingRecurringProduct[] => {
    const {
        product,
        productPrices,
        discount,
        billingPeriods,
        effectiveDate,
        proRatingFlagDisabled,
        productAndProductExtension,
    } = getRecurringProductInfo(productFieldArrayItem);

    const { updateOrderDetails } = productFieldArrayItem;

    if (!product || !effectiveDate || !productPrices || !updateOrderDetails) {
        return [];
    }

    const formattedEffectiveDate = effectiveDate.toISOString();

    const upcomingBillingBillingPeriods = getBillingPeriods({
        billingPeriods,
        startDate: formattedEffectiveDate,
        orderDate: new Date().toISOString(),
        billingSection: "upcomingBilling",
    });
    const periodWithBillingRatio = getPeriodWithBillingRatio(
        billingPeriods,
        formattedEffectiveDate
    );
    const discountApplicablePeriodIds = getDiscountApplicablePeriodIds(
        billingPeriods,
        formattedEffectiveDate,
        discount
    );

    const upcomingBillingBillingItems: UpcomingBillingRecurringProduct[] = [];

    upcomingBillingBillingPeriods.forEach((billingPeriod) => {
        const { billItems } = updateOrderDetails;

        const billingPeriodDetials = getBillingPeriodDetails({
            billingPeriod,
            billItems,
            productPrices,
            discountApplicablePeriodIds,
            discount,
            effectiveDate: formattedEffectiveDate,
            orderStatus,
            periodWithBillingRatio,
            proRatingFlagDisabled,
        });

        if (!billingPeriodDetials) return;

        const { adjustmentPrice, billingRatioNumerator, billingRatioDenominator } =
            billingPeriodDetials;

        const formattedProductName = getProductNameWithTag(adjustmentTag, product.name);

        upcomingBillingBillingItems.push({
            productName: formattedProductName,
            productPrice: adjustmentPrice,
            discountPrice: 0,
            currency,
            productAndProductExtension,
            billingDate: billingPeriod.billing_date,
            billingSchedulePeriodName: billingPeriod.name,
            billingRatioNumerator,
            billingRatioDenominator,
        });
    });

    return upcomingBillingBillingItems;
};
