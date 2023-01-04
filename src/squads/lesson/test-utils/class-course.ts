import {
    LessonManagementStudentInfo,
    StudentSubscriptionsQueried,
} from "src/squads/lesson/common/types";
import {
    CoursesManyQuery,
    Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery,
    Lesson_ClassManyByNullableCourseIdsAndNameQuery,
    Lesson_ClassManyForLessonManagementQuery,
    Lesson_CourseManyReferenceByNameAndLocationIdQuery,
    StudentsManyQuery,
} from "src/squads/lesson/service/bob/bob-types";
import { NsLesson_Bob_LocationService } from "src/squads/lesson/service/bob/locations-service/types";

import { StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import { GradeStudent } from "src/squads/lesson/hooks/useGetGradeAndStatusOfStudents";

export const generateMockClassMany = (
    limit = 5
): Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery["class"] &
    Lesson_ClassManyForLessonManagementQuery["class"] &
    Lesson_ClassManyByNullableCourseIdsAndNameQuery["class"] => {
    return Array.from({ length: limit }).map((_, index) => {
        const count = index + 1;

        return {
            class_id: `Class_Id_${count}`,
            name: `Class Name ${count}`,
        };
    });
};

export const generateMockCourseMany = (
    limit = 5
): Lesson_CourseManyReferenceByNameAndLocationIdQuery["course_access_paths"] => {
    return Array.from({ length: limit }).map((_, index) => {
        const count = index + 1;

        return {
            course: {
                course_id: `Course_Id_${count}`,
                name: `Course Name ${count}`,
            },
        };
    });
};

export const generateCourseManyQuery = (limit = 5): CoursesManyQuery["courses"] => {
    return Array.from({ length: limit }).map((_, index) => {
        const count = index + 1;

        return {
            course_id: `Course_Id_${count}`,
            name: `Course Name ${count}`,
            school_id: 246,
        };
    });
};

export const makeAStudentInfo = (id: number): LessonManagementStudentInfo => {
    const courseId = `Course_Id_${id}`;
    const studentId = `Student_Id_${id}`;

    return {
        studentSubscriptionId: studentId + courseId,
        course: {
            courseId,
            courseName: `Course Name ${id}`,
        },
        student: {
            studentId,
            studentName: `Student Name ${id}`,
        },
        grade: 12,
        attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY,
        classData: {
            class_id: `Class_Id_${id}`,
            name: `Class Name ${id}`,
        },
        locationId: `Location_Id_${id}`,
    };
};

export const generateSampleDataWithStudentInfo = (limit = 5) => {
    const studentInfos: LessonManagementStudentInfo[] = [];
    const studentSubscriptionsQueried: StudentSubscriptionsQueried = [];
    const studentsManyQueried: StudentsManyQuery["users"] = [];
    const coursesManyQueried: CoursesManyQuery["courses"] = [];
    const gradesManyQueried = new Map<GradeStudent["student_id"], GradeStudent>();
    const classesManyQueried: Lesson_ClassManyForLessonManagementQuery["class"] = [];
    const locationsManyQueried: NsLesson_Bob_LocationService.RetrieveLocationsResponseLocation[] =
        [];

    Array.from({ length: limit }).forEach((_, index) => {
        const count = ++index;
        const studentInfo = makeAStudentInfo(count);

        studentInfos.push(studentInfo);

        studentsManyQueried.push({
            name: studentInfo.student.studentName,
            user_id: studentInfo.student.studentId,
        });

        coursesManyQueried.push({
            course_id: studentInfo.course.courseId,
            name: studentInfo.course.courseName,
            school_id: 246,
        });

        gradesManyQueried.set(studentInfo.student.studentId, {
            enrollment_status: "ENROLLED",
            student_id: studentInfo.student.studentId,
            current_grade: 12,
        });

        classesManyQueried.push({
            class_id: studentInfo.classData!.class_id,
            name: studentInfo.classData!.name,
        });

        locationsManyQueried.push({
            locationId: studentInfo.locationId!,
            name: `Location Name ${count}`,
        });

        studentSubscriptionsQueried.push({
            id: "#" + index,
            classId: studentInfo.classData!.class_id,
            courseId: studentInfo.course.courseId,
            grade: "12",
            studentId: studentInfo.student.studentId,
            locationIdsList: [studentInfo.locationId!],
        });
    });

    return {
        studentInfos,
        studentSubscriptionsQueried,
        studentsManyQueried,
        coursesManyQueried,
        gradesManyQueried,
        classesManyQueried,
        locationsManyQueried,
    };
};
