import { Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery } from "src/squads/payment/service/fatima/fatima-types";

const billingRatios: Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery["billing_ratio"] = [
    {
        billing_ratio_id: "billing_ratio_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        billing_ratio_denominator: 4,
        billing_ratio_numerator: 4,
        start_date: "2022-02-06T11:08:19.705676+00:00",
        end_date: "2022-02-10T11:08:19.705676+00:00",
    },
    {
        billing_ratio_id: "billing_ratio_id_2",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        billing_ratio_denominator: 4,
        billing_ratio_numerator: 3,
        start_date: "2022-02-11T11:08:19.705676+00:00",
        end_date: "2022-02-15T11:08:19.705676+00:00",
    },
    {
        billing_ratio_id: "billing_ratio_id_3",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        billing_ratio_denominator: 4,
        billing_ratio_numerator: 2,
        start_date: "2022-02-16T11:08:19.705676+00:00",
        end_date: "2022-02-25T11:08:19.705676+00:00",
    },
    {
        billing_ratio_id: "billing_ratio_id_4",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        billing_ratio_denominator: 4,
        billing_ratio_numerator: 1,
        start_date: "2022-02-26T11:08:19.705676+00:00",
        end_date: "2022-03-06T11:08:19.705676+00:00",
    },
];

export const getMockBillingRatios =
    (): Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery["billing_ratio"] =>
        billingRatios;
