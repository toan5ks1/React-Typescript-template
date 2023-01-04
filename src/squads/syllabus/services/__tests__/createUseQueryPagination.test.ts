import { ChangeEvent, MouseEvent } from "react";

import { safeStringify } from "src/common/utils/other";
import logger from "src/squads/syllabus/internals/logger";
import {
    createUseQueryPagination,
    DataWithTotal,
    UseQueryPaginationOptions,
    UseQueryPaginationReturn,
} from "src/squads/syllabus/services/service-creator";
import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";

import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";
import { mockBookGetListData } from "src/squads/syllabus/services/eureka/book-service/__mocks__/book-service-query";

jest.mock("src/squads/syllabus/internals/logger");

interface ListQuery {
    book_id: string;
    name: string;
}

interface ListQueryVariables {
    name?: string;
    limit?: number;
    offset?: number;
}

const service = {
    book: {
        query: {
            BOOK_GET_LIST: jest.fn(),
        },
    },
};

const defaultUseQueryPaginationParams: Omit<ListQueryVariables, "limit" | "offset"> = {
    name: "Book name",
};

const defaultUseQueryPaginationOptions: UseQueryPaginationOptions<
    DataWithTotal<ListQuery[] | undefined>
> = {
    enabled: true,
};

const renderUseQueryPaginationHook = (
    params: Omit<ListQueryVariables, "limit" | "offset"> = defaultUseQueryPaginationParams,
    options: UseQueryPaginationOptions<
        DataWithTotal<ListQuery[] | undefined>
    > = defaultUseQueryPaginationOptions
): RenderHookResult<unknown, UseQueryPaginationReturn<DataWithTotal<ListQuery[] | undefined>>> => {
    const useQueryPagination = createUseQueryPagination(service)({
        entity: "book",
        action: "BOOK_GET_LIST",
    });

    return renderHook(() => useQueryPagination(params, options), {
        wrapper: TestQueryWrapper,
    });
};

const mockBookService = (
    bookData: DataWithTotal<ListQuery[] | undefined> = mockBookGetListData
) => {
    (service.book.query.BOOK_GET_LIST as jest.Mock).mockImplementation(() => {
        return bookData;
    });
};

describe("createUseQueryPagination create infer query pagination", () => {
    it("should return correct data when called", async () => {
        mockBookService();

        const { result, waitFor } = renderUseQueryPaginationHook();

        expect(service.book.query.BOOK_GET_LIST).toBeCalledWith({
            ...defaultUseQueryPaginationParams,
            limit: 10,
            offset: 0,
        });
        expect(service.book.query.BOOK_GET_LIST).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockBookGetListData);
    });

    it("should fetch again when change page", async () => {
        const defaultOffset = 2;
        const defaultLimit = 5;

        mockBookService();

        const { result, waitFor, waitForNextUpdate } = renderUseQueryPaginationHook(
            defaultUseQueryPaginationParams,
            {
                enabled: true,
                defaultLimit,
                defaultOffset,
            }
        );

        expect(service.book.query.BOOK_GET_LIST).toBeCalledWith({
            ...defaultUseQueryPaginationParams,
            limit: defaultLimit,
            offset: defaultOffset,
        });
        expect(service.book.query.BOOK_GET_LIST).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockBookGetListData);

        const nextPage = result.current.pagination.page + 1;

        act(() => {
            result.current.pagination.onPageChange({} as MouseEvent<HTMLButtonElement>, nextPage);
        });

        await waitForNextUpdate();

        expect(service.book.query.BOOK_GET_LIST).toBeCalledWith({
            ...defaultUseQueryPaginationParams,
            limit: defaultLimit,
            offset: nextPage * defaultLimit,
        });
        expect(service.book.query.BOOK_GET_LIST).toBeCalledTimes(2);
    });

    it("should fetch again when change number item per page", async () => {
        const defaultOffset = 2;
        const defaultLimit = 5;

        mockBookService();

        const { result, waitFor, waitForNextUpdate } = renderUseQueryPaginationHook(
            defaultUseQueryPaginationParams,
            {
                enabled: true,
                defaultLimit,
                defaultOffset,
            }
        );

        expect(service.book.query.BOOK_GET_LIST).toBeCalledWith({
            ...defaultUseQueryPaginationParams,
            limit: defaultLimit,
            offset: defaultOffset,
        });
        expect(service.book.query.BOOK_GET_LIST).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockBookGetListData);

        const newRowsPerPage = 10;
        const fakeEvent = { target: { value: newRowsPerPage.toString() } } as ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >;

        act(() => {
            result.current.pagination.onRowsPerPageChange(fakeEvent);
        });

        await waitForNextUpdate();

        expect(service.book.query.BOOK_GET_LIST).toBeCalledWith({
            ...defaultUseQueryPaginationParams,
            limit: newRowsPerPage,
            offset: 0,
        });
        expect(service.book.query.BOOK_GET_LIST).toBeCalledTimes(2);
    });

    it("should fetch from default offset after offset reset", async () => {
        const defaultOffset = 2;
        const defaultLimit = 5;

        mockBookService();

        const { result, waitFor, waitForNextUpdate } = renderUseQueryPaginationHook(
            defaultUseQueryPaginationParams,
            {
                enabled: true,
                defaultLimit,
                defaultOffset,
            }
        );

        expect(service.book.query.BOOK_GET_LIST).toBeCalledWith({
            ...defaultUseQueryPaginationParams,
            limit: defaultLimit,
            offset: defaultOffset,
        });
        expect(service.book.query.BOOK_GET_LIST).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockBookGetListData);

        const nextPage = result.current.pagination.page + 1;

        act(() => {
            result.current.pagination.onPageChange({} as MouseEvent<HTMLButtonElement>, nextPage);
        });

        await waitForNextUpdate();

        expect(service.book.query.BOOK_GET_LIST).toBeCalledWith({
            ...defaultUseQueryPaginationParams,
            limit: defaultLimit,
            offset: nextPage * defaultLimit,
        });
        expect(service.book.query.BOOK_GET_LIST).toBeCalledTimes(2);

        act(() => {
            result.current.resetPaginationOffset();
        });

        await waitForNextUpdate();

        expect(service.book.query.BOOK_GET_LIST).toBeCalledWith({
            ...defaultUseQueryPaginationParams,
            limit: defaultLimit,
            offset: defaultOffset,
        });
        expect(service.book.query.BOOK_GET_LIST).toBeCalledTimes(3);
    });

    it("should log warning when service throw error", async () => {
        const bookError = Error("$$__Book service error");

        (service.book.query.BOOK_GET_LIST as jest.Mock).mockImplementation(() => {
            throw bookError;
        });

        const { waitForNextUpdate } = renderUseQueryPaginationHook();

        await waitForNextUpdate();

        const queryKey = [
            "book_BOOK_GET_LIST",
            { request: { limit: 10, offset: 0, ...defaultUseQueryPaginationParams } },
        ];

        expect(logger.warn).toBeCalledWith(`[UseQuery ${safeStringify(queryKey)}]`, bookError);
    });
});
