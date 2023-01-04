import type { PaginationWithTotal } from "src/squads/user/service/service-creator";

export function getMockInvoicePagination(): PaginationWithTotal {
    return {
        offset: 0,
        page: 0,
        limit: 10,
        rowsPerPage: 10,
        count: 0,
        onPageChange: jest.fn(),
        onRowsPerPageChange: jest.fn(),
    };
}
