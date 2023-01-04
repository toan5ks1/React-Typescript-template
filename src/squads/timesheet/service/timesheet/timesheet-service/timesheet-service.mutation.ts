import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/timesheet/service/service-types";

import { TimesheetServicePromiseClient } from "manabuf/timesheet/v1/timesheet_grpc_web_pb";

import { createTimesheetReq, updateTimesheetReq } from "./timesheet-service.request";
import { NsTimesheetTimesheetService } from "./types";

class TimesheetServiceTimesheet extends InheritedGrpcServiceClient<TimesheetServicePromiseClient> {
    async createTimesheet(data: Required<NsTimesheetTimesheetService.CreateTimesheetReq>) {
        const req = createTimesheetReq(data);
        const resp = await this._call("createTimesheet", req);

        return resp.toObject();
    }

    async updateTimesheet(data: Required<NsTimesheetTimesheetService.UpdateTimesheetReq>) {
        const req = updateTimesheetReq(data);
        const resp = await this._call("updateTimesheet", req);

        return resp.toObject();
    }
}

const timesheetServiceTimesheet = new TimesheetServiceTimesheet(
    TimesheetServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default timesheetServiceTimesheet;
