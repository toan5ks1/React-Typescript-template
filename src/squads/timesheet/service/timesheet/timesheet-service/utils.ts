import { toTimestampOriginDate } from "src/common/utils/timezone";

import { OtherWorkingHoursRequest } from "manabuf/timesheet/v1/timesheet_pb";

export const convertOtherWorkingHoursList = (
    otherWorkingHoursList: OtherWorkingHoursRequest.AsObject[]
): OtherWorkingHoursRequest[] => {
    return otherWorkingHoursList.map((owh) => {
        const req = new OtherWorkingHoursRequest();
        req.setOtherWorkingHoursId(owh.otherWorkingHoursId);
        req.setTimesheetConfigId(owh.timesheetConfigId);
        req.setStartTime(toTimestampOriginDate(owh.startTime));
        req.setEndTime(toTimestampOriginDate(owh.endTime));
        req.setRemarks(owh.remarks);
        req.setIsDelete(owh.isDelete);
        return req;
    });
};
