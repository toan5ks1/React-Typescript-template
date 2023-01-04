import {
    User_LocationListByIdsQuery,
    User_LocationListByIdsQueryVariables,
    User_CoursesManyWithLocationQueryVariables,
    User_CoursesManyWithLocationQuery,
} from "src/squads/user/service/bob/bob-types";
import courseService from "src/squads/user/service/define-service/course-service";
import locationService from "src/squads/user/service/define-service/location-service";
import studentPackageService from "src/squads/user/service/define-service/student-package-service";
import {
    User_StudentPackagesByListStudentIdV2QueryVariables,
    User_StudentPackagesByListStudentIdV2Query,
} from "src/squads/user/service/fatima/fatima-types";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";
import { mockWarner } from "src/squads/user/test-utils/warner";

import {
    coursesData as mockCourses,
    studentPackages as mockStudentPackages,
    locations as mockLocations,
    course as mockCourse,
} from "../__mocks__";
import useCourseMapStudent, { UseCourseMapStudentReturn } from "../useCourseMapStudent";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import { IStudentPackage, ILocations } from "src/squads/user/hooks/useCourseMapStudent";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/hooks/useUserFeatureFlag");

jest.mock("src/squads/user/hooks/useShowSnackbar", () => {
    return jest.fn();
});

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

function mockInferQuery(studentPackages?: IStudentPackage[], locations?: ILocations[]) {
    let callbackStudentPackages = false;
    let callbackLocations = false;
    let callbackCourse = false;

    (inferQuery as jest.Mock).mockImplementation(
        (resource: {
                entity: "studentPackage" | "location" | "course";
                action:
                    | keyof typeof studentPackageService["query"]
                    | keyof typeof locationService["query"]
                    | keyof typeof courseService["query"];
            }) =>
            () => {
                switch (resource.entity) {
                    case "studentPackage":
                        if (!callbackStudentPackages) {
                            callbackStudentPackages = true;
                            return {
                                data: studentPackages,
                                isFetching: false,
                                refetch: jest.fn(),
                            };
                        }

                        break;

                    case "location":
                        if (!callbackLocations) {
                            callbackLocations = true;

                            return {
                                data: locations,
                                isFetching: false,
                            };
                        }

                        break;
                    case "course":
                        if (!callbackCourse) {
                            callbackCourse = true;

                            return {
                                data: mockCourse,
                                isFetching: false,
                            };
                        }

                        break;

                    default:
                        break;
                }

                return { data: [], isFetching: false };
            }
    );
}

describe("useCourseMapStudent", () => {
    const showSnackbar = jest.fn();

    const std = mockWarner();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        mockInferQuery(mockStudentPackages, mockLocations);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should return courses list", async () => {
        const { result }: RenderHookResult<string[], UseCourseMapStudentReturn> = renderHook(() =>
            useCourseMapStudent(["student_id"])
        );

        expect(result.current.coursesData).toEqual(mockCourses);
    });

    it("should show snackbar when fetching student-packages fail", async () => {
        let callbackRan = false;
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "studentPackage";
                    action: keyof typeof studentPackageService["query"];
                }) =>
                (
                    _params: User_StudentPackagesByListStudentIdV2QueryVariables,
                    options?: UseQueryBaseOptions<
                        User_StudentPackagesByListStudentIdV2Query["student_packages"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "studentPackage") {
                            callbackRan = true;
                            options?.onError?.(Error("ERROR_STUDENT_PACKAGE"));

                            return { data: undefined, isFetching: false, refetch: jest.fn() };
                        }
                    }

                    return { data: undefined, isFetching: false, refetch: jest.fn() };
                }
        );

        renderHook(() => useCourseMapStudent(["student_id"]));

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            `useCourseMapStudent get student-packages`,
            Error("ERROR_STUDENT_PACKAGE")
        );
    });

    it("should show snackbar when fetching locations fail", async () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "location"; action: keyof typeof locationService["query"] }) =>
                (
                    _params: ListQuery<User_LocationListByIdsQueryVariables>,
                    options?: UseQueryBaseOptions<
                        User_LocationListByIdsQuery["locations"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "location") {
                            callbackRan = true;
                            options?.onError?.(Error("ERROR_STUDENT_LOCATION"));

                            return { data: undefined, isFetching: false };
                        }
                        return { data: undefined, isFetching: false, refetch: jest.fn() };
                    }
                }
        );

        renderHook(() => useCourseMapStudent(["student_id"]));

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            `useCourseMapStudent get locations`,
            Error("ERROR_STUDENT_LOCATION")
        );
    });

    it("should show snackbar when fetching courses name fail", async () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "course"; action: keyof typeof courseService["query"] }) =>
                (
                    _params: ListQuery<User_CoursesManyWithLocationQueryVariables>,
                    options?: UseQueryBaseOptions<
                        User_CoursesManyWithLocationQuery["courses"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "course") {
                            callbackRan = true;
                            options?.onError?.(Error("ERROR_COURSES_NAME"));

                            return { data: undefined, isFetching: false };
                        }
                        return { data: undefined, isFetching: false, refetch: jest.fn() };
                    }
                }
        );

        renderHook(() => useCourseMapStudent(["student_id"]));

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            `useCourseMapStudent get courses`,
            Error("ERROR_COURSES_NAME")
        );
    });
});
