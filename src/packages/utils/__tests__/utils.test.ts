import { arrayHasItem, pathNameMatch } from "../../../common/utils/other";
import { isProduction, isSSR } from "../utils";

describe("isProduction", () => {
    it("should return correct result", () => {
        expect(isProduction("production")).toEqual(true);

        expect(isProduction("green")).toEqual(false);
        expect(isProduction("xxx")).toEqual(false);
    });
});

describe("isSSR", () => {
    it("should return client environment", () => {
        expect(isSSR()).toEqual(false); // in jest with dom enabled, window does exist, so false
    });
});

describe("pathNameMatch", () => {
    it("should return if pathname match both suffix / or not", () => {
        expect(pathNameMatch("/hello", "/hello")).toEqual(true);
        expect(pathNameMatch("/hello/", "/hello")).toEqual(true);

        expect(pathNameMatch("/he-lo/", "/hello")).toEqual(false);
    });
});

describe("isArrayValid", () => {
    it("should return if array is valid or not (only array with length > 0 is consider valid)", () => {
        expect(arrayHasItem([])).toEqual(false);

        expect(arrayHasItem([1])).toEqual(true);

        expect(arrayHasItem(null)).toEqual(false);
    });
});
