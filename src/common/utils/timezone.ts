import { DateTime, DateTimeUnit } from "luxon";

import { Timestamp } from "manabie-bob/google/protobuf/timestamp_pb";
import { Timestamp as NewTimestamp } from "manabuf/google/protobuf/timestamp_pb";

import reactiveStorage from "../../internals/reactive-storage";
import { TimezoneOptions, toTimeZoneOptions } from "../../models/timezone";
import { FormatDateOptions } from "../constants/enum";

export const FORMAT_LOCAL_DATE = "yyyy/LL/dd, HH:mm";

// don't using 24-hours with AM/PM
export const FORMAT_LONG_DATE_WITHOUT_TIMEZONE = "yyyy/LL/dd, HH:mm";
export const FORMAT_LONG_DATE_WITH_TIMEZONE = `${FORMAT_LONG_DATE_WITHOUT_TIMEZONE} (Z)`;

export function toUTCWithTimeZone(tzOffset: string, value?: string): string {
    if (!value) return "";
    return DateTime.fromJSDate(new Date(value), { zone: tzOffset }).toISO({
        suppressMilliseconds: true,
    });
}

export const getLocalTimezone = (): TimezoneOptions => {
    const tzOffset = DateTime.local().zoneName;
    return toTimeZoneOptions(tzOffset);
};

export const formatViewDate = (
    date: Date,
    timezone: TimezoneOptions = { value: "UTC" },
    hasTimezone: boolean = true
) => {
    let formatDate: DateTime = date
        ? convertTime2AnotherTimezone(date, timezone.value)
        : DateTime.fromJSDate(date);

    return formatDate.toFormat(
        hasTimezone ? FORMAT_LONG_DATE_WITH_TIMEZONE : FORMAT_LONG_DATE_WITHOUT_TIMEZONE
    );
};

//change the zone to local zone then parse to UTC
const convertToServerTimezone = (date: Date): Date => {
    return DateTime.fromJSDate(date).toUTC().toJSDate();
};

const convertOriginDateToSecond = ({
    originDate,
    origin = true,
    start = true,
    type = "day",
}: Utils.ToTimestampParamsV2) => {
    let convertedOriginDate = originDate instanceof Date ? originDate : new Date(originDate);

    let luxonDate = DateTime.fromJSDate(convertedOriginDate);

    if (!origin && type) {
        luxonDate = start ? luxonDate.startOf(type) : luxonDate.endOf(type);
    }

    const newDate = luxonDate.toJSDate();

    const timezone = reactiveStorage.get("TIMEZONE");

    const date = keepTimeMove2AnotherTimezone(newDate, timezone?.value);

    let convertDate = convertToServerTimezone(date);

    return Math.floor(convertDate.valueOf() / 1000);
};

export declare namespace Utils {
    export interface ToTimestampParamsV2 {
        originDate: Date | string | number;
        origin: boolean;
        start: boolean;
        type: DateTimeUnit | null;
    }
}

/**
 * @description convert date to Timestamp
 * @param originDate {string}
 * @param origin {boolean}
 * @param start {boolean}
 * @param type {string}
 * */
export const toTimestamp = ({ originDate, origin, start, type }: Utils.ToTimestampParamsV2) => {
    const second = convertOriginDateToSecond({ originDate, origin, start, type });

    const result = new Timestamp();
    result.setSeconds(second);

    return result;
};

/**
 * @description convert date to NewTimestamp
 * @param originDate {string}
 * @param origin {boolean}
 * @param start {boolean}
 * @param type {string}
 * */
export const toTimestampNewProto = ({
    originDate,
    origin,
    start,
    type,
}: Utils.ToTimestampParamsV2) => {
    const second = convertOriginDateToSecond({ originDate, origin, start, type });

    const result = new NewTimestamp();

    result.setSeconds(second);

    return result;
};

export interface ConvertToTimestampSliceParams {
    date: Date | string | number;
    timeSlice: "start" | "end" | "no-slice";
    typeSlice?: DateTimeUnit;
}

export const toTimestampOriginDate = (date: Date | string) => {
    return toTimestampSlice({ date, timeSlice: "no-slice" });
};

export const toTimestampStartDate = (date: Date | string) => {
    return toTimestampSlice({ date, timeSlice: "start" });
};

export const toTimestampEndDate = (date: Date | string) => {
    return toTimestampSlice({ date, timeSlice: "end" });
};

const toTimestampSlice = ({
    date,
    timeSlice,
    typeSlice = "day",
}: ConvertToTimestampSliceParams) => {
    const clonedDate = date instanceof Date ? date : new Date(date);
    const luxonDate = DateTime.fromJSDate(clonedDate);
    let slideDate: DateTime = luxonDate;

    if (timeSlice === "start") {
        slideDate = luxonDate.startOf(typeSlice);
    }

    if (timeSlice === "end") {
        slideDate = luxonDate.endOf(typeSlice);
    }

    const newDate = slideDate.toJSDate();

    const dateInTimezone = keepTimeMove2AnotherTimezone(
        newDate,
        reactiveStorage.get("TIMEZONE")?.value
    );
    let convertDate = convertToServerTimezone(dateInTimezone);
    const second = Math.floor(convertDate.valueOf() / 1000);

    return newTimestampProto(second);
};

const newTimestampProto = (second: number) => {
    const timestamp = new NewTimestamp();
    timestamp.setSeconds(second);

    return timestamp;
};

/**
 * @description convert timezone A to timezone B
 * @param date {string}
 * @param timezone {string}
 * */
export const convertTime2AnotherTimezone = (
    date: Date | string | number,
    timezone: string | null = null
): DateTime => {
    const timeZoneOptions = toDefaultTimezone(timezone);
    const selectedDate = date instanceof Date ? date : new Date(date);
    return DateTime.fromJSDate(selectedDate, { zone: timeZoneOptions });
};

/**
 * @description convert datetime to another timezone, keep datetime. if timezone is null, it will convert to UTC time
 * @param date {string}
 * @param timezone {string}
 * */
export const keepTimeMove2AnotherTimezone = (date: Date, timezone: string = "UTC"): Date => {
    return DateTime.fromJSDate(date, { zone: toDefaultTimezone(timezone) }).toJSDate();
};

export function toDefaultTimezone(timezone: string | null) {
    return timezone || "UTC";
}

export const convertDateStringToTimestamp = (date: string, format: FormatDateOptions) => {
    const dateIns = DateTime.fromFormat(date, format).toJSDate();
    return date.includes("23:59") ? toTimestampEndDate(dateIns) : toTimestampOriginDate(dateIns);
};

export function getTimeZoneName() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
