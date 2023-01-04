import { UserNameByIdsQuery } from "src/squads/payment/service/bob/bob-types";
import { Payment_GetManyActionLogsByOrderIdQuery } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { UseOrderActionLogListReturn } from "src/squads/payment/domains/OrderManagement/hooks/useOrderActionLogList";

export interface OrderActionLogType {
    users?: ArrayElement<UserNameByIdsQuery["users"]>;
    actionLogs: Omit<
        ArrayElement<Payment_GetManyActionLogsByOrderIdQuery["order_action_log"]>,
        "user_id"
    >;
}

export type OrderActionLogDataSourceType = Pick<
    UseOrderActionLogListReturn,
    "mappedUseOrderActionLogListData" | "usersList"
>;
