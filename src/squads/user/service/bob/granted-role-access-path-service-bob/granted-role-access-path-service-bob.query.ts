import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    User_GrantedRoleAccessPathByGrantedRoleIdsQuery,
    User_GrantedRoleAccessPathByGrantedRoleIdsQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

const getManyQuery = gql`
    query User_GrantedRoleAccessPathByGrantedRoleIds($granted_role_ids: [String!] = []) {
        granted_role_access_path(where: { granted_role_id: { _in: $granted_role_ids } }) {
            granted_role_id
            location {
                location_id
                name
                parent_location_id
                access_path
                location_type
                is_archived
            }
        }
    }
`;

class GrantedRoleAccessPathQueryBob extends InheritedHasuraServiceClient {
    async getMany(
        variables: User_GrantedRoleAccessPathByGrantedRoleIdsQueryVariables
    ): Promise<
        User_GrantedRoleAccessPathByGrantedRoleIdsQuery["granted_role_access_path"] | undefined
    > {
        const query = {
            query: getManyQuery,
            variables,
        };
        const res = await this._call<User_GrantedRoleAccessPathByGrantedRoleIdsQuery>(query);

        return res.data?.granted_role_access_path;
    }
}

const grantedRoleAccessPathQueriesBob = new GrantedRoleAccessPathQueryBob(
    appConfigs,
    "bobGraphQL",
    doQuery
);

export default grantedRoleAccessPathQueriesBob;
