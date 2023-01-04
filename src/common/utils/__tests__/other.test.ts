import { TypeObject } from "src/typings/support-types";

import {
    arrayHasItem,
    emailIsValid,
    isNumericValue,
    isUndefined,
    omitProp,
    pick1stElement,
    removeByIndex,
    removeLastCharacter,
    safeStringify,
    toArr,
    toShortenStr,
} from "../other";

describe(isUndefined.name, () => {
    it("should return correct", () => {
        expect(isUndefined("I want to remove1")).toEqual(false);
        expect(isUndefined(null)).toEqual(false);
        expect(isUndefined(undefined)).toEqual(true);
    });
});
describe(removeLastCharacter.name, () => {
    it("should remove last char", () => {
        expect(removeLastCharacter("I want to remove1")).toEqual("I want to remove");
    });
});

describe("pick1stElement", () => {
    it("should return correct first element is list", () => {
        const list: number[] = [1, 2, 3, 4];
        expect(pick1stElement<number>(list)).toEqual(list[0]);
    });

    it("should return undefined", () => {
        expect(pick1stElement<number>([])).toBeUndefined();
        // @ts-ignore
        expect(pick1stElement("string")).toBeUndefined();
    });
});

describe("removeByIndex", () => {
    const list: number[] = [0, 1, 2, 3, 4, 5];
    const listSize = list.length;

    it("should hold original input", () => {
        expect(removeByIndex<number>(list, listSize)).toHaveLength(listSize);
        expect(removeByIndex<number>(list, listSize + 1)).toHaveLength(listSize);
        expect(removeByIndex<number>(list, -1)).toHaveLength(listSize);
    });

    it("should return correct after remove", () => {
        expect(removeByIndex<number>(list, listSize - 1)).toHaveLength(listSize - 1);
        expect(removeByIndex<number>(list, 0)).toEqual([1, 2, 3, 4, 5]);
    });
});

describe("emailIsValid", () => {
    it("should return correct result", () => {
        expect(emailIsValid("abc")).toEqual(false);
        expect(emailIsValid("abc@gm")).toEqual(false);

        expect(emailIsValid("abc@ma.co")).toEqual(true);
        expect(emailIsValid("phi.pham@manabie.com")).toEqual(true);
    });
});

describe("toShortenStr", () => {
    it("should return correct result", () => {
        expect(toShortenStr("")).toEqual("");
        expect(toShortenStr("abc")).toEqual("abc");
        expect(toShortenStr("abc".repeat(4), 10)).toEqual(`abcabcabca...`); // str length is 12
        expect(toShortenStr("abc".repeat(11))).toEqual(`${"abc".repeat(10)}...`); //input string is 33 in length
    });
});

describe("toArr", () => {
    it("should return correct result", () => {
        const arr = [1, 2];
        const notArr = { a: 1, b: 2 };

        expect(toArr(arr)).toEqual(arr);
        expect(toArr(notArr)).toEqual([notArr]);
    });
});

describe("omitProp", () => {
    it("should omit the prop correctly without side effect", () => {
        expect(omitProp<TypeObject, string>({}, "id")).toEqual({});

        const example = {
            hello: 2,
        };
        expect(omitProp<TypeObject, string>(example, "not-exist")).toEqual(example);

        expect(omitProp<TypeObject, string>({ hello: 2 }, "hello")).toEqual({});
        expect(example).toEqual({ hello: 2 }); // test to ensure the function is pure, dont alter its params
    });
});

describe("isNumericValue", () => {
    it("should try to check if a value can be a number or not", () => {
        expect(isNumericValue(5)).toEqual(true);
        expect(isNumericValue("5")).toEqual(true);
        expect(isNumericValue(0)).toEqual(true);

        expect(isNumericValue("5ss")).toEqual(false);
        expect(isNumericValue("abc")).toEqual(false);

        expect(isNumericValue(undefined)).toEqual(false);
        expect(isNumericValue(null)).toEqual(false);
        expect(isNumericValue("")).toEqual(false);
    });
});

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
