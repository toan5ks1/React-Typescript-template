import { ChangeEvent, MouseEvent } from "react";

import usePagination from "../usePagination";

import { renderHook, act } from "@testing-library/react-hooks";

describe(usePagination.name, () => {
    it("should redirect to the first page whenever item per page is changed", () => {
        const { result } = renderHook(() =>
            usePagination({ defaultLimit: 10, defaultOffset: 100 })
        );

        // The current page not the first page
        expect(result.current.page).toEqual(10);

        act(() => {
            result.current.onRowsPerPageChange({
                target: { value: "20" },
            } as ChangeEvent<HTMLTextAreaElement>);
        });
        // Redirected to the first page
        expect(result.current.page).toEqual(0);

        // Change the another page
        act(() => {
            result.current.onPageChange({} as MouseEvent<HTMLButtonElement>, 3);
        });

        // Continue change total-items/page
        act(() => {
            result.current.onRowsPerPageChange({
                target: { value: "10" },
            } as ChangeEvent<HTMLTextAreaElement>);
        });

        // Redirected to the first page
        expect(result.current.page).toEqual(0);
    });
});
