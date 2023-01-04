import { DayOfWeek, DayOfWeekNames } from "../date-time";

describe("date-time", () => {
    it("DayOfWeekNames", () => {
        expect(DayOfWeekNames).toEqual({
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
        });
    });
    it("DayOfWeek", () => {
        expect(DayOfWeek).toEqual({
            SUNDAY: 0,
            MONDAY: 1,
            TUESDAY: 2,
            WEDNESDAY: 3,
            THURSDAY: 4,
            FRIDAY: 5,
            SATURDAY: 6,
        });
    });
});
