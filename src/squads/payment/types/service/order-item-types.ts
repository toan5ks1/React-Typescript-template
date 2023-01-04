import { Payment_GetManyOrderItemsByStudentProductIdsQuery } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export type UpdateOrderOrderItem = ArrayElement<
    Payment_GetManyOrderItemsByStudentProductIdsQuery["order_item"]
>;
