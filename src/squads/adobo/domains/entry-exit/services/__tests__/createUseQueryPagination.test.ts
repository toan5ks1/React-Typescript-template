import { ChangeEvent, MouseEvent } from "react";

import { safeStringify } from "src/common/utils/other";
import {
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQuery,
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables,
} from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service-bob/bob-types";
import {
    createUseQueryPagination,
    DataWithTotal,
    UseQueryPaginationOptions,
    UseQueryPaginationReturn,
} from "src/squads/adobo/domains/entry-exit/services/service-creator";
import { getMockEntryExitRecordsData } from "src/squads/adobo/domains/entry-exit/test-utils/mocks/entry-exit";
import { TestQueryWrapper } from "src/squads/adobo/domains/entry-exit/test-utils/react-hooks";
import { mockWarner } from "src/squads/adobo/domains/entry-exit/test-utils/warner";

import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";

const service = {
    studentEntryExitRecords: {
        query: {
            LIST_WITH_FILTER: jest.fn(),
        },
    },
};

const mockEntryExitRecords = getMockEntryExitRecordsData();

const mockStudentEntryExitRecords: DataWithTotal<
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQuery["student_entryexit_records"]
> = {
    data: mockEntryExitRecords,
    total: mockEntryExitRecords.length,
};

const defaultUseQueryPaginationParams: Omit<
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables,
    "limit" | "offset"
> = {
    student_id: "studeid",
};

const defaultUseQueryPaginationOptions: UseQueryPaginationOptions<
    DataWithTotal<
        | EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQuery["student_entryexit_records"]
        | undefined
    >
> = {
    enabled: true,
};

const renderUseQueryPaginationHook = (
    params: Omit<
        EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables,
        "limit" | "offset"
    > = defaultUseQueryPaginationParams,
    options: UseQueryPaginationOptions<
        DataWithTotal<
            | EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQuery["student_entryexit_records"]
            | undefined
        >
    > = defaultUseQueryPaginationOptions
): RenderHookResult<
    unknown,
    UseQueryPaginationReturn<
        DataWithTotal<
            | EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQuery["student_entryexit_records"]
            | undefined
        >
    >
> => {
    const useQueryPagination = createUseQueryPagination(service)({
        entity: "studentEntryExitRecords",
        action: "LIST_WITH_FILTER",
    });

    return renderHook(() => useQueryPagination(params, options), {
        wrapper: TestQueryWrapper,
    });
};

const mockStudentEntryExitRecordsService = (
    studentEntryExitRecordsData: DataWithTotal<
        | EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQuery["student_entryexit_records"]
        | undefined
    > = mockStudentEntryExitRecords
) => {
    (service.studentEntryExitRecords.query.LIST_WITH_FILTER as jest.Mock).mockImplementation(
        (_variables: EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables) => {
            return studentEntryExitRecordsData;
        }
    );
};

describe("createUseQueryPagination create infer query pagination", () => {
    const std = mockWarner();

    it("should return correct data when called", async () => {
        mockStudentEntryExitRecordsService();

        const { result, waitFor } = renderUseQueryPaginationHook();

        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledWith({
            pagination: {
                limit: 10,
                offset: 0,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockStudentEntryExitRecords);
    });

    it("should fetch again when change page", async () => {
        const defaultOffset = 2;
        const defaultLimit = 5;

        mockStudentEntryExitRecordsService();

        const { result, waitFor, waitForNextUpdate } = renderUseQueryPaginationHook(
            defaultUseQueryPaginationParams,
            {
                enabled: true,
                defaultLimit,
                defaultOffset,
            }
        );

        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: defaultOffset,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockStudentEntryExitRecords);

        const nextPage = result.current.pagination.page + 1;

        act(() => {
            result.current.pagination.onPageChange({} as MouseEvent<HTMLButtonElement>, nextPage);
        });

        await waitForNextUpdate();

        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: nextPage * defaultLimit,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledTimes(2);
    });

    it("should fetch again when change number item per page", async () => {
        const defaultOffset = 2;
        const defaultLimit = 5;

        mockStudentEntryExitRecordsService();

        const { result, waitFor, waitForNextUpdate } = renderUseQueryPaginationHook(
            defaultUseQueryPaginationParams,
            {
                enabled: true,
                defaultLimit,
                defaultOffset,
            }
        );

        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: defaultOffset,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockStudentEntryExitRecords);

        const newRowsPerPage = 10;
        const fakeEvent = { target: { value: newRowsPerPage.toString() } } as ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >;

        act(() => {
            result.current.pagination.onRowsPerPageChange(fakeEvent);
        });

        await waitForNextUpdate();

        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledWith({
            pagination: {
                limit: newRowsPerPage,
                offset: 0,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledTimes(2);
    });

    it("should fetch from default offset after offset reset", async () => {
        const defaultOffset = 2;
        const defaultLimit = 5;

        mockStudentEntryExitRecordsService();

        const { result, waitFor, waitForNextUpdate } = renderUseQueryPaginationHook(
            defaultUseQueryPaginationParams,
            {
                enabled: true,
                defaultLimit,
                defaultOffset,
            }
        );

        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: defaultOffset,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockStudentEntryExitRecords);

        const nextPage = result.current.pagination.page + 1;

        act(() => {
            result.current.pagination.onPageChange({} as MouseEvent<HTMLButtonElement>, nextPage);
        });

        await waitForNextUpdate();

        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: nextPage * defaultLimit,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledTimes(2);

        act(() => {
            result.current.resetPaginationOffset();
        });

        await waitForNextUpdate();

        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledWith({
            pagination: {
                limit: defaultLimit,
                offset: defaultOffset,
            },
            ...defaultUseQueryPaginationParams,
        });
        expect(service.studentEntryExitRecords.query.LIST_WITH_FILTER).toBeCalledTimes(3);
    });

    it("should log warning when service throw error", async () => {
        const studentEntryExitRecords = Error("$$__StudentEntryExitRecords service error");

        (service.studentEntryExitRecords.query.LIST_WITH_FILTER as jest.Mock).mockImplementation(
            (
                _variables: EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables
            ) => {
                throw studentEntryExitRecords;
            }
        );

        const { waitForNextUpdate } = renderUseQueryPaginationHook();

        await waitForNextUpdate();

        const queryKey = [
            "studentEntryExitRecords_LIST_WITH_FILTER",
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

        expect(std.warn).toBeCalledWith(
            `UseQuery ${safeStringify(queryKey)}`,
            studentEntryExitRecords
        );
    });
});
