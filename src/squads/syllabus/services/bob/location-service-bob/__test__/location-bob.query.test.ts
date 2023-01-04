import { LocationListByIdsQueryVariables } from "src/squads/syllabus/services/bob/bob-types";

import locationQueryBob from "src/squads/syllabus/services/bob/location-service-bob/location-bob.query";

jest.mock("src/internals/feature-controller");

describe("location-bob.query", () => {
    it("should call getManyQuery with correct parameters", async () => {
        const variables: LocationListByIdsQueryVariables = {
            location_ids: [],
        };

        const _callSpy = jest.spyOn(locationQueryBob, "_call").mockResolvedValue({
            data: {
                locations: [],
            },
        });

        const result = await locationQueryBob.getManyQuery(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});
