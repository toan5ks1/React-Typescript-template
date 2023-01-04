import { Payment_GetManyActionLogsByOrderIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyVariable } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import orderActionLogsQueriesFatima from "src/squads/payment/service/fatima/order-action-log-service/order-action-log-fatima.query";

export const orderActionLogService = defineService({
    query: {
        paymentGetOrderActionLogListByOrderId: ({
            order_id,
            limit,
            offset,
        }: Payment_GetManyActionLogsByOrderIdQueryVariables) => {
            if (isInvalidOrEmptyVariable(order_id)) {
                throw new InvalidParamError({
                    action: "paymentGetOrderActionLogListByOrderId",
                    errors: [{ field: "order_id", fieldValueIfNotSensitive: order_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return orderActionLogsQueriesFatima.getList({
                order_id: order_id,
                limit,
                offset,
            });
        },
    },
});
