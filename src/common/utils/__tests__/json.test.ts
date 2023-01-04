import { parseJSON } from "../json";

describe(parseJSON.name, () => {
    it("should return null", async () => {
        expect(parseJSON("")).toBeNull();
    });
    it("should return correct values", async () => {
        expect(parseJSON("{}")).toEqual({});

        const obj = {
            id: "123",
            value: 123,
        };
        expect(parseJSON(JSON.stringify(obj))).toEqual(obj);
    });
});
