import { createContext, useContext } from "react";

import type { UseNormalizeStudentDetailReturn } from "src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail";

export interface StudentDetailContextReturn extends UseNormalizeStudentDetailReturn {
    studentId: string;
}

const StudentDetailContext = createContext<StudentDetailContextReturn>({
    studentId: "",
    student: undefined,
    isLoading: false,
    refetch: () => {},
});

StudentDetailContext.displayName = "StudentDetailContext";

const useStudentDetailContext = () => useContext(StudentDetailContext);
export { StudentDetailContext, useStudentDetailContext };
