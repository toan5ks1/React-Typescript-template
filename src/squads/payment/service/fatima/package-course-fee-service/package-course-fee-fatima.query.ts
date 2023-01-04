import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyPackageCourseFeesByPackageIdQuery,
    Payment_GetManyPackageCourseFeesByPackageIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

const GetManyPackageCourseFeesByPackageId = gql`
    query Payment_GetManyPackageCourseFeesByPackageId(
        $current_date: timestamptz!
        $package_id: String!
    ) {
        package_course_fee(
            where: {
                package_id: { _eq: $package_id }
                _and: [
                    { available_from: { _lte: $current_date } }
                    { available_until: { _gte: $current_date } }
                ]
            }
        ) {
            available_from
            available_until
            course_id
            created_at
            fee_id
            package_id
        }
    }
`;

class PackageCourseFeeFatimaQueries extends InheritedHasuraServiceClient {
    async getManyPackageCourseFeesByPackageId(
        variables: Payment_GetManyPackageCourseFeesByPackageIdQueryVariables
    ): Promise<Payment_GetManyPackageCourseFeesByPackageIdQuery["package_course_fee"] | undefined> {
        const response = await this._call<Payment_GetManyPackageCourseFeesByPackageIdQuery>({
            query: GetManyPackageCourseFeesByPackageId,
            variables,
        });

        return response.data?.package_course_fee;
    }
}

const packageCourseFeeFatimaQueries = new PackageCourseFeeFatimaQueries(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default packageCourseFeeFatimaQueries;
