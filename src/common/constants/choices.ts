import { convertToChoices } from "src/common/utils/choice";

import { Country, Subject } from "manabie-bob/enum_pb";
import { DateOfWeek } from "manabuf/common/v1/enums_pb";
import { OpeningStatus } from "manabuf/eureka/v1/scheduler_pb";

import { DayConditionType, ERPModules, ScheduleSearchType } from "./enum";
import { ScheduleKeys } from "./schedule";

//TODO: next remove
function isIncluded<T extends string>(excluded: T[], currentVal: T) {
    return excluded.every((excl) => currentVal.indexOf(excl) === -1);
}

function convertToChoice<T>(
    object: T = {} as T,
    key: string,
    excluded: string[] = ["_NONE"]
): { id: string; name: string }[] {
    return Object.keys(object)
        .filter((e) => isIncluded(excluded, e))
        .map((e) => {
            return {
                id: e,
                name: `resources.choices.${key}.${e}`,
            };
        });
}
export const choiceSubjects = convertToChoice(Subject, "subjects");
export const choiceCountries = convertToChoice(Country, "countries");
export const choiceDayOfWeek = convertToChoice(DateOfWeek, "dayOfWeek");

export const choicesScheduleFilterTypeHQ = convertToChoices(
    ScheduleSearchType,
    ScheduleKeys.SCHEDULE_SEARCH_TYPE,
    ERPModules.SCHEDULE
);

export const choiceDayConditionType = convertToChoices(
    DayConditionType,
    ScheduleKeys.DAY_CONDITION_TYPE,
    ERPModules.SCHEDULE
);

export const choiceOpeningStatus = convertToChoices(
    OpeningStatus,
    ScheduleKeys.OPENING_STATUS,
    ERPModules.SCHEDULE
);
