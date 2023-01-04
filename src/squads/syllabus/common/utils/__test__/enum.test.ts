import { convertEnumKeys, getEnumString } from "../enum";

describe(convertEnumKeys.name, () => {
    it("should convert enum to {key: key}", () => {
        enum X {
            A = 1,
            B = 2,
        }

        expect(convertEnumKeys(X)).toEqual({ A: "A", B: "B" });
    });
});

describe(getEnumString.name, () => {
    it("should get the key when passed an enum value", () => {
        enum X {
            A = 1,
            B = 2,
        }

        expect(getEnumString(X, 1)).toEqual("A");
        expect(getEnumString(X, 2)).toEqual("B");
        // value not found
        expect(getEnumString(X, 5)).toEqual("");
    });

    it("should behave like empty object when passed nothing", () => {
        expect(getEnumString(undefined, 1)).toEqual("");
    });
});
