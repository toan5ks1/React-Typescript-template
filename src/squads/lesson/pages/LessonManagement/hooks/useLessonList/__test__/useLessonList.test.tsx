import { CourseManyType, LocationManyType, TeacherManyType } from "src/common/constants/types";
import { ClassManyType } from "src/squads/lesson/common/types";
import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import {
    CoursesManyQuery,
    CoursesManyQueryVariables,
    Lesson_ClassManyForLessonManagementQuery,
    Lesson_ClassManyForLessonManagementQueryVariables,
    Lesson_LessonReportListByLessonIdsQuery,
    Lesson_LessonReportListByLessonIdsQueryVariables,
    LocationListByIdsQuery,
    LocationListByIdsQueryVariables,
    TeacherManyQuery,
    TeacherManyQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import { inferQuery, inferQueryWithGRPCPagination } from "src/squads/lesson/service/infer-query";
import { UseQueryWithGRPCPaginationOptions } from "src/squads/lesson/service/service-creator";
import { mockFillDataFilter } from "src/squads/lesson/test-utils/lesson-management";
import {
    createMockClassManyList,
    createMockClassObject,
    createMockCourseManyList,
    createMockCourseObject,
    createMockLessonItemList,
    createMockLessonReportManyList,
    createMockLessonReportObject,
    createMockLocationManyList,
    createMockLocationObject,
    createMockRetrieveLesson,
    createMockTeacherManyList,
    createMockTeacherObject,
} from "src/squads/lesson/test-utils/lesson-management-list";
import { MockInferQueryFn } from "src/squads/lesson/test-utils/types";
import { mockWarner } from "src/squads/lesson/test-utils/warner";

import { RetrieveLessonsResponseV2 } from "manabuf/bob/v1/lessons_pb";

import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import { RetrieveLessonsParamsType } from "src/squads/lesson/pages/LessonManagement/common/types";
import useLessonList, {
    UseLessonListReturn,
} from "src/squads/lesson/pages/LessonManagement/hooks/useLessonList";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => {
    return {
        __esModule: true,
        default: () => ({ isEnabled: true }),
    };
});

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
    inferQueryWithGRPCPagination: jest.fn(),
}));

export const mockInferQuery = (_params: {
    locationMockFn?: MockInferQueryFn<
        LocationListByIdsQueryVariables,
        LocationListByIdsQuery["locations"]
    >;
    teacherMockFn?: MockInferQueryFn<
        TeacherManyQueryVariables,
        TeacherManyQuery["find_teacher_by_school_id"]
    >;
    courseMockFn?: MockInferQueryFn<CoursesManyQueryVariables, CoursesManyQuery["courses"]>;
    classMockFn?: MockInferQueryFn<
        Lesson_ClassManyForLessonManagementQueryVariables,
        Lesson_ClassManyForLessonManagementQuery["class"]
    >;
    lessonReportMockFn?: MockInferQueryFn<
        Lesson_LessonReportListByLessonIdsQueryVariables,
        Lesson_LessonReportListByLessonIdsQuery["lesson_reports"]
    >;
}) => {
    const { locationMockFn, teacherMockFn, courseMockFn, classMockFn, lessonReportMockFn } =
        _params;
    (inferQuery as jest.Mock).mockImplementation(
        ({
            entity,
            action,
        }: {
            entity: "teachers" | "locations" | "courses" | "class" | "lessonReports";
            action:
                | "teachersGetMany"
                | "locationsGetMany"
                | "coursesGetMany"
                | "classGetMany"
                | "lessonGetLessonReportListByLessonIds";
        }) => {
            switch (true) {
                case entity === "locations" && action === "locationsGetMany":
                    return locationMockFn;
                case entity === "teachers" && action === "teachersGetMany":
                    return teacherMockFn;
                case entity === "courses" && action === "coursesGetMany":
                    return courseMockFn;
                case entity === "class" && action === "classGetMany":
                    return classMockFn;
                case entity === "lessonReports" &&
                    action === "lessonGetLessonReportListByLessonIds":
                    return lessonReportMockFn;
            }
        }
    );
};

const renderUseLessonListSuccess = (
    retrieveLesson: RetrieveLessonsResponseV2.AsObject,
    teacherList: TeacherManyType[],
    locationList: LocationManyType[],
    coursesList: CourseManyType[],
    classesList: ClassManyType[],
    isFutureLesson: boolean
): RenderHookResult<{}, UseLessonListReturn> => {
    (useShowSnackbar as jest.Mock).mockImplementation(() => jest.fn());

    const inferQueryWithGRPCPaginationReturn = {
        results: { data: retrieveLesson, isFetching: false },
        goToFirstPage: jest.fn(),
    };

    const lessonIds = retrieveLesson.itemsList.map((lesson) => lesson.id);
    const lessonReportList = createMockLessonReportManyList(lessonIds);

    let ran = false;
    let ranSelectorTeacher = false;
    let ranSelectorLocation = false;
    let ranSelectorCourse = false;
    let ranSelectorClass = false;
    let ranSelectorLessonReport = false;

    (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
        () =>
            (
                __: RetrieveLessonsParamsType,
                options?: UseQueryWithGRPCPaginationOptions<RetrieveLessonsResponseV2.AsObject>
            ) => {
                if (!ran) {
                    options?.onSuccess?.(retrieveLesson);
                    ran = true;
                }
                return inferQueryWithGRPCPaginationReturn;
            }
    );

    mockInferQuery({
        locationMockFn: (_, options) => {
            if (!ranSelectorLocation) {
                options?.selector?.(locationList);
                ranSelectorLocation = true;
            }
            return {
                data: createMockLocationObject(),
            };
        },
        teacherMockFn: (_, options) => {
            if (!ranSelectorTeacher) {
                options?.selector?.(teacherList);
                ranSelectorTeacher = true;
            }
            return {
                data: createMockTeacherObject(),
            };
        },
        courseMockFn: (_, options) => {
            if (!ranSelectorCourse) {
                options?.selector?.(coursesList);
                ranSelectorCourse = true;
            }
            return {
                data: createMockCourseObject(),
            };
        },
        classMockFn: (_, options) => {
            if (!ranSelectorClass) {
                options?.selector?.(classesList);
                ranSelectorClass = true;
            }
            return {
                data: createMockClassObject(),
            };
        },
        lessonReportMockFn: (_, options) => {
            if (!ranSelectorLessonReport) {
                options?.selector?.(lessonReportList);
                ranSelectorLessonReport = true;
            }
            return {
                data: createMockLessonReportObject(lessonReportList),
            };
        },
    });

    return renderHook(() => useLessonList({ locationIdsList: [], isFutureLesson }));
};

describe("useLessonList success", () => {
    const retrieveLesson = createMockRetrieveLesson();
    const teacherList = createMockTeacherManyList();
    const locationList = createMockLocationManyList();
    const coursesList = createMockCourseManyList();
    const classesList = createMockClassManyList();

    const lessons = createMockLessonItemList(10);

    it("should return future lesson", () => {
        const { result }: RenderHookResult<{}, UseLessonListReturn> = renderUseLessonListSuccess(
            retrieveLesson,
            teacherList,
            locationList,
            coursesList,
            classesList,
            true
        );

        expect(result.current.lessons).toEqual(lessons);
    });

    it("should return past lesson", () => {
        const { result }: RenderHookResult<{}, UseLessonListReturn> = renderUseLessonListSuccess(
            retrieveLesson,
            teacherList,
            locationList,
            coursesList,
            classesList,
            false
        );

        expect(result.current.lessons).toEqual(lessons);
    });
});

const mockWarnerAndShowSnackbar = () => {
    const showSnackbar = jest.fn();

    (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

    return { showSnackbar };
};

describe("useLessonList handlers error", () => {
    const std = mockWarner();

    it("should get lessons empty", () => {
        let callbackRan = false;
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            () =>
                (
                    _params: NsLesson_Bob_LessonsService.RetrieveLessonsRequest,
                    options?: UseQueryBaseOptions<RetrieveLessonsResponseV2.AsObject | undefined>
                ) => {
                    if (!callbackRan) {
                        options?.onSuccess?.(undefined);
                        callbackRan = true;
                    }

                    const results = { data: {}, isFetching: false };
                    return { results };
                }
        );

        mockInferQuery({
            locationMockFn: () => {
                return {
                    data: {},
                    isFetching: false,
                    refetch: jest.fn(),
                };
            },
            teacherMockFn: () => {
                return {
                    data: {},
                    isFetching: false,
                    refetch: jest.fn(),
                };
            },
            courseMockFn: () => {
                return {
                    data: {},
                    isFetching: false,
                    refetch: jest.fn(),
                };
            },
            classMockFn: () => {
                return {
                    data: {},
                    isFetching: false,
                    refetch: jest.fn(),
                };
            },
            lessonReportMockFn: () => {
                return {
                    data: {},
                    isFetching: false,
                    refetch: jest.fn(),
                };
            },
        });

        const { result }: RenderHookResult<{}, UseLessonListReturn> = renderHook(() =>
            useLessonList({ locationIdsList: [], isFutureLesson: true })
        );

        expect(result.current.lessons).toEqual([]);
    });

    it("should get lessons error", () => {
        const { showSnackbar } = mockWarnerAndShowSnackbar();
        let callbackRan = false;
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            () =>
                (
                    _params: NsLesson_Bob_LessonsService.RetrieveLessonsRequest,
                    options?: UseQueryBaseOptions<
                        NsLesson_Bob_LessonsService.RetrieveLessonsRequest | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        options?.onError?.(Error("ERROR LESSONS"));
                        callbackRan = true;
                    }
                    return { data: {}, isFetching: false };
                }
        );
        renderHook(() => useLessonList({ locationIdsList: [], isFutureLesson: true }));

        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData ERROR LESSONS", "error");

        expect(std.warn).toBeCalledWith(`useLessonList fetchLessonList`, Error("ERROR LESSONS"));
    });

    it("should get locations error", async () => {
        const { showSnackbar } = mockWarnerAndShowSnackbar();

        const retrieveLesson = createMockRetrieveLesson();

        const useQueryWithGRPCPaginationReturn = {
            results: { data: retrieveLesson, isFetching: false },
            goToFirstPage: jest.fn(),
        };
        let callbackRan = false;
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            () =>
                (
                    __: RetrieveLessonsParamsType,
                    options?: UseQueryBaseOptions<RetrieveLessonsResponseV2.AsObject | undefined>
                ) => {
                    if (!callbackRan) {
                        options?.onSuccess?.(retrieveLesson);
                        callbackRan = true;
                    }
                    return useQueryWithGRPCPaginationReturn;
                }
        );
        let callBackRan = false;
        mockInferQuery({
            locationMockFn: (_, options) => {
                if (!callBackRan) {
                    options?.onError?.(Error("ERROR LOCATIONS"));
                    callBackRan = true;
                }

                return { data: {} };
            },
        });

        renderHook(() => useLessonList({ locationIdsList: [], isFutureLesson: true }));

        expect(std.warn).toBeCalledWith(
            "useLessonList fetchLocationList",
            Error("ERROR LOCATIONS")
        );

        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData ERROR LOCATIONS", "error");
    });

    it("should get teachers error", async () => {
        const { showSnackbar } = mockWarnerAndShowSnackbar();

        const locationList = createMockLocationManyList();
        const retrieveLesson = createMockRetrieveLesson();

        const useQueryWithGRPCPaginationReturn = {
            results: { data: retrieveLesson, isFetching: false },
            goToFirstPage: jest.fn(),
        };

        let callbackRan = false;
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            () =>
                (
                    __: RetrieveLessonsParamsType,
                    options?: UseQueryBaseOptions<RetrieveLessonsResponseV2.AsObject | undefined>
                ) => {
                    if (!callbackRan) {
                        options?.onSuccess?.(retrieveLesson);
                        callbackRan = true;
                    }
                    return useQueryWithGRPCPaginationReturn;
                }
        );

        let selectorLocationRan = false;
        let onErrorTeacherRan = false;
        mockInferQuery({
            locationMockFn: (_, options) => {
                if (!selectorLocationRan) {
                    options?.selector?.(locationList);
                    selectorLocationRan = true;
                }
                const result = createMockLocationObject();
                return { data: result };
            },
            teacherMockFn: (_, options) => {
                if (!onErrorTeacherRan) {
                    options?.onError?.(Error("ERROR TEACHERS"));
                    onErrorTeacherRan = true;
                }
                return {
                    data: undefined,
                };
            },
        });

        renderHook(() => useLessonList({ locationIdsList: [], isFutureLesson: true }));

        expect(std.warn).toBeCalledWith("useLessonList fetchTeacherList", Error("ERROR TEACHERS"));

        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData ERROR TEACHERS", "error");
    });

    it("should get course error", async () => {
        const { showSnackbar } = mockWarnerAndShowSnackbar();

        const retrieveLesson = createMockRetrieveLesson();
        const teacherList = createMockTeacherManyList();
        const locationList = createMockLocationManyList();

        const useQueryWithGRPCPaginationReturn = {
            results: { data: retrieveLesson, isFetching: false },
            goToFirstPage: jest.fn(),
        };
        let callbackRan = false;
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            () =>
                (
                    __: RetrieveLessonsParamsType,
                    options?: UseQueryBaseOptions<RetrieveLessonsResponseV2.AsObject | undefined>
                ) => {
                    if (!callbackRan) {
                        options?.onSuccess?.(retrieveLesson);
                        callbackRan = true;
                    }
                    return useQueryWithGRPCPaginationReturn;
                }
        );
        let selectorCourseRan = false;
        let selectorLocationRan = false;
        let selectorTeacherRan = false;
        mockInferQuery({
            locationMockFn: (_, options) => {
                if (!selectorLocationRan) {
                    options?.selector?.(locationList);
                    selectorLocationRan = true;
                }
                const result = createMockLocationObject();
                return { data: result };
            },
            teacherMockFn: (_, options) => {
                if (!selectorTeacherRan) {
                    options?.selector?.(teacherList);
                    selectorTeacherRan = true;
                }
                return {
                    data: createMockTeacherObject(),
                };
            },
            courseMockFn: (_, options) => {
                if (!selectorCourseRan) {
                    options?.onError?.(Error("ERROR COURSES"));
                    selectorCourseRan = true;
                }

                return { data: {} };
            },
        });

        renderHook(() => useLessonList({ locationIdsList: [], isFutureLesson: true }));

        expect(std.warn).toBeCalledWith("useLessonList fetchCoursesList", Error("ERROR COURSES"));

        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData ERROR COURSES", "error");
    });

    it("should get class error", async () => {
        const { showSnackbar } = mockWarnerAndShowSnackbar();

        const retrieveLesson = createMockRetrieveLesson();
        const teacherList = createMockTeacherManyList();
        const locationList = createMockLocationManyList();
        const coursesList = createMockCourseManyList();

        const useQueryWithGRPCPaginationReturn = {
            results: { data: retrieveLesson, isFetching: false },
            goToFirstPage: jest.fn(),
        };

        let callbackRan = false;

        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            () =>
                (
                    __: RetrieveLessonsParamsType,
                    options?: UseQueryBaseOptions<RetrieveLessonsResponseV2.AsObject | undefined>
                ) => {
                    if (!callbackRan) {
                        options?.onSuccess?.(retrieveLesson);
                        callbackRan = true;
                    }
                    return useQueryWithGRPCPaginationReturn;
                }
        );

        let selectorClassRan = false;
        let selectorCourseRan = false;
        let selectorLocationRan = false;
        let selectorTeacherRan = false;

        mockInferQuery({
            locationMockFn: (_, options) => {
                if (!selectorLocationRan) {
                    options?.selector?.(locationList);
                    selectorLocationRan = true;
                }
                const result = createMockLocationObject();
                return { data: result };
            },
            teacherMockFn: (_, options) => {
                if (!selectorTeacherRan) {
                    options?.selector?.(teacherList);
                    selectorTeacherRan = true;
                }
                return {
                    data: createMockTeacherObject(),
                };
            },
            courseMockFn: (_, options) => {
                if (!selectorCourseRan) {
                    options?.selector?.(coursesList);
                    selectorCourseRan = true;
                }
                return {
                    data: createMockCourseObject(),
                };
            },
            classMockFn: (_, options) => {
                if (!selectorClassRan) {
                    options?.onError?.(Error("ERROR CLASSES"));
                    selectorClassRan = true;
                }

                return { data: {} };
            },
        });

        renderHook(() => useLessonList({ locationIdsList: [], isFutureLesson: true }));

        expect(std.warn).toBeCalledWith("useLessonList fetchClassesList", Error("ERROR CLASSES"));

        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData ERROR CLASSES", "error");
    });

    it("should get lesson report error", async () => {
        const { showSnackbar } = mockWarnerAndShowSnackbar();

        const retrieveLesson = createMockRetrieveLesson();
        const teacherList = createMockTeacherManyList();
        const locationList = createMockLocationManyList();
        const coursesList = createMockCourseManyList();
        const classesList = createMockClassManyList();

        const useQueryWithGRPCPaginationReturn = {
            results: { data: retrieveLesson, isFetching: false },
            goToFirstPage: jest.fn(),
        };

        let callbackRan = false;

        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            () =>
                (
                    __: RetrieveLessonsParamsType,
                    options?: UseQueryBaseOptions<RetrieveLessonsResponseV2.AsObject | undefined>
                ) => {
                    if (!callbackRan) {
                        options?.onSuccess?.(retrieveLesson);
                        callbackRan = true;
                    }
                    return useQueryWithGRPCPaginationReturn;
                }
        );

        let selectorClassRan = false;
        let selectorCourseRan = false;
        let selectorLocationRan = false;
        let selectorTeacherRan = false;
        let ranSelectorLessonReport = false;

        mockInferQuery({
            locationMockFn: (_, options) => {
                if (!selectorLocationRan) {
                    options?.selector?.(locationList);
                    selectorLocationRan = true;
                }
                const result = createMockLocationObject();
                return { data: result };
            },
            teacherMockFn: (_, options) => {
                if (!selectorTeacherRan) {
                    options?.selector?.(teacherList);
                    selectorTeacherRan = true;
                }
                return {
                    data: createMockTeacherObject(),
                };
            },
            courseMockFn: (_, options) => {
                if (!selectorCourseRan) {
                    options?.selector?.(coursesList);
                    selectorCourseRan = true;
                }
                return {
                    data: createMockCourseObject(),
                };
            },
            classMockFn: (_, options) => {
                if (!selectorClassRan) {
                    options?.selector?.(classesList);
                    selectorClassRan = true;
                }

                return { data: createMockClassObject() };
            },
            lessonReportMockFn: (_, options) => {
                if (!ranSelectorLessonReport) {
                    options?.onError?.(Error("ERROR LESSON REPORT"));
                    ranSelectorLessonReport = true;
                }

                return { data: {} };
            },
        });

        renderHook(() => useLessonList({ locationIdsList: [], isFutureLesson: true }));

        expect(std.warn).toBeCalledWith(
            "useLessonList fetchLessonReportList",
            Error("ERROR LESSON REPORT")
        );

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData ERROR LESSON REPORT",
            "error"
        );
    });
});

describe("useLessonList execute goToFirstPage correctly", () => {
    const useQueryWithGRPCPaginationReturn = {
        results: {
            data: {
                itemsList: [],
                totalLesson: 0,
                totalItems: 0,
            },
            isFetching: false,
        },
        goToFirstPage: jest.fn(),
    };
    beforeEach(() => {
        let callbackRan = false;
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            () =>
                (
                    __: RetrieveLessonsParamsType,
                    options?: UseQueryBaseOptions<RetrieveLessonsResponseV2.AsObject | undefined>
                ) => {
                    if (!callbackRan) {
                        options?.onSuccess?.(useQueryWithGRPCPaginationReturn.results.data);
                        callbackRan = true;
                    }
                    return useQueryWithGRPCPaginationReturn;
                }
        );

        mockInferQuery({
            locationMockFn: () => {
                return {
                    data: {},
                };
            },
            teacherMockFn: () => {
                return {
                    data: {},
                };
            },
            courseMockFn: () => {
                return {
                    data: {},
                };
            },
            classMockFn: () => {
                return {
                    data: {},
                };
            },
            lessonReportMockFn: () => {
                return {
                    data: {},
                };
            },
        });
    });
    it("should execute goToFirstPage correctly when onSearch", () => {
        const { result }: RenderHookResult<{}, UseLessonListReturn> = renderHook(() =>
            useLessonList({ locationIdsList: [], isFutureLesson: true })
        );

        act(() => {
            result.current.onSearch("");
        });
        expect(useQueryWithGRPCPaginationReturn.goToFirstPage).toBeCalledTimes(0);

        act(() => {
            result.current.onSearch("keyword");
        });
        expect(useQueryWithGRPCPaginationReturn.goToFirstPage).toBeCalledTimes(1);
    });

    it("should execute goToFirstPage correctly when onFilter", () => {
        const { result }: RenderHookResult<{}, UseLessonListReturn> = renderHook(() =>
            useLessonList({ locationIdsList: [], isFutureLesson: true })
        );

        act(() => {
            result.current.onFilter(mockFillDataFilter);
        });
        expect(useQueryWithGRPCPaginationReturn.goToFirstPage).toBeCalledTimes(1);
    });
});
