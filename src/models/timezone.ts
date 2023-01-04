import { DateTime } from "luxon";

export interface TimezoneOptions {
    label?: string;
    value: string;
    timezoneLabel?: string;
}

export function toTimeZoneOptions(tzOffset: string): TimezoneOptions {
    const formattedOffset = DateTime.local().setZone(tzOffset).toFormat("ZZ").split(":")[0];
    let isInvalid: boolean = formattedOffset === "Invalid DateTime";

    const timezoneLabel = `GMT ${isInvalid ? "+00" : formattedOffset}`;

    return {
        value: tzOffset,
        label: `${tzOffset} (${timezoneLabel})`,
        timezoneLabel: timezoneLabel,
    };
}
