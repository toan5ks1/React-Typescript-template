import { Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export type BillingRatio = ArrayElement<
    Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery["billing_ratio"]
>;
