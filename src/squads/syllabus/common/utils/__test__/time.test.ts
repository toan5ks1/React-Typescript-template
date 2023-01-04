import { getDateAfterByDuration, getDateBeforeByDuration } from "../time";

const date = new Date("2022/01/10");

describe("Test time utilities", () => {
    it("should get date correctly with getDateAfterByDuration", () => {
        const newDate = getDateAfterByDuration(date, { days: 7 }).toFormat("yyyy/LL/dd");
        expect(newDate).toEqual("2022/01/17");
    });
    it("should get date correctly with getDateBeforeByDuration", () => {
        const newDate = getDateBeforeByDuration(date, { days: 7 }).toFormat("yyyy/LL/dd");
        expect(newDate).toEqual("2022/01/03");
    });
});
