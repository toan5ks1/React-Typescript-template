import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetPackageByProductIdQuery,
    Payment_GetPackageByProductIdQueryVariables,
    Payment_GetPackagesByProductIdsQuery,
    Payment_GetPackagesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

const GetPackageByProductId = gql`
    query Payment_GetPackageByProductId($product_id: String!) {
        package(where: { package_id: { _eq: $product_id } }) {
            max_slot
            package_end_date
            package_start_date
            package_type
        }
    }
`;

const GetManyPackagesByProductIds = gql`
    query Payment_GetPackagesByProductIds($productIds: [String!]) {
        package(where: { package_id: { _in: $productIds } }) {
            package_id
            max_slot
            package_end_date
            package_start_date
            package_type
        }
    }
`;

class PackageQueriesFatima extends InheritedHasuraServiceClient {
    async getOne(
        variables: Payment_GetPackageByProductIdQueryVariables
    ): Promise<ArrayElement<Payment_GetPackageByProductIdQuery["package"]> | undefined> {
        const res = await this._call<Payment_GetPackageByProductIdQuery>({
            query: GetPackageByProductId,
            variables,
        });

        return res.data?.package[0];
    }

    async getMany(
        variables: Payment_GetPackagesByProductIdsQueryVariables
    ): Promise<Payment_GetPackagesByProductIdsQuery["package"] | undefined> {
        const res = await this._call<Payment_GetPackagesByProductIdsQuery>({
            query: GetManyPackagesByProductIds,
            variables,
        });

        return res.data?.package;
    }
}

const packageQueriesFatima = new PackageQueriesFatima(appConfigs, "fatimaGraphQL", doQuery);

export default packageQueriesFatima;
