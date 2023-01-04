import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetFeeByProductIdQuery,
    Payment_GetFeeByProductIdQueryVariables,
    Payment_GetManyFeesByProductIdsQuery,
    Payment_GetManyFeesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

const GetFeeByProductId = gql`
    query Payment_GetFeeByProductId($product_id: String!) {
        fee(where: { fee_id: { _eq: $product_id } }) {
            fee_type
        }
    }
`;

const GetManyFeesByProductIds = gql`
    query Payment_GetManyFeesByProductIds($productIds: [String!]) {
        fee(where: { fee_id: { _in: $productIds } }, order_by: { fee_id: asc }) {
            fee_id
            fee_type
        }
    }
`;

class FeeQueriesFatima extends InheritedHasuraServiceClient {
    async getOne(
        variables: Payment_GetFeeByProductIdQueryVariables
    ): Promise<ArrayElement<Payment_GetFeeByProductIdQuery["fee"]> | undefined> {
        const res = await this._call<Payment_GetFeeByProductIdQuery>({
            query: GetFeeByProductId,
            variables,
        });

        return res.data?.fee[0];
    }

    async getManyFeesByIds(
        variables: Payment_GetManyFeesByProductIdsQueryVariables
    ): Promise<Payment_GetManyFeesByProductIdsQuery["fee"] | undefined> {
        const res = await this._call<Payment_GetManyFeesByProductIdsQuery>({
            query: GetManyFeesByProductIds,
            variables,
        });

        return res.data?.fee;
    }
}

const feeQueriesFatima = new FeeQueriesFatima(appConfigs, "fatimaGraphQL", doQuery);

export default feeQueriesFatima;
