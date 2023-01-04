import { isInvalidOrEmptyArray, isInvalidOrEmptyVariable } from "../validation";

const invalidArrayValues = ["", null, undefined, []];
const invalidVariableValues = ["", null, undefined];

describe("isInvalidOrEmptyArray", () => {
    for (const invalidArrayValue of invalidArrayValues) {
        it("should return TRUE when invalid value", () => {
            expect(isInvalidOrEmptyArray(invalidArrayValue)).toBe(true);
        });
    }

    it("should return FALSE when valid value", () => {
        expect(isInvalidOrEmptyArray([1, 2, 3])).toBe(false);
    });
});

describe("isInvalidOrEmptyVariable", () => {
    for (const invalidVariableValue of invalidVariableValues) {
        it("should return TRUE when invalid value", () => {
            expect(isInvalidOrEmptyVariable(invalidVariableValue)).toBe(true);
        });
    }

    it("should return FALSE when valid value", () => {
        expect(isInvalidOrEmptyVariable("test 1")).toBe(false);
    });
});
