import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    User_UserAccessPathWithFilterV2QueryVariables,
    User_UserAccessPathWithFilterV3QueryVariables,
    User_UserAccessPathByUserIdsV2QueryVariables,
    User_UserAccessPathWithFilterV3Query,
    User_UserAccessPathByUserIdsV2Query,
    User_OneUserByUserIdAndLocationIdQueryVariables,
    User_OneUserByUserIdAndLocationIdQuery,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";
import { GraphqlBody } from "src/typings/graphql";

const getListWithFilterQueryV2 = gql`
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

const getListWithFilterQuery = gql`
    query User_UserAccessPathWithFilterV3($user_id: String!) {
        user_access_paths(where: { user_id: { _eq: $user_id } }) {
            location {
                location_id
                name
                access_path
                location_type
                parent_location_id
                is_archived
            }
        }
    }
`;

const getManyQuery = gql`
    query User_UserAccessPathByUserIdsV2($user_ids: [String!] = []) {
        user_access_paths(where: { user_id: { _in: $user_ids } }) {
            user_id
            location {
                location_id
                name
                access_path
                location_type
                parent_location_id
                is_archived
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

class UserAccessPathBobQuery extends InheritedHasuraServiceClient {
    getListWithFilterV2(
        variables: User_UserAccessPathWithFilterV2QueryVariables
    ): GraphqlBody<User_UserAccessPathWithFilterV2QueryVariables> {
        return {
            query: getListWithFilterQueryV2,
            variables,
        };
    }

    async getListWithFilter(
        variables: User_UserAccessPathWithFilterV3QueryVariables
    ): Promise<User_UserAccessPathWithFilterV3Query["user_access_paths"] | undefined> {
        const { user_id } = variables;
        const query = {
            query: getListWithFilterQuery,
            variables: {
                user_id,
            },
        };
        const res = await this._call<User_UserAccessPathWithFilterV3Query>(query);
        return res.data?.user_access_paths;
    }

    async getMany(
        variables: User_UserAccessPathByUserIdsV2QueryVariables
    ): Promise<User_UserAccessPathByUserIdsV2Query["user_access_paths"] | undefined> {
        const { user_ids } = variables;
        const query = {
            query: getManyQuery,
            variables: {
                user_ids,
            },
        };
        const res = await this._call<User_UserAccessPathByUserIdsV2Query>(query);
        return res.data?.user_access_paths;
    }

    async userAccessPathsGetOne(
        variables: User_OneUserByUserIdAndLocationIdQueryVariables
    ): Promise<
        ArrayElement<User_OneUserByUserIdAndLocationIdQuery["user_access_paths"]> | undefined
    > {
        const { location_id, user_id } = variables;
        const query = {
            query: getOne,
            variables: {
                location_id,
                user_id,
            },
        };
        const res = await this._call<User_OneUserByUserIdAndLocationIdQuery>(query);
        return res.data?.user_access_paths[0];
    }
}

const userAccessPathsQueriesBob = new UserAccessPathBobQuery(appConfigs, "bobGraphQL", doQuery);

export default userAccessPathsQueriesBob;
