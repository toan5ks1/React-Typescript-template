import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Timesheet_CountTimesheetConfigByIdsQuery,
    Timesheet_CountTimesheetConfigByIdsQueryVariables,
} from "src/squads/payment/service/timesheet/timesheet-types";

import timesheetConfigQueryBob from "src/squads/payment/service/timesheet/timesheet-config-timesheet-service/timesheet-config-timesheet.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

describe("timesheetConfigQueryBob", () => {
    it("countTimesheetConfigByIds", async () => {
        const mockResult = {
            count: 1,
        };

        const mockDoQueryReturnValue: HasuraAndDefaultResponse<Timesheet_CountTimesheetConfigByIdsQuery> =
            {
                data: {
                    timesheet_config_aggregate: {
                        aggregate: mockResult,
                    },
                },
            };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Timesheet_CountTimesheetConfigByIdsQueryVariables = {
            timesheetConfigIds: ["timesheet-config-1"],
        };

        const result = await timesheetConfigQueryBob.countTimesheetConfigByIds(variables);

        expect(result).toEqual(mockResult);
    });
});
