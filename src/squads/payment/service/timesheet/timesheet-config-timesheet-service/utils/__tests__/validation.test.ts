import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { TimesheetConfigCSV } from "../../types";
import { validateTimesheetConfigImportData, validationError } from "../validation";

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("validateTimesheetConfigImportData", () => {
    it("should throw error with empty data", async () => {
        await expect(async () => {
            await validateTimesheetConfigImportData([]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid header", async () => {
        await expect(async () => {
            await validateTimesheetConfigImportData([
                {
                    timesheet_config_id: "timesheet-config-1",
                    config_type: "0",
                    config_value: "config-1",
                    is_archived: "0",
                    invalid_header: "123",
                } as TimesheetConfigCSV,
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with data missing required fiels", async () => {
        await expect(async () => {
            await validateTimesheetConfigImportData([
                {
                    timesheet_config_id: "",
                    config_type: "",
                    config_value: "",
                    is_archived: "",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid is_archived value", async () => {
        await expect(async () => {
            await validateTimesheetConfigImportData([
                {
                    timesheet_config_id: "timesheet-config-1",
                    config_type: "0",
                    config_value: "config-1",
                    is_archived: "invalid",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid timesheet_config_id", async () => {
        (inferStandaloneQuery as jest.Mock).mockReturnValue(() => ({
            count: 0,
        }));

        await expect(async () => {
            await validateTimesheetConfigImportData([
                {
                    timesheet_config_id: "invalid-timesheet-config-id",
                    config_type: "0",
                    config_value: "config-1",
                    is_archived: "0",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });
});
