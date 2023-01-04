import { GetStudentCourseSubscriptionsRequestQuery } from "src/squads/lesson/common/types";
import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import {
    mockGetStudentSubscriptionsList,
    mockStudentCourseInfos,
} from "src/squads/lesson/test-utils/lesson-management";

import { GetStudentCourseSubscriptionsResponse } from "manabuf/bob/v1/lessons_pb";

import useGetStudentCourseSubscriptions, {
    useGetStudentCourseSubscriptionsReturn,
} from "../useGetStudentCourseSubscriptions";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";

const mockShowSnackbar = jest.fn((str: string) => str);

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: () => mockShowSnackbar,
    };
});

const refetchAction = jest.fn();

const mockInferSuccess = () => {
    (inferQuery as jest.Mock).mockImplementation(
        (__: {
                entity: "lessonStudentSubscriptions";
                action: "lessonStudentSubscriptionsGetStudentCourseSubscription";
            }) =>
            () => {
                return {
                    data: mockGetStudentSubscriptionsList,
                    isLoading: false,
                    refetch: refetchAction,
                };
            }
    );
};

describe("useGetStudentCourseSubcriptions hook", () => {
    it("should return student subcriptions correctly", () => {
        mockInferSuccess();
        const { result }: RenderHookResult<string[], useGetStudentCourseSubscriptionsReturn> =
            renderHook(() =>
                useGetStudentCourseSubscriptions({ studentCourseInfos: mockStudentCourseInfos })
            );

        const expectedOutPutForHook = mockGetStudentSubscriptionsList.itemsList;
        expect(result.current.studentSubscriptions).toEqual(expectedOutPutForHook);
    });

    it("should update student course subscription", async () => {
        mockInferSuccess();

        const { result }: RenderHookResult<string[], useGetStudentCourseSubscriptionsReturn> =
            renderHook(() =>
                useGetStudentCourseSubscriptions({ studentCourseInfos: mockStudentCourseInfos })
            );

        await result.current.refetchStudentCourseSubscriptions();
        expect(refetchAction).toBeCalledTimes(1);
    });
});

describe("useGetStudentCourseSubcriptions hook with some failure when fetch data", () => {
    it("should show snackbar when there is error", () => {
        let ranCallBack = false;
        (inferQuery as jest.Mock).mockImplementation(
            (_: {
                    entity: "lessonStudentSubscriptions";
                    action: "lessonStudentSubscriptionsGetStudentCourseSubscription";
                }) =>
                (
                    _params: GetStudentCourseSubscriptionsRequestQuery,
                    options: UseQueryBaseOptions<
                        GetStudentCourseSubscriptionsResponse.AsObject | undefined
                    >
                ) => {
                    if (!ranCallBack) {
                        options?.onError?.(Error("ERROR STUDENT COURSE SUBSCRIPTIONS"));
                        ranCallBack = true;
                    }
                    return { data: undefined, isLoading: false };
                }
        );

        renderHook(() =>
            useGetStudentCourseSubscriptions({ studentCourseInfos: mockStudentCourseInfos })
        );

        expect(mockShowSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData ERROR STUDENT COURSE SUBSCRIPTIONS",
            "error"
        );
    });
});
