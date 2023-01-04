import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { calculatePriceWithBillingRatio } from "src/squads/payment/helpers/price";

export const getAdjustmentPriceByOrderStatus = ({
    productPriceAmount,
    discountPrice,
    billingItemPrice,
    orderStatus,
    proRatingFlagDisabled,
    billingRatioNumerator,
    billingRatioDenominator,
}: {
    productPriceAmount: number;
    discountPrice: number;
    billingItemPrice: number;
    orderStatus: ProductListItemStatus;
    proRatingFlagDisabled?: boolean;
    billingRatioNumerator?: number;
    billingRatioDenominator?: number;
}): number => {
    if (orderStatus === ProductListItemStatus.ACTIVE) {
        return productPriceAmount - discountPrice - billingItemPrice;
    }

    const cancelledProductPrice = 0;

    if (proRatingFlagDisabled) {
        return cancelledProductPrice;
    }

    const billingItemPriceWithBillingRatio = calculatePriceWithBillingRatio({
        productPrice: billingItemPrice,
        billingRatioNumerator,
        billingRatioDenominator,
    });

    return cancelledProductPrice - billingItemPriceWithBillingRatio;
};
