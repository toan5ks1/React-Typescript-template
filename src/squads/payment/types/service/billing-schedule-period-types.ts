import { Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQuery } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export type BillingSchedulePeriod = ArrayElement<
    Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQuery["billing_schedule_period"]
>;
