import { Payment_GetManyBillItemsByStudentProductIdsV2Query } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export type UpdateOrderBillItem = ArrayElement<
    Payment_GetManyBillItemsByStudentProductIdsV2Query["bill_item"]
>;
