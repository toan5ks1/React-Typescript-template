import { createMockMapGradeOfStudents } from "src/squads/user/test-utils/mocks/student";

import { UseGetGradeAndStatusOfStudentsReturn } from "../useGetGradeAndStatusOfStudents";

export default (): UseGetGradeAndStatusOfStudentsReturn => ({
    mapGradeOfStudents: createMockMapGradeOfStudents(),
    isLoading: false,
    refetch: jest.fn(),
});
