import {
    Payment_GetManyDiscountsByDiscountIdsQuery,
    Payment_GetManyDiscountsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { DiscountAmountType } from "manabuf/payment/v1/enums_pb";

export interface ProductDiscountType
    extends Omit<ArrayElement<Payment_GetManyDiscountsQuery["discount"]>, "discount_amount_type"> {
    discount_amount_type: keyof typeof DiscountAmountType;
}

export interface OrderDetailProductListDiscountType
    extends Omit<
        ArrayElement<Payment_GetManyDiscountsByDiscountIdsQuery["discount"]>,
        "discount_amount_type"
    > {
    discount_amount_type: keyof typeof DiscountAmountType;
}
