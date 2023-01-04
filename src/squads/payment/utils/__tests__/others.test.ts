import { isLastItemInArray } from "src/squads/payment/utils/array";

describe("isLastItemInArray", () => {
    it("should return truthy if index equal to the length minus one", () => {
        const index: number = 0;
        const length = Array(1).length;

        expect(isLastItemInArray(index, length)).toBeTruthy();
    });
});
