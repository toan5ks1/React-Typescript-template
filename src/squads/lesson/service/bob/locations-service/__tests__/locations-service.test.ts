import { ArrayElement } from "src/common/constants/types";
import {
    LocationByLocationIdQuery,
    LocationByLocationIdQueryVariables,
    LocationListByIdsQuery,
    LocationListByIdsQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { locationsService } from "src/squads/lesson/service/bob/locations-service/locations-service";

import locationsQueriesBob from "src/squads/lesson/service/bob/locations-service/locations-bob.query";

jest.mock("src/squads/lesson/service/bob/locations-service/locations-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getOne: jest.fn(),
            getMany: jest.fn(),
        },
    };
});

describe("location-service", () => {
    const fakeGetOneLocationReturn: ArrayElement<LocationByLocationIdQuery["locations"]> = {
        location_id: "Sample Location ID",
        name: "Sample Location Name",
    };

    const fakeGetManyLocationReturn: LocationListByIdsQuery["locations"] = [
        {
            location_id: "Location ID 1",
            name: "Location 1",
        },
        {
            location_id: "Location ID 2",
            name: "Location 2",
        },
    ];

    it("should getOne location by calling lessonGetOneLocation method", async () => {
        const queryVariable: LocationByLocationIdQueryVariables = {
            location_id: "Sample Location ID",
        };

        (locationsQueriesBob.getOne as jest.Mock).mockResolvedValue(fakeGetOneLocationReturn);

        const response = await locationsService.query.locationsGetOne(queryVariable);

        expect(locationsQueriesBob.getOne).toBeCalledWith(queryVariable);
        expect(response).toEqual(fakeGetOneLocationReturn);
    });

    it("should not getOne with invalid parameter", async () => {
        const invalidQueryVariable: LocationByLocationIdQueryVariables = {
            location_id: "",
        };

        (locationsQueriesBob.getOne as jest.Mock).mockResolvedValue(fakeGetOneLocationReturn);

        await expect(async () => {
            await locationsService.query.locationsGetOne(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "locationsGetOne",
            serviceName: "bobGraphQL",
            errors: [{ field: "location_id" }],
            name: "InvalidParamError",
        });

        expect(locationsQueriesBob.getOne).not.toBeCalled();
    });

    it("should getMany locations by calling lessonGetManyLocation method", async () => {
        const queryVariable: LocationListByIdsQueryVariables = {
            location_ids: ["Location ID 1", "Location ID 2"],
        };

        (locationsQueriesBob.getMany as jest.Mock).mockResolvedValue(fakeGetManyLocationReturn);

        const response = await locationsService.query.locationsGetMany(queryVariable);

        expect(locationsQueriesBob.getMany).toBeCalledWith(queryVariable);
        expect(response).toEqual(fakeGetManyLocationReturn);
    });

    it("should not getMany locations with invalid params", async () => {
        const invalidQueryVariable: LocationListByIdsQueryVariables = {
            location_ids: [],
        };

        (locationsQueriesBob.getMany as jest.Mock).mockResolvedValue(fakeGetManyLocationReturn);

        await expect(async () => {
            await locationsService.query.locationsGetMany(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "locationsGetMany",
            serviceName: "bobGraphQL",
            errors: [{ field: "location_ids" }],
            name: "InvalidParamError",
        });

        expect(locationsQueriesBob.getMany).not.toBeCalled();
    });
});
