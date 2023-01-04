import { isEmpty } from "lodash";
import { NormalizeStudentInformation } from "src/squads/user/common/types";

import useStudentDetail from "../useStudentDetail";
import useStudentDetailLocation from "../useStudentDetailLocation";

export interface UseNormalizeStudentDetailReturn {
    student?: NormalizeStudentInformation;
    isLoading: boolean;
    refetch: () => void;
}
export default function useNormalizeStudentDetail(
    studentId: string
): UseNormalizeStudentDetailReturn {
    const {
        locations = [],
        isLoading: isLocationLoading,
        refetch: refetchLocation,
    } = useStudentDetailLocation(studentId);

    const {
        student,
        isLoading: isStudentLoading,
        refetch: refetchStudent,
    } = useStudentDetail<NormalizeStudentInformation | undefined>({
        studentId,
        selector: (student) => {
            if (!isEmpty(student)) {
                return {
                    ...student,
                    user: {
                        ...student?.user,
                        locations,
                    },
                };
            }
        },
    });

    const isLoading = isStudentLoading || isLocationLoading;
    const refetch = () => {
        void refetchStudent();
        refetchLocation();
    };

    return {
        student,
        isLoading,
        refetch,
    };
}
