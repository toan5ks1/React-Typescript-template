import { PaginationWithTotal } from "../useQueryWithPagination";

export const createDefaultPaginationWithTotal = (
    options: Partial<PaginationWithTotal> = {}
): PaginationWithTotal => {
    return {
        offset: 0,
        page: 0,
        limit: 10,
        rowsPerPage: 10,
        count: 0,
        onPageChange: jest.fn(),
        onRowsPerPageChange: jest.fn(),
        ...options,
    };
};
