import { StudentAndDynamicLessonReportDetail } from "src/squads/lesson/common/types";

import { lessonReports } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";

const generateTeacher = (name: string) => {
    return {
        value: name,
        name,
        email: `${name}@teacher.com`,
        user_id: name,
    };
};

const generateLearner = (name: string) => {
    return {
        courses: [],
        user: {
            name,
            user_id: name,
            student: {
                student_id: name,
                current_grade: 12,
                enrollment_status: "STUDENT_ENROLLMENT_STATUS_ENROLLED",
            },
            email: `${name}@learner.com`,
        },
    };
};

const generateReport = (reportId: string, learnerId: string) => {
    return {
        lessonId: "lessonId",
        lessonReportId: reportId,
        student: generateLearner(learnerId),
        dynamicFields: {
            attendance_status: {
                key: "STUDENT_ATTEND_STATUS_LATE",
                label: "Late",
            },
            attendance_remark: "Remarks example",
            homework_status: {
                key: "completed",
                label: "Completed",
            },
            homework_homework_submission_completion: "19",
            homework_homework_submission_score: "92",
            lesson_extra_attitude: {
                key: "optionC",
                label: "C",
            },
            lesson_extra_understanding: {
                key: "optionA",
                label: "A",
            },
            lesson_extra_lesson_speed: {
                key: "optionB",
                label: "B",
            },
            lesson_extra_extra_content: "Extra content example",
            lesson_extra_extra_homework: "Extra homework example",
            remarks: "Remarks example",
        },
    };
};

export const lessonReportsIndividualDefaultValues = {
    lessonDate: new Date(2021, 9, 9),
    startTime: new Date(2021, 9, 9, 12),
    endTime: new Date(2021, 9, 9, 14),
    teachers: [generateTeacher("Teacher1")],
    students: [generateLearner("Learner1")],
    lessonReportDetails: [generateReport("", "Learner1")],
};

const mockStudentLists: StudentAndDynamicLessonReportDetail[] = [
    {
        user: {
            user_id: "student id 01",
            name: "student name 01",
        },
        course: {
            course_id: "course id 01",
            name: "Course name 01",
            subject: "SUBJECT_BIOLOGY",
        },
        dynamicLessonReportData: [
            {
                field_id: "attendance_status",
                value: "STUDENT_ATTEND_STATUS_ATTEND",
            },
            {
                field_id: "attendance_remark",
                value: "nothing to comment",
            },
            {
                field_id: "homework_submission_completion",
                value: "100",
            },
            {
                field_id: "homework_submission_score",
                value: "70",
            },
            {
                field_id: "lesson_content",
                value: "please take a deep breath",
            },
            {
                field_id: "lesson_homework",
                value: "Have no idea",
            },
        ],
    },
    {
        user: {
            user_id: "student id 02",
            name: "student name 02",
        },
        course: {
            course_id: "course id 02",
            name: "Course name 02",
            subject: "SUBJECT_BIOLOGY",
        },
        dynamicLessonReportData: [
            {
                field_id: "attendance_status",
                value: "STUDENT_ATTEND_STATUS_LATE",
            },
            {
                field_id: "attendance_remark",
                value: "should pay more attention on lesson",
            },
            {
                field_id: "homework_submission_completion",
                value: "89",
            },
            {
                field_id: "homework_submission_score",
                value: "60",
            },
            {
                field_id: "lesson_content",
                value: "draw a cute dinasour",
            },
            {
                field_id: "lesson_homework",
                value: "write a letter to your best friend",
            },
        ],
    },
    {
        user: {
            user_id: "student id 03",
            name: "student name 03",
        },
        course: {
            course_id: "course id 03",
            name: "Course name 03",
            subject: "SUBJECT_BIOLOGY",
        },
        dynamicLessonReportData: [
            {
                field_id: "attendance_status",
                value: "STUDENT_ATTEND_STATUS_LEAVE_EARLY",
            },
            {
                field_id: "attendance_remark",
                value: "no word to say",
            },
            {
                field_id: "homework_submission_completion",
                value: "40",
            },
            {
                field_id: "homework_submission_score",
                value: "20",
            },
            {
                field_id: "lesson_content",
                value: "review the lesson",
            },
            {
                field_id: "lesson_homework",
                value: "I'm so worried about his future",
            },
        ],
    },
];

export function createMockStudentLists() {
    return mockStudentLists;
}

export function createMockPreviousReportDataConfig() {
    return lessonReports[0].partner_form_config?.form_config_data.sections;
}

// Data config for lesson report
export enum WidthVariants {
    QUARTER_WIDTH = 3,
    HALF_WIDTH = 6,
    FULL_WIDTH = 12,
}

export const generateSize = (width: WidthVariants) => {
    return {
        xs: width,
        md: width,
    };
};
