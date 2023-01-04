import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

import {
    User_RoleListV2Query,
    User_RoleListV2QueryVariables,
    User_RoleListV3Query,
    User_RoleListV3QueryVariables,
} from "../bob-types";

const getListQuery = gql`
    query User_RoleListV2($is_system: Boolean = false) {
        role(where: { is_system: { _eq: $is_system } }) {
            role_id
            role_name
        }
        role_aggregate(where: { is_system: { _eq: $is_system } }) {
            aggregate {
                count
            }
        }
    }
`;

const getTeacherAndSchoolAdminRoleListQuery = gql`
    query User_RoleListV3($is_system: Boolean = false) {
        role(
            where: {
                is_system: { _eq: $is_system }
                role_name: { _in: ["Teacher", "School Admin"] }
            }
        ) {
            role_id
            role_name
        }
        role_aggregate(
            where: {
                is_system: { _eq: $is_system }
                role_name: { _in: ["Teacher", "School Admin"] }
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;

class RoleQueryBob extends InheritedHasuraServiceClient {
    async getList(
        variables: User_RoleListV2QueryVariables
    ): Promise<User_RoleListV2Query["role"] | undefined> {
        const query = {
            query: getListQuery,
            variables,
        };
        const res = await this._call<User_RoleListV2Query>(query);
        return res.data?.role;
    }
    async getTeacherAndSchoolAdminRoleList(
        variables: User_RoleListV3QueryVariables
    ): Promise<User_RoleListV3Query["role"] | undefined> {
        const query = {
            query: getTeacherAndSchoolAdminRoleListQuery,
            variables,
        };
        const res = await this._call<User_RoleListV3Query>(query);
        return res.data?.role;
    }
}

const roleQueriesBob = new RoleQueryBob(appConfigs, "bobGraphQL", doQuery);

export default roleQueriesBob;
