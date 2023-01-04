import { useMemo } from "react";

import { safeStringify } from "src/common/utils/other";

import useCourseMapStudent, { ICourseAndStudent } from "src/squads/user/hooks/useCourseMapStudent";

export interface UseNormalizeCoursesReturn {
    loaded: boolean;
    courses: ICourseAndStudent[];
    mapCourses: Map<string, ICourseAndStudent>;
}

const useNormalizeCourses = (studentIds: string[]): UseNormalizeCoursesReturn => {
    const { loaded, coursesData } = useCourseMapStudent(studentIds);

    const mapCourses = useMemo(() => {
        const map = new Map<string, ICourseAndStudent>();
        coursesData.forEach((course) => {
            map.set(course.studentId, course);
        });

        return map;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [safeStringify(coursesData)]);

    return {
        loaded,
        courses: coursesData,
        mapCourses: mapCourses,
    };
};
export default useNormalizeCourses;
