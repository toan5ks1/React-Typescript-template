import { convertArrayToHasuraArrayString } from "../hasura-convert-data-type";

describe(convertArrayToHasuraArrayString.name, () => {
    it("should be return correct", () => {
        const ids: string[] = ["bookId1", "bookId2"];
        const convertedData = convertArrayToHasuraArrayString(ids);

        expect(convertedData).toEqual(`{${ids.join(",")}}`);
    });
});
