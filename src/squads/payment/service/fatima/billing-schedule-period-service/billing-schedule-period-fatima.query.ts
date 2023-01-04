import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQuery,
    Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables,
    Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQuery,
    Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

import { billingRatioFragment } from "src/squads/payment/service/fatima/billing-ratio-service/billing-ratio-fatima.query";

const GetManyBillingSchedulePeriodsByBillingScheduleId = gql`
    query Payment_GetManyBillingSchedulePeriodsByBillingScheduleId($billingScheduleId: String!) {
        billing_schedule_period(
            where: { billing_schedule_id: { _eq: $billingScheduleId } }
            order_by: { start_date: asc }
        ) {
            billing_schedule_period_id
            billing_schedule_id
            name
            billing_date
            start_date
            end_date
            billing_ratios(order_by: { start_date: asc }) {
                ...BillingRatioAttrs
            }
        }
    }

    ${billingRatioFragment}
`;

const GetManyBillingSchedulePeriodsByManyBillingScheduleId = gql`
    query Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleId(
        $billingScheduleIds: [String!]
    ) {
        billing_schedule_period(
            where: { billing_schedule_id: { _in: $billingScheduleIds } }
            order_by: { start_date: asc }
        ) {
            billing_schedule_period_id
            billing_schedule_id
            name
            billing_date
            start_date
            end_date
            billing_ratios {
                ...BillingRatioAttrs
            }
        }
    }

    ${billingRatioFragment}
`;

class BillingSchedulePeriodQueriesFatima extends InheritedHasuraServiceClient {
    async getMany(
        variables: Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables
    ): Promise<
        | Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQuery["billing_schedule_period"]
        | undefined
    > {
        const res = await this._call<Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQuery>(
            {
                query: GetManyBillingSchedulePeriodsByBillingScheduleId,
                variables,
            }
        );

        return res.data?.billing_schedule_period;
    }

    async getManyBillingSchedulePeriodsByManyBillingScheduleId(
        variables: Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables
    ): Promise<
        | Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQuery["billing_schedule_period"]
        | undefined
    > {
        const res =
            await this._call<Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQuery>({
                query: GetManyBillingSchedulePeriodsByManyBillingScheduleId,
                variables,
            });

        return res.data?.billing_schedule_period;
    }
}

const billingSchedulePeriodQueriesFatima = new BillingSchedulePeriodQueriesFatima(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default billingSchedulePeriodQueriesFatima;
