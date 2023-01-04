import { safeStringify } from "src/squads/syllabus/common/utils/utils";

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
