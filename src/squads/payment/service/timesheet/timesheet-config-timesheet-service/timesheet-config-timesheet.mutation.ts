import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    InheritedHasuraServiceClient,
    InvalidParamError,
} from "src/squads/payment/service/service-types";
import { Timesheet_ImportTimesheetConfigsMutation } from "src/squads/payment/service/timesheet/timesheet-types";
import { parseCSVFile } from "src/squads/payment/utils/file";

import { TimesheetConfigCSV } from "./types";
import { convertToImportTimesheetConfigData } from "./utils/parser";
import { validateTimesheetConfigImportData } from "./utils/validation";

const importTimesheetConfigs = gql`
    mutation Timesheet_ImportTimesheetConfigs($data: [timesheet_config_insert_input!]!) {
        insert_timesheet_config(
            objects: $data
            on_conflict: {
                constraint: timesheet_config__pk
                update_columns: [config_type, config_value, is_archived, updated_at]
            }
        ) {
            affected_rows
        }
    }
`;

class TimemsheetConfigBobMutation extends InheritedHasuraServiceClient {
    async importTimesheetConfigs(
        file: File
    ): Promise<Timesheet_ImportTimesheetConfigsMutation["insert_timesheet_config"]> {
        let csvRawData;
        try {
            csvRawData = await parseCSVFile<TimesheetConfigCSV>(file);
        } catch (error) {
            throw new InvalidParamError({
                action: "ImportBankParseCSVFile",
                serviceName: "bobGraphQL",
                errors: [{ field: "payload" }],
            });
        }

        await validateTimesheetConfigImportData(csvRawData);
        const data = await convertToImportTimesheetConfigData(csvRawData);

        const query = {
            query: importTimesheetConfigs,
            variables: {
                data,
            },
        };

        const res = await this._call<Timesheet_ImportTimesheetConfigsMutation>(query);

        return res.data?.insert_timesheet_config;
    }
}

const timesheetConfigMutationsBob = new TimemsheetConfigBobMutation(
    appConfigs,
    "timesheetGraphQL",
    doQuery
);

export default timesheetConfigMutationsBob;
