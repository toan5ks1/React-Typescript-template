import { MasterDataReaderServicePromiseClient } from "manabuf/bob/v1/masterdata_grpc_web_pb";

import {
    retrieveLocationsRequest,
    retrieveLocationTypesRequest,
} from "../locations-service-bob.request";

jest.mock("manabuf/bob/v1/masterdata_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/masterdata_grpc_web_pb");

    actual.MasterDataReaderServicePromiseClient.prototype.retrieveLowestLevelLocations = jest.fn();

    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe("Locations service bob", () => {
    beforeEach(() => {
        (
            MasterDataReaderServicePromiseClient.prototype.retrieveLowestLevelLocations as jest.Mock
        ).mockImplementation(() => {
            return fakeReturn;
        });
    });
});

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
