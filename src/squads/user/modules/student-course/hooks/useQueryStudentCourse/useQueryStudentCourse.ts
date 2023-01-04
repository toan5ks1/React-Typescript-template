import { StudentPackageClientWithLocation } from "src/squads/user/common/types/student";

import useCourseMapStudent, {
    UseCourseMapStudentReturn,
} from "src/squads/user/hooks/useCourseMapStudent";
import useNormalizeCourses from "src/squads/user/modules/student-course/hooks/useNormalizeCourses";

export interface UseQueryStudentCourseReturn
    extends Pick<UseCourseMapStudentReturn, "loaded" | "refetch"> {
    courses: StudentPackageClientWithLocation[];
}

const useQueryStudentCourse = (id: string): UseQueryStudentCourseReturn => {
    const { coursesData, loaded, refetch } = useCourseMapStudent([id]);

    const courses = useNormalizeCourses(coursesData);

    return {
        courses,
        loaded,
        refetch,
    };
};
export default useQueryStudentCourse;
