import { getSearchString } from "../utils";

describe("getSearchString", () => {
    it("should return a search string", () => {
        expect(getSearchString("text")).toEqual("%text%");
    });

    it("should return undefined for empty search string", async () => {
        expect(getSearchString("")).toEqual(undefined);
    });

    it("should return undefined for undefined value", async () => {
        expect(getSearchString(undefined)).toEqual(undefined);
    });
});
