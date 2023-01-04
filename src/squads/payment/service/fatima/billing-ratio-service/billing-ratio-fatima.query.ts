import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery,
    Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

export const billingRatioFragment = gql`
    fragment BillingRatioAttrs on billing_ratio {
        billing_ratio_id
        start_date
        end_date
        billing_schedule_period_id
        billing_ratio_numerator
        billing_ratio_denominator
    }
`;

const GetManyBillingRatiosByBillingSchedulePeriodId = gql`
    query Payment_GetManyBillingRatiosByBillingSchedulePeriodId($billingSchedulePeriodId: String!) {
        billing_ratio(where: { billing_schedule_period_id: { _eq: $billingSchedulePeriodId } }) {
            ...BillingRatioAttrs
        }
    }

    ${billingRatioFragment}
`;

class BillingRatioQueriesFatima extends InheritedHasuraServiceClient {
    async getManyBillingRatiosByBillingSchedulePeriodId(
        variables: Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables
    ): Promise<
        Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery["billing_ratio"] | undefined
    > {
        const res = await this._call<Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery>({
            query: GetManyBillingRatiosByBillingSchedulePeriodId,
            variables,
        });

        return res.data?.billing_ratio;
    }
}

const billingRatioQueriesFatima = new BillingRatioQueriesFatima(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default billingRatioQueriesFatima;
