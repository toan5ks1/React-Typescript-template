import { NsLesson_Master_LocationsService } from "src/squads/lesson/service/master/locations-master-service/types";

import { MasterDataReaderServicePromiseClient } from "manabuf/bob/v1/masterdata_grpc_web_pb";

import locationsReaderServiceMaster, {
    newRetrieveLowestLevelLocationsReq,
} from "src/squads/lesson/service/master/locations-master-service/locations-master-reader.mutation";

jest.mock("manabuf/bob/v1/masterdata_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/masterdata_grpc_web_pb");

    actual.MasterDataReaderServicePromiseClient.prototype.retrieveLowestLevelLocations = jest.fn();

    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe("locations-master-reader.mutation", () => {
    it("should query retrieveLowestLevelLocations success", async () => {
        (
            MasterDataReaderServicePromiseClient.prototype.retrieveLowestLevelLocations as jest.Mock
        ).mockImplementation(() => {
            return fakeReturn;
        });
        const retrieveLessonParams: NsLesson_Master_LocationsService.RetrieveLocationsRequest = {
            name: "",
            limit: 10,
            offset: 0,
        };

        await locationsReaderServiceMaster.retrieveLowestLevelLocations(retrieveLessonParams);

        expect(
            MasterDataReaderServicePromiseClient.prototype.retrieveLowestLevelLocations
        ).toBeCalledWith(newRetrieveLowestLevelLocationsReq(retrieveLessonParams));
    });
});
