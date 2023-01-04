import uniq from "lodash/uniq";
import { getEnumString } from "src/common/constants/helper";
import { arrayHasItem } from "src/common/utils/other";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import { TimesheetConfigType } from "manabuf/timesheet/v1/enums_pb";

import { TimesheetConfigCSV } from "../types";

const TIMESHEET_CONFIG_FIELDS = [
    "timesheet_config_id",
    "config_type",
    "config_value",
    "is_archived",
];

export const validationError = new InvalidParamError({
    action: "ImportTimesheetConfigValidateCSVFile",
    serviceName: "bobGraphQL",
    errors: [{ field: "payload" }],
});

export async function validateTimesheetConfigImportData(data: TimesheetConfigCSV[]) {
    if (!data || !arrayHasItem(data)) {
        throw validationError;
    }

    // check header data correctly
    const headers = Object.keys(data[0]);
    if (
        headers.length !== TIMESHEET_CONFIG_FIELDS.length ||
        headers.some((header) => !TIMESHEET_CONFIG_FIELDS.includes(header))
    ) {
        throw validationError;
    }

    // check data correctly
    if (
        data.some(({ config_type, config_value, is_archived }) => {
            // check all required field
            if (config_type === "" || config_value === "" || is_archived === "") {
                return true;
            }

            // check is_archived value is 0 or 1
            if (![0, 1].includes(Number(is_archived))) {
                return true;
            }

            // check config_type value correcly
            const configType = getEnumString(TimesheetConfigType, Number(config_type));

            if (configType === "") return true;

            return false;
        })
    ) {
        throw validationError;
    }

    // check valid timesheet_config_ids
    const timesheetConfigIds = data
        .filter((record) => record.timesheet_config_id !== "")
        .map((timesheetConfig) => timesheetConfig.timesheet_config_id);
    const timesheetConfigIdsUniq = uniq(timesheetConfigIds);

    if (!arrayHasItem(timesheetConfigIdsUniq)) return;

    const countResponse = await inferStandaloneQuery({
        entity: "timesheetConfig",
        action: "timesheetCountTimesheetConfigByIds",
    })({ timesheetConfigIds: timesheetConfigIdsUniq });

    if (!countResponse || countResponse.count !== timesheetConfigIdsUniq.length) {
        throw validationError;
    }
}
