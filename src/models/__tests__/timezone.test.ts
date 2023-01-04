import { toTimeZoneOptions, TimezoneOptions } from "../timezone";

describe("toTimeZoneOptions", () => {
    it("should return correct value with valid timezone", () => {
        const tzOffset = "America/New_York";
        const zoneOptions: TimezoneOptions = {
            value: tzOffset,
            label: `${tzOffset} (GMT -04)`,
            timezoneLabel: "GMT -04",
        };
        expect(toTimeZoneOptions(tzOffset)).toEqual(zoneOptions);
    });

    it("should return GMT +00 with invalid timezone", () => {
        const tzOffset = "Invalid Zone";
        const zoneOptions: TimezoneOptions = {
            value: tzOffset,
            label: `${tzOffset} (GMT +00)`,
            timezoneLabel: "GMT +00",
        };
        expect(toTimeZoneOptions(tzOffset)).toEqual(zoneOptions);
    });
});
