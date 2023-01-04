import {
    Payment_GetFeeByProductIdQuery,
    Payment_GetManyFeesByProductIdsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { FeeType } from "manabuf/payment/v1/enums_pb";

export interface ProductFeeType
    extends Omit<ArrayElement<Payment_GetFeeByProductIdQuery["fee"]>, "fee_type"> {
    fee_type: keyof typeof FeeType;
}

export interface OrderDetailProductListFeeType
    extends Omit<ArrayElement<Payment_GetManyFeesByProductIdsQuery["fee"]>, "fee_type"> {
    fee_type: keyof typeof FeeType;
}
