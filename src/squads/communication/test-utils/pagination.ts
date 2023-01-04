import { PaginationWithTotal } from "@manabie-com/react-utils";

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
