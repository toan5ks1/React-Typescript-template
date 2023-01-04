import {
    Payment_GetManyDiscountsQueryVariables,
    Payment_GetManyDiscountsByDiscountIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    isInvalidOrEmptyArray,
    isInvalidOrEmptyVariable,
} from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import discountQueriesFatima from "src/squads/payment/service/fatima/discount-service/discount-fatima.query";

export const discountService = defineService({
    query: {
        paymentGetManyDiscountsByCurrentDate: ({
            current_date,
            limit,
            name,
        }: Payment_GetManyDiscountsQueryVariables) => {
            if (isInvalidOrEmptyVariable(current_date)) {
                throw new InvalidParamError({
                    action: "paymentGetManyDiscountsByCurrentDate",
                    errors: [{ field: "current_date", fieldValueIfNotSensitive: current_date }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return discountQueriesFatima.getMany({ current_date, limit, name });
        },
        paymentGetManyDiscountByDiscountIds: ({
            discountIds,
        }: Payment_GetManyDiscountsByDiscountIdsQueryVariables) => {
            if (isInvalidOrEmptyArray(discountIds)) {
                throw new InvalidParamError({
                    action: "paymentGetManyDiscountByDiscountIds",
                    errors: [{ field: "discountIds", fieldValueIfNotSensitive: discountIds }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return discountQueriesFatima.getManyDiscountByIds({ discountIds });
        },
    },
});
