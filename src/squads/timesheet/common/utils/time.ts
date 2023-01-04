import { DateTime, DateTimeUnit, Duration } from "luxon";
import { FormatDateOptions } from "src/common/constants/enum";
import { DateCommon } from "src/common/constants/types";
import { TimeAutocompleteOption } from "src/squads/timesheet/common/types/common";

export const formatDate = (date: DateCommon["date"], formatOptions: FormatDateOptions) => {
    const dt = new Date(date);
    return DateTime.fromJSDate(dt).toFormat(formatOptions);
};

export const formatTimeRange = (
    start: DateCommon["date"],
    end: DateCommon["date"],
    formatOptions: FormatDateOptions
) => {
    return `${formatDate(start, formatOptions)} - ${formatDate(end, formatOptions)}`;
};

export const getDurationInMinute = (start: DateCommon["date"], end: DateCommon["date"]) => {
    const startDate = DateTime.fromJSDate(new Date(start));
    const endDate = DateTime.fromJSDate(new Date(end));
    return endDate.diff(startDate).shiftTo("minutes").minutes;
};

export const formatTimeLength = (totalMins: number) => {
    if (totalMins <= 0) return "--";
    const duration = Duration.fromObject({
        minutes: totalMins,
    }).shiftTo("hour", "minute");
    const format = `${duration.hours > 0 ? "h 'hr'" : ""} ${
        duration.minutes > 0 ? "m 'min'" : ""
    }`.trim();
    return duration.toFormat(format);
};

export const formatLongDate = (date: DateCommon["date"]) => {
    return formatDate(date, "yyyy/LL/dd");
};

// required end date have 23:59:59s
export const setEndOfDate = (date?: string | Date) => {
    let dateUntil = date instanceof Date ? date : new Date();

    if (typeof date == "string") {
        dateUntil = new Date(date);
        if (!isValidDate(dateUntil)) throw new Error("resources.message.unknown");
    }

    dateUntil.setHours(23);
    dateUntil.setMinutes(59);
    dateUntil.setSeconds(59);
    return dateUntil;
};

export const getFirstDayOfMonth = (year: number, month: number) => {
    const dt = new Date(year, month, 1);
    return DateTime.fromJSDate(dt).toISO();
};

export const getLastDayOfMonth = (year: number, month: number) => {
    const dt = setEndOfDate(new Date(year, month + 1, 0));
    return DateTime.fromJSDate(dt).toISO();
};

export const dateIsSame = (first: Date, second: Date, granularity?: DateTimeUnit): boolean => {
    if (!first || !second) return false;
    const unit = granularity || "day";

    return DateTime.fromJSDate(first).hasSame(DateTime.fromJSDate(second), unit);
};

export const convertToDate = (date: DateTime | null): Date => {
    if (date) {
        return date.toJSDate();
    }

    return DateTime.now().toJSDate();
};

export const handleDisableExistedDate = (dateInPicker: any, dateList: Array<Date>): boolean => {
    if (!dateInPicker || !dateList.length) return false;

    for (let date of dateList) {
        if (dateIsSame(date, convertToDate(dateInPicker))) {
            return true;
        }
    }
    return false;
};

function isValidDate(d: Date) {
    return d instanceof Date && !Number.isNaN(new Date(d).getTime());
}

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
