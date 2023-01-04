import {
    Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables,
    Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    isInvalidOrEmptyArray,
    isInvalidOrEmptyVariable,
} from "src/squads/payment/service/utils/validation";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { defineService } from "@manabie-com/react-utils";
import billingSchedulePeriodQueriesFatima from "src/squads/payment/service/fatima/billing-schedule-period-service/billing-schedule-period-fatima.query";

export const billingSchedulePeriodService = defineService({
    query: {
        paymentGetManyBillingSchedulePeriodsByBillingScheduleId: ({
            billingScheduleId,
        }: Partial<Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables> & {
            productId?: ProductTypeQuery["product_id"];
        }) => {
            if (isInvalidOrEmptyVariable(billingScheduleId)) {
                throw new InvalidParamError({
                    action: "paymentGetManyBillingSchedulePeriodsByBillingScheduleId",
                    errors: [
                        {
                            field: "billing_schedule_id",
                            fieldValueIfNotSensitive: billingScheduleId,
                        },
                    ],
                    serviceName: "fatimaGraphQL",
                });
            }

            return billingSchedulePeriodQueriesFatima.getMany({ billingScheduleId });
        },
        paymentGetManyBillingSchedulePeriodsByManyBillingScheduleId: ({
            billingScheduleIds,
        }: Partial<Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables>) => {
            if (isInvalidOrEmptyArray(billingScheduleIds)) {
                throw new InvalidParamError({
                    action: "paymentGetManyBillingSchedulePeriodsByManyBillingScheduleId",
                    errors: [
                        {
                            field: "billing_schedule_id",
                            fieldValueIfNotSensitive: billingScheduleIds,
                        },
                    ],
                    serviceName: "fatimaGraphQL",
                });
            }

            return billingSchedulePeriodQueriesFatima.getManyBillingSchedulePeriodsByManyBillingScheduleId(
                { billingScheduleIds }
            );
        },
    },
});
