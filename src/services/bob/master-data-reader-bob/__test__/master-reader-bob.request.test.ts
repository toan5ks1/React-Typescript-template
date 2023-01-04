import {
    retrieveLocationsRequest,
    retrieveLocationTypesRequest,
} from "../master-reader-bob.request";

describe("retrieveLocationsRequest", () => {
    it("should return empty object", () => {
        const req = retrieveLocationsRequest();
        expect(req.toObject()).toMatchObject({});
    });
});

describe("retrieveLocationTypesRequest", () => {
    it("should return empty object", () => {
        const req = retrieveLocationTypesRequest();
        expect(req.toObject()).toMatchObject({});
    });
});
