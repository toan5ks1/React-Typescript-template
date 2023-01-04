import {
    CoursesManyQuery,
    CoursesManyQueryVariables,
    StudentsManyQuery,
    StudentsManyQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { NsLesson_Bob_LessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/types";
import { inferQuery, inferQueryWithGRPCPagination } from "src/squads/lesson/service/infer-query";
import { UseQueryWithGRPCPaginationOptions } from "src/squads/lesson/service/service-creator";
import {
    mockCoursesMany,
    mockGrades,
    mockGradesList,
    mockStudentInfoList,
    mockStudentsMany,
    mockStudentSubscriptionsList,
} from "src/squads/lesson/test-utils/lesson-management";
import { getLatestCallParams } from "src/squads/lesson/test-utils/mock-utils";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";
import { MockInferQueryFn } from "src/squads/lesson/test-utils/types";

import { RetrieveStudentSubscriptionResponse } from "manabuf/bob/v1/lessons_pb";

import useLessonStudentInfoListFilter from "../useLessonStudentInfoListFilter";

import { act, renderHook } from "@testing-library/react-hooks";
import useGetGradeAndStatusOfStudents, {
    GradeStudent,
    UseGetGradeAndStatusOfStudentsReturn,
} from "src/squads/lesson/hooks/useGetGradeAndStatusOfStudents";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useGetGradeAndStatusOfStudents", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useGetGradeAndStatusOfStudents", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
    inferQueryWithGRPCPagination: jest.fn(),
}));

export const mockInferQueryGRPCPagination = () => {
    (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
        (_request: {
                entity: "lessonStudentSubscriptions";
                action: "lessonStudentSubscriptionsRetrieveStudentSubscription";
            }) =>
            (
                _params: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest,
                _options: UseQueryWithGRPCPaginationOptions<RetrieveStudentSubscriptionResponse.AsObject>
            ) => {
                const results = {
                    results: {
                        data: {
                            itemsList: mockStudentSubscriptionsList,
                            nextPage: jest.fn(),
                            previousPage: jest.fn(),
                            totalLesson: 10,
                            totalItems: 10,
                        },
                        isFetching: false,
                    },
                    pagination: createMockPaginationWithTotalObject(10, 0),
                    goToFirstPage: jest.fn(),
                };

                return results;
            }
    );
};

export const mockUseGetGradeAndStatusOfStudents = () => {
    (useGetGradeAndStatusOfStudents as jest.Mock).mockImplementation((studentIdsList: string[]) => {
        const mapGrades = new Map<GradeStudent["student_id"], GradeStudent>();
        studentIdsList.forEach((studentId, index) => {
            mapGrades.set(studentId, mockGradesList[index]);
        });
        return {
            isLoading: false,
            mapGradeOfStudents: mapGrades,
            refetch: jest.fn(),
        } as UseGetGradeAndStatusOfStudentsReturn;
    });
};

export const mockInferQueryStudent = (mockData: StudentsManyQuery["users"]) => {
    (inferQuery as jest.Mock).mockImplementation(
        (__: { entity: "students"; action: "studentsGetMany" }) => () => {
            return {
                data: mockData,
                isFetching: false,
            };
        }
    );
};

export const mockInferQuery = (params?: {
    studentMockFn?: MockInferQueryFn<StudentsManyQueryVariables, StudentsManyQuery["users"]>;
    coursesMockFn?: MockInferQueryFn<CoursesManyQueryVariables, CoursesManyQuery["courses"]>;
}) => {
    const { studentMockFn, coursesMockFn } = params || {};

    (inferQuery as jest.Mock).mockImplementation(
        ({
            entity,
            action,
        }: {
            entity: "students" | "courses";
            action: "studentsGetMany" | "coursesGetMany";
        }) => {
            switch (true) {
                case entity === "students" && action === "studentsGetMany":
                    if (studentMockFn) return studentMockFn;
                    return () => ({ data: mockStudentsMany, isFetching: false });

                case entity === "courses" && action === "coursesGetMany":
                    if (coursesMockFn) return coursesMockFn;
                    return () => ({ data: mockCoursesMany, isFetching: false });
            }
        }
    );
};

describe("useLessonStudentInfoListFilter fetch data success", () => {
    beforeEach(() => {
        mockInferQueryGRPCPagination();
        mockInferQuery();
        mockUseGetGradeAndStatusOfStudents();
    });

    it("should return student info list", () => {
        const { result } = renderHook(() => useLessonStudentInfoListFilter());

        expect(result.current.isFetchingStudentsCourses).toEqual(false);
        expect(result.current.isLoadingGrades).toEqual(false);
        expect(result.current.data).toMatchObject(mockStudentInfoList);
    });
});

describe("useLessonStudentInfoListFilter test search and filter", () => {
    let mockCallBackFn = jest.fn();
    beforeEach(() => {
        mockCallBackFn = jest.fn(
            (
                _params: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest,
                _options: UseQueryWithGRPCPaginationOptions<RetrieveStudentSubscriptionResponse.AsObject>
            ) => {
                const results = {
                    results: {
                        data: {
                            itemsList: mockStudentSubscriptionsList,
                            nextPage: jest.fn(),
                            previousPage: jest.fn(),
                            totalLesson: 10,
                            totalItems: 10,
                        },
                        isFetching: false,
                    },
                    pagination: createMockPaginationWithTotalObject(10, 0),
                    goToFirstPage: jest.fn(),
                };

                return results;
            }
        );

        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (_request: {
                entity: "lessonStudentSubscriptions";
                action: "lessonStudentSubscriptionsRetrieveStudentSubscription";
            }) => mockCallBackFn
        );
        mockInferQuery();
        mockUseGetGradeAndStatusOfStudents();
    });

    it("should call query with filter params", () => {
        const { result } = renderHook(() => useLessonStudentInfoListFilter());

        act(() => {
            result.current.handleApplyFilterCriteria({
                courses: mockCoursesMany,
                grades: mockGrades,
            });
        });
        const expectedQueryParams = [
            {
                filter: {
                    courseIdList: ["Course_Id_1", "Course_Id_2"],
                    gradeList: ["0"],
                    classIdList: [],
                    locationIdList: [],
                },
                keyword: "",
            },
            {
                defaultPaging: { limit: 5, offsetInteger: 0, offsetString: "" },
                enabled: true,
                onError: expect.any(Function),
            },
        ];
        expect(getLatestCallParams(mockCallBackFn)).toEqual(expectedQueryParams);
    });

    it("should call query with search string params", () => {
        const { result } = renderHook(() => useLessonStudentInfoListFilter());

        act(() => {
            result.current.handleEnterSearchBar("Search String");
        });

        const expectedQueryParams = [
            {
                filter: { courseIdList: [], gradeList: [], classIdList: [], locationIdList: [] },
                keyword: "Search String",
            },
            {
                defaultPaging: { limit: 5, offsetInteger: 0, offsetString: "" },
                enabled: true,
                onError: expect.any(Function),
            },
        ];
        expect(getLatestCallParams(mockCallBackFn)).toEqual(expectedQueryParams);
    });
});
