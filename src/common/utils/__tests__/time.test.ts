import {
    isValidDateString,
    isValidTimeString,
    setEndOfDate,
    getTimeSecond,
    convertDateStringToDuration,
} from "../time";

const mockTime = () => {
    const now = new Date();
    now.setHours(1);
    now.setMinutes(0);
    now.setSeconds(0);

    // 01:00:00
    return now;
};

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

describe(isValidTimeString.name, () => {
    it("should return true when the time is within the valid range", () => {
        expect(isValidTimeString("00:00")).toBe(true);
    });

    it("should return false when hour or minute is not a number", () => {
        expect(isValidTimeString("aa:00")).toBe(false);
        expect(isValidTimeString("00:aa")).toBe(false);
    });

    it("should return false when hour is less than 0", () => {
        expect(isValidTimeString("-1:00")).toBe(false);
    });

    it("should return false when hour is greater than 23", () => {
        expect(isValidTimeString("24:00")).toBe(false);
    });

    it("should return false when minute is less than 0", () => {
        expect(isValidTimeString("00:-1")).toBe(false);
    });

    it("should return false when minute is greater than 59", () => {
        expect(isValidTimeString("00:60")).toBe(false);
    });
});

describe(isValidDateString.name, () => {
    it("should return true when the date string is within the valid date range", () => {
        expect(isValidDateString("2021/10/19")).toBe(true);
        expect(isValidDateString("2021/10/19, 00:00")).toBe(true);
        expect(isValidDateString("2021/02/28")).toBe(true);
        expect(isValidDateString("2020/02/29")).toBe(true);
    });

    it("should return false when year, month or day is not a number", () => {
        expect(isValidDateString("aaaa/10/10")).toBe(false);
        expect(isValidDateString("2021/aa/10")).toBe(false);
        expect(isValidDateString("2021/10/aa")).toBe(false);
    });

    it("should return false when the time is invalid", () => {
        expect(isValidDateString("2021/10/19, -1:00")).toBe(false);
    });

    it("should return false when year is less than 1000", () => {
        expect(isValidDateString("0999/10/19")).toBe(false);
    });

    it("should return false when month is less than 1", () => {
        expect(isValidDateString("2021/0/19")).toBe(false);
    });

    it("should return false when month is greater than 12", () => {
        expect(isValidDateString("2021/13/19")).toBe(false);
    });

    it("should return false when day is less than 1", () => {
        expect(isValidDateString("2021/10/0")).toBe(false);
    });

    it("should return false when day is greater than month length", () => {
        expect(isValidDateString("2021/10/32")).toBe(false);
        expect(isValidDateString("2021/02/29")).toBe(false);
    });
});

describe("Convert time in a day to second", () => {
    it("should return second from time correctly", () => {
        const time = mockTime();
        expect(getTimeSecond(time)).toEqual(3600);
    });
});

describe("Convert date string to object Duration", () => {
    it("should return object duration correctly", () => {
        const time = mockTime();
        const duration = convertDateStringToDuration(time.toISOString());

        expect(duration.getSeconds()).toEqual(3600);
    });
    it("should throw a error with invalid param date", () => {
        try {
            convertDateStringToDuration("invalid date");
        } catch (error) {
            expect((error as Error).message).toBe("ra.manabie-error.unknown");
        }
    });
});
