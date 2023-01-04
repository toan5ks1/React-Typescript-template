import {
    genListTypeNumber,
    genListTypeTextUppercase,
    isLowerCase,
    isUpperCase,
    genListTypeTextLowercase,
    generateLabel,
    LabelTypes,
} from "../label-generator";

describe(generateLabel.name, () => {
    it("should return label corrects", () => {
        expect(generateLabel(LabelTypes.NUMBER, 0, "1")).toEqual("1");
        expect(generateLabel(LabelTypes.NUMBER, 1, "2")).toEqual("2");
        expect(generateLabel(LabelTypes.TEXT, 1, "1")).toEqual("b");
        expect(generateLabel(LabelTypes.TEXT_UPPERCASE, 0, "1")).toEqual("A");

        expect(generateLabel(LabelTypes.CUSTOM, 2, "W2")).toEqual("W2");
        expect(generateLabel("", 2, "W2")).toEqual("");
    });
});

describe(genListTypeTextLowercase.name, () => {
    it("should gen list type text lowercase", () => {
        // number will be increase  by 1
        expect(genListTypeTextLowercase(0)).toEqual("a");
        expect(genListTypeTextLowercase(1)).toEqual("b");
        expect(genListTypeTextLowercase(9)).toEqual("j");
    });
});

describe(genListTypeNumber.name, () => {
    it("should gen correct label base on number passed as params", () => {
        // number will be increase  by 1
        expect(genListTypeNumber(0)).toEqual("1");
        expect(genListTypeNumber(5)).toEqual("6");
        expect(genListTypeNumber(26)).toEqual("27");
        expect(genListTypeNumber(27)).toEqual("28");
    });
});

describe(genListTypeTextLowercase.name, () => {
    it("should gen correct label base on number passed as params", () => {
        // number will be convert into excel column-like label lowercase
        expect(genListTypeTextLowercase(0)).toEqual("a");
        expect(genListTypeTextLowercase(2)).toEqual("c");
        expect(genListTypeTextLowercase(25)).toEqual("z");
        expect(genListTypeTextLowercase(27)).toEqual("ab");
        expect(genListTypeTextLowercase(999)).toEqual("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal");
    });
});

describe(genListTypeTextUppercase.name, () => {
    it("should gen correct label base on number passed as params", () => {
        // number will be convert into excel column-like label uppercase
        expect(genListTypeTextUppercase(0)).toEqual("A");
        expect(genListTypeTextUppercase(2)).toEqual("C");
        expect(genListTypeTextUppercase(25)).toEqual("Z");
        expect(genListTypeTextUppercase(27)).toEqual("AB");
        expect(genListTypeTextUppercase(999)).toEqual(
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal".toUpperCase()
        );
    });
});

describe(isLowerCase.name, () => {
    it("should check if string is already lowercase", () => {
        expect(isLowerCase("abc")).toEqual(true);

        expect(isLowerCase("Abc")).toEqual(false);
        expect(isLowerCase("ABC")).toEqual(false);
    });
});

describe(isUpperCase.name, () => {
    it("should check if string is already uppercase", () => {
        expect(isUpperCase("ABC")).toEqual(true);

        expect(isUpperCase("Abc")).toEqual(false);
        expect(isUpperCase("abc")).toEqual(false);
    });
});
