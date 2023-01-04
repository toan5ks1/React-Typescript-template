import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyPackageCourseByPackageIdQuery,
    Payment_GetManyPackageCourseByPackageIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

const GetManyPackageCourseByPackageId = gql`
    query Payment_GetManyPackageCourseByPackageId($package_id: String!) {
        package_course(where: { package_id: { _eq: $package_id } }) {
            course_id
            course_weight
            created_at
            mandatory_flag
            max_slots_per_course
            package_id
        }
    }
`;

class PackageCourseFatimaQueries extends InheritedHasuraServiceClient {
    async getManyPackageCourseByPackageId(
        variables: Payment_GetManyPackageCourseByPackageIdQueryVariables
    ): Promise<Payment_GetManyPackageCourseByPackageIdQuery["package_course"] | undefined> {
        const response = await this._call<Payment_GetManyPackageCourseByPackageIdQuery>({
            query: GetManyPackageCourseByPackageId,
            variables,
        });

        return response.data?.package_course;
    }
}

const packageCourseFatimaQueries = new PackageCourseFatimaQueries(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default packageCourseFatimaQueries;
