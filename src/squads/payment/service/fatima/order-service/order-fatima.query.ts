import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetOrderByOrderIdQuery,
    Payment_GetOrderByOrderIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

const orderFragment = gql`
    fragment Payment_OrderAttrs on order {
        order_id
        order_sequence_number
        order_status
        order_type
        student_id
        location_id
        created_at
    }
`;

const GetOrderByOrderId = gql`
    query Payment_GetOrderByOrderId($order_id: String!) {
        order(where: { order_id: { _eq: $order_id } }) {
            ...Payment_OrderAttrs
        }
    }

    ${orderFragment}
`;

class OrderQueriesFatima extends InheritedHasuraServiceClient {
    async getOne(
        variables: Payment_GetOrderByOrderIdQueryVariables
    ): Promise<ArrayElement<Payment_GetOrderByOrderIdQuery["order"]> | undefined> {
        const res = await this._call<Payment_GetOrderByOrderIdQuery>({
            query: GetOrderByOrderId,
            variables,
        });

        return res.data?.order[0];
    }
}

const orderQueriesFatima = new OrderQueriesFatima(appConfigs, "fatimaGraphQL", doQuery);

export default orderQueriesFatima;
