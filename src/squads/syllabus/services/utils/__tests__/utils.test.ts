import { getSearchString, createEmptyResponse } from "../utils";

describe(getSearchString.name, () => {
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

describe(createEmptyResponse.name, () => {
    it("should return an object", async () => {
        const obj = { data: { id: "123" } };

        expect(await createEmptyResponse(obj)).toMatchObject(obj);
    });

    it("should return undefined", async () => {
        const obj = undefined;

        expect(await createEmptyResponse(obj)).toEqual(obj);
    });

    it("should return an array", async () => {
        const obj = [{ id: 123 }];

        expect(await createEmptyResponse(obj)).toMatchObject(obj);
    });
});
