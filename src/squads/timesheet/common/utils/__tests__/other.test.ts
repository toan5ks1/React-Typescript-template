import { safeStringify, arrayHasItem } from "../other";

describe(safeStringify.name, () => {
    it("should be able to stringify special value", () => {
        const fn = function () {};
        expect(safeStringify({ a: fn })).toEqual(`{"a":"${fn.toString()}"}`);

        const symbol = Symbol("test");
        expect(safeStringify({ b: symbol })).toEqual(`{"b":"${symbol.toString()}"}`);

        const bigInt = BigInt(123);
        expect(safeStringify({ c: bigInt })).toEqual(`{"c":"${bigInt.toString()}"}`);

        const undefinedValue = undefined;
        expect(safeStringify({ c: undefinedValue })).toEqual(`{"c":"undefined"}`);
    });

    it("behave like normal stringify in normal case", () => {
        const obj = {
            a: 1,
            b: "2",
        };
        expect(safeStringify(obj)).toEqual(JSON.stringify(obj));
    });
});

describe(arrayHasItem.name, () => {
    it("should return true if input is an array is not empty", () => {
        expect(arrayHasItem([1])).toEqual(true);
        expect(arrayHasItem([{}])).toEqual(true);
        expect(arrayHasItem([""])).toEqual(true);
    });

    it("should return false if input is an empty array", () => {
        expect(arrayHasItem([])).toEqual(false);
    });

    it("should return false if input is not an array", () => {
        expect(arrayHasItem({})).toEqual(false);
        expect(arrayHasItem()).toEqual(false);
        expect(arrayHasItem(null)).toEqual(false);
        expect(arrayHasItem("")).toEqual(false);
    });
});
