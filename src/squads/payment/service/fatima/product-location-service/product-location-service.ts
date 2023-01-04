import { Payment_GetProductIdsByLocationIdsQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyArray } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import productLocationQueriesFatima from "src/squads/payment/service/fatima/product-location-service/product-location-fatima.query";

export const productLocationService = defineService({
    query: {
        paymentGetProductIdsByLocationIds: ({
            location_ids,
        }: Payment_GetProductIdsByLocationIdsQueryVariables) => {
            if (isInvalidOrEmptyArray(location_ids)) {
                throw new InvalidParamError({
                    action: "paymentGetProductIdsByLocationIds",
                    errors: [{ field: "location_ids", fieldValueIfNotSensitive: location_ids }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return productLocationQueriesFatima.getProductIds({
                location_ids,
            });
        },
    },

    mutation: {},
});
