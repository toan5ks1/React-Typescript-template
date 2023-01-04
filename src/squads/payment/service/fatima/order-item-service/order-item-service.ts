import {
    Payment_GetManyOrderItemsByStudentProductIdsQueryVariables,
    Payment_GetOrderItemsByOrderIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    isInvalidOrEmptyVariable,
    isInvalidOrEmptyArray,
} from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import orderItemsQueriesFatima from "src/squads/payment/service/fatima/order-item-service/order-item-fatima.query";

export const orderItemService = defineService({
    query: {
        paymentGetOrderItemsByOrderId: ({
            orderId,
            limit,
            offset,
        }: Payment_GetOrderItemsByOrderIdQueryVariables) => {
            if (isInvalidOrEmptyVariable(orderId)) {
                throw new InvalidParamError({
                    action: "paymentGetOrderItemsByOrderId",
                    errors: [{ field: "orderId", fieldValueIfNotSensitive: orderId }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return orderItemsQueriesFatima.getManyByOrderId({ orderId, limit, offset });
        },
        paymentGetManyOrderItemsByStudentProductIds: ({
            student_product_ids,
        }: Payment_GetManyOrderItemsByStudentProductIdsQueryVariables) => {
            if (isInvalidOrEmptyArray(student_product_ids)) {
                throw new InvalidParamError({
                    action: "paymentGetManyOrderItemsByStudentProductIds",
                    errors: [
                        {
                            field: "student_product_ids",
                            fieldValueIfNotSensitive: student_product_ids,
                        },
                    ],
                    serviceName: "fatimaGraphQL",
                });
            }

            return orderItemsQueriesFatima.getManyOrderItemsByStudentProductIds({
                student_product_ids,
            });
        },
    },
});
