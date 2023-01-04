import { DateTime, DateTimeUnit } from "luxon";
import { FormatDateOptions } from "src/common/constants/enum";
import { DateCommon, FilterDateType, OptionSelectType } from "src/common/constants/types";
import { TimeAutocompleteOption } from "src/models/time-autocomplete";

import { Duration } from "manabuf/google/protobuf/duration_pb";
import { Timestamp } from "manabuf/google/protobuf/timestamp_pb";

import { LanguageEnums } from "src/typings/i18n-provider";

export const formatDate = (date: DateCommon["date"], formatOptions: FormatDateOptions) => {
    const dt = new Date(date);
    return DateTime.fromJSDate(dt).toFormat(formatOptions);
};

export function createValidDate(initialDate: Date | number | string) {
    return DateTime.fromJSDate(new Date(initialDate));
}

export const createListMonths = (locale?: string): OptionSelectType[] => {
    const months: OptionSelectType[] = [];
    const formatType: FormatDateOptions = "LL";

    for (let i = 0; i < 12; i++) {
        months.push({
            id: i,
            value: DateTime.now()
                .set({ month: i + 1 })
                .setLocale(locale || LanguageEnums.EN)
                .toFormat(formatType),
        });
    }

    return months;
};

export function createListYears(startCompanyYear: number): OptionSelectType[] {
    const years: OptionSelectType[] = [];
    for (let i = DateTime.now().year + 2; i >= startCompanyYear; i--) {
        years.push({ id: i, value: `${i}` });
    }
    return years;
}

export const getTime = (date: Date) => {
    return {
        hours: date.getHours(),
        minutes: date.getMinutes(),
    };
};

export const setDefaultTime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
};

export const dateIsAfter = (first: Date, second: Date, granularity?: DateTimeUnit): boolean => {
    if (!first || !second) return false;
    const unit = granularity || "day";

    return DateTime.fromJSDate(first).startOf(unit) > DateTime.fromJSDate(second).startOf(unit);
};

export const timeIsAfter = (first: Date, second: Date): boolean => {
    if (!first || !second) return false;
    return (
        DateTime.fromJSDate(first).startOf("minute") > DateTime.fromJSDate(second).startOf("minute")
    );
};

export const dateIsSameOrAfter = (
    first: Date,
    second: Date,
    granularity?: DateTimeUnit
): boolean => {
    if (!first || !second) return false;
    const unit = granularity || "day";
    return DateTime.fromJSDate(first).startOf(unit) >= DateTime.fromJSDate(second).startOf(unit);
};

export const dateIsSame = (first: Date, second: Date, granularity?: DateTimeUnit): boolean => {
    if (!first || !second) return false;
    const unit = granularity || "day";
    return DateTime.fromJSDate(first).hasSame(DateTime.fromJSDate(second), unit);
};

export const convertToISOString = (date: Date) => {
    return DateTime.fromJSDate(date).toISO();
};

export const convertToDate = (date: DateTime | null): Date => {
    if (date) {
        return date.toJSDate();
    }

    return DateTime.now().toJSDate();
};

export const combineDateAndTime = (date: Date, time: Date) => {
    const dateString = formatDate(date, "yyyy/LL/dd");
    const timeString = formatDate(time, "HH:mm");
    return new Date(`${dateString} ${timeString}`);
};

export const generateMockDateForTests = (isoDate: string | string[], RealDate: DateConstructor) => {
    beforeEach(() => {
        let callTime: number = 0;

        // @ts-expect-error
        global.Date = class FakeDate extends RealDate {
            constructor(...args: any[]) {
                if (typeof isoDate === "string") {
                    super(isoDate);
                    return;
                }

                if (callTime > isoDate.length - 1) {
                    //@ts-expect-error

                    return super(...args);
                }

                super(isoDate[callTime]);
                callTime++;
            }
        };
    });

    afterEach(() => {
        global.Date = RealDate;
    });
};

export const createTimeList = (): TimeAutocompleteOption[] => {
    const timeList: TimeAutocompleteOption[] = [];
    const date = new Date();

    // Start from 00:00 AM
    date.setHours(0, 0, 0, 0);

    // Iterate to generate time list for a day (1440 minutes)
    for (let i = 0; i < 1440; i++) {
        let minute = "00";
        let hour = "00";

        if (date.getHours()) {
            hour = String(date.getHours());
        }

        if (date.getHours() < 10) {
            hour = `0${String(date.getHours())}`;
        }

        if (date.getMinutes()) {
            minute = String(date.getMinutes());
        }

        if (date.getMinutes() < 10) {
            minute = `0${String(date.getMinutes())}`;
        }

        const today = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            Number(hour),
            Number(minute)
        );

        timeList.push({ label: `${hour}:${minute}`, value: today });
        date.setMinutes(date.getMinutes() + 1);
    }

    return timeList;
};

export const timeOptions = createTimeList();

export const handleDisablePrevDates = (
    dateInPicker: any,
    formDate: FilterDateType,
    minDate: Date
): boolean => {
    if (!dateInPicker || !formDate) return false;
    return dateIsSameOrAfter(minDate, convertToDate(dateInPicker));
};

export const getMinDateToDisablePrevDates = (fromDate: FilterDateType): Date => {
    const newDate = fromDate ? new Date(fromDate) : new Date();
    return convertToDate(DateTime.fromJSDate(newDate).minus({ days: 1 }));
};

export const convertTimestampToDate = (timestamp: Timestamp.AsObject) => {
    if (!timestamp || timestamp.seconds < 0 || timestamp.nanos < 0) return "";
    return new Date(timestamp.seconds * 1000 + timestamp.nanos / 1000000).toISOString();
};

function isValidDate(d: any) {
    return d instanceof Date && !Number.isNaN(new Date(d).getTime());
}

// required end date have 23:59:59s
export const setEndOfDate = (date?: string | Date) => {
    let dateUntil = date instanceof Date ? date : new Date();

    if (typeof date == "string") {
        dateUntil = new Date(date);
        if (!isValidDate(dateUntil)) throw new Error("ra.manabie-error.unknown");
    }

    dateUntil.setHours(23);
    dateUntil.setMinutes(59);
    dateUntil.setSeconds(59);
    return dateUntil;
};

export const isValidTimeString = (timeString: string) => {
    const parts = timeString.split(":");
    const hour = parseInt(parts[0], 10);
    const minute = parseInt(parts[1], 10);

    if (isNaN(hour) || isNaN(minute)) return false;

    if (hour < 0 || hour > 23) return false;

    if (minute < 0 || minute > 59) return false;

    return true;
};

export const isValidDateString = (dateString: string) => {
    const parts = dateString.split("/");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2].substr(0, 2), 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) return false;

    const hasTime = parts[2].length > 2;

    if (hasTime && !isValidTimeString(parts[2].substr(-5))) return false;

    if (year < 1000 || month < 1 || month > 12) return false;

    const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    const februaryLength = isLeapYear ? 29 : 28;
    const monthLength = [31, februaryLength, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return day > 0 && day <= monthLength[month - 1];
};

export const getTimeSecond = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return hours * 3600 + minutes * 60 + seconds;
};

export const convertDateStringToDuration = (dateString: string) => {
    const date = new Date(dateString);
    if (!isValidDate(date)) throw new Error("ra.manabie-error.unknown");
    date.setSeconds(0);
    const duration = new Duration();
    const seconds = getTimeSecond(date);
    duration.setSeconds(seconds);
    return duration;
};
