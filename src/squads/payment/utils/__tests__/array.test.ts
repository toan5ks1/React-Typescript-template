import { isLastItemInArray, pick1stElement } from "src/squads/payment/utils/array";

describe("func: isLastItemInArray", () => {
    it("should return true if index is last item in array", () => {
        expect(isLastItemInArray(0, 1)).toBe(true);
    });

    it("should return false if index is not last item in array", () => {
        expect(isLastItemInArray(0, 2)).toBe(false);
    });
});

describe("func: pick1stElement", () => {
    it("should return first element of array", () => {
        expect(pick1stElement([1, 2, 3])).toBe(1);
    });

    it("should return undefined if array is empty", () => {
        expect(pick1stElement([])).toBe(undefined);
    });

    it("should return default value if array is empty", () => {
        expect(pick1stElement([], "default")).toBe("default");
    });
});
