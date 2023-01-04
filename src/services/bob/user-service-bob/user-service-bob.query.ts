import { gql } from "graphql-tag";

import {
    UsersTitleQueryVariables,
    UsersManyQueryVariables,
    UserByEmailQueryVariables,
    UserNameByIdsQueryVariables,
} from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

export const userFragment = gql`
    fragment UserAttrs on users {
        user_id
        name
        email
        avatar
        phone_number
        user_group
        country
    }
`;

const getTitleQuery = gql`
    query UsersTitle($user_id: String!) {
        users(where: { user_id: { _eq: $user_id } }) {
            ...UserAttrs
        }
    }
    ${userFragment}
`;

const getUserNameByIdsQuery = gql`
    query UserNameByIds($user_id: [String!] = []) {
        users(where: { user_id: { _in: $user_id } }) {
            user_id
            name
        }
    }
`;

const getManyQuery = gql`
    query UsersMany($user_id: [String!] = []) {
        users(where: { user_id: { _in: $user_id } }) {
            ...UserAttrs
        }
        users_aggregate(where: { user_id: { _in: $user_id } }) {
            aggregate {
                count
            }
        }
    }
    ${userFragment}
`;

const getOne = gql`
    query UserByEmail($email: String, $phone_number: String, $user_id: String) {
        users(
            where: {
                email: { _eq: $email }
                phone_number: { _eq: $phone_number }
                user_id: { _neq: $user_id }
            }
        ) {
            ...UserAttrs
        }
    }
    ${userFragment}
`;

class UserBobQuery {
    getTitle(variables: UsersTitleQueryVariables): GraphqlBody<UsersTitleQueryVariables> {
        return {
            query: getTitleQuery,
            variables,
        };
    }

    getMany(variables: UsersManyQueryVariables): GraphqlBody<UsersManyQueryVariables> {
        return {
            query: getManyQuery,
            variables,
        };
    }

    getOne(variables: UserByEmailQueryVariables): GraphqlBody<UserByEmailQueryVariables> {
        return {
            query: getOne,
            variables,
        };
    }

    getUserNameList(
        variables: UserNameByIdsQueryVariables
    ): GraphqlBody<UserNameByIdsQueryVariables> {
        return {
            query: getUserNameByIdsQuery,
            variables,
        };
    }
}

const userQueriesBob = new UserBobQuery();

export default userQueriesBob;
