import { DateTime } from "luxon";

import {
    setEndOfDate,
    formatDate,
    formatLongDate,
    getFirstDayOfMonth,
    getLastDayOfMonth,
    dateIsSame,
    convertToDate,
    handleDisableExistedDate,
    formatTimeRange,
    formatTimeLength,
    getDurationInMinute,
    createTimeList,
} from "../time";

describe(setEndOfDate.name, () => {
    it("should return correct date", () => {
        const date = "2021-09-21 16:16:08";
        const expectDate = new Date("2021-09-21 23:59:59");

        expect(setEndOfDate(date)).toEqual(expectDate);
    });
    it("should throw error when pass invalid date", () => {
        const invalidTime = "invalid";
        expect(() => {
            setEndOfDate(invalidTime);
        }).toThrow();
    });
});

describe(formatDate.name, () => {
    it("should return date with correct format", () => {
        const date = "2021-09-21 16:16:08";
        const expectDate = "2021/09/21, 16:16";

        expect(formatDate(date, "yyyy/LL/dd, HH:mm")).toEqual(expectDate);
    });
});

describe(formatTimeRange.name, () => {
    it("should return time range with correct format", () => {
        const start = "2021-09-21 16:16:08";
        const end = "2021-09-21 17:16:08";

        expect(formatTimeRange(start, end, "HH:mm")).toEqual("16:16 - 17:16");
    });
});

describe(formatTimeLength.name, () => {
    it("should return time length in correct format", () => {
        expect(formatTimeLength(60)).toEqual("1 hr");
        expect(formatTimeLength(120)).toEqual("2 hr");
        expect(formatTimeLength(110)).toEqual("1 hr 50 min");
        expect(formatTimeLength(10)).toEqual("10 min");
        expect(formatTimeLength(1)).toEqual("1 min");
        expect(formatTimeLength(0)).toEqual("--");
    });
});

describe(getDurationInMinute.name, () => {
    it("should return correct duration in minute", () => {
        expect(getDurationInMinute("2021-09-21 16:16:08", "2021-09-21 17:16:08")).toEqual(60);
        expect(getDurationInMinute("2021-09-21 00:00:00", "2021-09-21 02:00:00")).toEqual(120);
    });
});

describe(formatLongDate.name, () => {
    it("should return date with correct format", () => {
        const date = "2021-09-21 16:16:08";
        const expectDate = "2021/09/21";

        expect(formatLongDate(date)).toEqual(expectDate);
    });
});

describe(getFirstDayOfMonth.name, () => {
    it("should return correct date", () => {
        const expectDate = "2022-02-01T00:00:00.000+00:00";

        expect(getFirstDayOfMonth(2022, 1)).toEqual(expectDate);
    });
});

describe(getLastDayOfMonth.name, () => {
    it("should return correct date", () => {
        const expectDate = "2022-02-28T23:59:59.000+00:00";

        expect(getLastDayOfMonth(2022, 1)).toEqual(expectDate);
    });
});

describe(dateIsSame.name, () => {
    it("should return true if have the same date", () => {
        const firstDate = new Date("2021-09-21 16:16:08");
        const secondDate = new Date("2021-09-21 16:16:08");

        expect(dateIsSame(firstDate, secondDate)).toBe(true);
    });

    it("should return false if have not the same date", () => {
        const firstDate = new Date("2021-09-21 16:16:08");
        const secondDate = new Date("2021-09-20 16:16:08");

        expect(dateIsSame(firstDate, secondDate)).toBe(false);
    });
});

describe(convertToDate.name, () => {
    it("should return correct JS date", () => {
        const timeDate = DateTime.now();

        expect(convertToDate(timeDate)).toEqual(timeDate.toJSDate());
    });
});

describe(handleDisableExistedDate.name, () => {
    it("should return false if dateList have no elemant", () => {
        const now = new Date();

        expect(handleDisableExistedDate(now, [])).toEqual(false);
    });

    it("should return false if have no value exists before", () => {
        const now = DateTime.now();
        const dateList = [new Date("2021-09-21 16:16:08"), new Date("2021-09-20 16:16:08")];

        expect(handleDisableExistedDate(now, dateList)).toEqual(false);
    });

    it("should return true if have value exists before", () => {
        const now = DateTime.now();
        const dateList = [new Date(), new Date("2021-09-20 16:16:08")];

        expect(handleDisableExistedDate(now, dateList)).toEqual(true);
    });
});

describe(createTimeList.name, () => {
    it("should create list of time with base date", () => {
        const mockToday = new Date("2022-02-02T09:00:00.000Z");

        const [firstOption, secondOption, thirdOption] = createTimeList(mockToday);

        expect(firstOption).toEqual({
            label: "00:00",
            value: new Date("2022-02-02T00:00:00.000Z"),
        });

        expect(secondOption).toEqual({
            label: "00:01",
            value: new Date("2022-02-02T00:01:00.000Z"),
        });

        expect(thirdOption).toEqual({
            label: "00:02",
            value: new Date("2022-02-02T00:02:00.000Z"),
        });
    });
});
