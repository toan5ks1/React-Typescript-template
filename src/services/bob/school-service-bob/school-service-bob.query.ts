import { gql } from "graphql-tag";
import { getSearchString } from "src/services/utils";

import {
    SchoolsListQueryVariables,
    SchoolsManyQueryVariables,
    SchoolsOneQueryVariables,
    SchoolsManyReferenceQueryVariables,
} from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const schoolFragment = gql`
    fragment SchoolAttrs on schools {
        school_id
        city_id
        district_id
        name
        country
        phone_number
        point
        is_system_school
    }
`;

const getTitleQuery = gql`
    query SchoolsTitle($school_id: Int = 0) {
        schools(where: { school_id: { _eq: $school_id } }) {
            school_id
            name
        }
    }
`;
const getOneQuery = gql`
    query SchoolsOne($school_id: Int = 0) {
        schools(where: { school_id: { _eq: $school_id } }) {
            ...SchoolAttrs
            point
            classes_aggregate {
                aggregate {
                    count
                }
            }
        }
    }
    ${schoolFragment}
`;

const getListQuery = gql`
    query SchoolsList(
        $limit: Int = 10
        $offset: Int = 0
        $name: String
        $phone_number: String
        $school_id: [Int!]
        $is_system_school: Boolean
    ) {
        schools(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: {
                _or: [{ name: { _ilike: $name } }, { phone_number: { _ilike: $phone_number } }]
                school_id: { _in: $school_id }
                is_system_school: { _eq: $is_system_school }
            }
        ) {
            ...SchoolAttrs
        }
        schools_aggregate(
            where: {
                _or: [{ name: { _ilike: $name } }, { phone_number: { _ilike: $phone_number } }]
                school_id: { _in: $school_id }
                is_system_school: { _eq: $is_system_school }
            }
        ) {
            aggregate {
                count
            }
        }
    }
    ${schoolFragment}
`;

const getManyQuery = gql`
    query SchoolsMany($school_id: [Int!] = []) {
        schools(where: { school_id: { _in: $school_id } }) {
            school_id
            name
            country
            city {
                name
            }
            district {
                city_id
                name
            }
            point
            phone_number
            is_system_school
        }
    }
`;

const getManyReferenceQuery = gql`
    query SchoolsManyReference(
        $name: String
        $phone_number: String
        $limit: Int = 30
        $offset: Int = 0
    ) {
        schools(
            limit: $limit
            offset: $offset
            order_by: { name: asc, created_at: desc }
            where: { name: { _ilike: $name }, phone_number: { _ilike: $phone_number } }
        ) {
            school_id
            name
            country
            city {
                name
            }
            district {
                city_id
                name
            }
            point
            phone_number
            is_system_school
        }
        schools_aggregate(
            where: { name: { _ilike: $name }, phone_number: { _ilike: $phone_number } }
        ) {
            aggregate {
                count
            }
        }
    }
`;

class SchoolBobQuery {
    getOne(variables: SchoolsOneQueryVariables): GraphqlBody<SchoolsOneQueryVariables> {
        return {
            query: getOneQuery,
            variables,
        };
    }
    getTitle(variables: SchoolsOneQueryVariables): GraphqlBody<SchoolsOneQueryVariables> {
        return {
            query: getTitleQuery,
            variables,
        };
    }
    getManyReference({
        name,
        phone_number,
        ...variables
    }: SchoolsManyReferenceQueryVariables): GraphqlBody<SchoolsManyReferenceQueryVariables> {
        return {
            query: getManyReferenceQuery,
            variables: {
                ...variables,
                phone_number: getSearchString(phone_number),
                name: getSearchString(name),
            },
        };
    }
    getMany(variables: SchoolsManyQueryVariables): GraphqlBody<SchoolsManyQueryVariables> {
        return {
            query: getManyQuery,
            variables,
        };
    }

    getList({
        name,
        phone_number,
        ...variables
    }: SchoolsListQueryVariables): GraphqlBody<SchoolsListQueryVariables> {
        return {
            query: getListQuery,
            variables: {
                ...variables,
                phone_number: getSearchString(phone_number),
                name: getSearchString(name),
            },
        };
    }
}

const schoolQueriesBob = new SchoolBobQuery();

export default schoolQueriesBob;
