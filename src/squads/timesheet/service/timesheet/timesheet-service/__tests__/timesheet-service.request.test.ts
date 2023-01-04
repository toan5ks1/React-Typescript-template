import { toTimestampEndDate } from "src/common/utils/timezone";
import {
    createTimesheetReq as mockCreateTimesheetReq,
    updateTimesheetReq as mockUpdateTimesheetReq,
} from "src/squads/timesheet/test-utils/mocks/timesheet";

import { createTimesheetReq, updateTimesheetReq } from "../timesheet-service.request";

describe("Create timesheet request", () => {
    it("should return correctly request", () => {
        const timesheetReq = createTimesheetReq(mockCreateTimesheetReq);
        expect(timesheetReq.toObject().timesheetDate).toEqual(
            toTimestampEndDate(mockCreateTimesheetReq.timesheetDate).toObject()
        );
        expect(timesheetReq.toObject().locationId).toEqual(mockCreateTimesheetReq.locationId);
        expect(timesheetReq.toObject().staffId).toEqual(mockCreateTimesheetReq.staffId);
    });
});

describe("Update timesheet request", () => {
    it("should return correctly request", () => {
        const timesheetReq = updateTimesheetReq(mockUpdateTimesheetReq);

        expect(timesheetReq.toObject().timesheetId).toEqual(mockUpdateTimesheetReq.timesheetId);
    });
});
