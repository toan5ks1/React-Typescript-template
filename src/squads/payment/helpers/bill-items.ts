import { getProductNameWithTag } from "src/squads/payment/helpers/product";

import { BillingType } from "manabuf/payment/v1/enums_pb";
import { RetrieveListOfBillItemsResponse } from "manabuf/payment/v1/order_pb";

import { UseResourceTranslateReturn } from "src/squads/payment/hooks/useResourceTranslate";

export const getBillItemNameByBillingType = ({
    productName,
    billingType,
    tOrder,
}: {
    productName: string;
    billingType: RetrieveListOfBillItemsResponse.BillItems.AsObject["billingType"];
    tOrder: UseResourceTranslateReturn;
}): string => {
    const adjustmentTag = tOrder("tag.adjustment");

    switch (billingType) {
        case BillingType.BILLING_TYPE_ADJUSTMENT_BILLING:
            return getProductNameWithTag(adjustmentTag, productName);
        case BillingType.BILLING_TYPE_BILLED_AT_ORDER:
        case BillingType.BILLING_TYPE_UPCOMING_BILLING:
            return productName;
    }
};
