export const OpeningStatusKeys = {
    REGULAR: "OPENING_STATUS_REGULAR",
    NON_REGULAR: "OPENING_STATUS_NON_REGULAR",
    SPARE: "OPENING_STATUS_SPARE",
    CLOSED: "OPENING_STATUS_CLOSED",
};

export const OpeningStatusNames = {
    [OpeningStatusKeys.REGULAR]: "REGULAR",
    [OpeningStatusKeys.NON_REGULAR]: "IRREGULAR",
    [OpeningStatusKeys.SPARE]: "SPARE",
    [OpeningStatusKeys.CLOSED]: "CLOSED",
};

export const ScheduleKeys = {
    OPENING_STATUS: "openingStatus",
    REPEAT_TYPE: "repeatType",
    SCHEDULE_SEARCH_TYPE: "scheduleSearchType",
    DAY_CONDITION_TYPE: "dayConditionType",
};

export const RepeatTypeKeys = {
    REPEAT_TYPE_NONE: "REPEAT_TYPE_NONE",
    REPEAT_TYPE_WEEKLY: "REPEAT_TYPE_WEEKLY",
    REPEAT_TYPE_DAILY: "REPEAT_TYPE_DAILY",
};

// Back-end: default timezone is "Asia/Tokyo"
export const DEFAULT_TIMEZONE = "Asia/Tokyo";
