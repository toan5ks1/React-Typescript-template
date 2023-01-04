import { DateTime } from "luxon";
import { choiceDayOfWeek } from "src/common/constants/choices";
import { FormatDateOptions } from "src/common/constants/enum";
import { ArrayElement, DateCommon } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import {
    DynamicAutocompleteOptionProps,
    DynamicFormFieldValue,
    TimeAutocompleteOption,
} from "src/squads/lesson/common/types";
import { Lesson_LessonByLessonIdForLessonManagementV3Query } from "src/squads/lesson/service/bob/bob-types";

import { UseTranslateReturn } from "src/squads/lesson/hooks/useTranslate";

export const isDynamicAutocompleteOptionProps = (
    value?: DynamicFormFieldValue
): value is DynamicAutocompleteOptionProps => {
    return value && value["key"] && value["label"] && Object.keys(value).length === 2;
};

export const convertToNumber = (value?: DynamicFormFieldValue): number => {
    if (Number.isNaN(Number(value))) {
        return 0;
    }

    return Number(value);
};

export const convertToBoolean = (value?: DynamicFormFieldValue): boolean => {
    return String(value).toLowerCase() === "true";
};

export const convertToString = (value?: DynamicFormFieldValue): string => {
    return typeof value === "string" ? value : "";
};

export function convertToArray<T>(array: T): T[] {
    return Array.isArray(array) && arrayHasItem(array) ? array : [];
}

export const getTeacherName = (
    teachersList: ArrayElement<
        Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]
    >["lessons_teachers"]
) => {
    if (!arrayHasItem(teachersList)) return emptyValue;

    const nonUndefinedNames = teachersList.reduce((result: string[], currentTeacher) => {
        const name = currentTeacher.teacher.users?.name;
        if (name) result.push(name);
        return result;
    }, []);
    const teacherNames = nonUndefinedNames.join(", ");
    return teacherNames;
};

export const getDayOfWeekName = (date: Date, translator: UseTranslateReturn) => {
    const toDay = new Date(date).getDay();
    return translator(choiceDayOfWeek[toDay].name);
};

export const getDurationBetweenTwoDates = (startTime: DateTime, endTime: DateTime) => {
    const startDate = DateTime.fromISO(`${startTime}`);
    const endDate = DateTime.fromISO(`${endTime}`);

    const duration = endDate.diff(startDate, ["hours", "minutes"]);

    return duration.hours * 60 + duration.minutes;
};

export const formatDate = (date: DateCommon["date"], formatOptions: FormatDateOptions) => {
    const dt = new Date(date);
    return DateTime.fromJSDate(dt).toFormat(formatOptions);
};

export const createTimeList = (
    baseDate?: TimeAutocompleteOption["value"]
): TimeAutocompleteOption[] => {
    const timeList: TimeAutocompleteOption[] = [];
    const date = baseDate ? new Date(baseDate) : new Date();

    // Start from 00:00 AM
    date.setHours(0, 0, 0, 0);

    // Iterate to generate time list for a day (1440 minutes)
    for (let i = 0; i < 1440; i++) {
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        const today = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            Number(hour),
            Number(minute)
        );

        timeList.push({ label: formatDate(today, "HH:mm"), value: today });
        date.setMinutes(date.getMinutes() + 1);
    }

    return timeList;
};

export const timeOptions = createTimeList();

export const emptyValue = "--";
