import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Timesheet_CountTimesheetConfigByIdsQuery,
    Timesheet_CountTimesheetConfigByIdsQueryVariables,
} from "src/squads/payment/service/timesheet/timesheet-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const countTimesheetConfigByIds = gql`
    query Timesheet_CountTimesheetConfigByIds($timesheetConfigIds: [String!]!) {
        timesheet_config_aggregate(where: { timesheet_config_id: { _in: $timesheetConfigIds } }) {
            aggregate {
                count
            }
        }
    }
`;

class TimesheetConfigQueryBob extends InheritedHasuraServiceClient {
    async countTimesheetConfigByIds(
        variables: Timesheet_CountTimesheetConfigByIdsQueryVariables
    ): Promise<
        Timesheet_CountTimesheetConfigByIdsQuery["timesheet_config_aggregate"]["aggregate"] | null
    > {
        const response = await this._call<Timesheet_CountTimesheetConfigByIdsQuery>({
            query: countTimesheetConfigByIds,
            variables,
        });

        return response.data?.timesheet_config_aggregate.aggregate;
    }
}

const timesheetConfigQueryBob = new TimesheetConfigQueryBob(
    appConfigs,
    "timesheetGraphQL",
    doQuery
);

export default timesheetConfigQueryBob;
