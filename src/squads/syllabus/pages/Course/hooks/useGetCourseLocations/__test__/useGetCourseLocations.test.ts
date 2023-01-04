import { LocationManyType } from "src/common/constants/types";
import { UseQueryBaseOptions } from "src/squads/syllabus/hooks/data/data-types";
import {
    Lesson_LocationIdsByCourseIdV2Query,
    Lesson_LocationIdsByCourseIdV2QueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useGetCourseLocations, {
    UseGetCourseLocationsReturn,
} from "src/squads/syllabus/pages/Course/hooks/useGetCourseLocations/useGetCourseLocations";

jest.mock("src/squads/syllabus/internals/logger");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

const mockShowSnackbar = jest.fn();
const mockLocationsIds: string[] = ["location_id_1", "location_id_2"];
const mockLocationsList: LocationManyType[] = [
    {
        location_id: "location_id_1",
        name: "location 1",
    },
    {
        location_id: "location_id_2",
        name: "location 2",
    },
];

describe("useGetCourseLocations hook", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should return locations correctly", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "location";
                    action: "lessonLocationIdsByCourseId" | "lessonLocationGetMany";
                }) =>
                (
                    _params: Lesson_LocationIdsByCourseIdV2QueryVariables,
                    _options?: UseQueryBaseOptions<
                        | Lesson_LocationIdsByCourseIdV2Query["get_locations_active_by_course_id"]
                        | undefined
                    >
                ) => {
                    if (resource.action === "lessonLocationIdsByCourseId") {
                        return {
                            data: mockLocationsIds,
                        };
                    } else {
                        return {
                            data: mockLocationsList,
                        };
                    }
                }
        );

        const { result }: RenderHookResult<string[], UseGetCourseLocationsReturn> = renderHook(() =>
            useGetCourseLocations({ courseId: "Course_id_1" })
        );

        const expectedOutPutForHook = mockLocationsList;
        expect(result.current.locations).toEqual(expectedOutPutForHook);
    });

    it("should update locations", async () => {
        const refetchAction = jest.fn();

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "location";
                    action: "lessonLocationIdsByCourseId" | "lessonLocationGetMany";
                }) =>
                (
                    _params: Lesson_LocationIdsByCourseIdV2QueryVariables,
                    _options?: UseQueryBaseOptions<
                        | Lesson_LocationIdsByCourseIdV2Query["get_locations_active_by_course_id"]
                        | undefined
                    >
                ) => {
                    if (resource.action === "lessonLocationIdsByCourseId") {
                        return {
                            data: mockLocationsIds,
                            refetch: refetchAction,
                        };
                    } else {
                        return {
                            data: mockLocationsList,
                            refetch: refetchAction,
                        };
                    }
                }
        );

        const { result }: RenderHookResult<string[], UseGetCourseLocationsReturn> = renderHook(() =>
            useGetCourseLocations({ courseId: "Course_id_1" })
        );

        await result.current.updateCourseLocations!();
        expect(refetchAction).toBeCalled();
    });
});

describe("useGetCourseLocations hook with some failure when fetch data", () => {
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should get location ids error", () => {
        let ranOnError = false;
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "location";
                    action: "lessonLocationIdsByCourseId" | "lessonLocationGetMany";
                }) =>
                (
                    _params: Lesson_LocationIdsByCourseIdV2QueryVariables,
                    options?: UseQueryBaseOptions<
                        | Lesson_LocationIdsByCourseIdV2Query["get_locations_active_by_course_id"]
                        | undefined
                    >
                ) => {
                    if (resource.action === "lessonLocationIdsByCourseId") {
                        if (!ranOnError) {
                            options?.onError?.(Error("ERROR LOCATIONS IDS"));
                            ranOnError = true;
                        }
                    }
                }
        );

        renderHook(() => useGetCourseLocations({ courseId: "Course_id_1" }));

        expect(mockShowSnackbar).toBeCalledWith(
            "resources.courses.unableToGetLocationIds",
            "error"
        );
    });

    it("should get locations error", () => {
        let ranOnError = false;
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "location";
                    action: "lessonLocationIdsByCourseId" | "lessonLocationGetMany";
                }) =>
                (
                    _params: Lesson_LocationIdsByCourseIdV2QueryVariables,
                    options?: UseQueryBaseOptions<
                        | Lesson_LocationIdsByCourseIdV2Query["get_locations_active_by_course_id"]
                        | undefined
                    >
                ) => {
                    if (resource.action === "lessonLocationIdsByCourseId") {
                        return {
                            data: mockLocationsIds,
                        };
                    } else {
                        if (!ranOnError) {
                            options?.onError?.(Error("ERROR LOCATIONS"));
                            ranOnError = true;
                        }
                    }
                }
        );

        renderHook(() => useGetCourseLocations({ courseId: "Course_id_1" }));

        expect(mockShowSnackbar).toBeCalledWith("resources.courses.unableToGetLocation", "error");
    });
});
