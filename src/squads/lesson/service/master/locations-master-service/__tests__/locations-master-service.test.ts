import { ArrayElement } from "src/common/constants/types";
import { LocationByLocationIdQuery } from "src/squads/lesson/service/bob/bob-types";
import { locationsServiceMaster } from "src/squads/lesson/service/master/locations-master-service/locations-master-service";
import { NsLesson_Master_LocationsService } from "src/squads/lesson/service/master/locations-master-service/types";

import locationsReaderServiceMaster from "src/squads/lesson/service/master/locations-master-service/locations-master-reader.mutation";

jest.mock(
    "src/squads/lesson/service/master/locations-master-service/locations-master-reader.mutation",
    () => {
        return {
            __esModule: true,
            default: {
                retrieveLowestLevelLocations: jest.fn(),
            },
        };
    }
);

describe("locations-master-service", () => {
    it("should query retrieveLowestLevelLocations success", async () => {
        const queryVariable: NsLesson_Master_LocationsService.RetrieveLocationsRequest = {
            limit: 5,
            offset: 0,
            name: "Location_Name",
        };

        const fakeLocationReturn: ArrayElement<LocationByLocationIdQuery["locations"]> = {
            location_id: "Sample Location ID",
            name: "Sample Location Name",
        };
        (locationsReaderServiceMaster.retrieveLowestLevelLocations as jest.Mock).mockResolvedValue(
            fakeLocationReturn
        );

        const response = await locationsServiceMaster.query.locationsRetrieveLowestLevelLocations(
            queryVariable
        );

        expect(locationsReaderServiceMaster.retrieveLowestLevelLocations).toBeCalledWith(
            queryVariable
        );
        expect(response).toEqual(fakeLocationReturn);
    });

    it("should not call retrieveLowestLevelLocations with invalid parameters", async () => {
        const invalidQueryVariable = {
            limit: "2",
            offset: "1",
        } as unknown as NsLesson_Master_LocationsService.RetrieveLocationsRequest;

        await expect(async () => {
            await locationsServiceMaster.query.locationsRetrieveLowestLevelLocations(
                invalidQueryVariable
            );
        }).rejects.toMatchObject({
            action: "locationsRetrieveLowestLevelLocations",
            serviceName: "masterGraphQL",
            errors: [
                {
                    field: "limit",
                },
                { field: "offset" },
            ],
            name: "InvalidParamError",
        });

        expect(locationsReaderServiceMaster.retrieveLowestLevelLocations).not.toBeCalled();
    });
});
