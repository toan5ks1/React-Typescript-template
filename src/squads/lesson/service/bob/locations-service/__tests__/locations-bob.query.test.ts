import graphqlClient from "src/squads/lesson/internals/hasura-client";
import reactiveStorage from "src/squads/lesson/internals/reactive-storage";
import {
    LocationByLocationIdQueryVariables,
    LocationListByIdsQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { getFakeLocalUser } from "src/squads/lesson/test-utils/mocks/user";

import locationsQueriesBob from "src/squads/lesson/service/bob/locations-service/locations-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

const user = getFakeLocalUser();

describe("locations-bob.query", () => {
    it("should query getOne success", async () => {
        const variables: LocationByLocationIdQueryVariables = {
            location_id: "Sample location Id",
        };
        const mockLocation = [
            {
                location_id: "Sample Location ID",
                name: "Sample Location Name",
            },
        ];
        reactiveStorage.set("PROFILE", user);

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                locations: mockLocation,
            },
        });

        const _callSpy = jest.spyOn(locationsQueriesBob, "_call");
        const result = await locationsQueriesBob.getOne(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockLocation[0]);
    });

    it("should query getMany success", async () => {
        const variables: LocationListByIdsQueryVariables = {
            location_ids: ["location ID 1", "location ID 2"],
        };

        const mockLocations = [
            {
                location_id: "Sample Location ID 1",
                name: "Sample Location Name 1",
            },
            {
                location_id: "Sample Location ID 2",
                name: "Sample Location Name 2",
            },
        ];
        reactiveStorage.set("PROFILE", user);

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                locations: mockLocations,
            },
        });
        const _callSpy = jest.spyOn(locationsQueriesBob, "_call");
        const result = await locationsQueriesBob.getMany(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockLocations);
    });
});
