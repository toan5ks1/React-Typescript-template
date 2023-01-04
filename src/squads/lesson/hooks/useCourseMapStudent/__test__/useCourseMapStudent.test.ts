import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import {
    CoursesManyQuery,
    CoursesManyQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import {
    User_StudentPackagesByListStudentIdV2Query,
    User_StudentPackagesByListStudentIdV2QueryVariables,
} from "src/squads/lesson/service/fatima/fatima-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import { ListQuery } from "src/squads/lesson/service/service-types";
import { MockInferQueryFn } from "src/squads/lesson/test-utils/types";
import { mockWarner } from "src/squads/lesson/test-utils/warner";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useCourseMapStudent, {
    UseCourseMapStudentReturn,
} from "src/squads/lesson/hooks/useCourseMapStudent";
import {
    coursesData as mockCourses,
    studentPackages as mockStudentPackages,
    course as mockCourse,
} from "src/squads/lesson/hooks/useCourseMapStudent/__mocks__";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const mockInferQuery = (params?: {
    studentPackageMockFn?: MockInferQueryFn<
        ListQuery<User_StudentPackagesByListStudentIdV2QueryVariables>,
        User_StudentPackagesByListStudentIdV2Query["student_packages"]
    >;
    coursesMockFn?: MockInferQueryFn<
        CoursesManyQueryVariables,
        UseQueryBaseOptions<CoursesManyQuery["courses"]>
    >;
}) => {
    const { studentPackageMockFn, coursesMockFn } = params || {};

    (inferQuery as jest.Mock).mockImplementation(
        ({
            entity,
            action,
        }: {
            entity: "studentPackages" | "courses";
            action: "studentPackagesGetList" | "coursesGetMany";
        }) => {
            switch (true) {
                case entity === "studentPackages" && action === "studentPackagesGetList":
                    if (studentPackageMockFn) return studentPackageMockFn;
                    return () => ({
                        data: mockStudentPackages,
                        isFetching: false,
                        refetch: jest.fn(),
                    });

                case entity === "courses" && action === "coursesGetMany":
                    if (coursesMockFn) return coursesMockFn;
                    return () => ({ data: mockCourse, isFetching: false });
            }
        }
    );
};

describe("useCourseMapStudent", () => {
    const showSnackbar = jest.fn();

    const std = mockWarner();

    it("should return courses list", () => {
        mockInferQuery();

        const { result }: RenderHookResult<string[], UseCourseMapStudentReturn> = renderHook(() =>
            useCourseMapStudent(["student_id"])
        );

        expect(result.current.coursesData).toEqual(mockCourses);
    });

    it("should show snackbar when fetching student-packages fail", () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        let ranOnError = false;

        mockInferQuery({
            studentPackageMockFn: (_, options) => {
                if (!ranOnError) {
                    options.onError?.(Error("ERROR_STUDENT_PACKAGE"));
                    ranOnError = true;
                }

                return { data: undefined, isFetching: false, refetch: jest.fn() };
            },
        });

        renderHook(() => useCourseMapStudent(["student_id"]));

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            `useCourseMapStudent get student-packages`,
            Error("ERROR_STUDENT_PACKAGE")
        );
    });

    it("should show snackbar when fetching courses name fail", async () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        let ranOnError = false;

        mockInferQuery({
            coursesMockFn: (_, options) => {
                if (!ranOnError) {
                    options.onError?.(Error("ERROR_GET_COURSES"));
                    ranOnError = true;
                }

                return { data: undefined, isFetching: false };
            },
        });

        renderHook(() => useCourseMapStudent(["student_id"]));

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");

        expect(std.warn).toBeCalledWith(
            "useCourseMapStudent get courses",
            Error("ERROR_GET_COURSES")
        );
    });
});
