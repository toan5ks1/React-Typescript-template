import { arrayHasItem } from "src/common/utils/other";
import { OrderCurrency } from "src/squads/payment/constants/enum";
import { getDiscountPriceByType } from "src/squads/payment/helpers/price";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import {
    AssociatedProductDetails,
    OrderFormProductSection,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import { pick1stElement } from "src/squads/payment/utils/array";

import { BilledAtOrderPackageProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";

import { isOneTimeMaterialOrFeeValidBySection } from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/billingItem";
import {
    getProductPricesBySlotOrWeight,
    getTotalCoursesSlot,
    getTotalCoursesWeight,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/price";
import { generateRecurringBillingSectionItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/recurringProduct/helper";

export const getPackageBilledAtOrderItem = (
    productFieldArrayItem: ProductsFormValues,
    productPrice: number,
    currency: OrderCurrency
): BilledAtOrderPackageProduct => {
    const { packageCourses, product, productTax, discount } = productFieldArrayItem;

    return {
        productName: product?.name || "",
        productPrice,
        packageCourses,
        discountName: discount?.name || "",
        productTax,
        discountPrice: getDiscountPriceByType(discount, productPrice),
        currency,
        productAndProductExtension: getProductAndProductExtensionType(productFieldArrayItem),
    };
};

export const getAssociatedProductsBillingSectionItems = (
    associatedProduct: AssociatedProductDetails,
    productFieldArrayItem: ProductsFormValues,
    currency: OrderCurrency,
    section: "billedAtOrder" | "upcomingBilling" = "billedAtOrder"
) => {
    const { productPrices, material } = associatedProduct;

    const firstProductPrice = productPrices && pick1stElement<ProductPriceType>(productPrices);

    if (
        !isOneTimeMaterialOrFeeValidBySection({
            productFieldArrayItem: associatedProduct,
            section,
            hasDateValidation: true,
        })
    )
        return;

    const productName = associatedProduct.product.name;
    const productPriceAmount = firstProductPrice?.price ?? 0;
    const productTax = associatedProduct.productTax;
    const productDiscount = associatedProduct.discount;

    const discountPrice = productDiscount
        ? getDiscountPriceByType(productDiscount, productPriceAmount)
        : 0;

    const productAndProductExtension = getProductAndProductExtensionType(productFieldArrayItem);

    return {
        productName,
        productPrice: productPriceAmount,
        discountName: productDiscount?.name,
        productTax,
        discountPrice,
        currency,
        productAndProductExtension,
        billingDate: material?.custom_billing_date,
    };
};

export const generateScheduleBasedPackageSectionItem = ({
    productFieldArrayItem,
    currency,
    orderDate,
    section = "billedAtOrder",
}: {
    productFieldArrayItem: ProductsFormValues;
    currency: OrderCurrency;
    orderDate: string;
    section?: OrderFormProductSection;
}) => {
    const { packageCourses, productPrices } = productFieldArrayItem;

    const productPricesWithWeight = getProductPricesBySlotOrWeight({
        getTotalCoursesQuantity: getTotalCoursesWeight,
        productPrices,
        packageCourses,
    });

    const billingItems = generateRecurringBillingSectionItem({
        productFieldArrayItem: { ...productFieldArrayItem, productPrices: productPricesWithWeight },
        currency,
        section,
        orderDate,
    });

    return billingItems;
};

export const generateFrequencyBasedPackageSectionItem = ({
    productFieldArrayItem,
    currency,
    section,
    orderDate,
}: {
    productFieldArrayItem: ProductsFormValues;
    currency: OrderCurrency;
    section: OrderFormProductSection;
    orderDate: string;
}) => {
    const { packageCourses, productPrices } = productFieldArrayItem;

    const productPricesWithSlot = getProductPricesBySlotOrWeight({
        getTotalCoursesQuantity: getTotalCoursesSlot,
        productPrices,
        packageCourses,
    });

    if (!arrayHasItem(productPricesWithSlot)) return [];

    const billingItems = generateRecurringBillingSectionItem({
        productFieldArrayItem: {
            ...productFieldArrayItem,
            productPrices: productPricesWithSlot,
        },
        currency,
        section,
        orderDate,
    });

    return billingItems;
};
