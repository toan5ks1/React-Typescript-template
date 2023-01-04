import { mockLocationTypes, mockVariables } from "src/squads/calendar/test-utils/location-types";

import locationTypesQueriesBob from "src/squads/calendar/service/bob/location-types-service/location-types-bob.query";

describe("location-types-bob.query", () => {
    it("Calendar_LocationListByLocationType query should success", async () => {
        const _callSpy = jest.spyOn(locationTypesQueriesBob, "_call");
        _callSpy.mockResolvedValue({
            data: {
                location_types: mockLocationTypes,
            },
        });

        const result = await locationTypesQueriesBob.calendarGetLocationTypesList(mockVariables);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockLocationTypes);
    });
});
