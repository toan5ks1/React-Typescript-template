import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import { Timesheet_ImportTimesheetConfigsMutation } from "src/squads/payment/service/timesheet/timesheet-types";

import timesheetConfigMutationsTimesheet from "../timesheet-config-timesheet.mutation";
import { convertToImportTimesheetConfigData } from "../utils/parser";
import { validateTimesheetConfigImportData } from "../utils/validation";

jest.mock("src/squads/payment/utils/file", () => ({
    __esModule: true,
    parseCSVFile: jest.fn(),
}));

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

jest.mock(
    "src/squads/payment/service/timesheet/timesheet-config-timesheet-service/utils/validation",
    () => ({
        __esModule: true,
        validateTimesheetConfigImportData: jest.fn(),
    })
);

jest.mock(
    "src/squads/payment/service/timesheet/timesheet-config-timesheet-service/utils/parser",
    () => ({
        __esModule: true,
        convertToImportTimesheetConfigData: jest.fn(),
    })
);

const mockResult = { affected_rows: 1 };

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Timesheet_ImportTimesheetConfigsMutation> = {
    data: {
        insert_timesheet_config: mockResult,
    },
};

describe("timesheetConfigMutationsTimesheet", () => {
    it("importBanks", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);
        (validateTimesheetConfigImportData as jest.Mock).mockReturnValue(true);
        (convertToImportTimesheetConfigData as jest.Mock).mockReturnValue({});
        const filePayload: File = new File([], "newFile.csv");
        const result = await timesheetConfigMutationsTimesheet.importTimesheetConfigs(filePayload);
        expect(result).toEqual(mockResult);
    });
});
