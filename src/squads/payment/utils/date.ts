import { DateTime, DateTimeUnit } from "luxon";
import { DateCommon, FormatDateOptions } from "src/squads/payment/types/common/date";

export const formatDate = (date: DateCommon["date"], formatOptions: FormatDateOptions) => {
    const dt = new Date(date);
    return DateTime.fromJSDate(dt).toFormat(formatOptions);
};

export const getFormattedDate = (date: string | null): string => {
    return formatDate(date ? date : new Date(), "yyyy/LL/dd");
};

/**
 * @param date Date
 * @param durations number (can be positive or negative)
 * @returns Date (plus durations, from date).
 */
export const getDateWithDuration = (date: string, durations: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + durations);
    return newDate;
};

export const dateIsAfter = (first: Date, second: Date, granularity?: DateTimeUnit): boolean => {
    if (!first || !second) return false;
    const unit = granularity || "day";

    return DateTime.fromJSDate(first).startOf(unit) > DateTime.fromJSDate(second).startOf(unit);
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

export const getDateWithZeroMilliseconds = (date?: Date): Date => {
    const formattedDate = date ? date : new Date();
    formattedDate.setMilliseconds(0);

    return formattedDate;
};

export const mockCurrentDateForUnitTests = (mockDate: Date) => {
    const oldGlobalDate = global.Date;
    beforeEach(() => {
        // @ts-ignore
        global.Date = jest.fn((...args) => {
            // Checks if new Date() has parameter. If it has it uses the passed parameter
            if (args.length) {
                return new oldGlobalDate(args[0]);
            }
            return mockDate;
        });
        global.Date.UTC = oldGlobalDate.UTC;
    });
};
