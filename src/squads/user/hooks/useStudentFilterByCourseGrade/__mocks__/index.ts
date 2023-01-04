import { createMockStudentsFilterByCourseGrade } from "src/squads/user/test-utils/mocks/student";

import { UseStudentFilterByCourseGradeReturn } from "../useStudentFilterByCourseGrade";

export const mockStudentFilterByCourseGrade = {
    data: createMockStudentsFilterByCourseGrade(),
    isLoading: false,
    pagination: {
        count: 1,
        onPageChange: jest.fn(),
        onRowsPerPageChange: jest.fn(),
        page: 0,
        rowsPerPage: 5,
        limit: 10,
        offset: 0,
    },
    refetchStudents: jest.fn(),
    resetPaginationOffset: jest.fn(),
    isFetching: false,
};

export default (): UseStudentFilterByCourseGradeReturn => mockStudentFilterByCourseGrade;
