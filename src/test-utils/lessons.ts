import { createMockMedia } from "src/test-utils/live-lesson";

import { StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import {
    LessonManagementUpsertFormType,
    LessonSavingMethodKeys,
    LessonTeachingMediumKeys,
    LessonTeachingMethodKeys,
} from "src/squads/lesson/pages/LessonManagement/common/types";

export function createMockLessonManagementUpsertFormData(): LessonManagementUpsertFormType {
    const currentDate = new Date();
    const result: LessonManagementUpsertFormType = {
        date: currentDate,
        startTime: currentDate,
        endTime: currentDate,
        learners: [
            {
                studentSubscriptionId: "Test Info Id",
                student: {
                    studentId: "Test Student ID 1",
                    studentName: "Test Student Name 01",
                },
                attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_ATTEND,
                course: {
                    courseId: "Test Course ID 1",
                    courseName: "Course Name 01",
                },
                grade: 1,
            },
        ],
        materialsList: createMockMedia(),
        teachers: [
            {
                name: "Teacher Name 01",
                user_id: "Teacher ID 01",
            },
        ],
        center: {
            name: "Center Name 01",
            locationId: "Center ID 01",
        },
        method: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
        teachingMethod: LessonTeachingMethodKeys.LESSON_TEACHING_METHOD_INDIVIDUAL,
        teachingMedium: LessonTeachingMediumKeys.LESSON_TEACHING_MEDIUM_OFFLINE,
    };
    return result;
}
