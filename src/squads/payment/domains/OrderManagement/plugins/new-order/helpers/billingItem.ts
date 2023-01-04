import { toNumber } from "lodash";
import { arrayHasItem } from "src/common/utils/other";
import {
    AssociatedProductDetails,
    OrderFormProductSection,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import { pick1stElement } from "src/squads/payment/utils/array";

import { BillingItem } from "manabuf/payment/v1/order_pb";

import {
    getBillingItemProperties,
    getOneTimeBillingItemsDetails,
    isOneTimeMaterialOrFeeValidBySection,
} from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/billingItem";
import {
    mapPackageCourseWithSlot,
    mapPackageCourseWithWeight,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/course";
import {
    getProductPricesBySlotOrWeight,
    getTotalCoursesSlot,
    getTotalCoursesWeight,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/price";
import { getRecurringBillingItems } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/recurringProduct/helper";

export const getAssociatedProductBillingItem = (
    associatedProduct: AssociatedProductDetails,
    section: OrderFormProductSection
) => {
    const { product, productPrices, discount, productTax } = associatedProduct;

    const firstProductPrice = productPrices && pick1stElement<ProductPriceType>(productPrices);

    if (
        !isOneTimeMaterialOrFeeValidBySection({
            productFieldArrayItem: associatedProduct,
            section,
            hasDateValidation: true,
        })
    )
        return;

    const { discountItem, taxItem, finalPrice } = getBillingItemProperties(
        discount,
        product.tax_id,
        productTax,
        firstProductPrice!.price
    );

    return {
        productId: product.product_id,
        billingSchedulePeriodId: firstProductPrice!.billing_schedule_period_id,
        price: toNumber(firstProductPrice!.price),
        taxItem,
        discountItem,
        finalPrice,
        quantity: firstProductPrice!.quantity,
        courseItemsList: [],
    };
};

export const getOneTimeFeeBillingItems = (
    productFieldArrayItem: ProductsFormValues
): Array<BillingItem.AsObject> => {
    const { product, productPrices, discount, productTax } = productFieldArrayItem;
    const billingItems: Array<BillingItem.AsObject> = [];
    const oneTimeProductPrice = productPrices && pick1stElement<ProductPriceType>(productPrices);

    if (
        !isOneTimeMaterialOrFeeValidBySection({
            productFieldArrayItem,
            section: "billedAtOrder",
            hasDateValidation: true,
        })
    )
        return billingItems;

    const billItemDetails = getOneTimeBillingItemsDetails({
        product: product!,
        discount,
        productTax,
        productPrice: oneTimeProductPrice!,
    });

    billingItems.push(billItemDetails);

    return billingItems;
};

export const getOneTimeMaterialBillingItems = (
    productFieldArrayItem: ProductsFormValues,
    section: OrderFormProductSection
): Array<BillingItem.AsObject> => {
    const { product, productPrices, discount, productTax } = productFieldArrayItem;
    const billingItems: Array<BillingItem.AsObject> = [];

    const oneTimeProductPrice = productPrices && pick1stElement<ProductPriceType>(productPrices);

    if (
        !isOneTimeMaterialOrFeeValidBySection({
            productFieldArrayItem,
            section,
            hasDateValidation: true,
        })
    )
        return billingItems;

    const billItemDetails = getOneTimeBillingItemsDetails({
        product: product!,
        discount,
        productTax,
        productPrice: oneTimeProductPrice!,
    });

    billingItems.push(billItemDetails);

    return billingItems;
};

export const getScheduleBasedPackageBillingItems = ({
    productFieldArrayItem,
    section,
    orderDate,
}: {
    productFieldArrayItem: ProductsFormValues;
    section: OrderFormProductSection;
    orderDate: string;
}): Array<BillingItem.AsObject> => {
    const { productPrices, packageCourses, associatedProducts } = productFieldArrayItem;

    const productPricesWithWeight = getProductPricesBySlotOrWeight({
        getTotalCoursesQuantity: getTotalCoursesWeight,
        productPrices,
        packageCourses,
    });

    if (!arrayHasItem(productPricesWithWeight)) return [];

    const courseItemsList = packageCourses?.map(mapPackageCourseWithWeight) || [];

    const billingItems = getRecurringBillingItems({
        productFieldArrayItem: { ...productFieldArrayItem, productPrices: productPricesWithWeight },
        section,
        orderDate,
        courseItemsList,
    });

    for (const associatedProduct of associatedProducts ?? []) {
        const associatedProductBillingItem = getAssociatedProductBillingItem(
            associatedProduct,
            section
        );

        associatedProductBillingItem && billingItems.push(associatedProductBillingItem);
    }

    return billingItems;
};

export const getFrequencyBasedPackageBillingItems = ({
    productFieldArrayItem,
    section,
    orderDate,
}: {
    productFieldArrayItem: ProductsFormValues;
    section: OrderFormProductSection;
    orderDate: string;
}): Array<BillingItem.AsObject> => {
    const { productPrices, packageCourses } = productFieldArrayItem;

    const productPricesWithSlot = getProductPricesBySlotOrWeight({
        getTotalCoursesQuantity: getTotalCoursesSlot,
        productPrices,
        packageCourses,
    });

    if (!arrayHasItem(productPricesWithSlot)) return [];

    const courseItemsList = packageCourses?.map(mapPackageCourseWithSlot) || [];

    const billingItems = getRecurringBillingItems({
        productFieldArrayItem: { ...productFieldArrayItem, productPrices: productPricesWithSlot },
        section,
        orderDate,
        courseItemsList,
    });

    return billingItems;
};
