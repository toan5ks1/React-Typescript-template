import { safeStringify } from "src/common/utils/other";
import {
    UseQueryBaseOptions,
    UseQueryBaseV2Return,
} from "src/squads/syllabus/hooks/data/data-types";
import logger from "src/squads/syllabus/internals/logger";
import {
    BooksOneQuery,
    BooksOneQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { createUseQuery } from "src/squads/syllabus/services/service-creator";
import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/internals/logger");
jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => {
    // FIXME: DDD LT-12785
    return {
        __esModule: true,
        default: () => ({ isEnabled: false }),
    };
});

const service = {
    book: {
        query: {
            BOOK_GET_ONE: jest.fn(),
        },
    },
};

const mockBook: ArrayElement<BooksOneQuery["books"]> = {
    book_chapters: [{ chapter_id: "Chapter" }],
    book_id: "bookId",
    name: "Book Name",
    school_id: 0,
};

const defaultUseQueryParams: BooksOneQueryVariables = {
    book_id: "book_id_1",
};

const defaultUseQueryOptions: UseQueryBaseOptions<
    ArrayElement<BooksOneQuery["books"]> | undefined
> = {
    enabled: true,
};

const renderUseQueryHook = (
    params: BooksOneQueryVariables = defaultUseQueryParams,
    options: UseQueryBaseOptions<
        ArrayElement<BooksOneQuery["books"]> | undefined
    > = defaultUseQueryOptions
): RenderHookResult<
    unknown,
    UseQueryBaseV2Return<ArrayElement<BooksOneQuery["books"]> | undefined>
> => {
    const useQuery = createUseQuery(service)({
        entity: "book",
        action: "BOOK_GET_ONE",
    });

    return renderHook(() => useQuery(params, options), {
        wrapper: TestQueryWrapper,
    });
};

const mockProductPackageService = (
    productPackageData: ArrayElement<BooksOneQuery["books"]> | undefined = mockBook
) => {
    (service.book.query.BOOK_GET_ONE as jest.Mock).mockImplementation(
        (_variables: BooksOneQueryVariables) => {
            return productPackageData;
        }
    );
};

describe("createUseQuery create infer query", () => {
    it("should return correct data when infer query is called", async () => {
        mockProductPackageService();

        const { result, waitFor } = renderUseQueryHook();

        expect(service.book.query.BOOK_GET_ONE).toBeCalledWith(defaultUseQueryParams);
        expect(service.book.query.BOOK_GET_ONE).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockBook);
    });

    it("should be able to refetch the data", async () => {
        mockProductPackageService();

        const { result, waitFor } = renderUseQueryHook();

        expect(service.book.query.BOOK_GET_ONE).toBeCalledWith(defaultUseQueryParams);
        expect(service.book.query.BOOK_GET_ONE).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(mockBook);

        await act(async () => {
            await result.current.refetch();
        });

        expect(service.book.query.BOOK_GET_ONE).toBeCalledWith(defaultUseQueryParams);
        expect(service.book.query.BOOK_GET_ONE).toBeCalledTimes(2);
    });

    it("should log warning when service throw error", async () => {
        const bookError = Error("$$__Book service error");

        (service.book.query.BOOK_GET_ONE as jest.Mock).mockImplementation(
            (_variables: BooksOneQueryVariables) => {
                throw bookError;
            }
        );

        const { waitForNextUpdate } = renderUseQueryHook();

        await waitForNextUpdate();

        const queryKey = ["book_BOOK_GET_ONE", { request: defaultUseQueryParams }];

        expect(logger.warn).toBeCalledWith(`[UseQuery ${safeStringify(queryKey)}]`, bookError);
    });
});
