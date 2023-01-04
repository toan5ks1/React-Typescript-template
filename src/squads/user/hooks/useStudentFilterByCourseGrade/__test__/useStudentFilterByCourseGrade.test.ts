import {
    StudentsListByFiltersWithoutGradeAndAggregateQuery,
    StudentsListByFiltersWithoutGradeAndAggregateQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import courseStudentService from "src/squads/user/service/define-service/course-student-service-eureka";
import studentService from "src/squads/user/service/define-service/student-service";
import { inferQueryPagination, inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import {
    createMockListStudentWithFilter,
    createMockStudentCount,
    createMockStudentWithFilter,
    pagination,
} from "src/squads/user/test-utils/mocks/student";

import useStudentFilterByCourseGrade from "../useStudentFilterByCourseGrade";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferQueryPagination: jest.fn(),
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useUserFeatureFlag");

describe("useStudentFilterByCourseGrade", () => {
    const listCourseStudentByCourseIds = createMockStudentWithFilter("user_id");

    const listStudentWithFilter = createMockListStudentWithFilter("user_id");

    const studentCount = createMockStudentCount(1);

    const mockPagination = pagination(studentCount.aggregate?.count);

    it("should return correct data", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: Parameters<typeof inferQuery>[0]["entity"];
                    action:
                        | keyof typeof courseStudentService.query
                        | keyof typeof studentService.query;
                }) =>
                (_params: Object) => {
                    const { action, entity } = resource;
                    switch (entity) {
                        case "courseStudents":
                            if (action === "userGetManyCourseStudentsByCourseIds") {
                                return { data: listCourseStudentByCourseIds };
                            }
                            return;
                        case "student":
                            if (
                                action === "userCountStudentV2" ||
                                action === "userCountStudentLocationV2"
                            ) {
                                return { data: studentCount };
                            }
                            return;
                    }
                }
        );

        (inferQueryPagination as jest.Mock).mockImplementation(
            (resource: { entity: "student"; action: keyof typeof studentService.query }) => () => {
                if (
                    resource.action === "userGetManyStudentsLocationWithFilterV2" ||
                    resource.action === "userGetManyStudentsWithFilterV2"
                ) {
                    return {
                        result: {
                            isLoading: false,
                            refetch: jest.fn(),
                        },
                        data: listStudentWithFilter,
                        pagination: mockPagination,
                    };
                }
            }
        );

        const { result } = renderHook(() =>
            useStudentFilterByCourseGrade({
                isNotLogged: false,
            })
        );

        expect(result.current.data).toEqual(listStudentWithFilter);
        expect(result.current.pagination).toEqual(mockPagination);
    });

    it("should show error when we fail fetch data", () => {
        const showSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: Parameters<typeof inferQuery>[0]["entity"];
                    action:
                        | keyof typeof courseStudentService.query
                        | keyof typeof studentService.query;
                }) =>
                (_params: Object, options?: UseQueryBaseOptions) => {
                    const { entity, action } = resource;
                    switch (entity) {
                        case "courseStudents":
                            if (action === "userGetManyCourseStudentsByCourseIds") {
                                options?.onError?.(new Error("Error COURSE_STUDENTS"));
                            }
                            return { data: [] };
                        case "student":
                            if (
                                action === "userCountStudentV2" ||
                                action === "userCountStudentLocationV2"
                            ) {
                                options?.onError?.(new Error("Error COUNT_STUDENT"));
                            }
                            return { data: {} };
                    }
                }
        );

        (inferQueryPagination as jest.Mock).mockImplementation(
            (resource: {
                    entity: Parameters<typeof inferQuery>[0]["entity"];
                    action: keyof typeof studentService.query;
                }) =>
                (
                    _params: StudentsListByFiltersWithoutGradeAndAggregateQueryVariables,
                    options?: UseQueryBaseOptions<
                        StudentsListByFiltersWithoutGradeAndAggregateQuery["users"] | undefined
                    >
                ) => {
                    if (
                        resource.action === "userGetManyStudentsLocationWithFilterV2" ||
                        resource.action === "userGetManyStudentsWithFilterV2"
                    ) {
                        options?.onError?.(new Error("Error LIST_WITH_FILTER"));
                        return {};
                    }
                }
        );

        renderHook(() =>
            useStudentFilterByCourseGrade({
                isNotLogged: false,
            })
        );

        expect(showSnackbar).toBeCalledTimes(2);
    });
});
