import { useMemo, Children, ReactNode } from "react";

import { StudentDetailContext } from "src/squads/user/contexts/StudentDetailContext";
import useNormalizeStudentDetail from "src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail";

export interface StudentDetailProviderProps {
    id: string;
    children: ReactNode;
}

const StudentDetailProvider = (props: StudentDetailProviderProps) => {
    const { id, children } = props;

    const { student, isLoading, refetch } = useNormalizeStudentDetail(id);

    const value = useMemo(() => {
        return {
            studentId: id,
            student,
            isLoading,
            refetch,
        };
    }, [id, student, isLoading, refetch]);

    return (
        <StudentDetailContext.Provider value={value}>
            {Children.only(children)}
        </StudentDetailContext.Provider>
    );
};

export default StudentDetailProvider;
