import { Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyVariable } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import billingRatioQueriesFatima from "src/squads/payment/service/fatima/billing-ratio-service/billing-ratio-fatima.query";

export const billingRatioService = defineService({
    query: {
        paymentGetManyBillingRatiosByBillingSchedulePeriodId: ({
            billingSchedulePeriodId,
        }: Partial<Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables>) => {
            if (isInvalidOrEmptyVariable(billingSchedulePeriodId)) {
                throw new InvalidParamError({
                    action: "paymentGetManyBillingRatiosByBillingSchedulePeriodId",
                    errors: [
                        {
                            field: "billing_schedule_period_id",
                            fieldValueIfNotSensitive: billingSchedulePeriodId,
                        },
                    ],
                    serviceName: "fatimaGraphQL",
                });
            }

            return billingRatioQueriesFatima.getManyBillingRatiosByBillingSchedulePeriodId({
                billingSchedulePeriodId,
            });
        },
    },
});
