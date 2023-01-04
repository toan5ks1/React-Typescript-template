import { locationTypesService } from "src/squads/calendar/service/bob/location-types-service/location-types-service";
import { mockLocationTypes, mockVariables } from "src/squads/calendar/test-utils/location-types";

import locationTypesQueriesBob from "src/squads/calendar/service/bob/location-types-service/location-types-bob.query";

jest.mock("src/squads/calendar/service/bob/location-types-service/location-types-bob.query", () => {
    return {
        __esModule: true,
        default: {
            calendarGetLocationTypesList: jest.fn(),
        },
    };
});

describe("location-types-service", () => {
    it("should calendarGetLocationTypesList fire by calling calendarGetLocationTypesList method", async () => {
        (locationTypesQueriesBob.calendarGetLocationTypesList as jest.Mock).mockResolvedValue(
            mockLocationTypes
        );

        const response = await locationTypesService.query.calendarGetLocationTypesList(
            mockVariables
        );

        expect(locationTypesQueriesBob.calendarGetLocationTypesList).toBeCalledWith(mockVariables);
        expect(response).toEqual(mockLocationTypes);
    });
});
