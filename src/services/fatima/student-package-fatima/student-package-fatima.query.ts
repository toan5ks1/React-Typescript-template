import { gql } from "graphql-tag";

import { SingleQuery } from "../../service-types";
import {
    StudentPackageByIdQueryVariables,
    StudentPackageListQueryVariables,
    User_StudentPackagesByListStudentIdV2QueryVariables,
} from "../fatima-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

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

const listStudentPackageQuery = gql`
    query StudentPackageList(
        $student_id: String! = ""
        $order_by: student_packages_order_by! = { created_at: desc }
        $limit: Int
        $offset: Int
    ) {
        student_packages(
            where: { student_id: { _eq: $student_id } }
            order_by: [$order_by]
            limit: $limit
            offset: $offset
        ) {
            ...StudentAttrs
        }
        student_packages_aggregate(where: { student_id: { _eq: $student_id } }) {
            aggregate {
                count
            }
        }
    }
    ${studentPackageFragment}
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

class StudentPackageFatimaQuery {
    async getById(params: SingleQuery<StudentPackageByIdQueryVariables>): Promise<GraphqlBody> {
        return {
            query: getByIdStudentPackageQuery,
            variables: params,
        };
    }
    async getListByArrayId(
        variables: User_StudentPackagesByListStudentIdV2QueryVariables
    ): Promise<GraphqlBody> {
        return {
            query: getStudentPackagesByListStudentIdQuery,
            variables,
        };
    }
    async getList(variables: StudentPackageListQueryVariables): Promise<GraphqlBody> {
        return {
            query: listStudentPackageQuery,
            variables: variables,
        };
    }
}

const studentPackageFatimaQuery = new StudentPackageFatimaQuery();

export default studentPackageFatimaQuery;
