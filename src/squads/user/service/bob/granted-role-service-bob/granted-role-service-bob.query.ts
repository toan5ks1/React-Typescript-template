import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

import { User_GrantedRoleListQuery, User_GrantedRoleListQueryVariables } from "../bob-types";

export interface GrantedRoleListQueryReturn {
    data: User_GrantedRoleListQuery["granted_role"] | undefined;
    total: number | null | undefined;
}
const getListQuery = gql`
    query User_GrantedRoleList($user_group_id: String!, $limit: Int = 10, $offset: Int = 0) {
        granted_role(
            where: { user_group_id: { _eq: $user_group_id } }
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
        ) {
            granted_role_id
            role {
                role_id
                role_name
            }
        }
        granted_role_aggregate(where: { user_group_id: { _eq: $user_group_id } }) {
            aggregate {
                count
            }
        }
    }
`;

class GrantedRoleQueryBob extends InheritedHasuraServiceClient {
    async getListWithFilter(
        variables: User_GrantedRoleListQueryVariables
    ): Promise<GrantedRoleListQueryReturn | undefined> {
        const query = {
            query: getListQuery,
            variables,
        };
        const res = await this._call<User_GrantedRoleListQuery>(query);
        return {
            data: res.data?.granted_role,
            total: res.data?.granted_role_aggregate?.aggregate?.count ?? 0,
        };
    }
}

const grantedRoleQueriesBob = new GrantedRoleQueryBob(appConfigs, "bobGraphQL", doQuery);

export default grantedRoleQueriesBob;
