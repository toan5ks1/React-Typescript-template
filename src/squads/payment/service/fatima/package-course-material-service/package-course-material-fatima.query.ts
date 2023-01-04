import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyPackageCourseMaterialsByPackageIdQuery,
    Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";

const GetManyPackageCourseMaterialsByPackageId = gql`
    query Payment_GetManyPackageCourseMaterialsByPackageId(
        $current_date: timestamptz!
        $package_id: String!
    ) {
        package_course_material(
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
            material_id
            package_id
        }
    }
`;

class PackageCourseMaterialFatimaQueries extends InheritedHasuraServiceClient {
    async getManyPackageCourseMaterialByPackageId(
        variables: Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables
    ): Promise<
        Payment_GetManyPackageCourseMaterialsByPackageIdQuery["package_course_material"] | undefined
    > {
        const response = await this._call<Payment_GetManyPackageCourseMaterialsByPackageIdQuery>({
            query: GetManyPackageCourseMaterialsByPackageId,
            variables,
        });

        return response.data?.package_course_material;
    }
}

const packageCourseMaterialFatimaQueries = new PackageCourseMaterialFatimaQueries(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default packageCourseMaterialFatimaQueries;
