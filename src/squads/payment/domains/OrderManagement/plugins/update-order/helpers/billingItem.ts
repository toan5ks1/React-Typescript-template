import { pick1stElement } from "src/common/utils/other";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import {
    ProductsFormValues,
    OrderFormProductSection,
} from "src/squads/payment/types/form/order-form-types";
import { UpdateOrderBillItem } from "src/squads/payment/types/service/bill-item-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";

import { BillingItem } from "manabuf/payment/v1/order_pb";

import {
    isOneTimeMaterialOrFeeValidBySection,
    getOneTimeBillingItemsDetails,
    getBillingItemProperties,
} from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/billingItem";
import {
    getBillingPeriods,
    getDiscountApplicablePeriodIds,
    getPeriodWithBillingRatio,
} from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";
import {
    getBillingPeriodDetails,
    getRecurringProductInfo,
} from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/recurringProducts";

export const getOneTimeProductAffectedBillingItem = (
    billItem: UpdateOrderBillItem[]
): UpdateOrderBillItem | undefined => {
    return billItem.find((billItem) => billItem.is_latest_bill_item);
};

export const getUpdateOrderOneTimeBillingItems = (
    productFieldArrayItem: ProductsFormValues,
    section: OrderFormProductSection
): Array<BillingItem.AsObject> => {
    const { product, productPrices, discount, productTax, updateOrderDetails } =
        productFieldArrayItem;
    let billingItems: Array<BillingItem.AsObject> = [];

    const oneTimeProductPrice = productPrices && pick1stElement<ProductPriceType>(productPrices);

    if (
        !isOneTimeMaterialOrFeeValidBySection({
            productFieldArrayItem,
            section,
            hasDateValidation: true,
        }) ||
        !updateOrderDetails
    )
        return billingItems;

    const billItemDetails = getOneTimeBillingItemsDetails({
        product: product!,
        discount,
        productTax,
        productPrice: oneTimeProductPrice!,
    });

    const { billItems, orderStatus } = updateOrderDetails;
    const affectedBillItem = getOneTimeProductAffectedBillingItem(billItems);
    if (!affectedBillItem) return billingItems;

    const isUpdateOrderCancelled = orderStatus === ProductListItemStatus.CANCELLED;
    const currentProductPrice = isUpdateOrderCancelled ? 0 : billItemDetails.finalPrice;

    const oldProductPriceAmount = affectedBillItem.price ?? 0;
    const oldDiscountAmount = affectedBillItem.discount_amount ?? 0;
    const oldProductFinalPrice = oldProductPriceAmount - oldDiscountAmount;

    const adjustmentPrice = currentProductPrice - oldProductFinalPrice;

    billingItems.push({
        ...billItemDetails,
        studentProductId: affectedBillItem.student_product_id,
        adjustmentPrice,
        isCancelBillItem: isUpdateOrderCancelled,
    });

    return billingItems;
};

export const getUpdateOrderRecurringMaterialBillingItems = (
    productFieldArrayItem: ProductsFormValues,
    section: OrderFormProductSection
): Array<BillingItem.AsObject> => {
    const {
        product,
        productPrices,
        productTax,
        discount,
        billingPeriods,
        effectiveDate,
        proRatingFlagDisabled,
    } = getRecurringProductInfo(productFieldArrayItem);

    const { updateOrderDetails } = productFieldArrayItem;

    if (!product || !effectiveDate || !productPrices || !updateOrderDetails) {
        return [];
    }

    const formattedEffectiveDate = effectiveDate.toISOString();

    const selectedBillingPeriods = getBillingPeriods({
        billingPeriods,
        startDate: formattedEffectiveDate,
        orderDate: new Date().toISOString(),
        billingSection: section,
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

    const billingItems: Array<BillingItem.AsObject> = [];
    selectedBillingPeriods.forEach((billingPeriod) => {
        const { billItems } = updateOrderDetails;

        const productPrice = productPrices?.find(
            (price) => price.billing_schedule_period_id === billingPeriod.billing_schedule_period_id
        );

        const billingPeriodDetials = getBillingPeriodDetails({
            billingPeriod,
            billItems,
            productPrices,
            discountApplicablePeriodIds,
            discount,
            effectiveDate: formattedEffectiveDate,
            orderStatus: updateOrderDetails.orderStatus,
            periodWithBillingRatio,
            proRatingFlagDisabled,
        });

        if (!billingPeriodDetials) return;

        const { billingItemPriceWithRatio, canApplyDiscount, affectedBillItem, adjustmentPrice } =
            billingPeriodDetials;

        const { discountItem, taxItem, finalPrice } = getBillingItemProperties(
            canApplyDiscount ? discount : undefined,
            product.tax_id,
            productTax,
            billingItemPriceWithRatio
        );

        const isCancelBillItem = updateOrderDetails.orderStatus === ProductListItemStatus.CANCELLED;

        billingItems.push({
            productId: product.product_id!,
            billingSchedulePeriodId: billingPeriod.billing_schedule_period_id,
            price: billingItemPriceWithRatio,
            taxItem,
            discountItem,
            finalPrice,
            quantity: productPrice?.quantity,
            studentProductId: affectedBillItem.student_product_id,
            adjustmentPrice: adjustmentPrice,
            isCancelBillItem,
            courseItemsList: [],
        });
    });
    return billingItems;
};
