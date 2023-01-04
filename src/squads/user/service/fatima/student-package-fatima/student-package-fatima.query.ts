import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    StudentPackageByIdQueryVariables,
    User_StudentPackagesByListStudentIdV2QueryVariables,
    User_StudentPackagesByListStudentIdV2Query,
} from "src/squads/user/service/fatima/fatima-types";
import { SingleQuery, InheritedHasuraServiceClient } from "src/squads/user/service/service-types";
import { GraphqlBody } from "src/typings/graphql";

const studentPackageFragment = gql`
    fragment StudentAttrs on student_packages {
        start_at
        end_at
        properties
        student_package_id
    }
`;

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

const getByIdStudentPackageQuery = gql`
    query StudentPackageById($id: String!) {
        student_packages(where: { student_package_id: { _eq: $id } }) {
            ...StudentAttrs
        }
    }
    ${studentPackageFragment}
`;

class StudentPackageFatimaQuery extends InheritedHasuraServiceClient {
    async getById(params: SingleQuery<StudentPackageByIdQueryVariables>): Promise<GraphqlBody> {
        return {
            query: getByIdStudentPackageQuery,
            variables: params,
        };
    }
    async getListByArrayId(
        variables: User_StudentPackagesByListStudentIdV2QueryVariables
    ): Promise<User_StudentPackagesByListStudentIdV2Query["student_packages"] | undefined> {
        const query = {
            query: getStudentPackagesByListStudentIdQuery,
            variables,
        };

        const res = await this._call<User_StudentPackagesByListStudentIdV2Query>(query);
        return res.data?.student_packages;
    }
}

const studentPackageFatimaQuery = new StudentPackageFatimaQuery(
    appConfigs,
    "fatimaGraphQL",
    doQuery
);

export default studentPackageFatimaQuery;
