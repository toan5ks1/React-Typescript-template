import useGetGradeAndStatusOfStudents, {
    GradeStudent,
} from "src/squads/user/hooks/useGetGradeAndStatusOfStudents";
import useGetStudentGradeNameByCountry from "src/squads/user/hooks/useGetStudentGradeNameByCountry";

export interface UseNormalizedGradesReturn {
    loading: boolean;
    mapGrades: Map<string, GradeStudent>;
    getGradeName: (currentGrade?: number) => string | undefined;
}

const useNormalizeGrades = (studentIds: string[]): UseNormalizedGradesReturn => {
    const { getStudentGradeName } = useGetStudentGradeNameByCountry();
    const { mapGradeOfStudents, isLoading } = useGetGradeAndStatusOfStudents(studentIds);

    return {
        loading: isLoading,
        mapGrades: mapGradeOfStudents,
        getGradeName: getStudentGradeName,
    };
};
export default useNormalizeGrades;
