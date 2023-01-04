import {
    Payment_GetManyMaterialsByProductIdsV2QueryVariables,
    Payment_GetMaterialByProductIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    isInvalidOrEmptyArray,
    isInvalidOrEmptyVariable,
} from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import materialQueriesFatima from "src/squads/payment/service/fatima/material-service/material-fatima.query";

export const materialService = defineService({
    query: {
        paymentGetOneProductMaterialByProductId: ({
            product_id,
        }: Partial<Payment_GetMaterialByProductIdQueryVariables>) => {
            if (isInvalidOrEmptyVariable(product_id)) {
                throw new InvalidParamError({
                    action: "paymentGetOneProductMaterialByProductId",
                    errors: [{ field: "product_id", fieldValueIfNotSensitive: product_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return materialQueriesFatima.getOne({
                product_id,
            });
        },
        paymentGetManyProductMaterialsTypeByProductIds: ({
            productIds,
        }: Payment_GetManyMaterialsByProductIdsV2QueryVariables) => {
            if (isInvalidOrEmptyArray(productIds)) {
                throw new InvalidParamError({
                    action: "paymentGetManyProductMaterialsTypeByProductIds",
                    errors: [{ field: "productIds", fieldValueIfNotSensitive: productIds }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return materialQueriesFatima.getManyMaterialsByIds({ productIds });
        },
    },

    mutation: {},
});
