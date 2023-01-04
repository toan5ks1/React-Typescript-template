import { convertString } from "src/common/constants/helper";
import { pick1stElement } from "src/common/utils/other";

import {
    CourseReturnType,
    UseCourseMapStudentReturn,
} from "src/squads/user/hooks/useCourseMapStudent";

const useNormalizeCourses = (coursesData: UseCourseMapStudentReturn["coursesData"]) => {
    const courses = pick1stElement(coursesData)?.courses || [];

    return courses.map((course: CourseReturnType) => ({
        course: {
            course_id: convertString(course.course_id),
            name: convertString(course.name),
            course_access_paths: course.course_access_paths || [],
        },
        studentPackageId: course.student_package_id,
        end: new Date(course.end_date),
        start: new Date(course.start_date),
        location: course.locations[0],
        class: course.class,
    }));
};

export default useNormalizeCourses;
