import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables,
    Payment_GetManyStudentProductsByStudentProductIdsV2Query,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

const GetManyStudentProductsByStudentProductIds = gql`
    query Payment_GetManyStudentProductsByStudentProductIdsV2($student_product_ids: [String!]) {
        student_product(where: { student_product_id: { _in: $student_product_ids } }) {
            approval_status
            location_id
            product_id
            product_status
            start_date
            end_date
            student_id
            student_product_id
            upcoming_billing_date
            updated_from_student_product_id
            updated_to_student_product_id
            student_product_label
        }
    }
`;

class StudentProductFatimaQueries extends InheritedHasuraServiceClient {
    async getManyStudentProductByStudentProductIds(
        variables: Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables
    ): Promise<
        Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"] | undefined
    > {
        const response = await this._call<Payment_GetManyStudentProductsByStudentProductIdsV2Query>(
            {
                query: GetManyStudentProductsByStudentProductIds,
                variables,
            }
        );

        return response.data?.student_product;
    }
}

const studentProductFatimaQueries = new StudentProductFatimaQueries(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default studentProductFatimaQueries;
