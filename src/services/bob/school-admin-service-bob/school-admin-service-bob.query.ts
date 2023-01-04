import { gql } from "graphql-tag";
import { getSearchString } from "src/services/utils";

import {
    SchoolAdminsListQueryVariables,
    SchoolAdminsManyQueryVariables,
    SchoolAdminsOneQueryVariables,
    SchoolAdminsManyReferenceQueryVariables,
    CountSchoolAdminsWithFilterQueryVariables,
    GetSchoolAdminsBySchoolIdQueryVariables,
} from "../bob-types";
import { userFragment } from "./../user-service-bob/user-service-bob.query";

import { GraphqlBody } from "@manabie-com/graphql-client";

const schoolAdminFragment = gql`
    fragment SchoolAdminAttrs on school_admins {
        users {
            ...UserAttrs
        }
        school_admin_id
        school_admin_id
        created_at
        updated_at
    }
    ${userFragment}
`;

const getTitleQuery = gql`
    query SchoolAdminsTitle($school_admin_id: String = "") {
        school_admins(where: { school_admin_id: { _eq: $school_admin_id } }) {
            ...SchoolAdminAttrs
        }
    }
    ${schoolAdminFragment}
`;
const getOneQuery = gql`
    query SchoolAdminsOne($school_admin_id: String = "") {
        school_admins(where: { school_admin_id: { _eq: $school_admin_id } }) {
            ...SchoolAdminAttrs
        }
    }
    ${schoolAdminFragment}
`;

const getListQuery = gql`
    query SchoolAdminsList(
        $limit: Int = 10
        $offset: Int = 0
        $school_admin_id: [String!]
        $school_id: [Int!]
        $name: String
    ) {
        school_admins(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc, school_admin_id: desc }
            where: {
                school_id: { _in: $school_id }
                school_admin_id: { _in: $school_admin_id }
                users: { name: { _ilike: $name } }
            }
        ) {
            ...SchoolAdminAttrs
        }
        school_admins_aggregate(
            where: {
                school_id: { _in: $school_id }
                school_admin_id: { _in: $school_admin_id }
                users: { name: { _ilike: $name } }
            }
        ) {
            aggregate {
                count
            }
        }
    }
    ${schoolAdminFragment}
`;

const getManyQuery = gql`
    query SchoolAdminsMany($school_admin_id: [String!] = []) {
        school_admins(where: { school_admin_id: { _in: $school_admin_id } }) {
            ...SchoolAdminAttrs
        }
    }
    ${schoolAdminFragment}
`;

const getManyReferenceQuery = gql`
    query SchoolAdminsManyReference($limit: Int = 30, $offset: Int = 0, $school_id: [Int!] = []) {
        school_admins(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: { school_id: { _in: $school_id } }
        ) {
            ...SchoolAdminAttrs
        }
        school_admins_aggregate(where: { school_id: { _in: $school_id } }) {
            aggregate {
                count
            }
        }
    }
    ${schoolAdminFragment}
`;

const getCountSchoolAdminsByFilter = gql`
    query CountSchoolAdminsWithFilter($school_id: Int!, $filterValue: String) {
        users_aggregate(
            where: {
                _and: [
                    { school_admin: { school_id: { _eq: $school_id } } }
                    {
                        _or: [
                            { email: { _ilike: $filterValue } }
                            { name: { _ilike: $filterValue } }
                        ]
                    }
                ]
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;

const getSchoolAdminsBySchoolId = gql`
    query GetSchoolAdminsBySchoolId(
        $limit: Int = 10
        $offset: Int = 0
        $school_id: Int!
        $filterValue: String
    ) {
        users(
            where: {
                _and: [
                    { school_admin: { school_id: { _eq: $school_id } } }
                    {
                        _or: [
                            { email: { _ilike: $filterValue } }
                            { name: { _ilike: $filterValue } }
                        ]
                    }
                ]
            }
            offset: $offset
            order_by: { created_at: desc, user_id: desc }
            limit: $limit
        ) {
            user_id
            name
            email
            phone_number
        }
    }
`;

class SchoolAdminBobQuery {
    getOne(variables: SchoolAdminsOneQueryVariables): GraphqlBody<SchoolAdminsOneQueryVariables> {
        return {
            query: getOneQuery,
            variables,
        };
    }
    getTitle(variables: SchoolAdminsOneQueryVariables): GraphqlBody<SchoolAdminsOneQueryVariables> {
        return {
            query: getTitleQuery,
            variables,
        };
    }
    getManyReference(
        variables: SchoolAdminsManyReferenceQueryVariables
    ): GraphqlBody<SchoolAdminsManyReferenceQueryVariables> {
        return {
            query: getManyReferenceQuery,
            variables,
        };
    }
    getMany(
        variables: SchoolAdminsManyQueryVariables
    ): GraphqlBody<SchoolAdminsManyQueryVariables> {
        return {
            query: getManyQuery,
            variables,
        };
    }

    getCountSchoolAdminsByFilter({
        filterValue,
        ...rest
    }: CountSchoolAdminsWithFilterQueryVariables): GraphqlBody<CountSchoolAdminsWithFilterQueryVariables> {
        return {
            query: getCountSchoolAdminsByFilter,
            variables: {
                filterValue: getSearchString(filterValue),
                ...rest,
            },
        };
    }

    getSchoolAdminsBySchoolId({
        filterValue,
        ...rest
    }: GetSchoolAdminsBySchoolIdQueryVariables): GraphqlBody<GetSchoolAdminsBySchoolIdQueryVariables> {
        return {
            query: getSchoolAdminsBySchoolId,
            variables: {
                filterValue: getSearchString(filterValue),
                ...rest,
            },
        };
    }

    getList({
        name,
        ...variables
    }: SchoolAdminsListQueryVariables): GraphqlBody<SchoolAdminsListQueryVariables> {
        return {
            query: getListQuery,
            variables: {
                ...variables,
                name: getSearchString(name),
            },
        };
    }
}

const schoolAdminQueriesBob = new SchoolAdminBobQuery();

export default schoolAdminQueriesBob;
