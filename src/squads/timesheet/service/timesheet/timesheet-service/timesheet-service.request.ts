import { toTimestampEndDate } from "src/common/utils/timezone";

import { CreateTimesheetRequest, UpdateTimesheetRequest } from "manabuf/timesheet/v1/timesheet_pb";

import { NsTimesheetTimesheetService } from "./types";
import { convertOtherWorkingHoursList } from "./utils";

export const createTimesheetReq = ({
    timesheetDate,
    locationId,
    staffId,
    remark,
    listOtherWorkingHoursList,
}: Required<NsTimesheetTimesheetService.CreateTimesheetReq>) => {
    const timesheetReq = new CreateTimesheetRequest();

    timesheetReq.setTimesheetDate(toTimestampEndDate(timesheetDate));
    timesheetReq.setLocationId(locationId);
    timesheetReq.setStaffId(staffId);
    timesheetReq.setRemark(remark);
    timesheetReq.setListOtherWorkingHoursList(
        convertOtherWorkingHoursList(listOtherWorkingHoursList)
    );
    return timesheetReq;
};

export const updateTimesheetReq = ({
    timesheetId,
    remark,
    listOtherWorkingHoursList,
}: Required<NsTimesheetTimesheetService.UpdateTimesheetReq>) => {
    const timesheetReq = new UpdateTimesheetRequest();

    timesheetReq.setTimesheetId(timesheetId);
    timesheetReq.setRemark(remark);
    timesheetReq.setListOtherWorkingHoursList(
        convertOtherWorkingHoursList(listOtherWorkingHoursList)
    );
    return timesheetReq;
};
