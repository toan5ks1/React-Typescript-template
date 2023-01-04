import { TimesheetKeys } from "src/squads/timesheet/common/constants/timesheet";
import {
    OtherWorkingHourListData,
    TimesheetInformation,
    TimesheetListDataV2,
    UpsertTimesheetFormProps,
} from "src/squads/timesheet/common/types";
import { NsTimesheetTimesheetService } from "src/squads/timesheet/service/timesheet/timesheet-service/types";
import {
    Timesheet_OtherWorkingHoursListByTimesheetIdsQuery,
    Timesheet_TimesheetListV2Query,
    Timesheet_OtherWorkingHoursByTimesheetIdQuery,
    Timesheet_TimesheetConfigListByKeyQuery,
} from "src/squads/timesheet/service/timesheet/timesheet-types";

import {
    CreateTimesheetResponse,
    UpdateTimesheetResponse,
} from "manabuf/timesheet/v1/timesheet_pb";

import { mockLessonHours } from "./lesson";
import { mockLocationListData } from "./locations";
import { mockStaffListData } from "./staff";

export const mockTimesheetListData: Timesheet_TimesheetListV2Query["timesheet"] = [
    ...Array(10).keys(),
].map((value) => ({
    timesheet_id: `timesheet_${value}`,
    timesheet_date: "2021/09/01",
    location_id: `location_${value}`,
    staff_id: `staff_${value}`,
    timesheet_status: "TIMESHEET_STATUS_DRAFT",
}));

export const mockStaffTimesheetListData: TimesheetListDataV2 = mockTimesheetListData.map(
    (timesheetItem) => ({
        ...timesheetItem,
        location_name: mockLocationListData.find(
            (locationItem) => locationItem.location_id === timesheetItem.location_id
        )?.name,
        total_hour: 1,
        number_of_lessons: 1,
        total_lesson_hours: 120,
    })
);

export const mockAdminTimesheetListData: TimesheetListDataV2 = mockTimesheetListData.map(
    (timesheetItem) => ({
        ...timesheetItem,
        location_name: mockLocationListData.find(
            (locationItem) => locationItem.location_id === timesheetItem.location_id
        )?.name,
        staff_email:
            mockStaffListData.find((staffItem) => staffItem.user_id === timesheetItem.staff_id)
                ?.email || "",
        staff_name:
            mockStaffListData.find((staffItem) => staffItem.user_id === timesheetItem.staff_id)
                ?.name || "",
        total_hour: 1,
        number_of_lessons: 1,
        total_lesson_hours: 120,
    })
);

export const mockOtherWorkingHourTotalHourListData: Timesheet_OtherWorkingHoursListByTimesheetIdsQuery["other_working_hours"] =
    [...Array(10).keys()].map((value) => ({
        timesheet_id: `timesheet_${value}`,
        total_hour: value,
        other_working_hours_id: `other_working_hours_${value}`,
    }));

export const mockOtherWorkingHours: Required<OtherWorkingHourListData> = [
    {
        other_working_hours_id: "other_working_hours_0",
        timesheet_id: "timesheet_0",
        timesheet_config_id: "timesheet_config_0",
        start_time: "2215-04-09T10:00:00+00:00",
        end_time: "2215-04-09T12:00:00+00:00",
        total_hour: 120,
        remarks: "remark_content",
        working_type: "config_value",
    },
];

export const mockTimesheetData: Required<TimesheetInformation> = {
    timesheet_id: "timesheet_0",
    timesheet_date: "2021/09/01",
    location_id: "location_0",
    staff_id: "staff_0",
    staff_name: "Staff 0",
    staff_email: "staff-0@manabie.com",
    location_name: "Location 0",
    remark: "Remark 0",
    other_working_hours: mockOtherWorkingHours,
    timesheet_status: "TIMESHEET_STATUS_DRAFT",
    lesson_hours: mockLessonHours,
};

export const createTimesheetReq: Required<NsTimesheetTimesheetService.CreateTimesheetReq> = {
    timesheetDate: new Date(),
    locationId: "location_0",
    staffId: "staff_0",
    remark: "",
    listOtherWorkingHoursList: [],
};

export const updateTimesheetReq: Required<NsTimesheetTimesheetService.UpdateTimesheetReq> = {
    timesheetId: "timesheet_0",
    remark: "",
    listOtherWorkingHoursList: [],
};

export const createMockCreateTimesheetResponse = (): CreateTimesheetResponse => {
    const timesheetResp = new CreateTimesheetResponse();
    timesheetResp.setTimesheetId("timesheet_0");

    return timesheetResp;
};

export const createMockUpdateTimesheetResponse = (): UpdateTimesheetResponse => {
    const timesheetResp = new UpdateTimesheetResponse();
    timesheetResp.setSuccess(true);

    return timesheetResp;
};

export const createMockOtherWorkingHourListData = (
    timesheetId: string
): Timesheet_OtherWorkingHoursByTimesheetIdQuery["other_working_hours"] => {
    return [...Array(10).keys()].map((value) => ({
        other_working_hours_id: `other_working_hours_${value}`,
        timesheet_id: timesheetId,
        timesheet_config_id: `timesheet_config_${value}`,
        start_time: "2215-04-09T10:00:00+00:00",
        end_time: "2215-04-09T12:00:00+00:00",
        total_hour: 120,
        remarks: "remark_content",
    }));
};

export const createMockTimesheetConfigListData = (
    timesheetConfigType: string
): Timesheet_TimesheetConfigListByKeyQuery["timesheet_config"] => {
    return [...Array(10).keys()].map((value) => ({
        timesheet_config_id: `timesheet_config_${value}`,
        config_type: timesheetConfigType,
        config_value: `config_value_${value}`,
    }));
};

export const mockCreateTimesheetResponse: NsTimesheetTimesheetService.CreateTimesheetResp = {
    timesheetId: "timesheet_0",
};

export const mockUpdateTimesheetResponse: NsTimesheetTimesheetService.UpdateTimesheetResp = {
    success: true,
};

export const mockTimesheetUpsertInfoForm: UpsertTimesheetFormProps = {
    staff: {
        id: "staff_0",
        value: "staff_0",
        name: "Staff 0",
        email: "staff-0@manabie.com",
    },
    timesheetDate: "2022/07/22",
    location: {
        id: "location_0",
        value: "Location 0",
    },
    remark: "remark_0",
    [TimesheetKeys.OTHER_WORKING_HOURS]: [
        {
            other_working_hours_id: "other_working_hours_0",
            timesheet_id: "timesheet_0",
            timesheet_config_id: "timesheet_config_0",
            start_time: "2022-04-09T10:00:00+00:00",
            end_time: "2022-04-09T12:00:00+00:00",
            total_hour: 120,
            remarks: "remark_content",
            working_type: "config_value_0",
            workingTypeAutocomplete: {
                timesheet_config_id: "timesheet_config_0",
                config_value: "config_value_0",
                config_type: "OTHER_WORKING_HOUR",
            },
            startTimeAutocomplete: {
                label: "10:00",
                value: new Date("2022-04-09T10:00:00+00:00"),
            },
            endTimeAutocomplete: {
                label: "12:00",
                value: new Date("2022-04-09T12:00:00+00:00"),
            },
        },
    ],
};

export const defaultTimesheetUpsertInfoForm: UpsertTimesheetFormProps = {
    timesheetDate: null,
    [TimesheetKeys.OTHER_WORKING_HOURS]: [],
};

export const mockRemarkContent = "example remark...";
