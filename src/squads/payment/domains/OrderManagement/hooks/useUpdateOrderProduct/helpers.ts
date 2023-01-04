import { arrayHasItem, pick1stElement } from "src/common/utils/other";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import {
    Payment_GetManyBillItemsByStudentProductIdsV2Query,
    Payment_GetManyProductsByProductIdsQuery,
    Payment_GetManyStudentProductsByStudentProductIdsV2Query,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";
import { UpdateOrderBillItem } from "src/squads/payment/types/service/bill-item-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import {
    ProductDiscountType,
    OrderDetailProductListDiscountType,
} from "src/squads/payment/types/service/discount-types";
import { UpdateOrderOrderItem } from "src/squads/payment/types/service/order-item-types";
import { ProductTaxesType } from "src/squads/payment/types/service/tax-types";
import { isNotUndefinedOrNull } from "src/squads/payment/utils/types";

import {
    Billing_Schedule,
    Discount,
    Product,
} from "src/squads/payment/__generated__/fatima/root-types";
import { getOneTimeProductAffectedBillingItem } from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/billingItem";
import { getEffectiveDateByStartDate } from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/recurringProducts";

interface UpdateOrderProductDetails {
    studentProductIds: string[];
    billItems: UpdateOrderBillItem[] | undefined;
    orderItems: UpdateOrderOrderItem[] | undefined;
    productDiscounts: OrderDetailProductListDiscountType[] | undefined;
    productsWithDetails: ProductsFormValues[];
    billingSchedulePeriods: BillingSchedulePeriod[] | undefined;
    studentProducts:
        | Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"]
        | undefined;
}

interface UpdateOrderDetailsMappingDetails {
    productDetails: ProductsFormValues;
    productDiscounts: OrderDetailProductListDiscountType[] | undefined;
    productBillingItems: UpdateOrderBillItem[];
    productOrderItems: UpdateOrderOrderItem[];
    studentProduct: ArrayElement<
        Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"]
    >;
    affectedBillingSchedulePeriods: BillingSchedulePeriod[];
}

const getBillItemAndOrderItembyStudentProductId = (
    studentProductId: UpdateOrderBillItem["student_product_id"],
    billItems: UpdateOrderBillItem[] | undefined,
    orderItems: UpdateOrderOrderItem[] | undefined
): {
    productBillingItems: UpdateOrderBillItem[] | undefined;
    productOrderItems: UpdateOrderOrderItem[] | undefined;
} => {
    const productBillingItems = billItems?.filter(
        (billItem) => billItem.student_product_id === studentProductId
    );

    const productOrderItems = orderItems?.filter(
        (orderItem) => orderItem.student_product_id === studentProductId
    );

    return {
        productBillingItems,
        productOrderItems,
    };
};

const getProductDetailsByProductId = (
    productsWithDetails: ProductsFormValues[],
    productOrderItems: UpdateOrderOrderItem[]
): ProductsFormValues | undefined => {
    const orderProductId = pick1stElement(productOrderItems)?.product_id;
    return productsWithDetails.find(
        (productWithDetails) => productWithDetails.product?.product_id === orderProductId
    );
};

const getProductDiscountForAffectedBillItem = ({
    affectedBillItem,
    productOrderItems,
    productDiscounts,
}: {
    affectedBillItem: UpdateOrderBillItem | undefined;
    productOrderItems: UpdateOrderOrderItem[];
    productDiscounts: OrderDetailProductListDiscountType[] | undefined;
}): OrderDetailProductListDiscountType | undefined => {
    const affectedOrderItem = productOrderItems.find(
        (orderItem) => orderItem.order_id === affectedBillItem?.order_id
    );

    return productDiscounts?.find(
        (discount) => discount.discount_id === affectedOrderItem?.discount_id
    );
};

const getAffectedBillItemByProductType = (
    productDetails: ProductsFormValues,
    productBillingItems: UpdateOrderBillItem[]
): UpdateOrderBillItem | undefined => {
    const { productExtensionType } = getProductAndProductExtensionType(productDetails);

    switch (productExtensionType) {
        case "MATERIAL_TYPE_ONE_TIME":
        default:
            return getOneTimeProductAffectedBillingItem(productBillingItems);
    }
};

const getEffectiveAndStartDateByType = (
    productDetails: ProductsFormValues,
    studentProduct: ArrayElement<
        Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"]
    >
): { effectiveDate: Date; startDate?: string } => {
    const { productExtensionType } = getProductAndProductExtensionType(productDetails);

    switch (productExtensionType) {
        case "MATERIAL_TYPE_RECURRING":
            return {
                startDate: studentProduct.start_date,
                effectiveDate: getEffectiveDateByStartDate(studentProduct.start_date),
            };
        case "MATERIAL_TYPE_ONE_TIME":
        default:
            return {
                effectiveDate: new Date(),
            };
    }
};

const mapAffectedBillingItemsToProductFormValue = (
    updateOrderDetails: UpdateOrderDetailsMappingDetails
): ProductsFormValues => {
    const {
        productDetails,
        productDiscounts,
        productBillingItems,
        productOrderItems,
        studentProduct,
        affectedBillingSchedulePeriods,
    } = updateOrderDetails;

    const affectedBillItem = getAffectedBillItemByProductType(productDetails, productBillingItems);
    if (!affectedBillItem) return { product: null };

    const productDiscount = getProductDiscountForAffectedBillItem({
        affectedBillItem,
        productOrderItems,
        productDiscounts,
    });

    const { startDate, effectiveDate } = getEffectiveAndStartDateByType(
        productDetails,
        studentProduct
    );

    return {
        ...productDetails,
        discount: productDiscount ? productDiscount : null,
        updateOrderDetails: {
            orderStatus: ProductListItemStatus.ACTIVE,
            billItems: productBillingItems,
            effectiveDate,
            reccuringDetails: {
                startDate: startDate,
                billingSchedulePeriods: affectedBillingSchedulePeriods,
            },
        },
    };
};

export const getUniqueDiscountIds = (
    orderItems: UpdateOrderOrderItem[] | undefined
): Discount["discount_id"][] => {
    return [
        ...new Set(
            orderItems
                ?.map<ProductDiscountType["discount_id"] | undefined | null>(
                    (orderItem) => orderItem.discount_id
                )
                .filter<ProductDiscountType["discount_id"]>(isNotUndefinedOrNull)
        ),
    ];
};

export const getUniqueBillItemProductIds = (
    billItems: UpdateOrderBillItem[] | undefined
): Product["product_id"][] => {
    const billItemProductIds = billItems
        ?.map<UpdateOrderBillItem["product_id"]>((billItem) => billItem.product_id)
        .filter<Product["product_id"]>(isNotUndefinedOrNull);

    return [...new Set(billItemProductIds)];
};

export const getUniqueBillingScheduleIds = (
    products: Payment_GetManyProductsByProductIdsQuery["product"] | undefined
): Billing_Schedule["billing_schedule_id"][] => {
    const billingScheduleIds = products
        ?.map<
            ArrayElement<Payment_GetManyProductsByProductIdsQuery["product"]>["billing_schedule_id"]
        >((product) => product.billing_schedule_id)
        .filter<Billing_Schedule["billing_schedule_id"]>(isNotUndefinedOrNull);

    return [...new Set(billingScheduleIds)];
};

export const getUniqueTaxIds = (
    products: Payment_GetManyProductsByProductIdsQuery["product"] | undefined
): ProductTaxesType["tax_id"][] => {
    return [
        ...new Set(
            products
                ?.map<ProductTaxesType["tax_id"] | undefined | null>((product) => product.tax_id)
                .filter<ProductTaxesType["tax_id"]>(isNotUndefinedOrNull)
        ),
    ];
};

const getRecurringProductDetails = ({
    studentProductId,
    studentProducts,
    billingSchedulePeriods,
    productBillingItems,
}: {
    studentProductId: string;
    studentProducts:
        | Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"]
        | undefined;
    billingSchedulePeriods: BillingSchedulePeriod[] | undefined;
    productBillingItems: UpdateOrderBillItem[] | undefined;
}): {
    studentProduct:
        | ArrayElement<Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"]>
        | undefined;
    affectedBillingSchedulePeriods: BillingSchedulePeriod[];
} => {
    const studentProduct = studentProducts?.find(
        (studentProduct) => studentProduct.student_product_id === studentProductId
    );

    const affectedBillingSchedulePeriodIds = productBillingItems
        ?.map<
            ArrayElement<
                Payment_GetManyBillItemsByStudentProductIdsV2Query["bill_item"]
            >["billing_schedule_period_id"]
        >((productBillingItem) => productBillingItem.billing_schedule_period_id)
        .filter<
            ArrayElement<
                Payment_GetManyBillItemsByStudentProductIdsV2Query["bill_item"]
            >["billing_schedule_period_id"]
        >(isNotUndefinedOrNull);

    if (!arrayHasItem(affectedBillingSchedulePeriodIds))
        return {
            studentProduct,
            affectedBillingSchedulePeriods: [],
        };

    const affectedBillingSchedulePeriods = billingSchedulePeriods?.filter((billingSchedulePeriod) =>
        affectedBillingSchedulePeriodIds?.includes(billingSchedulePeriod.billing_schedule_period_id)
    );

    return {
        studentProduct,
        affectedBillingSchedulePeriods: affectedBillingSchedulePeriods ?? [],
    };
};

export const mapUpdateOrderProductsByStudentProductIds = (
    updateOrderProductDetails: UpdateOrderProductDetails
): ProductsFormValues[] => {
    const {
        studentProductIds,
        billItems,
        orderItems,
        productDiscounts,
        productsWithDetails,
        billingSchedulePeriods,
        studentProducts,
    } = updateOrderProductDetails;

    return studentProductIds?.map((studentProductId) => {
        const { productBillingItems, productOrderItems } =
            getBillItemAndOrderItembyStudentProductId(studentProductId, billItems, orderItems);

        const { studentProduct, affectedBillingSchedulePeriods } = getRecurringProductDetails({
            studentProductId,
            studentProducts,
            billingSchedulePeriods,
            productBillingItems,
        });

        if (
            !arrayHasItem(productBillingItems) ||
            !arrayHasItem(productOrderItems) ||
            !studentProduct
        )
            return { product: null };

        const productDetails = getProductDetailsByProductId(
            productsWithDetails,
            productOrderItems!
        );

        if (!productDetails) return { product: null };

        return mapAffectedBillingItemsToProductFormValue({
            productDetails,
            productDiscounts,
            productBillingItems: productBillingItems ?? [],
            productOrderItems: productOrderItems ?? [],
            studentProduct,
            affectedBillingSchedulePeriods,
        });
    });
};
