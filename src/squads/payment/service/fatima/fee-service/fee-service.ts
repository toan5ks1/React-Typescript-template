import {
    Payment_GetFeeByProductIdQueryVariables,
    Payment_GetManyFeesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    isInvalidOrEmptyArray,
    isInvalidOrEmptyVariable,
} from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import feeQueriesFatima from "src/squads/payment/service/fatima/fee-service/fee-fatima.query";

export const feeService = defineService({
    query: {
        paymentGetOneProductFeeByProductId: ({
            product_id,
        }: Partial<Payment_GetFeeByProductIdQueryVariables>) => {
            if (isInvalidOrEmptyVariable(product_id)) {
                throw new InvalidParamError({
                    action: "paymentGetOneProductFeeByProductId",
                    errors: [{ field: "product_id", fieldValueIfNotSensitive: product_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return feeQueriesFatima.getOne({
                product_id,
            });
        },

        paymentGetManyProductFeesTypeByProductIds: ({
            productIds,
        }: Payment_GetManyFeesByProductIdsQueryVariables) => {
            if (isInvalidOrEmptyArray(productIds)) {
                throw new InvalidParamError({
                    action: "paymentGetManyProductFeesTypeByProductIds",
                    errors: [{ field: "product_id", fieldValueIfNotSensitive: productIds }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return feeQueriesFatima.getManyFeesByIds({ productIds });
        },
    },

    mutation: {},
});
