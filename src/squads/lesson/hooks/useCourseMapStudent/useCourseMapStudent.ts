import { useMemo } from "react";

import uniq from "lodash/uniq";
import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { CoursesManyQuery } from "src/squads/lesson/service/bob/bob-types";
import { User_StudentPackagesByListStudentIdV2Query } from "src/squads/lesson/service/fatima/fatima-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface ICourses extends ArrayElement<CoursesManyQuery["courses"]> {}
export interface CourseReturnType {
    name: ArrayElement<CoursesManyQuery["courses"]>["name"];
    course_id: ArrayElement<CoursesManyQuery["courses"]>["course_id"];
    student_package_id: ArrayElement<
        User_StudentPackagesByListStudentIdV2Query["student_packages"]
    >["student_package_id"];
    start_date: ArrayElement<
        User_StudentPackagesByListStudentIdV2Query["student_packages"]
    >["start_at"];
    end_date: ArrayElement<
        User_StudentPackagesByListStudentIdV2Query["student_packages"]
    >["end_at"];
}

export interface IStudentPackage
    extends ArrayElement<User_StudentPackagesByListStudentIdV2Query["student_packages"]> {}

export interface ICourseAndStudent {
    studentId: ArrayElement<
        User_StudentPackagesByListStudentIdV2Query["student_packages"]
    >["student_id"];
    courses: CourseReturnType[];
}

export interface UseCourseMapStudentReturn {
    coursesData: ICourseAndStudent[];
    loaded: boolean;
    refetch: () => void;
    rawCourses?: ICourses[];
}

const mapCoursesEachUniqStudent = (
    studentPackages: IStudentPackage[],
    mapCourses: Map<string, ICourses>
) => {
    const mapData = new Map<string, ICourseAndStudent>();

    studentPackages.forEach((studentPackage) => {
        const result = mapData.get(studentPackage.student_id!)!;

        const courses: CourseReturnType[] = [];
        (studentPackage.properties.can_do_quiz || []).forEach((course_id: string) => {
            courses.push({
                name: mapCourses.get(course_id)?.name || "",
                student_package_id: studentPackage.student_package_id,
                course_id: course_id,
                end_date: studentPackage.end_at,
                start_date: studentPackage.start_at,
            });
        });

        mapData.set(studentPackage.student_id!, {
            ...result,
            studentId: studentPackage.student_id!,
            courses: result ? [...result?.courses, ...courses] : [...courses],
        });
    });

    return [...mapData.values()];
};

function useCourseMapStudent(studentIds: string[]): UseCourseMapStudentReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    // STEP 1: get student-packages of students
    const {
        data: studentPackages = [],
        isFetching: isFetchingStudentPackage,
        refetch,
    } = inferQuery({
        entity: "studentPackages",
        action: "studentPackagesGetList",
    })(
        {
            filter: {
                student_ids: studentIds,
            },
            sort: {
                end_at: "desc",
                start_at: "asc",
            },
        },
        {
            enabled: arrayHasItem(studentIds),
            onError(error) {
                window.warner?.warn(`useCourseMapStudent get student-packages`, error);
                showSnackbar(t("ra.manabie-error.unknown"), "error");
            },
        }
    );

    // STEP 2: get uniq courseIds in student-packages
    const coursesIdsUniq = useMemo(() => {
        const courseIds: string[] = [];
        studentPackages.forEach((studentPackage) => {
            studentPackage.properties.can_do_quiz.forEach((quiz: string) => {
                courseIds.push(quiz);
            });
        });
        return uniq(courseIds);
    }, [studentPackages]);

    // STEP 3: get course name from courseIds
    const { data: courses = [], isFetching: isFetchingCourses } = inferQuery({
        entity: "courses",
        action: "coursesGetMany",
    })(
        { course_id: coursesIdsUniq },
        {
            enabled: arrayHasItem(studentPackages),
            onError(error) {
                window.warner?.warn(`useCourseMapStudent get courses`, error);
                showSnackbar("ra.manabie-error.unknown", "error");
            },
        }
    );

    // STEP 4: create map courseName with key = courseId
    const mapCourses = useMemo(() => {
        const map = new Map<string, ICourses>();

        (courses || []).forEach((course: ICourses) => {
            map.set(course.course_id, course);
        });

        return map;
    }, [courses]);

    // STEP 5: mapping courseName with uniq student
    const coursesData = useMemo(
        () => mapCoursesEachUniqStudent(studentPackages, mapCourses),
        [studentPackages, mapCourses]
    );

    return {
        coursesData,
        loaded: !isFetchingStudentPackage && !isFetchingCourses,
        refetch,
        rawCourses: courses,
    };
}

export default useCourseMapStudent;
