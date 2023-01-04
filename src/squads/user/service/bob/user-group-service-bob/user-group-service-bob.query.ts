import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    User_UserGroupListV2Query,
    User_UserGroupListV2QueryVariables,
    User_UserGroupOneQuery,
    User_UserGroupOneQueryVariables,
    User_UserGroupsManyReferenceV2Query,
    User_UserGroupsManyReferenceV2QueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

export interface UserGroupListQueryReturn {
    data: User_UserGroupListV2Query["user_group"] | undefined;
    total: number | null | undefined;
}

const getListQuery = gql`
    query User_UserGroupListV2($limit: Int = 10, $offset: Int = 0, $is_system: Boolean = false) {
        user_group(
            limit: $limit
            offset: $offset
            where: { is_system: { _eq: $is_system } }
            order_by: { created_at: desc }
        ) {
            user_group_id
            user_group_name
        }
        user_group_aggregate(where: { is_system: { _eq: $is_system } }) {
            aggregate {
                count
            }
        }
    }
`;

const getOneQuery = gql`
    query User_UserGroupOne($user_group_id: String!) {
        user_group(where: { user_group_id: { _eq: $user_group_id } }) {
            user_group_id
            user_group_name
        }
    }
`;

const getUserGroupsManyReferenceQuery = gql`
    query User_UserGroupsManyReferenceV2(
        $user_group_name: String
        $is_system: Boolean = false
        $limit: Int = 13
        $offset: Int = 0
    ) {
        user_group(
            limit: $limit
            offset: $offset
            where: { user_group_name: { _ilike: $user_group_name }, is_system: { _eq: $is_system } }
            order_by: { created_at: desc }
        ) {
            user_group_id
            user_group_name
        }
    }
`;

class UserGroupQueryBob extends InheritedHasuraServiceClient {
    async getListWithFilter(
        variables: User_UserGroupListV2QueryVariables
    ): Promise<UserGroupListQueryReturn | undefined> {
        const query = {
            query: getListQuery,
            variables,
        };
        const res = await this._call<User_UserGroupListV2Query>(query);
        return {
            data: res.data?.user_group,
            total: res.data?.user_group_aggregate?.aggregate?.count ?? 0,
        };
    }

    async getOne(
        variables: User_UserGroupOneQueryVariables
    ): Promise<ArrayElement<User_UserGroupOneQuery["user_group"]> | undefined> {
        const query = {
            query: getOneQuery,
            variables,
        };
        const res = await this._call<User_UserGroupOneQuery>(query);

        return res.data?.user_group[0];
    }

    async userUserGroupGetManyReference(
        variables: User_UserGroupsManyReferenceV2QueryVariables
    ): Promise<User_UserGroupsManyReferenceV2Query["user_group"] | undefined> {
        const { user_group_name } = variables;
        const query = {
            query: getUserGroupsManyReferenceQuery,
            variables: {
                user_group_name,
            },
        };

        const res = await this._call<User_UserGroupsManyReferenceV2Query>(query);
        return res.data?.user_group;
    }
}

const userGroupQueriesBob = new UserGroupQueryBob(appConfigs, "bobGraphQL", doQuery);

export default userGroupQueriesBob;
