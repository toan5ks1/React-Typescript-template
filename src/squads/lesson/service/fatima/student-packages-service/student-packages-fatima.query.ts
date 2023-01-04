import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    User_StudentPackagesByListStudentIdV2Query,
    User_StudentPackagesByListStudentIdV2QueryVariables,
} from "src/squads/lesson/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";

const studentPackageFragmentWithListStudentId = gql`
    fragment StudentAttrsWithListStudentId on student_packages {
        properties
        student_package_id
        student_id
        end_at
        start_at
    }
`;

const getStudentPackagesByListStudentIdQuery = gql`
    query User_StudentPackagesByListStudentIdV2(
        $student_ids: [String!] = []
        $order_by: student_packages_order_by! = { created_at: desc }
    ) {
        student_packages(where: { student_id: { _in: $student_ids } }, order_by: [$order_by]) {
            ...StudentAttrsWithListStudentId
            location_ids
        }
    }
    ${studentPackageFragmentWithListStudentId}
`;

class StudentPackageFatimaQuery extends InheritedHasuraServiceClient {
    async getList(
        variables: User_StudentPackagesByListStudentIdV2QueryVariables
    ): Promise<User_StudentPackagesByListStudentIdV2Query["student_packages"] | undefined> {
        const response = await this._call<User_StudentPackagesByListStudentIdV2Query>({
            query: getStudentPackagesByListStudentIdQuery,
            variables,
        });

        return response.data?.student_packages;
    }
}

const studentPackagesQueriesFatima = new StudentPackageFatimaQuery(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default studentPackagesQueriesFatima;
