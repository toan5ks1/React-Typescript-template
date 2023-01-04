import { ChangeEvent, MouseEvent } from "react";

import type { PaginationWithTotal } from "@manabie-com/react-utils";

export function createFakePagination(
    overrides?: Partial<PaginationWithTotal>
): PaginationWithTotal {
    return {
        offset: 0,
        page: 0,
        limit: 10,
        rowsPerPage: 10,
        count: 0,
        onPageChange: (_event: MouseEvent<HTMLButtonElement> | null, _nextPage: number) => {},
        onRowsPerPageChange: (_e: ChangeEvent<any>) => {},
        ...overrides,
    };
}

export const createMockPaginationWithTotalObject = (
    totalItems: number = 10,
    currentPage: number = 0 // Because first page have value equal 0
): PaginationWithTotal => {
    return {
        count: totalItems,
        limit: totalItems,
        page: currentPage,
        rowsPerPage: totalItems,
        onPageChange: jest.fn(),
        onRowsPerPageChange: jest.fn(),
        offset: totalItems,
    };
};
