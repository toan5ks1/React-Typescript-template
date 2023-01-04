import { timesheetConfigQueryService } from "src/squads/payment/service/timesheet/timesheet-config-timesheet-service/timesheet-config-query-service";
import {
    Timesheet_CountTimesheetConfigByIdsQuery,
    Timesheet_CountTimesheetConfigByIdsQueryVariables,
} from "src/squads/payment/service/timesheet/timesheet-types";

import timesheetConfigQueryTimesheet from "src/squads/payment/service/timesheet/timesheet-config-timesheet-service/timesheet-config-timesheet.query";

jest.mock(
    "src/squads/payment/service/timesheet/timesheet-config-timesheet-service/timesheet-config-timesheet.query",
    () => {
        return {
            __esModule: true,
            default: {
                countTimesheetConfigByIds: jest.fn(),
            },
        };
    }
);

describe("bankQueryService", () => {
    it("userCountBankByIds", async () => {
        const queryVariable: Timesheet_CountTimesheetConfigByIdsQueryVariables = {
            timesheetConfigIds: ["timesheet-config-1"],
        };

        const mockReturnValue: Timesheet_CountTimesheetConfigByIdsQuery["timesheet_config_aggregate"] =
            {
                aggregate: {
                    count: 1,
                },
            };

        (timesheetConfigQueryTimesheet.countTimesheetConfigByIds as jest.Mock).mockResolvedValue(
            mockReturnValue
        );

        const response = await timesheetConfigQueryService.query.timesheetCountTimesheetConfigByIds(
            queryVariable
        );

        expect(timesheetConfigQueryTimesheet.countTimesheetConfigByIds).toBeCalledWith(
            queryVariable
        );
        expect(response).toEqual(mockReturnValue);
    });
});
