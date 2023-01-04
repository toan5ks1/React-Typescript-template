import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetProductIdsByLocationIdsQuery,
    Payment_GetProductIdsByLocationIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

const GetProductIdsByLocationIds = gql`
    query Payment_GetProductIdsByLocationIds($location_ids: [String!] = []) {
        product_location(where: { location_id: { _in: $location_ids } }) {
            product_id
        }
    }
`;

class ProductLocationQueriesFatima extends InheritedHasuraServiceClient {
    async getProductIds(
        variables: Payment_GetProductIdsByLocationIdsQueryVariables
    ): Promise<Payment_GetProductIdsByLocationIdsQuery["product_location"] | undefined> {
        const res = await this._call<Payment_GetProductIdsByLocationIdsQuery>({
            query: GetProductIdsByLocationIds,
            variables,
        });

        return res.data?.product_location;
    }
}

const productLocationQueriesFatima = new ProductLocationQueriesFatima(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default productLocationQueriesFatima;
