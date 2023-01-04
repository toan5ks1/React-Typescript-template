import { Entities, SearchEngine } from "src/common/constants/enum";

import useQueryParams, { QueryParamsReturn } from "../useQueryParams";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";

describe("useQueryParams", () => {
    const oldWindowLocation = window.location;

    beforeEach(() => {
        window.location = {
            ...oldWindowLocation,
            search: `?${SearchEngine.PARENT_ID}=01EQ7MHCX5BK2TERYPDPF26TM5`,
        };
    });

    it("should render connect params", () => {
        const { result }: RenderHookResult<boolean, QueryParamsReturn> = renderHook(() => {
            return useQueryParams({ resource: Entities.LOS });
        });

        expect(result.current.queryParams?.length).toEqual(3);

        expect(result.current.queryParams[0].resource).toEqual(Entities.BOOKS);
        expect(result.current.queryParams[0].query).toEqual(SearchEngine.BOOK_ID);

        expect(result.current.queryParams[1].resource).toEqual(Entities.CHAPTERS);
        expect(result.current.queryParams[1].query).toEqual(SearchEngine.CHAPTER_ID);

        expect(result.current.queryParams[2].resource).toEqual(Entities.TOPICS);
        expect(result.current.queryParams[2].query).toEqual(SearchEngine.PARENT_ID);
    });
});
