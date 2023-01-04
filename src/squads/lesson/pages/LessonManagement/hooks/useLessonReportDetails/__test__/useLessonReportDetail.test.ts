import { ArrayElement } from "src/common/constants/types";
import {
    LessonGroupByIdQuery,
    LessonGroupByIdQueryVariables,
    LessonReportByLessonIdQuery,
    Lesson_ClassByClassIdForLessonManagementQuery,
    Lesson_ClassByClassIdForLessonManagementQueryVariables,
    Lesson_LessonByLessonIdForLessonManagementV3Query,
    Lesson_LessonByLessonIdForLessonManagementV3QueryVariables,
    Lesson_SchedulerBySchedulerIdQuery,
    Lesson_SchedulerBySchedulerIdQueryVariables,
    LocationByLocationIdQuery,
    LocationByLocationIdQueryVariables,
    MediasManyQuery,
    MediasManyQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import {
    createMockLiveLessonGroup,
    createMockMedia,
    mockWeeklyRecurringScheduler,
} from "src/squads/lesson/test-utils/lesson-management";
import { MockInferQueryFn } from "src/squads/lesson/test-utils/types";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useGetStudentCourseSubscriptions from "src/squads/lesson/hooks/useGetStudentCourseSubscriptions";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import {
    lessonData,
    lessonReports,
    recurringLessonData,
    studentCourseSubscriptions,
} from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import useLessonReportDetails, {
    UseLessonReportDetailsReturn,
} from "src/squads/lesson/pages/LessonManagement/hooks/useLessonReportDetails";

const mockLesson: ArrayElement<Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]> =
    recurringLessonData;

const mockLessonReportData: ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]> =
    lessonReports[0];

const refetchAction = jest.fn();

const mockStudentCourseSubscriptionsReturn = {
    isLoadingStudentSubscriptions: false,
    studentSubscriptions: studentCourseSubscriptions,
    refetchStudentCourseSubscriptions: () => refetchAction,
};

const mockLocation: ArrayElement<LocationByLocationIdQuery["locations"]> = {
    location_id: "locationId1",
    name: "Center 1",
};

const mockClass: ArrayElement<Lesson_ClassByClassIdForLessonManagementQuery["class"]> = {
    class_id: "classId1",
    name: "Class name 1",
};

const mockSchedulerData: ArrayElement<Lesson_SchedulerBySchedulerIdQuery["scheduler"]> =
    mockWeeklyRecurringScheduler;

const mockMediasList = createMockMedia();

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useGetStudentCourseSubscriptions", () => {
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

export const mockInferQuery = (params?: {
    lessonMockFn?: MockInferQueryFn<
        Lesson_LessonByLessonIdForLessonManagementV3QueryVariables,
        ArrayElement<Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]>
    >;
    lessonReportMockFn?: MockInferQueryFn<
        LessonGroupByIdQueryVariables,
        ArrayElement<LessonGroupByIdQuery["lesson_groups"]>
    >;
    lessonGroupsMockFn?: MockInferQueryFn<
        LessonGroupByIdQueryVariables,
        ArrayElement<LessonGroupByIdQuery["lesson_groups"]>
    >;
    locationMockFn?: MockInferQueryFn<
        LocationByLocationIdQueryVariables,
        ArrayElement<LocationByLocationIdQuery["locations"]>
    >;
    mediaMockFn?: MockInferQueryFn<MediasManyQueryVariables, MediasManyQuery["media"]>;
    classMockFn?: MockInferQueryFn<
        Lesson_ClassByClassIdForLessonManagementQueryVariables,
        ArrayElement<Lesson_ClassByClassIdForLessonManagementQuery["class"]>
    >;
    schedulerMockFn?: MockInferQueryFn<
        Lesson_SchedulerBySchedulerIdQueryVariables,
        ArrayElement<Lesson_SchedulerBySchedulerIdQuery["scheduler"]>
    >;
}) => {
    const {
        lessonReportMockFn,
        lessonGroupsMockFn,
        lessonMockFn,
        locationMockFn,
        mediaMockFn,
        classMockFn,
        schedulerMockFn,
    } = params || {};

    const refetchLesson = jest.fn();
    const refetchLessonReport = jest.fn();
    const refetchLessonGroup = jest.fn();
    const refetchLocation = jest.fn();
    const refetchMedia = jest.fn();
    const refetchClass = jest.fn();
    const refetchScheduler = jest.fn();

    (inferQuery as jest.Mock).mockImplementation(
        ({
            entity,
            action,
        }: {
            entity:
                | "lessonReports"
                | "lessons"
                | "lessonGroups"
                | "locations"
                | "media"
                | "class"
                | "scheduler";
            action:
                | "lessonReportsGetOne"
                | "lessonsGetOne"
                | "lessonGroupsGetOne"
                | "locationsGetOne"
                | "mediaGetMany"
                | "classGetOne"
                | "schedulerGetOne";
        }) => {
            switch (true) {
                case entity === "lessons" && action === "lessonsGetOne":
                    if (lessonMockFn) return lessonMockFn;
                    return () => ({
                        data: mockLesson,
                        isLoading: false,
                        isRefetching: false,
                        refetch: refetchLesson.mockResolvedValue({
                            data: mockLesson,
                        }),
                    });

                case entity === "lessonReports" && action === "lessonReportsGetOne": {
                    if (lessonReportMockFn) return lessonReportMockFn;
                    return () => ({
                        data: mockLessonReportData,
                        isLoading: false,
                        isRefetching: false,
                        refetch: refetchLessonReport,
                    });
                }

                case entity === "lessonGroups" && action === "lessonGroupsGetOne": {
                    if (lessonGroupsMockFn) return lessonGroupsMockFn;
                    return () => {
                        const data = createMockLiveLessonGroup("01");

                        return {
                            data,
                            refetch: refetchLessonGroup.mockResolvedValue({
                                data: {
                                    media_ids: data.media_ids,
                                    lesson_group_id: data.lesson_group_id,
                                },
                            }),
                        };
                    };
                }

                case entity === "locations" && action === "locationsGetOne": {
                    if (locationMockFn) return locationMockFn;
                    return () => ({
                        data: mockLocation,
                        refetch: refetchLocation,
                    });
                }

                case entity === "media" && action === "mediaGetMany": {
                    if (mediaMockFn) return mediaMockFn;
                    return () => ({
                        data: mockMediasList,
                        refetch: refetchMedia,
                    });
                }

                case entity === "class" && action === "classGetOne": {
                    if (classMockFn) return classMockFn;
                    return () => ({
                        data: mockClass,
                        refetch: refetchClass,
                    });
                }

                case entity === "scheduler" && action === "schedulerGetOne": {
                    if (schedulerMockFn) return schedulerMockFn;
                    return () => ({
                        data: mockSchedulerData,
                        refetch: refetchScheduler,
                    });
                }
            }
        }
    );

    return {
        refetchLesson,
        refetchLessonReport,
        refetchLessonGroup,
        refetchLocation,
        refetchMedia,
        refetchClass,
        refetchScheduler,
    };
};

describe("useLessonReportDetails", () => {
    const showSnackbar = jest.fn((str: string) => str);

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (useGetStudentCourseSubscriptions as jest.Mock).mockImplementation(() => {
            return mockStudentCourseSubscriptionsReturn;
        });
    });

    it("should return data correctly", () => {
        mockInferQuery();

        const { result }: RenderHookResult<string[], UseLessonReportDetailsReturn> = renderHook(
            () => useLessonReportDetails({ lessonId: lessonData.lesson_id })
        );

        expect(result.current.lessonData).toEqual({
            ...mockLesson,
            studentSubscriptions: studentCourseSubscriptions,
        });
        expect(result.current.lessonReports).toEqual(mockLessonReportData);
        expect(result.current.mediasList).toEqual(mockMediasList);
        expect(result.current.classData).toEqual(mockClass);
    });

    it("should show snackbar when fetching lesson has error", () => {
        let callbackRan = false;
        mockInferQuery({
            lessonMockFn: (_, options) => {
                if (!callbackRan) {
                    options?.onError?.(Error("ERROR LESSONS"));
                    callbackRan = true;
                }
                return { data: undefined, isFetching: false, refetch: jest.fn() };
            },
        });

        renderHook(() => useLessonReportDetails({ lessonId: lessonData.lesson_id }));

        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData ERROR LESSONS", "error");
    });

    it("should show snackbar when fetching lesson report has error", () => {
        let ranOnError = false;

        mockInferQuery({
            lessonReportMockFn: (_, options) => {
                if (!ranOnError) {
                    options?.onError?.(Error("ERROR LESSON REPORT"));
                    ranOnError = true;
                }

                return { data: undefined, isFetching: false, refetch: jest.fn() };
            },
        });

        renderHook(() => useLessonReportDetails({ lessonId: lessonData.lesson_id }));

        expect(showSnackbar).toBeCalledWith(
            "resources.lesson_management.errors.unableToGetLessonReport",
            "error"
        );
    });

    it("should show snackbar when fetching center has error", () => {
        let ranOnError = false;

        mockInferQuery({
            locationMockFn: (_, options) => {
                if (!ranOnError) {
                    options?.onError?.(Error("ERROR LOCATION FETCHING"));
                    ranOnError = true;
                }
                return { data: {} };
            },
        });

        renderHook(() => useLessonReportDetails({ lessonId: lessonData.lesson_id }));

        expect(showSnackbar).toBeCalledWith(
            "resources.lesson_management.errors.unableToFetchCenter",
            "error"
        );
    });

    it("should show snackbar when fetching lesson groups has error", () => {
        let ranOnError = false;

        mockInferQuery({
            lessonGroupsMockFn: (_, options) => {
                if (!ranOnError) {
                    options.onError?.(Error("ERROR_GET_LESSON_GROUP"));
                    ranOnError = true;
                }

                return { data: [], isFetching: false };
            },
        });

        renderHook(() => useLessonReportDetails({ lessonId: lessonData.lesson_id }));

        expect(showSnackbar).toBeCalledWith(
            "resources.lesson_management.errors.unableToFetchLessonGroup",
            "error"
        );
    });

    it("should show snackbar when fetching medias has error", () => {
        let ranOnError = false;
        mockInferQuery({
            mediaMockFn: (_, options) => {
                if (!ranOnError) {
                    options?.onError?.(Error("ERROR MEDIA"));
                    ranOnError = true;
                }
                return {
                    data: undefined,
                };
            },
        });

        renderHook(() => useLessonReportDetails({ lessonId: lessonData.lesson_id }));

        expect(showSnackbar).toBeCalledWith(
            "resources.lesson_management.errors.unableToFetchMedia",
            "error"
        );
    });

    it("should show snackbar when fetching class has error", () => {
        let ranOnError = false;

        mockInferQuery({
            classMockFn: (_, options) => {
                if (!ranOnError) {
                    options?.onError?.(Error("ERROR CLASS FETCHING"));
                    ranOnError = true;
                }
                return { data: {} };
            },
        });

        renderHook(() => useLessonReportDetails({ lessonId: lessonData.lesson_id }));

        expect(showSnackbar).toBeCalledWith(
            "resources.lesson_management.errors.unableToFetchClass",
            "error"
        );
    });

    it("should show snackbar when fetching scheduler has error", () => {
        let ranOnError = false;

        mockInferQuery({
            schedulerMockFn: (_, options) => {
                if (!ranOnError) {
                    options?.onError?.(Error("ERROR SCHEDULER FETCHING"));
                    ranOnError = true;
                }
                return { data: {} };
            },
        });

        renderHook(() => useLessonReportDetails({ lessonId: lessonData.lesson_id }));

        expect(showSnackbar).toBeCalledWith(
            "resources.lesson_management.errors.unableToFetchSchedule",
            "error"
        );
    });
});

describe("useLessonReportDetails update", () => {
    const showSnackbar = jest.fn((str: string) => str);

    it("should update lesson and lesson report details", async () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (useGetStudentCourseSubscriptions as jest.Mock).mockImplementation(() => {
            return mockStudentCourseSubscriptionsReturn;
        });
        const {
            refetchLesson,
            refetchLessonReport,
            refetchLessonGroup,
            refetchLocation,
            refetchMedia,
            refetchClass,
            refetchScheduler,
        } = mockInferQuery();
        const { result }: RenderHookResult<string[], UseLessonReportDetailsReturn> = renderHook(
            () => useLessonReportDetails({ lessonId: lessonData.lesson_id })
        );

        await result.current.refetchLessonAndLessonReportDetail!();

        expect(refetchLesson).toBeCalled();
        expect(refetchLessonReport).toBeCalled();
        expect(refetchLessonGroup).toBeCalled();
        expect(refetchLocation).toBeCalled();
        expect(refetchMedia).toBeCalled();
        expect(refetchClass).toBeCalled();
        expect(refetchScheduler).toBeCalled();
    });

    it("should update for lesson report details", async () => {
        (useGetStudentCourseSubscriptions as jest.Mock).mockImplementation(() => {
            return mockStudentCourseSubscriptionsReturn;
        });

        const { refetchLesson, refetchLessonReport } = mockInferQuery();
        const { result }: RenderHookResult<string[], UseLessonReportDetailsReturn> = renderHook(
            () => useLessonReportDetails({ lessonId: lessonData.lesson_id })
        );

        await result.current.refetchForLessonReport.refetch();

        expect(refetchLesson).toBeCalled();
        expect(refetchLessonReport).toBeCalled();
    });
});
