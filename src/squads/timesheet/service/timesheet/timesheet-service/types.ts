import {
    CreateTimesheetRequest,
    CreateTimesheetResponse,
    UpdateTimesheetRequest,
    UpdateTimesheetResponse,
} from "manabuf/timesheet/v1/timesheet_pb";

export declare namespace NsTimesheetTimesheetService {
    export interface CreateTimesheetReq extends CreateTimesheetRequest.AsObject {}

    export interface CreateTimesheetResp extends CreateTimesheetResponse.AsObject {}

    export interface UpdateTimesheetReq extends UpdateTimesheetRequest.AsObject {}

    export interface UpdateTimesheetResp extends UpdateTimesheetResponse.AsObject {}
}
