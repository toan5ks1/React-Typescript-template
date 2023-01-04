import { gql } from "graphql-tag";
import {
    User_UserAccessPathWithFilterV2QueryVariables,
    User_UserAccessPathByUserIdsQueryVariables,
    User_OneUserByUserIdAndLocationIdQueryVariables,
} from "src/services/bob/bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const getListWithFilterQuery = gql`
    query User_UserAccessPathWithFilterV2($user_id: String!) {
        user_access_paths(where: { user_id: { _eq: $user_id } }) {
            location {
                location_id
                name
                access_path
                location_type
                parent_location_id
            }
        }
    }
`;

const getManyQuery = gql`
    query User_UserAccessPathByUserIds($user_ids: [String!] = []) {
        user_access_paths(where: { user_id: { _in: $user_ids } }) {
            user_id
            location {
                location_id
                name
                access_path
                location_type
                parent_location_id
            }
        }
    }
`;

const getOne = gql`
    query User_OneUserByUserIdAndLocationId($location_id: String!, $user_id: String!) {
        user_access_paths(
            where: { location_id: { _eq: $location_id }, user_id: { _eq: $user_id } }
        ) {
            user_id
            location_id
        }
    }
`;

class UserAccessPathBobQuery {
    getListWithFilter(
        variables: User_UserAccessPathWithFilterV2QueryVariables
    ): GraphqlBody<User_UserAccessPathWithFilterV2QueryVariables> {
        return {
            query: getListWithFilterQuery,
            variables,
        };
    }

    getMany(
        variables: User_UserAccessPathByUserIdsQueryVariables
    ): GraphqlBody<User_UserAccessPathByUserIdsQueryVariables> {
        return {
            query: getManyQuery,
            variables,
        };
    }

    getOne(
        variables: User_OneUserByUserIdAndLocationIdQueryVariables
    ): GraphqlBody<User_OneUserByUserIdAndLocationIdQueryVariables> {
        return {
            query: getOne,
            variables,
        };
    }
}

const userAccessPathsQueriesBob = new UserAccessPathBobQuery();

export default userAccessPathsQueriesBob;
