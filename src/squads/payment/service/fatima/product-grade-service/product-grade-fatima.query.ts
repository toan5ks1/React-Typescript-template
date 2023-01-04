import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetProductIdsByGradeIdsQuery,
    Payment_GetProductIdsByGradeIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

const GetProductIdsByGradeIds = gql`
    query Payment_GetProductIdsByGradeIds($grade_ids: [Int!] = []) {
        product_grade(where: { grade_id: { _in: $grade_ids } }) {
            product_id
        }
    }
`;

class ProductGradeQueriesFatima extends InheritedHasuraServiceClient {
    async getProductIds(
        variables: Payment_GetProductIdsByGradeIdsQueryVariables
    ): Promise<Payment_GetProductIdsByGradeIdsQuery["product_grade"] | undefined> {
        const res = await this._call<Payment_GetProductIdsByGradeIdsQuery>({
            query: GetProductIdsByGradeIds,
            variables,
        });

        return res.data?.product_grade;
    }
}

const productGradeQueriesFatima = new ProductGradeQueriesFatima(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default productGradeQueriesFatima;
