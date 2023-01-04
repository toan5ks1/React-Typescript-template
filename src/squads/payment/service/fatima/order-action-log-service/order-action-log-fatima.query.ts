import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyActionLogsByOrderIdQuery,
    Payment_GetManyActionLogsByOrderIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

import { DataWithTotal } from "@manabie-com/react-utils";

const orderActionLogFragment = gql`
    fragment Payment_ActionLogsAttr on order_action_log {
        user_id
        action
        comment
        created_at
    }
`;

const GetManyActionLogsByOrderId = gql`
    query Payment_GetManyActionLogsByOrderId(
        $order_id: String!
        $limit: Int = 5
        $offset: Int = 0
    ) {
        order_action_log(
            where: { order_id: { _eq: $order_id } }
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
        ) {
            ...Payment_ActionLogsAttr
        }
        order_action_log_aggregate(where: { order_id: { _eq: $order_id } }) {
            aggregate {
                count
            }
        }
    }

    ${orderActionLogFragment}
`;

class OrderActionLogsQueriesFatima extends InheritedHasuraServiceClient {
    async getList(
        variables: Payment_GetManyActionLogsByOrderIdQueryVariables
    ): Promise<
        DataWithTotal<Payment_GetManyActionLogsByOrderIdQuery["order_action_log"] | undefined>
    > {
        const res = await this._call<Payment_GetManyActionLogsByOrderIdQuery>({
            query: GetManyActionLogsByOrderId,
            variables,
        });

        return {
            data: res.data?.order_action_log,
            total: res.data?.order_action_log_aggregate.aggregate?.count ?? 0,
        };
    }
}

const orderActionLogsQueriesFatima = new OrderActionLogsQueriesFatima(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default orderActionLogsQueriesFatima;
