import { toNumber } from "lodash";
import { KeyProductTypes } from "src/squads/payment/constants/const";
import { OrderCurrency } from "src/squads/payment/constants/enum";
import { getDiscountPriceByType, getProductTaxPrice } from "src/squads/payment/helpers/price";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import {
    AssociatedProductDetails,
    OrderFormProductSection,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { ProductDiscountType } from "src/squads/payment/types/service/discount-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";
import { ProductTaxType } from "src/squads/payment/types/service/tax-types";
import { pick1stElement } from "src/squads/payment/utils/array";
import { dateIsAfter } from "src/squads/payment/utils/date";

import { TaxCategory, DiscountAmountType, DiscountType } from "manabuf/payment/v1/enums_pb";
import {
    DiscountBillItem,
    TaxBillItem,
    CourseItem,
    BillingItem,
} from "manabuf/payment/v1/order_pb";

import {
    BillingItemProperties,
    TaxBillItemRequest,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

const validateBillingDateBySection = (
    productBillingDate: string,
    section: OrderFormProductSection
): boolean => {
    const currentDate = new Date();
    const billingDate = new Date(productBillingDate);

    if (section === "billedAtOrder") {
        //Check if billing date < current date for billed at order
        if (dateIsAfter(billingDate, currentDate)) {
            return false;
        }

        return true;
    }

    //Check if billing date > current date for upcoming billing
    if (!dateIsAfter(billingDate, currentDate)) {
        return false;
    }
    return true;
};

export const isOneTimeMaterialOrFeeValidBySection = ({
    productFieldArrayItem,
    section,
    hasDateValidation,
}: {
    productFieldArrayItem: ProductsFormValues | AssociatedProductDetails;
    section: OrderFormProductSection;
    hasDateValidation?: boolean;
}): boolean => {
    const { material, fee, productPrices, product } = productFieldArrayItem;

    const firstProductPrice = productPrices && pick1stElement<ProductPriceType>(productPrices);

    if (!product || !firstProductPrice) return false;

    switch (product.product_type) {
        case KeyProductTypes.PRODUCT_TYPE_MATERIAL:
            if (
                !material ||
                (hasDateValidation &&
                    !validateBillingDateBySection(material.custom_billing_date, section))
            ) {
                return false;
            }
            break;
        case KeyProductTypes.PRODUCT_TYPE_FEE:
            if (!fee || section === "upcomingBilling") return false;
            break;
        default:
            return false;
    }

    return true;
};

export const generateOneTimeMaterialOrFeeBillingSectionItem = ({
    productFieldArrayItem,
    currency,
    section,
    hasDateValidation,
}: {
    productFieldArrayItem: ProductsFormValues;
    currency: OrderCurrency;
    section: OrderFormProductSection;
    hasDateValidation?: boolean;
}) => {
    const { productPrices, product, material } = productFieldArrayItem;
    const firstProductPrice = productPrices && pick1stElement<ProductPriceType>(productPrices);

    if (
        !isOneTimeMaterialOrFeeValidBySection({
            productFieldArrayItem,
            section,
            hasDateValidation,
        })
    )
        return;

    const productPriceAmount = firstProductPrice!.price;
    const productDiscount = productFieldArrayItem.discount;

    return {
        productName: product?.name || "",
        productPrice: productPriceAmount,
        discountName: productDiscount?.name,
        productTax: productFieldArrayItem.productTax,
        discountPrice: getDiscountPriceByType(productDiscount, productPriceAmount),
        currency,
        productAndProductExtension: getProductAndProductExtensionType(productFieldArrayItem),
        billingDate: material?.custom_billing_date,
    };
};

const getTaxItem = ({
    taxId,
    productTax,
    productPrice,
    discountAmount,
}: TaxBillItemRequest): TaxBillItem.AsObject | undefined => {
    if (!productTax || !taxId) return undefined;

    const taxAmount = getProductTaxPrice(productPrice, discountAmount, productTax.tax_percentage);

    return {
        taxId,
        taxPercentage: productTax.tax_percentage,
        taxAmount,
        taxCategory: TaxCategory[productTax.tax_category],
    };
};

const getDiscountItem = (
    productDiscount: ProductDiscountType | undefined | null,
    discountAmount: number
): DiscountBillItem.AsObject | undefined => {
    if (!productDiscount) return undefined;

    const { discount_id, discount_amount_type, discount_amount_value, discount_type } =
        productDiscount;

    const discountAmountType = DiscountAmountType[discount_amount_type];
    const discountType = DiscountType[discount_type];

    return {
        discountId: discount_id,
        discountType,
        discountAmountType,
        discountAmountValue: discount_amount_value,
        discountAmount,
    };
};

export const getBillingItemProperties = (
    discount: ProductDiscountType | undefined | null,
    taxId: ProductTypeQuery["tax_id"],
    productTax: ProductTaxType | undefined,
    productPrice: number
): BillingItemProperties => {
    const discountAmount = getDiscountPriceByType(discount, productPrice);

    return {
        discountItem: getDiscountItem(discount, discountAmount),
        taxItem: getTaxItem({
            taxId,
            productTax,
            productPrice,
            discountAmount,
        }),
        finalPrice: productPrice - discountAmount,
    };
};

export const mapProductDetailsToBillingItem = ({
    product,
    taxItem,
    discountItem,
    finalPrice,
    productPrice,
    courseItemsList,
}: {
    product: ProductTypeQuery;
    productPrice: ProductPriceType;
    discountItem: DiscountBillItem.AsObject | undefined;
    taxItem: TaxBillItem.AsObject | undefined;
    finalPrice: number;
    courseItemsList: Array<CourseItem.AsObject>;
}): BillingItem.AsObject => {
    return {
        productId: product.product_id!,
        billingSchedulePeriodId: productPrice.billing_schedule_period_id,
        price: toNumber(productPrice.price),
        taxItem,
        discountItem,
        finalPrice,
        quantity: productPrice.quantity,
        courseItemsList: courseItemsList,
    };
};

export const getOneTimeBillingItemsDetails = ({
    product,
    discount,
    productTax,
    productPrice,
}: {
    product: ProductTypeQuery;
    discount: ProductDiscountType | null | undefined;
    productTax: ProductTaxType | undefined;
    productPrice: ProductPriceType;
}): BillingItem.AsObject => {
    const { discountItem, taxItem, finalPrice } = getBillingItemProperties(
        discount,
        product.tax_id,
        productTax,
        productPrice.price
    );

    return mapProductDetailsToBillingItem({
        product,
        taxItem,
        discountItem,
        finalPrice,
        productPrice,
        courseItemsList: [],
    });
};
