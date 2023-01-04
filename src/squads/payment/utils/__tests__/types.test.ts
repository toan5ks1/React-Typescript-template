import { isEmptyObject, isValidQueryField, toNumber } from "src/squads/payment/utils/types";

describe("toNumber", () => {
    it("should return number when given a valid number", () => {
        expect(toNumber(2)).toEqual(2);
    });

    it("should return 0 when given an invalid number", () => {
        expect(toNumber("invalid")).toEqual(0);
    });
});

describe("isValidQueryField", () => {
    it("should return value if type is string", () => {
        const queryField = "test";
        const result = isValidQueryField(queryField);

        expect(result).toEqual(queryField);
    });

    it("should return undefined if type is not string", () => {
        const queryField = null;
        const result = isValidQueryField(queryField);

        expect(result).toEqual(undefined);
    });
});

describe("isEmptyObject", () => {
    it("should return false if object has values", () => {
        const obj = { key: "value" };
        expect(isEmptyObject(obj)).toBeFalsy();
    });

    it("should return true if object is empty", () => {
        const emptyObj = {};
        expect(isEmptyObject(emptyObj)).toBeTruthy();
    });
});
