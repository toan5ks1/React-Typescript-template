import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/timesheet/internals/hasura-client/execute-query";
import { InheritedHasuraServiceClient } from "src/squads/timesheet/service/service-types";

import {
    Timesheet_OtherWorkingHoursByTimesheetIdQuery,
    Timesheet_OtherWorkingHoursByTimesheetIdQueryVariables,
    Timesheet_OtherWorkingHoursListByTimesheetIdsQuery,
    Timesheet_OtherWorkingHoursListByTimesheetIdsQueryVariables,
} from "../timesheet-types";

const getManyByTimesheetIdQuery = gql`
    query Timesheet_OtherWorkingHoursByTimesheetId($timesheet_id: String!) {
        other_working_hours(where: { timesheet_id: { _eq: $timesheet_id } }) {
            other_working_hours_id
            timesheet_id
            timesheet_config_id
            start_time
            end_time
            total_hour
            remarks
        }
    }
`;

const getOtherWorkingHoursListByTimesheetIdsQuery = gql`
    query Timesheet_OtherWorkingHoursListByTimesheetIds($timesheet_ids: [String!] = []) {
        other_working_hours(where: { timesheet_id: { _in: $timesheet_ids } }) {
            other_working_hours_id
            timesheet_id
            total_hour
        }
    }
`;

class OtherWorkingHoursQuery extends InheritedHasuraServiceClient {
    async getManyReference(
        variables: Timesheet_OtherWorkingHoursByTimesheetIdQueryVariables
    ): Promise<Timesheet_OtherWorkingHoursByTimesheetIdQuery["other_working_hours"] | undefined> {
        const response = await this._call<Timesheet_OtherWorkingHoursByTimesheetIdQuery>({
            query: getManyByTimesheetIdQuery,
            variables,
        });
        return response.data?.other_working_hours;
    }

    async getTotalHourManyReference(
        variables: Timesheet_OtherWorkingHoursListByTimesheetIdsQueryVariables
    ): Promise<
        Timesheet_OtherWorkingHoursListByTimesheetIdsQuery["other_working_hours"] | undefined
    > {
        const response = await this._call<Timesheet_OtherWorkingHoursListByTimesheetIdsQuery>({
            query: getOtherWorkingHoursListByTimesheetIdsQuery,
            variables,
        });
        return response.data?.other_working_hours;
    }
}

const otherWorkingHoursQueries = new OtherWorkingHoursQuery(
    appConfigs,
    "timesheetGraphQL",
    doQuery
);

export default otherWorkingHoursQueries;
