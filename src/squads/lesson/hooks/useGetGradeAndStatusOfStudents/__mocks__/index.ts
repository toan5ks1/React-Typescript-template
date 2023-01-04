import { createMockMapGradeOfStudents } from "src/squads/lesson/test-utils/student";

import { UseGetGradeAndStatusOfStudentsReturn } from "src/squads/lesson/hooks/useGetGradeAndStatusOfStudents";

export default (): UseGetGradeAndStatusOfStudentsReturn => ({
    mapGradeOfStudents: createMockMapGradeOfStudents(),
    isLoading: false,
    refetch: jest.fn(),
});
