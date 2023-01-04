import {
    Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables,
    Payment_GetManyBillItemsV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    isInvalidOrEmptyVariable,
    isInvalidOrEmptyArray,
} from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import billItemQueriesFatima from "src/squads/payment/service/fatima/bill-item-service/bill-item-fatima.query";

export const billItemService = defineService({
    query: {
        paymentGetBillItemsByOrderId: ({
            order_id,
            limit,
            offset,
        }: Partial<Payment_GetManyBillItemsV2QueryVariables>) => {
            if (isInvalidOrEmptyVariable(order_id)) {
                throw new InvalidParamError({
                    action: "paymentGetBillItemsByOrderId",
                    errors: [{ field: "order_id", fieldValueIfNotSensitive: order_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return billItemQueriesFatima.getList({
                order_id: order_id,
                limit,
                offset,
            });
        },
        paymentGetManyBillItemsByStudentProductIds: ({
            student_product_ids,
        }: Partial<Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables>) => {
            if (isInvalidOrEmptyArray(student_product_ids)) {
                throw new InvalidParamError({
                    action: "paymentGetManyBillItemsByStudentProductIds",
                    errors: [
                        {
                            field: "student_product_ids",
                            fieldValueIfNotSensitive: student_product_ids,
                        },
                    ],
                    serviceName: "fatimaGraphQL",
                });
            }

            return billItemQueriesFatima.getManyBillItemsByStudentProductIds({
                student_product_ids,
            });
        },
    },
});
