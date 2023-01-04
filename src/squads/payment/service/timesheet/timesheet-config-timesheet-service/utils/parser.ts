import { getEnumString } from "src/common/constants/helper";
import { genId } from "src/common/utils/id-generator";
import { Timesheet_ImportTimesheetConfigsMutationVariables } from "src/squads/payment/service/timesheet/timesheet-types";

import { TimesheetConfigType } from "manabuf/timesheet/v1/enums_pb";

import { TimesheetConfigCSV } from "../types";

export function convertToImportTimesheetConfigData(
    data: TimesheetConfigCSV[]
): Timesheet_ImportTimesheetConfigsMutationVariables["data"] {
    return data.map(({ timesheet_config_id, config_type, config_value, is_archived }) => ({
        timesheet_config_id: timesheet_config_id || genId(),
        config_type: getEnumString(TimesheetConfigType, Number(config_type)),
        config_value,
        is_archived: Boolean(Number(is_archived)),
    }));
}
