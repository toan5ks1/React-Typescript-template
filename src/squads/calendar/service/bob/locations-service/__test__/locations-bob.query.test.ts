import { mockLocations, mockVariables } from "src/squads/calendar/test-utils/locations";

import locationsQueriesBob from "src/squads/calendar/service/bob/locations-service/locations-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

describe("locations-bob.query", () => {
    it("Calendar_LocationListByLocationType query should success", async () => {
        const _callSpy = jest.spyOn(locationsQueriesBob, "_call");
        _callSpy.mockResolvedValue({
            data: {
                locations: mockLocations,
            },
        });

        const result = await locationsQueriesBob.calendarGetLocationsListByLocationTypes(
            mockVariables
        );

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockLocations);
    });
});
