import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { calculatePriceWithBillingRatio } from "src/squads/payment/helpers/price";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";
import { UpdateOrderBillItem } from "src/squads/payment/types/service/bill-item-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import { ProductDiscountType } from "src/squads/payment/types/service/discount-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import { getDateWithZeroMilliseconds } from "src/squads/payment/utils/date";

import { Billing_Schedule_Period } from "src/squads/payment/__generated__/fatima/root-types";
import {
    getPeriodRatioDetails,
    getBillingItemPrice,
    getBillingDiscountDetails,
} from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";
import { getAdjustmentPriceByOrderStatus } from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/price";

export const getEffectiveDateByStartDate = (startDate: string): Date => {
    const currentDate = getDateWithZeroMilliseconds();
    const productStartDate = getDateWithZeroMilliseconds(new Date(startDate));

    return productStartDate > currentDate ? productStartDate : currentDate;
};

export const getRecurringProductInfo = (productFieldArrayItem: ProductsFormValues) => {
    const { product, updateOrderDetails, productTax, discount, productPrices, packageCourses } =
        productFieldArrayItem;
    const billingPeriods = updateOrderDetails?.reccuringDetails?.billingSchedulePeriods ?? [];
    const effectiveDate = updateOrderDetails?.effectiveDate;
    const proRatingFlagDisabled = product?.disable_pro_rating_flag;
    const productAndProductExtension = getProductAndProductExtensionType(productFieldArrayItem);

    return {
        product,
        productTax,
        discount,
        productPrices,
        billingPeriods,
        effectiveDate,
        proRatingFlagDisabled,
        productAndProductExtension,
        packageCourses,
    };
};

interface BillingPeriodDetailsRequest {
    billingPeriod: BillingSchedulePeriod;
    billItems: UpdateOrderBillItem[] | undefined;
    productPrices: ProductPriceType[];
    discountApplicablePeriodIds: Billing_Schedule_Period["billing_schedule_period_id"][];
    effectiveDate: string;
    orderStatus: ProductListItemStatus;
    discount?: ProductDiscountType | null;
    periodWithBillingRatio?: BillingSchedulePeriod;
    proRatingFlagDisabled?: boolean;
}

interface BillingPeriodDetails {
    billingItemPriceWithRatio: number;
    canApplyDiscount: boolean;
    affectedBillItem: UpdateOrderBillItem;
    billingRatioNumerator: number | undefined;
    billingRatioDenominator: number | undefined;
    adjustmentPrice: number;
}

export const getBillingPeriodDetails = ({
    billingPeriod,
    billItems,
    productPrices,
    discountApplicablePeriodIds,
    discount,
    periodWithBillingRatio,
    proRatingFlagDisabled,
    effectiveDate,
    orderStatus,
}: BillingPeriodDetailsRequest): BillingPeriodDetails | null => {
    const affectedBillItem = billItems?.find(
        (billItem) =>
            billItem.billing_schedule_period_id === billingPeriod.billing_schedule_period_id
    );

    if (!affectedBillItem) return null;

    const { billingRatioDenominator, billingRatioNumerator } = getPeriodRatioDetails({
        billingPeriod,
        periodWithBillingRatio,
        proRatingFlagDisabled,
        startDate: effectiveDate,
    });

    const billingItemPriceWithRatio = getBillingItemPrice({
        productPrices,
        billingPeriodId: billingPeriod.billing_schedule_period_id,
        billingRatioNumerator,
        billingRatioDenominator,
    });

    const canApplyDiscount = Boolean(
        discountApplicablePeriodIds.find(
            (periodId) => periodId === billingPeriod.billing_schedule_period_id
        )
    );
    const { discountAmount } = getBillingDiscountDetails(
        billingItemPriceWithRatio,
        discount,
        canApplyDiscount
    );

    const oldProductPriceAmount = affectedBillItem.price ?? 0;
    const oldDiscountAmount = affectedBillItem.discount_amount ?? 0;
    const oldProductPriceAmountWithRatio = calculatePriceWithBillingRatio({
        productPrice: oldProductPriceAmount,
        billingRatioNumerator: affectedBillItem.billing_ratio_numerator ?? undefined,
        billingRatioDenominator: affectedBillItem.billing_ratio_denominator ?? undefined,
    });

    const billingItemPrice = oldProductPriceAmountWithRatio - oldDiscountAmount;

    const adjustmentPrice = getAdjustmentPriceByOrderStatus({
        productPriceAmount: billingItemPriceWithRatio,
        discountPrice: discountAmount,
        billingItemPrice,
        orderStatus,
        proRatingFlagDisabled,
        billingRatioNumerator,
        billingRatioDenominator,
    });

    return {
        billingItemPriceWithRatio,
        canApplyDiscount,
        affectedBillItem,
        billingRatioNumerator,
        billingRatioDenominator,
        adjustmentPrice,
    };
};
