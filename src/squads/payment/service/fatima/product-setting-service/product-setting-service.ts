import { Payment_GetEnrollmentProductIdsByProductIdsQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import { defineService } from "@manabie-com/react-utils";
import productSettingQueriesFatima from "src/squads/payment/service/fatima/product-setting-service/product-setting-fatima.query";

export const productSettingService = defineService({
    query: {
        paymentGetEnrollmentProductIdsByProductIds: ({
            productIds,
        }: Partial<Payment_GetEnrollmentProductIdsByProductIdsQueryVariables>) => {
            if (!productIds) {
                throw new InvalidParamError({
                    action: "paymentGetEnrollmentProductIdsByProductIds",
                    errors: [{ field: "product_id", fieldValueIfNotSensitive: productIds }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return productSettingQueriesFatima.getEnrollmentProductIdsByProductIds({ productIds });
        },
    },

    mutation: {},
});
