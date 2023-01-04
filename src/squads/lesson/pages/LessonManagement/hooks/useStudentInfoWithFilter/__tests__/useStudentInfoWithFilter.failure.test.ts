import {
    CoursesManyQuery,
    CoursesManyQueryVariables,
    Lesson_ClassManyForLessonManagementQuery,
    Lesson_ClassManyForLessonManagementQueryVariables,
    StudentsManyQuery,
    StudentsManyQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { NsLesson_Bob_LessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/types";
import { inferQuery, inferQueryWithGRPCPagination } from "src/squads/lesson/service/infer-query";
import { UseQueryWithGRPCPaginationOptions } from "src/squads/lesson/service/service-creator";
import { generateSampleDataWithStudentInfo } from "src/squads/lesson/test-utils/class-course";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";
import { MockInferQueryFn } from "src/squads/lesson/test-utils/types";

import { renderHook } from "@testing-library/react-hooks";
import useGetGradeAndStatusOfStudents from "src/squads/lesson/hooks/useGetGradeAndStatusOfStudents";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useStudentInfoWithFilter from "src/squads/lesson/pages/LessonManagement/hooks/useStudentInfoWithFilter";

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

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
    inferQueryWithGRPCPagination: jest.fn(),
}));

const {
    studentSubscriptionsQueried,
    gradesManyQueried,
    studentsManyQueried,
    coursesManyQueried,
    classesManyQueried,
    studentInfos,
} = generateSampleDataWithStudentInfo();

const mockInferQueryGRPCPagination = () => {
    (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(() => () => {
        return {
            results: {
                data: {
                    itemsList: studentSubscriptionsQueried,
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
    });
};

export const mockUseGetGradeAndStatusOfStudents = () => {
    (useGetGradeAndStatusOfStudents as jest.Mock).mockImplementation(() => {
        return {
            isLoading: false,
            mapGradeOfStudents: gradesManyQueried,
            refetch: jest.fn(),
        };
    });
};

export const mockInferQuery = (
    params: {
        studentMockFn?: MockInferQueryFn<StudentsManyQueryVariables, StudentsManyQuery["users"]>;
        coursesMockFn?: MockInferQueryFn<CoursesManyQueryVariables, CoursesManyQuery["courses"]>;
        classMockFn?: MockInferQueryFn<
            Lesson_ClassManyForLessonManagementQueryVariables,
            Lesson_ClassManyForLessonManagementQuery["class"]
        >;
    } = {}
) => {
    const { studentMockFn, coursesMockFn, classMockFn } = params;

    (inferQuery as jest.Mock).mockImplementation(
        ({
            entity,
            action,
        }: {
            entity: "students" | "courses" | "class";
            action: "studentsGetMany" | "coursesGetMany" | "classGetMany";
        }) => {
            switch (true) {
                case entity === "students" && action === "studentsGetMany":
                    if (studentMockFn) return studentMockFn;
                    return () => ({ data: studentsManyQueried, isFetching: false });

                case entity === "courses" && action === "coursesGetMany":
                    if (coursesMockFn) return coursesMockFn;
                    return () => ({ data: coursesManyQueried, isFetching: false });

                case entity === "class" && action === "classGetMany":
                    if (classMockFn) return classMockFn;
                    return () => ({ data: classesManyQueried, isFetching: false });
            }
        }
    );
};

const mockErrorAndShowSnackbar = () => {
    const showSnackbar = jest.fn();
    (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    return { showSnackbar };
};

describe("useStudentInfoWithFilter", () => {
    it("should return empty data when query student subscriptions fails", () => {
        let ranOnError = false;

        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            () =>
                (
                    _params: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionResponse>
                ) => {
                    if (!ranOnError) {
                        options.onError?.(Error("QUERY FAIL"));
                        ranOnError = true;
                    }

                    return {
                        results: {
                            data: undefined,
                            isFetching: false,
                        },
                        pagination: createMockPaginationWithTotalObject(0, 0),
                        goToFirstPage: jest.fn(),
                    };
                }
        );

        mockInferQuery();
        mockUseGetGradeAndStatusOfStudents();
        const { showSnackbar } = mockErrorAndShowSnackbar();

        const { result } = renderHook(() => useStudentInfoWithFilter());

        expect(result.current.studentInfosList).toEqual([]);
        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData", "error");
    });

    it("should return empty data when query students fails", () => {
        let ranOnError = false;

        mockInferQueryGRPCPagination();

        mockInferQuery({
            studentMockFn: (_, options) => {
                if (!ranOnError) {
                    options.onError?.(Error("QUERY STUDENT FAIL"));
                    ranOnError = true;
                }

                return { data: undefined, isFetching: false };
            },
        });

        mockUseGetGradeAndStatusOfStudents();
        const { showSnackbar } = mockErrorAndShowSnackbar();

        const { result } = renderHook(() => useStudentInfoWithFilter());

        expect(result.current.studentInfosList).toEqual([]);
        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData", "error");
    });

    it("should return empty data when query courses fails", () => {
        let ranOnError = false;

        mockInferQueryGRPCPagination();

        mockInferQuery({
            coursesMockFn: (_, options) => {
                if (!ranOnError) {
                    options.onError?.(Error("QUERY COURSE FAIL"));
                    ranOnError = true;
                }

                return { data: undefined, isFetching: false };
            },
        });

        mockUseGetGradeAndStatusOfStudents();
        const { showSnackbar } = mockErrorAndShowSnackbar();

        const { result } = renderHook(() => useStudentInfoWithFilter());

        expect(result.current.studentInfosList).toEqual([]);
        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData", "error");
    });

    it("should still return list of student information even query classes fail", () => {
        let ranOnError = false;

        mockInferQueryGRPCPagination();

        mockInferQuery({
            classMockFn: (_, options) => {
                if (!ranOnError) {
                    options.onError?.(Error("QUERY COURSE FAIL"));
                    ranOnError = true;
                }

                return { data: undefined, isFetching: false };
            },
        });

        mockUseGetGradeAndStatusOfStudents();
        const { showSnackbar } = mockErrorAndShowSnackbar();

        const { result } = renderHook(() => useStudentInfoWithFilter());

        expect(result.current.studentInfosList).toEqual(
            studentInfos.map((studentInfo) => ({ ...studentInfo, classData: undefined }))
        );
        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData", "error");
    });
});
