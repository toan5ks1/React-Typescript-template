import { gql } from "graphql-tag";
import {
    TeacherTitleQueryVariables,
    TeacherOneQueryVariables,
    TeacherListQueryVariables,
    TeacherManyQueryVariables,
    TeacherManyReferenceQueryVariables,
    TeacherListWithoutTeacherIdsQueryVariables,
} from "src/services/bob/bob-types";
import { getSearchString } from "src/services/utils";

import { GraphqlBody } from "@manabie-com/graphql-client";

const teacherFragment = gql`
    fragment TeacherAttrs on teachers {
        users {
            name
            email
            avatar
            phone_number
            user_group
            country
        }
        teacher_id
    }
`;

const getTitleQuery = gql`
    query TeacherTitle($teacher_id: String!) {
        teachers(where: { teacher_id: { _eq: $teacher_id } }) {
            users {
                name
            }
        }
    }
`;

const getOneQuery = gql`
    query TeacherOne($teacher_id: String!) {
        teachers(where: { teacher_id: { _eq: $teacher_id } }) {
            teacher_by_school_ids {
                school_id
            }
            ...TeacherAttrs
        }
    }
    ${teacherFragment}
`;

const getManyReference = gql`
    query TeacherManyReference(
        $limit: Int = 10
        $offset: Int = 0
        $email: String
        $name: String
        $school_id: Int! = 0
    ) {
        find_teacher_by_school_id(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            args: { school_id: $school_id }
            where: { _or: [{ name: { _ilike: $name } }, { email: { _ilike: $email } }] }
        ) {
            name
            email
            user_id
            avatar
        }
    }
`;

const getListQuery = gql`
    query TeacherList(
        $limit: Int = 10
        $offset: Int = 0
        $user_name: String
        $user_email: String
        $school_id: Int! = 0
    ) {
        find_teacher_by_school_id(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            args: { school_id: $school_id }
            where: { name: { _ilike: $user_name }, email: { _ilike: $user_email } }
        ) {
            name
            email
            user_id
        }
        find_teacher_by_school_id_aggregate(
            args: { school_id: $school_id }
            where: { name: { _ilike: $user_name }, email: { _ilike: $user_email } }
        ) {
            aggregate {
                count
            }
        }
    }
`;

const getListWithoutTeacherIdsQuery = gql`
    query TeacherListWithoutTeacherIds(
        $limit: Int = 10
        $offset: Int = 0
        $user_name: String
        $user_email: String
        $user_id: [String!] = []
        $school_id: Int = 0
    ) {
        find_teacher_by_school_id(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            args: { school_id: $school_id }
            where: {
                name: { _ilike: $user_name }
                email: { _ilike: $user_email }
                user_id: { _nin: $user_id }
            }
        ) {
            name
            email
            user_id
            avatar
        }
        find_teacher_by_school_id_aggregate(
            args: { school_id: $school_id }
            where: {
                name: { _ilike: $user_name }
                email: { _ilike: $user_email }
                user_id: { _nin: $user_id }
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;

const getManyQuery = gql`
    query TeacherMany($user_id: [String!] = [], $school_id: Int = 0) {
        find_teacher_by_school_id(
            args: { school_id: $school_id }
            where: { user_id: { _in: $user_id } }
        ) {
            name
            email
            user_id
        }
    }
`;

class TeacherQueryBob {
    getTitle(variables: TeacherTitleQueryVariables): GraphqlBody<TeacherTitleQueryVariables> {
        return {
            query: getTitleQuery,
            variables,
        };
    }
    getOne(variables: TeacherOneQueryVariables): GraphqlBody<TeacherOneQueryVariables> {
        return {
            query: getOneQuery,
            variables,
        };
    }
    getManyReference(
        variables: TeacherManyReferenceQueryVariables
    ): GraphqlBody<TeacherManyReferenceQueryVariables> {
        const email = getSearchString(variables.email);
        const name = getSearchString(variables.name);

        return {
            query: getManyReference,
            variables: {
                ...variables,
                email,
                name,
            },
        };
    }
    getList(variables: TeacherListQueryVariables): GraphqlBody<TeacherListQueryVariables> {
        const user_email = getSearchString(variables.user_email);
        const user_name = getSearchString(variables.user_name);

        return {
            query: getListQuery,
            variables: {
                ...variables,
                user_name,
                user_email,
            },
        };
    }
    getListWithoutTeacherIds(
        variables: TeacherListWithoutTeacherIdsQueryVariables
    ): GraphqlBody<TeacherListWithoutTeacherIdsQueryVariables> {
        const user_email = getSearchString(variables.user_email);
        const user_name = getSearchString(variables.user_name);

        return {
            query: getListWithoutTeacherIdsQuery,
            variables: {
                ...variables,
                user_name,
                user_email,
            },
        };
    }
    getMany(variables: TeacherManyQueryVariables): GraphqlBody<TeacherManyQueryVariables> {
        return {
            query: getManyQuery,
            variables,
        };
    }
}

const teacherQueriesBob = new TeacherQueryBob();

export default teacherQueriesBob;
