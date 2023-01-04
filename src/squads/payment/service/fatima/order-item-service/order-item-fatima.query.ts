import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetOrderItemsByOrderIdQueryVariables,
    Payment_GetOrderItemsByOrderIdQuery,
    Payment_GetManyOrderItemsByStudentProductIdsQuery,
    Payment_GetManyOrderItemsByStudentProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

import { DataWithTotal } from "@manabie-com/react-utils";

const GetOrderItemsByOrderId = gql`
    query Payment_GetOrderItemsByOrderId($orderId: String!, $limit: Int = 5, $offset: Int) {
        order_item(limit: $limit, offset: $offset, where: { order_id: { _eq: $orderId } }) {
            discount_id
            product_id
            start_date
        }
        order_item_aggregate(where: { order_id: { _eq: $orderId } }) {
            aggregate {
                count
            }
        }
    }
`;

const GetManyOrderItemsByStudentProductIds = gql`
    query Payment_GetManyOrderItemsByStudentProductIds($student_product_ids: [String!]) {
        order_item(where: { student_product_id: { _in: $student_product_ids } }) {
            student_product_id
            discount_id
            product_id
            order_id
        }
    }
`;
class OrderItemQueriesFatima extends InheritedHasuraServiceClient {
    async getManyByOrderId(
        variables: Payment_GetOrderItemsByOrderIdQueryVariables
    ): Promise<DataWithTotal<Payment_GetOrderItemsByOrderIdQuery["order_item"] | undefined>> {
        const response = await this._call<Payment_GetOrderItemsByOrderIdQuery>({
            query: GetOrderItemsByOrderId,
            variables,
        });
        return {
            total: response.data?.order_item_aggregate.aggregate?.count || 0,
            data: response.data?.order_item,
        };
    }
    async getManyOrderItemsByStudentProductIds(
        variables: Payment_GetManyOrderItemsByStudentProductIdsQueryVariables
    ): Promise<Payment_GetManyOrderItemsByStudentProductIdsQuery["order_item"] | undefined> {
        const response = await this._call<Payment_GetManyOrderItemsByStudentProductIdsQuery>({
            query: GetManyOrderItemsByStudentProductIds,
            variables,
        });

        return response.data?.order_item;
    }
}

const orderItemsQueriesFatima = new OrderItemQueriesFatima(appConfigs, "fatimaGraphQL", doQuery);

export default orderItemsQueriesFatima;
