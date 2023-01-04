import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { ArrayElement } from "src/squads/timesheet/common/constants/types";
import { doQuery } from "src/squads/timesheet/internals/hasura-client/execute-query";
import { InheritedHasuraServiceClient } from "src/squads/timesheet/service/service-types";
import { getSearchString } from "src/squads/timesheet/service/utils";

import {
    Timesheet_StaffListByIdsQueryVariables,
    Timesheet_StaffListByIdsQuery,
    Timesheet_StaffOneQueryVariables,
    Timesheet_StaffOneQuery,
    Timesheet_StaffListQueryVariables,
    Timesheet_StaffListQuery,
    Timesheet_StaffListV2QueryVariables,
    Timesheet_StaffListV2Query,
} from "../bob-types";

const staffFragment = gql`
    fragment Timesheet_StaffAttrs on users {
        user_id
        name
        email
    }
`;

const getManyQuery = gql`
    query Timesheet_StaffListByIds($staff_ids: [String!] = []) {
        users(where: { user_id: { _in: $staff_ids } }) {
            ...Timesheet_StaffAttrs
        }
    }
    ${staffFragment}
`;

const getOneQuery = gql`
    query Timesheet_StaffOne($staff_id: String!) {
        users(where: { user_id: { _eq: $staff_id } }) {
            ...Timesheet_StaffAttrs
        }
    }
    ${staffFragment}
`;

const getListQuery = gql`
    query Timesheet_StaffList($email: String, $name: String, $limit: Int = 10, $offset: Int = 0) {
        users(
            limit: $limit
            offset: $offset
            where: { _and: [{ _or: [{ email: { _ilike: $email } }, { name: { _ilike: $name } }] }] }
        ) {
            ...Timesheet_StaffAttrs
        }
    }
    ${staffFragment}
`;

const getListQueryV2 = gql`
    query Timesheet_StaffListV2($keyword: String, $limit: Int = 10, $offset: Int = 0) {
        staff(
            limit: $limit
            offset: $offset
            where: {
                user: { _or: [{ email: { _ilike: $keyword } }, { name: { _ilike: $keyword } }] }
            }
        ) {
            user {
                name
                email
            }
            staff_id
        }
    }
`;

class StaffQuery extends InheritedHasuraServiceClient {
    async getMany(
        variables: Timesheet_StaffListByIdsQueryVariables
    ): Promise<Timesheet_StaffListByIdsQuery["users"] | undefined> {
        const query = {
            query: getManyQuery,
            variables,
        };

        const res = await this._call<Timesheet_StaffListByIdsQuery>(query);
        return res.data?.users;
    }
    async getOne(
        variables: Timesheet_StaffOneQueryVariables
    ): Promise<ArrayElement<Timesheet_StaffOneQuery["users"]> | undefined> {
        const { staff_id } = variables;
        const query = {
            query: getOneQuery,
            variables: {
                staff_id,
            },
        };
        const res = await this._call<Timesheet_StaffOneQuery>(query);

        return res.data?.users[0];
    }
    async getListWithFilter(
        variables: Timesheet_StaffListQueryVariables
    ): Promise<Timesheet_StaffListQuery["users"] | undefined> {
        const query = {
            query: getListQuery,
            variables: {
                email: getSearchString(variables.email),
                name: getSearchString(variables.name),
            },
        };

        const res = await this._call<Timesheet_StaffListQuery>(query);
        return res.data?.users;
    }
    async getListWithFilterV2(
        variables: Timesheet_StaffListV2QueryVariables
    ): Promise<Timesheet_StaffListV2Query["staff"] | undefined> {
        const query = {
            query: getListQueryV2,
            variables: {
                keyword: getSearchString(variables.keyword),
            },
        };

        const res = await this._call<Timesheet_StaffListV2Query>(query);
        return res.data?.staff;
    }
}

const staffQueries = new StaffQuery(appConfigs, "bobGraphQL", doQuery);

export default staffQueries;
