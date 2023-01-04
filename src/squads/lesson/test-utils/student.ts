import { ArrayElement } from "src/common/constants/types";
import {
    CountStudentWithFilterQuery,
    GradesOfStudentsListQuery,
    StudentsListByFiltersWithoutGradeAndAggregateQuery,
} from "src/squads/lesson/service/bob/bob-types";
import { CourseStudentsListByCourseIdsQuery } from "src/squads/lesson/service/eureka/eureka-types";

import {
    GradeStudent,
    UseGetGradeAndStatusOfStudentsReturn,
} from "src/squads/lesson/hooks/useGetGradeAndStatusOfStudents";

export const createMockMapGradeOfStudents = (
    studentId: string = "01"
): Map<GradeStudent["student_id"], GradeStudent> => {
    const student = creatMockStudentWithGrade(studentId, 1);

    const mapGradeOfStudents: UseGetGradeAndStatusOfStudentsReturn["mapGradeOfStudents"] = new Map<
        GradeStudent["student_id"],
        GradeStudent
    >();
    mapGradeOfStudents.set(student.student_id, student);

    return mapGradeOfStudents;
};

export const creatMockStudentWithGrade = (
    id: string,
    grade: number,
    enrollment_status?: string
): ArrayElement<GradesOfStudentsListQuery["students"]> => ({
    student_id: id,
    current_grade: grade,
    enrollment_status: enrollment_status || "STUDENT_ENROLLMENT_STATUS_ENROLLED",
});

export const createMockStudentWithFilter = (
    student_id: string
): CourseStudentsListByCourseIdsQuery["course_students"] => [
    { student_id: student_id, course_id: `COURSE_${student_id}` },
];

export const createMockListStudentWithFilter = (
    user_id: string
): StudentsListByFiltersWithoutGradeAndAggregateQuery["users"] => [
    {
        user_id: user_id,
        name: `${user_id}`,
        email: `${user_id}@manabie.com`,
        phone_number: null,
        country: "COUNTRY_JP",
        last_login_date: null,
    },
];
export const createMockStudentCount = (count: number): CountStudentWithFilterQuery => ({
    users_aggregate: { aggregate: { count } },
});

export const createMockStudentsFilterByCourseGrade =
    (): StudentsListByFiltersWithoutGradeAndAggregateQuery["users"] => {
        return [
            {
                email: "student email 1",
                name: "student name 1",
                user_id: "01",
                country: "vn",
            },
            {
                email: "student email 2",
                name: "student name 2",
                user_id: "02",
                country: "vn",
            },
        ];
    };
