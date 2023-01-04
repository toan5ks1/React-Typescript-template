import { hasUnit, toUnit } from "../utils";

describe("hasUnit", () => {
    it("should return if arg has CSS unit", () => {
        // has unit
        expect(hasUnit("10px")).toEqual(true);
        expect(hasUnit("10rem")).toEqual(true);
        expect(hasUnit("10em")).toEqual(true);
        expect(hasUnit("100%")).toEqual(true);

        //dont have unit
        expect(hasUnit(100)).toEqual(false);
        expect(hasUnit("2")).toEqual(false);
        expect(hasUnit("hello")).toEqual(false);
    });
});

describe("toUnit", () => {
    it("should append arg with CSS unit", () => {
        //default to px unit
        expect(toUnit(10)).toEqual("10px");
        expect(toUnit(10, "rem")).toEqual("10rem");
        expect(toUnit("10", "%")).toEqual("10%");
    });
});
