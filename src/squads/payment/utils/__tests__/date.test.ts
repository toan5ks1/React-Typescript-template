import { formatDate } from "src/common/utils/time";
import { getFormattedDate } from "src/squads/payment/utils/date";

describe("getFormattedDate", () => {
    const date = "2022-12-12T00:00:00.000Z";
    it("should return formatted date", () => {
        const formattedDate = getFormattedDate(date);

        expect(formattedDate).toEqual("2022/12/12");
    });

    it("should return formatted current date if date is null", () => {
        const formattedDate = getFormattedDate(null);

        expect(formattedDate).toEqual(formatDate(new Date(), "yyyy/LL/dd"));
    });
});
