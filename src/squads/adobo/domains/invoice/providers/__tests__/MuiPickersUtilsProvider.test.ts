import { LocalizedAdapter } from "src/squads/adobo/domains/invoice/providers/MuiPickersUtilsProvider";

describe("MuiPickersUtilsProvider", () => {
    it("should provide utils to render dates info", () => {
        const utils = new LocalizedAdapter();
        // const now = new Date();
        // expect(utils.getDatePickerHeaderText(now)).toEqual(formatDate(now, "yyyy/LL/dd"));
        // expect(utils.getCalendarHeaderText(now)).toEqual(formatDate(now, "yyyy/LL"));

        expect(utils.getMeridiemText("am")).toEqual("AM");
        expect(utils.getMeridiemText("pm")).toEqual("PM");
    });
});
