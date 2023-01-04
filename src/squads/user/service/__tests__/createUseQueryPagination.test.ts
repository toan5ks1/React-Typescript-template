import { ChangeEvent, MouseEvent } from "react";

import { safeStringify } from "src/common/utils/other";
import {
    User_StaffListV2Query,
    User_StaffListV2QueryVariables,
} from "src/squads/user/service/bob/bob-types";
import {
    createUseQueryPagination,
    DataWithTotal,
    UseQueryPaginationOptions,
    UseQueryPaginationReturn,
} from "src/squads/user/service/service-creator";
import { TestQueryWrapper } from "src/squads/user/test-utils/providers";
import { mockWarner } from "src/squads/user/test-utils/warner";

import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";

const service = {
    teacher: {
        query: {
            LIST: jest.fn(),
        },
    },
};

const mockTeacherList: User_StaffListV2Query["find_teacher_by_school_id"] = [
    {
        name: "Teacher Name 16012333350505",
        email: "teacher16012333350505@example.com",
        user_id: "teacherId",
        resource_path: "-2147483644",
    },
];

const mockTeacher: DataWithTotal<User_StaffListV2Query["find_teacher_by_school_id"]> = {
    data: mockTeacherList,
    total: mockTeacherList.length,
};

const defaultUseQueryPaginationParams: Omit<User_StaffListV2QueryVariables, "limit" | "offset"> = {
    school_id: 1,
    user_email: "user@gmail.com",
    user_name: "User name",
};

const defaultUseQueryPaginationOptions: UseQueryPaginationOptions<
    DataWithTotal<User_StaffListV2Query["find_teacher_by_school_id"] | undefined>
> = {
    enabled: true,
};

const renderUseQueryPaginationHook = (
    params: Omit<
        User_StaffListV2QueryVariables,
        "limit" | "offset"
    > = defaultUseQueryPaginationParams,
    options: UseQueryPaginationOptions<
        DataWithTotal<User_StaffListV2Query["find_teacher_by_school_id"] | undefined>
    > = defaultUseQueryPaginationOptions
): RenderHookResult<
    unknown,
    UseQueryPaginationReturn<
        DataWithTotal<User_StaffListV2Query["find_teacher_by_school_id"] | undefined>
    >
> => {
    const useQueryPagination = createUseQueryPagination(service)({
        entity: "teacher",
        action: "LIST",
    });

    return renderHook(() => useQueryPagination(params, options), {
        wrapper: TestQueryWrapper,
    });
};

const mockTeacherService = (
    teacherData: DataWithTotal<
        User_StaffListV2Query["find_teacher_by_school_id"] | undefined
    > = mockTeacher
) => {
    (service.teacher.query.LIST as jest.Mock).mockImplementation(
        (_variables: User_StaffListV2QueryVariables) => {
            return teacherData;
        }
    );
};

describe("createUseQueryPagination create infer query pagination", () => {
    const std = mockWarner();

    it("should return correct data when called", async () => {
        mockTeacherService();

        const { result, waitFor } = renderUseQueryPaginationHook();

        expect(service.teacher.query.LIST).toBeCalledWith({
            pagination: {
                limit: 10,
                offset: 0,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.teacher.query.LIST).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockTeacher);
    });

    it("should fetch again when change page", async () => {
        const defaultOffset = 2;
        const defaultLimit = 5;

        mockTeacherService();

        const { result, waitFor, waitForNextUpdate } = renderUseQueryPaginationHook(
            defaultUseQueryPaginationParams,
            {
                enabled: true,
                defaultLimit,
                defaultOffset,
            }
        );

        expect(service.teacher.query.LIST).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: defaultOffset,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.teacher.query.LIST).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockTeacher);

        const nextPage = result.current.pagination.page + 1;

        act(() => {
            result.current.pagination.onPageChange({} as MouseEvent<HTMLButtonElement>, nextPage);
        });

        await waitForNextUpdate();

        expect(service.teacher.query.LIST).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: nextPage * defaultLimit,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.teacher.query.LIST).toBeCalledTimes(2);
    });

    it("should fetch again when change number item per page", async () => {
        const defaultOffset = 2;
        const defaultLimit = 5;

        mockTeacherService();

        const { result, waitFor, waitForNextUpdate } = renderUseQueryPaginationHook(
            defaultUseQueryPaginationParams,
            {
                enabled: true,
                defaultLimit,
                defaultOffset,
            }
        );

        expect(service.teacher.query.LIST).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: defaultOffset,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.teacher.query.LIST).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockTeacher);

        const newRowsPerPage = 10;
        const fakeEvent = { target: { value: newRowsPerPage.toString() } } as ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >;

        act(() => {
            result.current.pagination.onRowsPerPageChange(fakeEvent);
        });

        await waitForNextUpdate();

        expect(service.teacher.query.LIST).toBeCalledWith({
            pagination: {
                limit: newRowsPerPage,
                offset: 0,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.teacher.query.LIST).toBeCalledTimes(2);
    });

    it("should fetch from default offset after offset reset", async () => {
        const defaultOffset = 2;
        const defaultLimit = 5;

        mockTeacherService();

        const { result, waitFor, waitForNextUpdate } = renderUseQueryPaginationHook(
            defaultUseQueryPaginationParams,
            {
                enabled: true,
                defaultLimit,
                defaultOffset,
            }
        );

        expect(service.teacher.query.LIST).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: defaultOffset,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.teacher.query.LIST).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockTeacher);

        const nextPage = result.current.pagination.page + 1;

        act(() => {
            result.current.pagination.onPageChange({} as MouseEvent<HTMLButtonElement>, nextPage);
        });

        await waitForNextUpdate();

        expect(service.teacher.query.LIST).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: nextPage * defaultLimit,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.teacher.query.LIST).toBeCalledTimes(2);

        act(() => {
            result.current.resetPaginationOffset();
        });

        await waitForNextUpdate();

        expect(service.teacher.query.LIST).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: defaultOffset,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.teacher.query.LIST).toBeCalledTimes(3);
    });

    it("should log warning when service throw error", async () => {
        const teacherError = Error("$$__Teacher service error");

        (service.teacher.query.LIST as jest.Mock).mockImplementation(
            (_variables: User_StaffListV2QueryVariables) => {
                throw teacherError;
            }
        );
        const { waitForNextUpdate } = renderUseQueryPaginationHook();

        await waitForNextUpdate();

        const queryKey = [
            "teacher_LIST",
            {
                request: {
                    pagination: {
                        limit: 10,
                        offset: 0,
                    },
                    ...defaultUseQueryPaginationParams,
                },
            },
        ];

        expect(std.warn).toBeCalledWith(`UseQuery ${safeStringify(queryKey)}`, teacherError);
    });
});
