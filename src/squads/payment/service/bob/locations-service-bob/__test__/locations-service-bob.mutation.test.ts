import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";

import { MasterDataReaderServicePromiseClient } from "manabuf/bob/v1/masterdata_grpc_web_pb";

import locationServiceBob from "src/squads/payment/service/bob/locations-service-bob/locations-service-bob.mutation";
import { newRetrieveLowestLevelLocationsReq } from "src/squads/payment/service/bob/locations-service-bob/locations-service-bob.request";

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

    it("should retrieve locations correctly", async () => {
        const retrieveLessonParams: NsBobLocationService.RetrieveLowestLocationsRequest = {
            name: "",
            limit: 10,
            offset: 0,
        };

        await locationServiceBob.retrieveLowestLevelLocations(retrieveLessonParams);

        expect(
            MasterDataReaderServicePromiseClient.prototype.retrieveLowestLevelLocations
        ).toBeCalledWith(newRetrieveLowestLevelLocationsReq(retrieveLessonParams));
    });
});
