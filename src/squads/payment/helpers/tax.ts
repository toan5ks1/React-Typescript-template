import { KeyTaxCategoryTypes } from "src/squads/payment/constants/const";
import { getProductTaxPrice } from "src/squads/payment/helpers/price";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";

export const getTaxValuesForBilledAtOrderItems = (
    billedAtOrderProducts: BilledAtOrderItemType[]
): Record<number, number> => {
    const billedAtOrderTaxInclusions: Record<number, number> = {};

    billedAtOrderProducts.forEach((billedAtOrderProduct) => {
        if (!billedAtOrderProduct.productTax) return;

        const { tax_category: taxCategory, tax_percentage: taxPercentage } =
            billedAtOrderProduct.productTax;

        switch (taxCategory) {
            case KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE:
                const currentValue = billedAtOrderTaxInclusions[taxPercentage]
                    ? billedAtOrderTaxInclusions[taxPercentage]
                    : 0;

                const { productPrice, discountPrice } = billedAtOrderProduct;

                const taxPrice = getProductTaxPrice(productPrice, discountPrice, taxPercentage);

                billedAtOrderTaxInclusions[taxPercentage] = currentValue + taxPrice;
                break;
            case KeyTaxCategoryTypes.TAX_CATEGORY_EXCLUSIVE:
            case KeyTaxCategoryTypes.TAX_CATEGORY_NONE:
                break;
        }
    });

    return billedAtOrderTaxInclusions;
};
