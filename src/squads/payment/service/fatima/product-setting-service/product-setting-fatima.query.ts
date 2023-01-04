import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetEnrollmentProductIdsByProductIdsQuery,
    Payment_GetEnrollmentProductIdsByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

const getEnrollmentProductIdsByProductIds = gql`
    query Payment_GetEnrollmentProductIdsByProductIds($productIds: [String!]) {
        product_setting(
            where: {
                product_id: { _in: $productIds }
                _and: { is_required_for_enrollment: { _eq: true } }
            }
        ) {
            product_id
        }
    }
`;
class ProductSettingQueriesFatima extends InheritedHasuraServiceClient {
    async getEnrollmentProductIdsByProductIds(
        variables: Payment_GetEnrollmentProductIdsByProductIdsQueryVariables
    ): Promise<Payment_GetEnrollmentProductIdsByProductIdsQuery["product_setting"] | undefined> {
        const res = await this._call<Payment_GetEnrollmentProductIdsByProductIdsQuery>({
            query: getEnrollmentProductIdsByProductIds,
            variables,
        });

        return res.data?.product_setting;
    }
}

const productSettingQueriesFatima = new ProductSettingQueriesFatima(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default productSettingQueriesFatima;
