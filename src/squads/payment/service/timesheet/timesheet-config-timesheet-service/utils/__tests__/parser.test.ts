import { getEnumString } from "src/common/constants/helper";
import { Timesheet_ImportTimesheetConfigsMutationVariables } from "src/squads/payment/service/timesheet/timesheet-types";

import { TimesheetConfigType } from "manabuf/timesheet/v1/enums_pb";

import { TimesheetConfigCSV } from "../../types";
import { convertToImportTimesheetConfigData } from "../parser";

jest.mock("src/common/utils/id-generator", () => ({
    genId: () => "id",
}));

const mockCSVData: TimesheetConfigCSV[] = [
    {
        timesheet_config_id: "",
        config_type: "0",
        config_value: "config-1",
        is_archived: "0",
    },
    {
        timesheet_config_id: "timesheet-config-2",
        config_type: "0",
        config_value: "config-2",
        is_archived: "1",
    },
];

const mockReturnValue: Timesheet_ImportTimesheetConfigsMutationVariables["data"] = [
    {
        timesheet_config_id: "id",
        config_type: getEnumString(TimesheetConfigType, 0),
        config_value: "config-1",
        is_archived: false,
    },
    {
        timesheet_config_id: "timesheet-config-2",
        config_type: getEnumString(TimesheetConfigType, 0),
        config_value: "config-2",
        is_archived: true,
    },
];

describe("convertToImportTimesheetConfigData", () => {
    it("should return data correctly", () => {
        const result = convertToImportTimesheetConfigData(mockCSVData);

        expect(result).toEqual(mockReturnValue);
    });
});
