import { arrayHasItem } from "src/common/utils/other";
import { getProductTaxPrice } from "src/squads/payment/helpers/price";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import { CreateOrder } from "src/squads/payment/service/fatima/order-service/types";
import {
    BulkOrderRequest,
    CustomBillingOrderRequest,
} from "src/squads/payment/service/payment/order-payment-service/types";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";
import {
    OrderFormValues,
    AssociatedProductDetails,
} from "src/squads/payment/types/form/order-form-types";
import { ProductAndProductExtensionType } from "src/squads/payment/types/service/product-types";
import { CustomBillingTaxType } from "src/squads/payment/types/service/tax-types";

import { OrderType, TaxCategory } from "manabuf/payment/v1/enums_pb";
import { BillingItem, OrderItem, TaxBillItem } from "manabuf/payment/v1/order_pb";

import { FIRST_STUDENT_IDX } from "src/squads/payment/domains/OrderManagement/common/constants";
import { OrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

const getOrderItemAssociatedProduct = (
    associatedProduct: AssociatedProductDetails,
    orderItems: Array<OrderItem.AsObject>
) => {
    const { product, discount } = associatedProduct;

    orderItems.push({
        productId: product.product_id,
        discountId: discount?.discount_id,
        productAssociationsList: [],
        courseItemsList: [],
    });
};

// bulk-order type doesn't exist https://manabie.slack.com/archives/C02F2Q26SGP/p1655189181911779?thread_ts=1655188722.209429&cid=C02F2Q26SGP
// TODO: https://manabie.atlassian.net/browse/LT-17724
type OrderFormType = "bulk-students-orders" | "single-student-order";
type TransformDataToCreateOrderTypeReturn<T extends OrderFormType> =
    T extends "bulk-students-orders" ? BulkOrderRequest : CreateOrder;

export const transformDataToCreateOrder = <TOrderFormType extends OrderFormType>(
    orderFormValues: OrderFormValues,
    orderType: OrderType,
    getProductPluginsMap: (
        productAndProductExtension: ProductAndProductExtensionType
    ) => OrderPluginFunctions,
    orderFormType: TOrderFormType
): TransformDataToCreateOrderTypeReturn<TOrderFormType> => {
    const studentsOrderData = orderFormValues.students.map((student) => {
        const orderItems: Array<OrderItem.AsObject> = [];
        let billingItems: Array<BillingItem.AsObject> = [];
        let upcomingBillingItems: Array<BillingItem.AsObject> = [];

        for (const productFieldArrayItem of student.productFieldArrayItems) {
            const { product, productPrices, associatedProducts } = productFieldArrayItem;

            //TODO: Inform user if products don't have price/tax LT-17707
            if (!product || !arrayHasItem(productPrices)) continue;

            const productAndProductExtension =
                getProductAndProductExtensionType(productFieldArrayItem);
            const { getBillingItems, getUpcomingBillingItems, getOrderItem } = getProductPluginsMap(
                productAndProductExtension
            );

            const productBillingItems = getBillingItems(productFieldArrayItem);
            const productUpcomingBillingItems = getUpcomingBillingItems(productFieldArrayItem);

            billingItems.push(...productBillingItems);
            upcomingBillingItems.push(...productUpcomingBillingItems);

            const orderItem = getOrderItem(productFieldArrayItem);
            if (orderItem) orderItems.push(orderItem);

            for (const associatedProduct of associatedProducts ?? []) {
                getOrderItemAssociatedProduct(associatedProduct, orderItems);
            }
        }

        const result: CreateOrder = {
            studentId: student.studentInfo.student_id,
            locationId: orderFormValues.location.locationId,
            orderComment: student.comment,
            orderType: orderType,
            orderItemsList: orderItems,
            billingItemsList: billingItems,
            upcomingBillingItemsList: upcomingBillingItems,
        };

        return result;
    });

    const singleResult: CreateOrder = studentsOrderData[FIRST_STUDENT_IDX];
    const bulkResult: BulkOrderRequest = { newOrderRequestsList: studentsOrderData };

    return (orderFormType === "bulk-students-orders"
        ? bulkResult
        : singleResult) as unknown as TransformDataToCreateOrderTypeReturn<TOrderFormType>;
};

const getTaxBillItem = (
    taxItem: CustomBillingTaxType | undefined,
    price: ArrayElement<CustomBillingOrderFormValue["billingFieldArrayItem"]>["price"]
): TaxBillItem.AsObject | undefined => {
    const customBillingDiscountPrice: number = 0;

    if (!taxItem) return undefined;

    const taxAmount = getProductTaxPrice(price, customBillingDiscountPrice, taxItem.tax_percentage);

    return {
        taxId: taxItem.tax_id,
        taxPercentage: taxItem.tax_percentage,
        taxAmount,
        taxCategory: TaxCategory[taxItem.tax_category],
    };
};

export const transformDataToCreateCustomBillingOrder = (
    customBillingOrderFormValue: CustomBillingOrderFormValue,
    orderType: OrderType
): CustomBillingOrderRequest => {
    const { student, location, billingFieldArrayItem, comment } = customBillingOrderFormValue;

    const customBillingItemsList: CustomBillingOrderRequest["customBillingItemsList"] =
        billingFieldArrayItem.map((billingItem) => {
            const taxItem = getTaxBillItem(billingItem.taxItem, billingItem.price);

            return {
                ...billingItem,
                taxItem,
            };
        });

    return {
        studentId: student.student_id,
        locationId: location.locationId,
        orderComment: comment,
        orderType,
        customBillingItemsList,
    };
};
