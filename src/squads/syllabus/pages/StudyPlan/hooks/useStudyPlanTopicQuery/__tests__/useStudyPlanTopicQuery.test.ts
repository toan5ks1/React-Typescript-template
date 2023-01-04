import { ChangeEvent } from "react";

import { UseQueryBaseV2Return } from "src/squads/syllabus/hooks/data/data-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { ListTopicsByStudyPlanResponse } from "manabuf/eureka/v1/course_reader_pb";

import useStudyPlanTopicQuery from "..";

import { act, renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const defaultResult: Partial<UseQueryBaseV2Return<ListTopicsByStudyPlanResponse.AsObject>> = {
    isFetching: false,
    data: { itemsList: [], nextPage: { limit: 10, offsetInteger: 0, offsetString: "" } },
};

describe(useStudyPlanTopicQuery.name, () => {
    it("it should not change page when the data is still being fetched", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({ ...defaultResult, isFetching: true }));

        const { result } = renderHook(() => useStudyPlanTopicQuery(""));

        expect(result.current.pagination.page).toEqual(0);
        expect(result.current.pagination.offset).toEqual(0);
        result.current.pagination.onPageChange(null, 1);
        expect(result.current.pagination.page).toEqual(0);
        expect(result.current.pagination.offset).toEqual(0);
    });

    it("should handle page change correctly", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => defaultResult);

        const { result } = renderHook(() => useStudyPlanTopicQuery(""));

        expect(result.current.pagination.page).toEqual(0);
        expect(result.current.pagination.offset).toEqual(0);

        act(() => {
            result.current.pagination.onPageChange(null, 1);
        });

        expect(result.current.pagination.page).toEqual(1);
        expect(result.current.pagination.offset).toEqual(10);

        act(() => {
            result.current.pagination.onPageChange(null, 0);
        });

        expect(result.current.pagination.page).toEqual(0);
        expect(result.current.pagination.offset).toEqual(0);
    });

    it("should not change row setting when the data is still being fetched", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({ ...defaultResult, isFetching: true }));

        const { result } = renderHook(() => useStudyPlanTopicQuery(""));

        expect(result.current.pagination.limit).toEqual(10);

        act(() => {
            result.current.pagination.onRowsPerPageChange({
                target: { value: "5" },
            } as ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.pagination.limit).toEqual(10);
    });

    it("should handle row setting change correctly", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => defaultResult);

        const { result } = renderHook(() => useStudyPlanTopicQuery(""));

        expect(result.current.pagination.limit).toEqual(10);
        expect(result.current.pagination.rowsPerPage).toEqual(10);

        act(() => {
            result.current.pagination.onRowsPerPageChange({
                target: { value: "5" },
            } as ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.pagination.limit).toEqual(5);
        expect(result.current.pagination.rowsPerPage).toEqual(5);
    });
});
