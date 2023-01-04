import { SearchEngine } from "../../constants/enum";
import { parseQuery, stringifyQuery, setQuery } from "../query";

describe("parseQuery", () => {
    it("should return correct result", () => {
        expect(parseQuery("?a=2&b=3")).toEqual({ a: "2", b: "3" }); //parse number = false
        expect(parseQuery("?a=2&b=3", true)).toEqual({ a: 2, b: 3 }); //parse number = false
        expect(parseQuery("?a=2&a=4")).toEqual({ a: ["2", "4"] }); // test parse array
    });

    it("should have default query to parse is window.location.search", () => {
        Object.defineProperty(window, "location", { value: { search: "?X=1&Y=2" } });

        expect(parseQuery()).toEqual({ X: "1", Y: "2" });
    });
});

describe("setQuery", () => {
    it("should return correct result", () => {
        expect(setQuery("?a=2&b=3", "c", "4")).toEqual("?a=2&b=3&c=4");
    });
});

describe("stringifyQuery", () => {
    it("should return correct result", () => {
        expect(
            stringifyQuery({
                [SearchEngine.BOOK_ID]: "bookId",
                [SearchEngine.CHAPTER_ID]: "chapterId",
                [SearchEngine.TAB]: 1,
            })
        ).toEqual("?bookId=bookId&chapterId=chapterId&tab=1");
    });
});
