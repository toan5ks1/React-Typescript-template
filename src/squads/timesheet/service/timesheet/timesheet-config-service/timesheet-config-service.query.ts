import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/timesheet/internals/hasura-client/execute-query";
import { InheritedHasuraServiceClient } from "src/squads/timesheet/service/service-types";

import {
    Timesheet_TimesheetConfigListByKeyQuery,
    Timesheet_TimesheetConfigListByKeyQueryVariables,
} from "../timesheet-types";

const getListQuery = gql`
    query Timesheet_TimesheetConfigListByKey($config_type: String) {
        timesheet_config(where: { config_type: { _eq: $config_type } }) {
            timesheet_config_id
            config_type
            config_value
        }
    }
`;

class TimesheetConfigQuery extends InheritedHasuraServiceClient {
    async getList(
        variables: Timesheet_TimesheetConfigListByKeyQueryVariables
    ): Promise<Timesheet_TimesheetConfigListByKeyQuery["timesheet_config"] | undefined> {
        const response = await this._call<Timesheet_TimesheetConfigListByKeyQuery>({
            query: getListQuery,
            variables,
        });
        return response.data?.timesheet_config;
    }
}

const timesheetConfigQueries = new TimesheetConfigQuery(appConfigs, "timesheetGraphQL", doQuery);

export default timesheetConfigQueries;
