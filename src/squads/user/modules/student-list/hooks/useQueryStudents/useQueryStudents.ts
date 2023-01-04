import { Grade } from "src/models/grade";
import { CourseAttrsFragment } from "src/squads/user/service/bob/bob-types";

import { UseFilterStudentsReturn } from "../useFilterStudents";

import useStudentFilterByCourseGrade, {
    UseStudentFilterByCourseGradeReturn,
} from "src/squads/user/hooks/useStudentFilterByCourseGrade";

export interface UseQueryStudentsReturn
    extends Pick<
        UseStudentFilterByCourseGradeReturn,
        "pagination" | "refetchStudents" | "resetPaginationOffset" | "isFetching"
    > {
    students: UseStudentFilterByCourseGradeReturn["data"];
    loading: UseStudentFilterByCourseGradeReturn["isLoading"];
}

const useQueryStudents = (filter: UseFilterStudentsReturn["filter"]): UseQueryStudentsReturn => {
    const { keyword, grades, courses, isNotLogged, locationIds } = filter;
    const gradeIds = grades.map((grade: Grade) => grade.id);
    const courseIds = courses.map((course: CourseAttrsFragment) => course.course_id);

    const { data, isLoading, ...restProps } = useStudentFilterByCourseGrade({
        studentName: keyword,
        gradeIds,
        courseIds,
        isNotLogged,
        locationIds,
    });

    return { students: data, loading: isLoading, ...restProps };
};
export default useQueryStudents;
