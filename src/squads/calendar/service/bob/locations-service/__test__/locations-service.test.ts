import { locationsService } from "src/squads/calendar/service/bob/locations-service/locations-service";
import {
    mockInvalidVariable,
    mockLocations,
    mockVariables,
} from "src/squads/calendar/test-utils/locations";

import locationsQueriesBob from "src/squads/calendar/service/bob/locations-service/locations-bob.query";

jest.mock("src/squads/calendar/service/bob/locations-service/locations-bob.query", () => {
    return {
        __esModule: true,
        default: {
            calendarGetLocationsListByLocationTypes: jest.fn(),
        },
    };
});

describe("location-service", () => {
    it("should calendarGetLocationsListByLocationTypes locations by calling calendarGetLocationsListByLocationTypes method", async () => {
        (
            locationsQueriesBob.calendarGetLocationsListByLocationTypes as jest.Mock
        ).mockResolvedValue(mockLocations);

        const response = await locationsService.query.calendarGetLocationsListByLocationTypes(
            mockVariables
        );

        expect(locationsQueriesBob.calendarGetLocationsListByLocationTypes).toBeCalledWith(
            mockVariables
        );
        expect(response).toEqual(mockLocations);
    });

    it("should not calendarGetLocationsListByLocationTypes locations with invalid params", async () => {
        (
            locationsQueriesBob.calendarGetLocationsListByLocationTypes as jest.Mock
        ).mockResolvedValue(mockLocations);

        await expect(async () => {
            await locationsService.query.calendarGetLocationsListByLocationTypes(
                mockInvalidVariable
            );
        }).rejects.toMatchObject({
            action: "calendarGetLocationsListByLocationTypes",
            serviceName: "bobGraphQL",
            errors: [{ field: "type" }],
            name: "InvalidParamError",
        });

        expect(locationsQueriesBob.calendarGetLocationsListByLocationTypes).not.toBeCalled();
    });
});
