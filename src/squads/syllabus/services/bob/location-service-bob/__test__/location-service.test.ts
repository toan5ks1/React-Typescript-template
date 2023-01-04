import {
    Lesson_LocationIdsByCourseIdV2Query,
    Lesson_LocationIdsByCourseIdV2QueryVariables,
    LocationListByIdsQuery,
    LocationListByIdsQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { locationService } from "src/squads/syllabus/services/bob/location-service-bob/location-service";

import locationQueryBob from "src/squads/syllabus/services/bob/location-service-bob/location-bob.query";

jest.mock("src/squads/syllabus/services/bob/location-service-bob/location-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getManyQuery: jest.fn(),
            getLocationIdsByCourseId: jest.fn(),
        },
    };
});

const mockReturnLocations: LocationListByIdsQuery["locations"] = [
    { name: "course name", location_id: "location_id" },
];

const mockReturnLocationIds: Lesson_LocationIdsByCourseIdV2Query["get_locations_active_by_course_id"] =
    [{ location_id: "location_id" }];

describe("location-service-bob", () => {
    describe("query lessonLocationGetMany", () => {
        beforeEach(() => {
            (locationQueryBob.getManyQuery as jest.Mock).mockResolvedValue(mockReturnLocations);
        });

        it("should call lessonLocationGetMany with correct parameters", async () => {
            const queryVariable: LocationListByIdsQueryVariables = {
                location_ids: ["location_id"],
            };

            const response = await locationService.query.lessonLocationGetMany(queryVariable);

            expect(locationQueryBob.getManyQuery).toBeCalledWith(queryVariable);
            expect(response).toEqual(mockReturnLocations);
        });
    });

    describe("lessonLocationIdsByCourseId", () => {
        beforeEach(() => {
            (locationQueryBob.getLocationIdsByCourseId as jest.Mock).mockResolvedValue(
                mockReturnLocationIds
            );
        });

        it("should call lessonLocationGetMany with correct parameters", async () => {
            const queryVariable: Lesson_LocationIdsByCourseIdV2QueryVariables = {
                course: "course",
            };

            const response = await locationService.query.lessonLocationIdsByCourseId(queryVariable);

            expect(locationQueryBob.getLocationIdsByCourseId).toBeCalledWith(queryVariable);
            expect(response).toEqual(mockReturnLocationIds);
        });
    });
});
