import { Payment_GetOrderByOrderIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyVariable } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import orderQueriesFatima from "src/squads/payment/service/fatima/order-service/order-fatima.query";

export const orderService = defineService({
    query: {
        paymentGetOneOrderByOrderId: ({ order_id }: Payment_GetOrderByOrderIdQueryVariables) => {
            if (isInvalidOrEmptyVariable(order_id)) {
                throw new InvalidParamError({
                    action: "paymentGetOneOrderByOrderId",
                    errors: [{ field: "order_id", fieldValueIfNotSensitive: order_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return Promise.resolve(
                orderQueriesFatima.getOne({
                    order_id,
                })
            );
        },
    },
});
