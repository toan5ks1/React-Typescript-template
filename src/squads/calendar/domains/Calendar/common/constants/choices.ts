import { ERPModules } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { convertToChoices } from "src/common/utils/choice";
import { omitProp } from "src/common/utils/other";

import { OpeningStatus, RepeatType } from "manabuf/eureka/v1/scheduler_pb";

import { ScheduleSearchType, DayConditionType } from "./enum";
import { ScheduleKeys } from "./schedule";

function to2Digit(i: number): string {
    return `${i < 10 ? `0${i}` : i}`;
}

export function createListHours(): OptionSelectType[] {
    const HOURS_LIMIT = 24;
    const hours: OptionSelectType[] = [];

    for (let i = 0; i < HOURS_LIMIT; i++) {
        hours.push({ id: i, value: to2Digit(i) });
    }
    return hours;
}

export function createListMinutes(): OptionSelectType[] {
    const MINUTES_LIMIT = 60;
    const minutes: OptionSelectType[] = [];

    for (let i = 0; i < MINUTES_LIMIT; i += 5) {
        minutes.push({ id: i, value: to2Digit(i) });
    }
    return minutes;
}

export const choiceOpeningStatus = convertToChoices(
    OpeningStatus,
    ScheduleKeys.OPENING_STATUS,
    ERPModules.SCHEDULE
);

export const choiceRepeatType = convertToChoices(
    omitProp(RepeatType, "REPEAT_TYPE_MONTHLY"), // currently we dont support monthly repeat
    ScheduleKeys.REPEAT_TYPE,
    ERPModules.SCHEDULE
);

export const choicesScheduleFilterTypeHQ = convertToChoices(
    ScheduleSearchType,
    ScheduleKeys.SCHEDULE_SEARCH_TYPE,
    ERPModules.SCHEDULE
);

export const choicesScheduleFilterType = convertToChoices(
    omitProp(ScheduleSearchType, "BRAND"),
    ScheduleKeys.SCHEDULE_SEARCH_TYPE,
    ERPModules.SCHEDULE
);

export const choiceHoursOpeningTime = createListHours();

export const choiceMinutesOpeningTime = createListMinutes();

export const choiceDayConditionType = convertToChoices(
    DayConditionType,
    ScheduleKeys.DAY_CONDITION_TYPE,
    ERPModules.SCHEDULE
);
