import { mockWarner } from "src/squads/lesson//test-utils/warner";
import { NsLesson_Bob_LessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/types";
import { inferQueryWithGRPCPagination } from "src/squads/lesson/service/infer-query";
import { UseQueryWithGRPCPaginationOptions } from "src/squads/lesson/service/service-creator";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";

import { RetrieveStudentSubscriptionResponse } from "manabuf/bob/v1/lessons_pb";

import { renderHook } from "@testing-library/react-hooks";
import useLessonStudentInfoListFilter from "src/squads/lesson/hooks/useLessonStudentInfoListFilter";
import {
    mockInferQuery,
    mockInferQueryGRPCPagination,
    mockUseGetGradeAndStatusOfStudents,
} from "src/squads/lesson/hooks/useLessonStudentInfoListFilter/__test__/useLessonStudentInfoListFilter.testSuccess.test";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/lesson/hooks/useGetGradeAndStatusOfStudents", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
    inferQueryWithGRPCPagination: jest.fn(),
}));
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

const mockErrorAndShowSnackbar = () => {
    const showSnackbar = jest.fn();
    (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    return { showSnackbar };
};

describe("useLessonStudentInfoListFilter fetch data fail", () => {
    beforeEach(() => {
        mockInferQueryGRPCPagination();
        mockUseGetGradeAndStatusOfStudents();
    });

    const std = mockWarner();

    it("should return empty when fetch student subscriptions fail", () => {
        mockInferQuery();
        mockUseGetGradeAndStatusOfStudents();

        const { showSnackbar } = mockErrorAndShowSnackbar();

        let ranOnError = false;
        const response = {
            results: {
                data: undefined,
                isLoading: false,
            },
            pagination: createMockPaginationWithTotalObject(10, 0),
            goToFirstPage: jest.fn(),
        };
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            () =>
                (
                    _params: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest,
                    options?: UseQueryWithGRPCPaginationOptions<RetrieveStudentSubscriptionResponse.AsObject>
                ) => {
                    if (!ranOnError) {
                        options?.onError?.(Error("FETCH DATA FAIL"));
                        ranOnError = true;
                    }
                    return response;
                }
        );

        const { result } = renderHook(() => useLessonStudentInfoListFilter());

        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData", "error");
        expect(std.warn).toBeCalledWith(
            "Error useLessonStudentSubscriptionsListFilter student subscriptions: FETCH DATA FAIL"
        );

        expect(result.current.data).toEqual([]);
    });

    it("should return empty when fetch courses fail", () => {
        mockInferQueryGRPCPagination();
        mockUseGetGradeAndStatusOfStudents();

        const { showSnackbar } = mockErrorAndShowSnackbar();

        let ranOnError = false;

        mockInferQuery({
            coursesMockFn: (_, options) => {
                if (!ranOnError) {
                    options.onError?.(Error("ERROR_GET_COURSES"));
                    ranOnError = true;
                }

                return { data: [], isFetching: false };
            },
        });

        const { result } = renderHook(() => useLessonStudentInfoListFilter());

        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData", "error");
        expect(std.warn).toBeCalledWith(
            "Error useLessonStudentSubscriptionsListFilter courses: ERROR_GET_COURSES"
        );

        expect(result.current.data).toEqual([]);
    });

    it("should return empty when fetch students fail", () => {
        mockInferQuery();
        mockInferQueryGRPCPagination();
        mockUseGetGradeAndStatusOfStudents();

        const { showSnackbar } = mockErrorAndShowSnackbar();

        let ranOnError = false;

        mockInferQuery({
            studentMockFn: (_, options) => {
                if (!ranOnError) {
                    options?.onError?.(Error("FETCH DATA FAIL"));
                    ranOnError = true;
                }

                return { data: [], isFetching: false };
            },
        });

        const { result } = renderHook(() => useLessonStudentInfoListFilter());

        expect(showSnackbar).toBeCalledWith("ra.message.unableToLoadData", "error");
        expect(std.warn).toBeCalledWith(
            "Error useLessonStudentSubscriptionsListFilter students: FETCH DATA FAIL"
        );

        expect(result.current.data).toEqual([]);
    });
});
