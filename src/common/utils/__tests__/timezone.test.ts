import { DateTime } from "luxon";

import { TimezoneOptions, toTimeZoneOptions } from "../../../models/timezone";
import {
    convertDateStringToTimestamp,
    toTimestamp,
    toTimestampEndDate,
    toTimestampNewProto,
    toTimestampOriginDate,
    toTimestampStartDate,
    toUTCWithTimeZone,
    Utils,
} from "../timezone";

jest.mock("src/packages/configuration");

describe("toTimeZoneOptions", () => {
    // firstParams with this format Asia/Saigon
    const tzOffset: string = "Asia/Saigon";
    const tzOffsetInValid = "Invalid";

    beforeEach(() => {
        // eslint-disable-next-line no-console
        console.error = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    const genValues = (tz: string): TimezoneOptions => {
        const time: string = tz === tzOffsetInValid ? "00" : "07";
        return {
            value: tz,
            label: `${tz} (GMT +${time})`,
            timezoneLabel: `GMT +${time}`,
        };
    };

    it("should return correct expected", () => {
        const expected: TimezoneOptions = genValues(tzOffset);
        const values: TimezoneOptions = toTimeZoneOptions(tzOffset);
        expect(values).toEqual(expected);
    });

    // TODO: check this test case later to make sure it runs
    // it("should return 00 when pass not a timezone", () => {
    //     try {
    //         toTimeZoneOptions(tzOffsetInValid);
    //     } catch {}

    //     // eslint-disable-next-line no-console
    //     expect((console.error as jest.Mock).mock.calls.length).toEqual(1);
    // });
});

describe("toTimestampSlice usage", () => {
    const notAMomentFormatDate = "2021-07-07 09:00:00";

    const secondToDate = (second: number) => new Date(second * 1000);

    it("should toTimestampStartDate pass input value is moment format", () => {
        const startOfDateExpect = new Date("2021-07-07T00:00:00.000Z");
        const startOfDate = toTimestampStartDate(
            DateTime.fromMillis(startOfDateExpect.getTime()).toISO()
        );

        const actual = secondToDate(startOfDate.getSeconds());
        expect(actual).toEqual(startOfDateExpect);
    });

    it("should toTimestampStartDate return date match the start of date expected", () => {
        const startOfDateExpect = "2021-07-07T00:00:00.000Z";
        const startOfDate = toTimestampStartDate(notAMomentFormatDate);

        const actual = secondToDate(startOfDate.getSeconds());
        expect(actual).toEqual(new Date(startOfDateExpect));
    });

    it("should toTimestampEndDate return date match the end of date expected", () => {
        const endOfDateExpect = "2021-07-07T23:59:59.000Z";
        const endOfDate = toTimestampEndDate(notAMomentFormatDate);

        const actual = secondToDate(endOfDate.getSeconds());
        expect(actual).toEqual(new Date(endOfDateExpect));
    });

    it("should toTimestampOriginDate return date match the origin date expected", () => {
        const originDateExpect = "2021-07-07T09:00:00.000Z";
        const originDate = toTimestampOriginDate(notAMomentFormatDate);

        const actual = secondToDate(originDate.getSeconds());
        expect(actual).toEqual(new Date(originDateExpect));
    });
});

describe("toTimestamp & toTimestampNewProto", () => {
    const notAMomentFormatDate = "2021-07-07 09:00:00";

    const secondToDate = (second: number) => new Date(second * 1000);

    it("should return match the start of date expected", () => {
        const startOfDateExpect = "2021-07-07T00:00:00.000Z";
        const params: Utils.ToTimestampParamsV2 = {
            originDate: new Date(notAMomentFormatDate),
            origin: false,
            start: true,
            type: "day",
        };

        const timestampResult = toTimestamp(params);
        const timestampNewProtoResult = toTimestampNewProto(params);

        const timestampActual = secondToDate(timestampResult.getSeconds());
        const timestampNewProtoActual = secondToDate(timestampNewProtoResult.getSeconds());

        expect(timestampActual).toEqual(new Date(startOfDateExpect));
        expect(timestampNewProtoActual).toEqual(new Date(startOfDateExpect));
    });

    it("should return match the end of date expected", () => {
        const endOfDateExpect = "2021-07-07T23:59:59.000Z";
        const params: Utils.ToTimestampParamsV2 = {
            originDate: new Date(notAMomentFormatDate),
            origin: false,
            start: false,
            type: "day",
        };

        const timestampResult = toTimestamp(params);
        const timestampNewProtoResult = toTimestampNewProto(params);

        const timestampActual = secondToDate(timestampResult.getSeconds());
        const timestampNewProtoActual = secondToDate(timestampNewProtoResult.getSeconds());

        expect(timestampActual).toEqual(new Date(endOfDateExpect));
        expect(timestampNewProtoActual).toEqual(new Date(endOfDateExpect));
    });

    it("should return match the origin date expected", () => {
        const originDateExpect = "2021-07-07T09:00:00.000Z";
        const params: Utils.ToTimestampParamsV2 = {
            originDate: new Date(notAMomentFormatDate),
            origin: true,
            start: true,
            type: "day",
        };

        const timestampResult = toTimestamp(params);
        const timestampNewProtoResult = toTimestampNewProto(params);

        const timestampActual = secondToDate(timestampResult.getSeconds());
        const timestampNewProtoActual = secondToDate(timestampNewProtoResult.getSeconds());

        expect(timestampActual).toEqual(new Date(originDateExpect));
        expect(timestampNewProtoActual).toEqual(new Date(originDateExpect));
    });
});

describe("toUTCWithTimeZone", () => {
    it("should return value when pass valid timezone", () => {
        const zeroTzDate = "2021-07-07T00:00:00.000Z";
        const saigonTzExpectedDate = "2021-07-07T07:00:00+07:00";
        const saigonTimezone = "Asia/Saigon";

        const result = toUTCWithTimeZone(saigonTimezone, zeroTzDate);
        expect(result).toEqual(saigonTzExpectedDate);
    });

    it("should return undefined value when pass invalid timezone", () => {
        const saigonTimezone = {
            tz: "Asia/Saigon",
            value: 7,
        };
        const undefinedValue = toUTCWithTimeZone(saigonTimezone.tz, undefined);
        const noValue = toUTCWithTimeZone(saigonTimezone.tz);

        expect(undefinedValue).toBe("");
        expect(noValue).toBe("");
    });
});

describe(convertDateStringToTimestamp.name, () => {
    it("should return a timestamp at the end of the day if the string contains 23:59", () => {
        const dateEnd = new Date(2021, 10, 8, 23, 59, 59, 999);
        const timestamp = convertDateStringToTimestamp("2021/11/08, 23:59", "yyyy/LL/dd, HH:mm");

        expect(timestamp.toObject()).toMatchObject(toTimestampEndDate(dateEnd).toObject());
    });

    it("should return a timestamp that represents the date", () => {
        const date = new Date(2021, 10, 8, 15);
        const timestamp = convertDateStringToTimestamp("2021/11/08, 15:00", "yyyy/LL/dd, HH:mm");

        expect(timestamp.toObject()).toMatchObject(toTimestampOriginDate(date).toObject());
    });
});
