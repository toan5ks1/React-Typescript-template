import {
    retrieveLocationsRequest,
    retrieveLocationTypesRequest,
} from "../master-data-reader.request";

describe("retrieveLocationsRequest", () => {
    it("should return empty object", async () => {
        const req = retrieveLocationsRequest();
        expect(req.toObject()).toEqual({});
    });
});

describe("retrieveLocationTypesRequest", () => {
    it("should return empty object", () => {
        const req = retrieveLocationTypesRequest();
        expect(req.toObject()).toEqual({});
    });
});
