import { TimesheetConfigType, TimesheetStatus } from "manabuf/timesheet/v1/enums_pb";

import { convertEnumKeys } from "./helper";

export enum TimesheetKeys {
    OTHER_WORKING_HOURS = "otherWorkingHours",
}

export const TIMESHEET_STATUS_KEYS = convertEnumKeys(TimesheetStatus);

export type TimesheetStatusType = keyof typeof TIMESHEET_STATUS_KEYS;

export type TimesheetStatusTypeExtend = TimesheetStatusType | "ALL";

export const TIMESHEET_ALL_STATUS: TimesheetStatusTypeExtend = "ALL";

export const TIMESHEET_CONFIG_TYPES = convertEnumKeys(TimesheetConfigType);

export const WORKING_TYPES_CONFIG_KEY = TIMESHEET_CONFIG_TYPES.OTHER_WORKING_HOURS;

export const TIMESHEET_LIMIT_SELECTABLE_MONTHS_IN_THE_FUTURE = 2;

// We only list timesheet from this date. Plz refer product specs for more details
export const TIMESHEET_START_DATE = new Date("2022/01/01");
