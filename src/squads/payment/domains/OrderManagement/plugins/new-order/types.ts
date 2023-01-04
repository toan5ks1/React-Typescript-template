import React from "react";

import { ArrayElement } from "src/squads/payment/types/common/array";
import {
    OrderFormValues,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";
import { ProductTaxType } from "src/squads/payment/types/service/tax-types";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingItemType } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";

import { BillingItem, DiscountBillItem, OrderItem, TaxBillItem } from "manabuf/payment/v1/order_pb";

export interface ProductChildProps {
    productFieldArrayItem: ArrayElement<
        ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
    >;
    productFieldItemIndex: number;
    studentIndex: number;
}

export interface OrderPluginFunctions {
    ProductChild: (props: ProductChildProps) => React.ReactElement;
    generateBilledAtOrderBillingItems: (
        productFieldArrayItem: ArrayElement<
            ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
        >
    ) => BilledAtOrderItemType[];
    generateUpcomingBillingBillingItems: (
        productFieldArrayItem: ArrayElement<
            ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
        >
    ) => UpcomingBillingItemType[];
    BilledAtOrderChild: (props: {
        billedAtOrderItem: BilledAtOrderItemType;
    }) => React.ReactElement | null;
    UpcomingBillingChild: (props: {
        upcomingBillingProduct: UpcomingBillingItemType;
    }) => React.ReactElement | null;
    getBillingItems: (
        productFieldArrayItem: ArrayElement<
            ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
        >
    ) => Array<BillingItem.AsObject>;
    getUpcomingBillingItems: (
        productFieldArrayItem: ArrayElement<
            ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
        >
    ) => Array<BillingItem.AsObject>;
    getOrderItem: (productFieldArrayItem: ProductsFormValues) => OrderItem.AsObject | null;
}

export interface UpdateOrderPluginFunctions extends OrderPluginFunctions {
    ProductPreviewItemChild: (props: {
        productFieldItem: ArrayElement<
            ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
        >;
        hasEffectiveDate?: boolean;
    }) => React.ReactElement;
}

export interface BillingItemProperties {
    discountItem: DiscountBillItem.AsObject | undefined;
    taxItem: TaxBillItem.AsObject | undefined;
    finalPrice: number;
}

export interface TaxBillItemRequest {
    taxId: ProductTypeQuery["tax_id"];
    productTax: ProductTaxType | undefined;
    productPrice: number;
    discountAmount: number;
}
