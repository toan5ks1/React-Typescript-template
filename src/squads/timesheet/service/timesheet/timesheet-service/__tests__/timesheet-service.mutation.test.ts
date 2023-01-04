import {
    createMockCreateTimesheetResponse,
    createMockUpdateTimesheetResponse,
    createTimesheetReq as mockCreateTimesheetReq,
    updateTimesheetReq as mockUpdateTimesheetReq,
} from "src/squads/timesheet/test-utils/mocks/timesheet";

import { TimesheetServicePromiseClient } from "manabuf/timesheet/v1/timesheet_grpc_web_pb";

import timesheetServiceTimesheet from "../timesheet-service.mutation";
import { createTimesheetReq, updateTimesheetReq } from "../timesheet-service.request";

jest.mock("manabuf/timesheet/v1/timesheet_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/timesheet/v1/timesheet_grpc_web_pb");

    actual.TimesheetServicePromiseClient.prototype.createTimesheet = jest.fn();
    actual.TimesheetServicePromiseClient.prototype.updateTimesheet = jest.fn();

    return actual;
});
describe("Timesheet Service", () => {
    it("should call create timesheet method correctly", async () => {
        const mockCreateTimesheetResponse = createMockCreateTimesheetResponse();

        (TimesheetServicePromiseClient.prototype.createTimesheet as jest.Mock).mockImplementation(
            () => {
                return mockCreateTimesheetResponse;
            }
        );

        const resp = await timesheetServiceTimesheet.createTimesheet(mockCreateTimesheetReq);
        expect(resp?.timesheetId).toEqual(mockCreateTimesheetResponse.toObject().timesheetId);

        expect(TimesheetServicePromiseClient.prototype.createTimesheet).toBeCalledWith(
            createTimesheetReq(mockCreateTimesheetReq)
        );
    });

    it("should call update timesheet method correctly", async () => {
        const mockUpdateTimesheetResponse = createMockUpdateTimesheetResponse();

        (TimesheetServicePromiseClient.prototype.updateTimesheet as jest.Mock).mockImplementation(
            () => {
                return mockUpdateTimesheetResponse;
            }
        );

        const resp = await timesheetServiceTimesheet.updateTimesheet(mockUpdateTimesheetReq);
        expect(resp?.success).toEqual(mockUpdateTimesheetResponse.toObject().success);

        expect(TimesheetServicePromiseClient.prototype.updateTimesheet).toBeCalledWith(
            updateTimesheetReq(mockUpdateTimesheetReq)
        );
    });
});
