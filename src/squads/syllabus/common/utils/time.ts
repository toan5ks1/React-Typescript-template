import { DateTime, DurationLike } from "luxon";

export const getDateAfterByDuration = (currentDate: Date, duration: DurationLike): DateTime => {
    return DateTime.fromJSDate(currentDate).plus(duration);
};

export const getDateBeforeByDuration = (currentDate: Date, duration: DurationLike): DateTime => {
    return DateTime.fromJSDate(currentDate).minus(duration);
};
