import { parseQuery, stringifyQuery, setQuery } from "../url";

describe(parseQuery.name, () => {
    it("should return object's value is string when parseNumbers option is not passed", () => {
        expect(parseQuery("?a=2&b=3")).toEqual({ a: "2", b: "3" });
    });

    it("should return object's value parsed to number when parse number passed", () => {
        expect(parseQuery("?a=2&b=3", true)).toEqual({ a: 2, b: 3 });
    });

    it("should return an array string value when query is an array query string ", () => {
        expect(parseQuery("?a=2&a=4")).toEqual({ a: ["2", "4"] });
    });

    it("should have default query to parse is window.location.search", () => {
        Object.defineProperty(window, "location", { value: { search: "?X=1&Y=2" } });

        expect(parseQuery()).toEqual({ X: "1", Y: "2" });
    });
});

describe(setQuery.name, () => {
    it("should return correct result", () => {
        expect(setQuery("?a=2&b=3", "c", "4")).toEqual("?a=2&b=3&c=4");
    });
});

describe(stringifyQuery.name, () => {
    it("should return correct result", () => {
        expect(
            stringifyQuery({
                one: "bookId",
                two: "chapterId",
                tab: 1,
            })
        ).toEqual("?one=bookId&tab=1&two=chapterId");
    });
});
