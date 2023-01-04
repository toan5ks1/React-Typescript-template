import {
    Payment_GetPackageByProductIdQueryVariables,
    Payment_GetPackagesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    isInvalidOrEmptyArray,
    isInvalidOrEmptyVariable,
} from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import packageQueriesFatima from "src/squads/payment/service/fatima/package-service/package-fatima.query";

export const packageService = defineService({
    query: {
        paymentGetOneProductPackageByProductId: ({
            product_id,
        }: Partial<Payment_GetPackageByProductIdQueryVariables>) => {
            if (isInvalidOrEmptyVariable(product_id)) {
                throw new InvalidParamError({
                    action: "paymentGetOneProductPackageByProductId",
                    errors: [{ field: "product_id", fieldValueIfNotSensitive: product_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return packageQueriesFatima.getOne({
                product_id,
            });
        },

        paymentGetManyProductPackagesByProductIds: ({
            productIds,
        }: Partial<Payment_GetPackagesByProductIdsQueryVariables>) => {
            if (isInvalidOrEmptyArray(productIds)) {
                throw new InvalidParamError({
                    action: "paymentGetManyProductPackagesByProductIds",
                    errors: [{ field: "product_id", fieldValueIfNotSensitive: productIds }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return packageQueriesFatima.getMany({
                productIds,
            });
        },
    },

    mutation: {},
});
