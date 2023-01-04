import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { ArrayElement } from "src/squads/timesheet/common/constants/types";
import { doQuery } from "src/squads/timesheet/internals/hasura-client/execute-query";
import { InheritedHasuraServiceClient } from "src/squads/timesheet/service/service-types";

import {
    Timesheet_TimesheetListQuery,
    Timesheet_TimesheetListQueryVariables,
    Timesheet_TimesheetOneQueryVariables,
    Timesheet_TimesheetOneQuery,
    Timesheet_TimesheetManyReferenceQuery,
    Timesheet_TimesheetManyReferenceQueryVariables,
    Timesheet_TimesheetListV2QueryVariables,
    Timesheet_TimesheetListV2Query,
} from "../timesheet-types";

import { DataWithTotal } from "@manabie-com/react-utils";

export interface TimesheetListQueryReturn {
    data: Timesheet_TimesheetListQuery["timesheet"];
    total: number | null | undefined;
}

export type TimesheetListQueryV2Return = Timesheet_TimesheetListV2Query["timesheet"];

const getListQuery = gql`
    query Timesheet_TimesheetList($limit: Int = 10, $offset: Int = 0) {
        timesheet(limit: $limit, offset: $offset, order_by: { created_at: desc }) {
            staff_id
            timesheet_date
            timesheet_id
            location_id
            timesheet_status
        }
        timesheet_aggregate {
            aggregate {
                count
            }
        }
    }
`;

const getListQueryV2 = gql`
    query Timesheet_TimesheetListV2($staff_id: String = null, $limit: Int = 10, $offset: Int = 0) {
        timesheet(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: { staff_id: { _eq: $staff_id } }
        ) {
            staff_id
            timesheet_date
            timesheet_id
            location_id
            timesheet_status
        }
        timesheet_aggregate(where: { staff_id: { _eq: $staff_id } }) {
            aggregate {
                count
            }
        }
    }
`;

const timesheetFragment = gql`
    fragment Timesheet_TimesheetAttrs on timesheet {
        staff_id
        timesheet_date
        timesheet_id
        location_id
        timesheet_status
        remark
    }
`;

const getOneQuery = gql`
    query Timesheet_TimesheetOne($timesheet_id: String!) {
        timesheet(where: { timesheet_id: { _eq: $timesheet_id } }) {
            ...Timesheet_TimesheetAttrs
        }
    }
    ${timesheetFragment}
`;

const getManyReferenceQuery = gql`
    query Timesheet_TimesheetManyReference(
        $location_id: String!
        $staff_id: String!
        $from_date: timestamptz!
        $to_date: timestamptz!
    ) {
        timesheet(
            where: {
                _and: {
                    location_id: { _eq: $location_id }
                    staff_id: { _eq: $staff_id }
                    timesheet_date: { _gte: $from_date, _lte: $to_date }
                }
            }
            order_by: { created_at: desc }
        ) {
            timesheet_date
            timesheet_id
        }
    }
`;

class TimesheetQuery extends InheritedHasuraServiceClient {
    async getListWithFilter(
        variables: Timesheet_TimesheetListQueryVariables
    ): Promise<TimesheetListQueryReturn | undefined> {
        const query = {
            query: getListQuery,
            variables,
        };

        const res = await this._call<Timesheet_TimesheetListQuery>(query);
        return {
            data: res.data?.timesheet || [],
            total: res.data?.timesheet_aggregate?.aggregate?.count ?? 0,
        };
    }
    async getListWithFilterV2(
        variables: Timesheet_TimesheetListV2QueryVariables
    ): Promise<DataWithTotal<TimesheetListQueryV2Return>> {
        const query = {
            query: getListQueryV2,
            variables,
        };

        const res = await this._call<Timesheet_TimesheetListV2Query>(query);
        return {
            data: res.data?.timesheet || [],
            total: res.data?.timesheet_aggregate?.aggregate?.count ?? 0,
        };
    }
    async getOne(
        variables: Timesheet_TimesheetOneQueryVariables
    ): Promise<ArrayElement<Timesheet_TimesheetOneQuery["timesheet"]> | undefined> {
        const { timesheet_id } = variables;
        const query = {
            query: getOneQuery,
            variables: {
                timesheet_id,
            },
        };
        const res = await this._call<Timesheet_TimesheetOneQuery>(query);

        return res.data?.timesheet[0];
    }
    async getManyReference(
        variables: Timesheet_TimesheetManyReferenceQueryVariables
    ): Promise<Timesheet_TimesheetManyReferenceQuery["timesheet"] | undefined> {
        const query = {
            query: getManyReferenceQuery,
            variables,
        };
        const res = await this._call<Timesheet_TimesheetManyReferenceQuery>(query);

        return res.data?.timesheet;
    }
}

const timesheetQueries = new TimesheetQuery(appConfigs, "timesheetGraphQL", doQuery);

export default timesheetQueries;
