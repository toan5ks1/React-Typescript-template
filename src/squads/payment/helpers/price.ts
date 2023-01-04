import { KeyDiscountAmountTypes } from "src/squads/payment/constants/const";
import { OrderCurrency, OrderCurrencySymbol } from "src/squads/payment/constants/enum";
import { Payment_GetProductPriceByProductIdQuery } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { ProductDiscountType } from "src/squads/payment/types/service/discount-types";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";

export const getCurrentCurrency = (): {
    currentCurrency: OrderCurrency;
    currentCurrencySymbol: OrderCurrencySymbol;
} => {
    return {
        currentCurrency: OrderCurrency.JAPANESE_YEN,
        currentCurrencySymbol: OrderCurrencySymbol.JAPANESE_YEN,
    };
};

export const getDiscountPriceByType = (
    discount: ProductDiscountType | undefined | null,
    productPrice: number
): number => {
    if (!discount) return 0;

    const { discount_amount_type, discount_amount_value } = discount;

    switch (discount_amount_type) {
        case KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_PERCENTAGE:
            return Math.round(productPrice * (discount_amount_value / 100));
        case KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT:
        case KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_NONE:
        default:
            return Math.round(discount_amount_value);
    }
};

export const getProductTaxPrice = (
    productPrice: number,
    discountPrice: number,
    taxPercentage: number
): number => {
    // Since we already rounding tax price on getFormattedItemPrice method, we don't need to round it here
    const productPriceWithDiscount = productPrice - discountPrice;
    return (productPriceWithDiscount * taxPercentage) / (100 + taxPercentage);
};

export const getFormattedItemPrice = (
    currency: OrderCurrency,
    isDiscount: boolean,
    itemPrice: number
): string => {
    switch (currency) {
        case OrderCurrency.JAPANESE_YEN:
            const formattedPrice = new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: OrderCurrency.JAPANESE_YEN,
                useGrouping: false,
            }).format(Math.round(itemPrice));
            return isDiscount ? `-${formattedPrice}` : formattedPrice;
    }
};

export const getTotalProductPrice = (
    price: ArrayElement<Payment_GetProductPriceByProductIdQuery["product_price"]>["price"],
    currency: OrderCurrency,
    discount: ProductDiscountType | undefined | null
): string => {
    if (!price) return getFormattedItemPrice(currency, false, 0);

    if (!discount?.discount_amount_value || !discount?.discount_amount_type)
        return getFormattedItemPrice(currency, false, price);

    const discountPrice: number = getDiscountPriceByType(discount, price);

    const amountResult = Number(price - discountPrice);

    const formatAmountResult = getFormattedItemPrice(currency, false, amountResult);

    return formatAmountResult;
};

export const calculatePriceWithBillingRatio = ({
    productPrice,
    billingRatioNumerator,
    billingRatioDenominator,
}: {
    productPrice: number;
    billingRatioNumerator?: number;
    billingRatioDenominator?: number;
}): number => {
    if (billingRatioNumerator === 0) return 0;
    if (!billingRatioNumerator || !billingRatioDenominator) return productPrice;
    return (productPrice * billingRatioNumerator) / billingRatioDenominator;
};

export const getTotalValueForBilledAtOrderItems = (
    billedAtOrderProducts: BilledAtOrderItemType[]
): number => {
    return billedAtOrderProducts.reduce((previousValue, billedAtOrderProduct) => {
        return (
            previousValue + billedAtOrderProduct.productPrice - billedAtOrderProduct.discountPrice
        );
    }, 0);
};
