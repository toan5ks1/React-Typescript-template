import logger from "src/squads/syllabus/internals/logger";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useAutocompleteReference from "../useAutocompleteReference";

import { renderHook, act } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/internals/logger");

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

describe(useAutocompleteReference.name, () => {
    const entity = "book";
    const action = "BOOK_GET_LIST";

    const useQueryFn = jest.fn();
    beforeEach(() => {
        (inferQuery as jest.Mock).mockReturnValue(useQueryFn);
    });

    it("should called correct with action and entity", () => {
        renderHook(() =>
            useAutocompleteReference({
                entity,
                action,
                params: (keyword) => ({
                    name: keyword,
                }),
            })
        );

        const [params] = getLatestCallParams(inferQuery as jest.Mock);

        expect(params).toEqual({ action, entity });
    });

    it("should query with correct query variables", async () => {
        useQueryFn.mockReturnValue({});

        const { result, waitForNextUpdate } = renderHook(() =>
            useAutocompleteReference({
                entity,
                action,
                params: (keyword) => ({
                    name: keyword,
                    limit: 10,
                    offset: 0,
                }),
            })
        );

        const [params] = getLatestCallParams(useQueryFn);

        expect(params).toEqual({ name: "", limit: 10, offset: 0 });

        const searchKeyword = "I want to search Hieusmiths";

        act(() => {
            result.current.setInputVal(searchKeyword);
        });

        await waitForNextUpdate();

        const [paramsWithNewKeyword] = getLatestCallParams(useQueryFn);

        expect(paramsWithNewKeyword).toEqual({ name: searchKeyword, limit: 10, offset: 0 });
    });

    it("should call the onError prop and logger when error", async () => {
        const onErrorFn = jest.fn();
        renderHook(() =>
            useAutocompleteReference({
                entity,
                action,
                params: (keyword) => ({
                    name: keyword,
                    limit: 10,
                    offset: 0,
                }),
                onError: onErrorFn,
            })
        );

        const [_, options] = getLatestCallParams(useQueryFn);

        describe("should enable query", () => {
            expect(options.enabled).toEqual(true);
        });

        const error = new Error("Can't load data");
        options.onError(error);

        describe("should call logger warn for when error", () => {
            const msg = `[useAutocompleteReference] ${entity}-${action}`;
            expect(logger.warn).toBeCalledWith(msg, error);
        });

        describe("should call the onError prop when we passed", () => {
            expect(onErrorFn).toBeCalledWith(error);
        });
    });
});
