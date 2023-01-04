import { Payment_GetProductIdsByGradeIdsQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyArray } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import productGradeQueriesFatima from "src/squads/payment/service/fatima/product-grade-service/product-grade-fatima.query";

export const productGradeService = defineService({
    query: {
        paymentGetProductIdsByGradeIds: ({
            grade_ids,
        }: Payment_GetProductIdsByGradeIdsQueryVariables) => {
            if (isInvalidOrEmptyArray(grade_ids)) {
                throw new InvalidParamError({
                    action: "paymentGetProductIdsByGradeIds",
                    errors: [{ field: "grade_ids", fieldValueIfNotSensitive: grade_ids }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return productGradeQueriesFatima.getProductIds({
                grade_ids,
            });
        },
    },

    mutation: {},
});
