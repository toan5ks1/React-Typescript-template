import { createMockPaginationWithTotalObject } from "src/squads/user/test-utils/mocks/pagination";

import { UseQueryStudentsReturn } from "../useQueryStudents";

const mockPagination = createMockPaginationWithTotalObject();

export const useQueryStudents: UseQueryStudentsReturn = {
    students: [],
    loading: false,
    pagination: mockPagination,
    refetchStudents: jest.fn(),
    resetPaginationOffset: jest.fn(),
    isFetching: false,
};

export default () => useQueryStudents;
