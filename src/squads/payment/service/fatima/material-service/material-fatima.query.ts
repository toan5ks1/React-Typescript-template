import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyMaterialsByProductIdsV2Query,
    Payment_GetManyMaterialsByProductIdsV2QueryVariables,
    Payment_GetMaterialByProductIdQuery,
    Payment_GetMaterialByProductIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

const GetMaterialByProductId = gql`
    query Payment_GetMaterialByProductId($product_id: String!) {
        material(where: { material_id: { _eq: $product_id } }) {
            custom_billing_date
            material_type
        }
    }
`;

const GetManyMaterialsByProductIds = gql`
    query Payment_GetManyMaterialsByProductIdsV2($productIds: [String!]) {
        material(where: { material_id: { _in: $productIds } }) {
            material_id
            material_type
            custom_billing_date
        }
    }
`;

class MaterialQueriesFatima extends InheritedHasuraServiceClient {
    async getOne(
        variables: Payment_GetMaterialByProductIdQueryVariables
    ): Promise<ArrayElement<Payment_GetMaterialByProductIdQuery["material"]> | undefined> {
        const res = await this._call<Payment_GetMaterialByProductIdQuery>({
            query: GetMaterialByProductId,
            variables,
        });

        return res.data?.material[0];
    }
    async getManyMaterialsByIds(
        variables: Payment_GetManyMaterialsByProductIdsV2QueryVariables
    ): Promise<Payment_GetManyMaterialsByProductIdsV2Query["material"] | undefined> {
        const response = await this._call<Payment_GetManyMaterialsByProductIdsV2Query>({
            query: GetManyMaterialsByProductIds,
            variables,
        });
        return response.data?.material;
    }
}

const materialQueriesFatima = new MaterialQueriesFatima(appConfigs, "fatimaGraphQL", doQuery);

export default materialQueriesFatima;
