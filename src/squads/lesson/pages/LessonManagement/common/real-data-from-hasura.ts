import { ArrayElement } from "src/common/constants/types";
import { LessonGroupDynamicSection } from "src/squads/lesson/common/types";
import {
    LessonReportByLessonIdQuery,
    Lesson_LessonByLessonIdForLessonManagementV3Query,
} from "src/squads/lesson/service/bob/bob-types";

export const partnerDynamicFormFieldValues01 = [
    {
        field_id: "homework_status",
        dynamic_form_field_value_id: "homework_status",
        value_type: "VALUE_TYPE_STRING",
        int_value: null,
        int_set_value: null,
        int_array_value: null,
        string_value: "completed",
        string_set_value: null,
        string_array_value: null,
        bool_value: null,
        field_render_guide: {},
    },
    {
        field_id: "homework_submission_completion",
        dynamic_form_field_value_id: "homework_submission_completion",
        value_type: "VALUE_TYPE_INT",
        int_value: 100,
        int_set_value: null,
        int_array_value: null,
        string_value: null,
        string_set_value: null,
        string_array_value: null,
        bool_value: null,
        field_render_guide: {},
    },
    {
        field_id: "homework_submission_score",
        dynamic_form_field_value_id: "homework_submission_score",
        value_type: "VALUE_TYPE_INT",
        int_value: 70,
        int_set_value: null,
        int_array_value: null,
        string_value: null,
        string_set_value: null,
        string_array_value: null,
        bool_value: null,
        field_render_guide: {},
    },
    {
        field_id: "lesson_content",
        dynamic_form_field_value_id: "lesson_content",
        value_type: "VALUE_TYPE_STRING",
        int_value: null,
        int_set_value: null,
        int_array_value: null,
        string_value: "please take a deep breath",
        string_set_value: null,
        string_array_value: null,
        bool_value: null,
        field_render_guide: {},
    },
    {
        field_id: "lesson_homework",
        dynamic_form_field_value_id: "lesson_homework",
        value_type: "VALUE_TYPE_STRING",
        int_value: null,
        int_set_value: null,
        int_array_value: null,
        string_value: "Have no idea",
        string_set_value: null,
        string_array_value: null,
        bool_value: null,
        field_render_guide: {},
    },
];

const partnerDynamicFormFieldValues02 = [
    partnerDynamicFormFieldValues01[0],

    {
        ...partnerDynamicFormFieldValues01[1],
        int_value: 89,
    },
    {
        ...partnerDynamicFormFieldValues01[2],
        int_value: 60,
    },
    {
        ...partnerDynamicFormFieldValues01[3],
        string_value: "draw a cute dinasour",
    },
    {
        ...partnerDynamicFormFieldValues01[4],
        string_value: "write a letter to your best friend",
    },
];

const partnerDynamicFormFieldValues03 = [
    {
        ...partnerDynamicFormFieldValues01[0],
        string_value: "incompleted",
    },
    {
        ...partnerDynamicFormFieldValues01[1],
        int_value: 40,
    },
    {
        ...partnerDynamicFormFieldValues01[2],
        int_value: 20,
    },
    {
        ...partnerDynamicFormFieldValues01[3],
        string_value: "review the lesson",
    },
    {
        ...partnerDynamicFormFieldValues01[4],
        string_value: "I'm so worried about his future",
    },
];

export const lessonData: ArrayElement<
    Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]
> = {
    lesson_id: "lesson Id 01",
    teaching_medium: "LESSON_TEACHING_MEDIUM_ONLINE",
    start_time: "2021-10-10T09:30:09+00:00",
    end_time: "2021-10-12T09:42:09+00:00",
    teaching_method: "LESSON_TEACHING_METHOD_INDIVIDUAL",
    center_id: "center_id_1",
    lesson_group_id: "lesson_group_id",
    lessons_teachers: [
        {
            teacher: {
                users: {
                    user_id: "teacher id 01",
                    name: "teacher name 01",
                    email: "teacher01@example.com",
                },
            },
        },
        {
            teacher: {
                users: {
                    user_id: "teacher id 02",
                    name: "teacher name 02",
                    email: "teacher02@example.com",
                },
            },
        },
        {
            teacher: {
                users: {
                    user_id: "teacher id 03",
                    name: "teacher name 03",
                    email: "teacher03@example.com",
                },
            },
        },
    ],
    lesson_members: [
        {
            attendance_remark: "nothing to comment",
            attendance_status: "STUDENT_ATTEND_STATUS_ATTEND",
            user: {
                user_id: "student id 01",
                name: "student name 01",
                email: "student01@example.com",
                student: {
                    current_grade: 1,
                },
            },
            course: {
                course_id: "course id 01",
                name: "Course name 01",
                subject: "SUBJECT_BIOLOGY",
            },
        },
        {
            attendance_remark: "should pay more attention on lesson",
            attendance_status: "STUDENT_ATTEND_STATUS_LATE",
            user: {
                user_id: "student id 02",
                name: "student name 02",
                email: "student02@example.com",
                student: {
                    current_grade: 1,
                },
            },
            course: {
                course_id: "course id 02",
                name: "Course name 02",
                subject: "SUBJECT_BIOLOGY",
            },
        },
        {
            attendance_remark: "no word to say",
            attendance_status: "STUDENT_ATTEND_STATUS_LEAVE_EARLY",
            user: {
                user_id: "student id 03",
                name: "student name 03",
                email: "student03@example.com",
                student: {
                    current_grade: 1,
                },
            },
            course: {
                course_id: "course id 03",
                name: "Course name 03",
                subject: "SUBJECT_BIOLOGY",
            },
        },
    ],
};

const LESSON_TEACHERS: ArrayElement<
    Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]
>["lessons_teachers"] = [
    {
        teacher: {
            users: {
                user_id: "teacher id 01",
                name: "teacher name 01",
                email: "teacher01@example.com",
            },
        },
    },
    {
        teacher: {
            users: {
                user_id: "teacher id 02",
                name: "teacher name 02",
                email: "teacher02@example.com",
            },
        },
    },
    {
        teacher: {
            users: {
                user_id: "teacher id 03",
                name: "teacher name 03",
                email: "teacher03@example.com",
            },
        },
    },
];

export function mockLessonDetailData(
    missingFields?: Array<"teacherNames">
): ArrayElement<Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]> {
    const lessonsTeacher = missingFields?.includes("teacherNames") ? [] : LESSON_TEACHERS;

    return {
        lesson_id: "lesson Id 01",
        teaching_medium: "LESSON_TEACHING_MEDIUM_ONLINE",
        start_time: "2021-10-10T09:30:09+00:00",
        end_time: "2021-10-12T09:42:09+00:00",
        teaching_method: "LESSON_TEACHING_METHOD_INDIVIDUAL",
        center_id: "center_id_1",
        lesson_group_id: "lesson_group_id",
        lessons_teachers: lessonsTeacher,
        lesson_members: [
            {
                attendance_remark: "nothing to comment",
                attendance_status: "STUDENT_ATTEND_STATUS_ATTEND",
                user: {
                    user_id: "student id 01",
                    name: "student name 01",
                    email: "student01@example.com",
                    student: {
                        current_grade: 1,
                    },
                },
                course: {
                    course_id: "course id 01",
                    name: "Course name 01",
                    subject: "SUBJECT_BIOLOGY",
                },
            },
            {
                attendance_remark: "should pay more attention on lesson",
                attendance_status: "STUDENT_ATTEND_STATUS_LATE",
                user: {
                    user_id: "student id 02",
                    name: "student name 02",
                    email: "student02@example.com",
                    student: {
                        current_grade: 1,
                    },
                },
                course: {
                    course_id: "course id 02",
                    name: "Course name 02",
                    subject: "SUBJECT_BIOLOGY",
                },
            },
            {
                attendance_remark: "no word to say",
                attendance_status: "STUDENT_ATTEND_STATUS_LEAVE_EARLY",
                user: {
                    user_id: "student id 03",
                    name: "student name 03",
                    email: "student03@example.com",
                    student: {
                        current_grade: 1,
                    },
                },
                course: {
                    course_id: "course id 03",
                    name: "Course name 03",
                    subject: "SUBJECT_BIOLOGY",
                },
            },
        ],
    };
}

export const groupLessonData: ArrayElement<
    Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]
> = {
    ...lessonData,
    teaching_method: "LESSON_TEACHING_METHOD_GROUP",
    course: {
        course_id: "course id 01",
        name: "Course name 01",
    },
    class_id: "Class Id 1",
    lesson_members: [
        {
            ...lessonData.lesson_members[0],
            course: {
                course_id: "course id 01",
                name: "Course name 01",
                subject: "SUBJECT_BIOLOGY",
            },
        },
        {
            ...lessonData.lesson_members[1],
            course: {
                course_id: "course id 01",
                name: "Course name 01",
                subject: "SUBJECT_BIOLOGY",
            },
        },
        {
            ...lessonData.lesson_members[2],
            course: {
                course_id: "course id 01",
                name: "Course name 01",
                subject: "SUBJECT_BIOLOGY",
            },
        },
    ],
};

export const recurringLessonData: ArrayElement<
    Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]
> = {
    ...groupLessonData,
    scheduler_id: "Scheduler ID",
};

export const lessonReports: LessonReportByLessonIdQuery["lesson_reports"] = [
    {
        lesson_id: "lesson Id 01",
        lesson_report_id: "lesson report id 01",
        report_submitting_status: "LESSON_REPORT_SUBMITTING_STATUS_SUBMITTED",
        partner_form_config: {
            form_config_id: "config_id_2",
            feature_name: "lesson_management_report_individual",
            form_config_data: {
                sections: [
                    {
                        fields: [
                            {
                                label: {
                                    i18n: {
                                        fallback_language: "ja",
                                        translations: {
                                            en: "Attendance",
                                            ja: "出席情報",
                                            vi: "Attendance",
                                        },
                                    },
                                },
                                field_id: "attendance_label",
                                value_type: "VALUE_TYPE_NULL",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 12,
                                        xs: 12,
                                    },
                                },
                                component_props: {
                                    variant: "body2",
                                },
                                component_config: {
                                    type: "TYPOGRAPHY",
                                },
                            },
                            {
                                field_id: "attendance_status",
                                value_type: "VALUE_TYPE_STRING",
                                is_required: true,
                                display_config: {
                                    size: {
                                        md: 6,
                                        xs: 6,
                                    },
                                },
                                component_config: {
                                    type: "ATTENDANCE_STATUS",
                                },
                            },
                            {
                                field_id: "attendance_remark",
                                value_type: "VALUE_TYPE_STRING",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 6,
                                        xs: 6,
                                    },
                                },
                                component_props: {},
                                component_config: {
                                    type: "ATTENDANCE_REMARK",
                                },
                            },
                        ],
                        section_id: "attendance_section_id",
                        section_name: "attendance",
                    },
                    {
                        fields: [
                            {
                                label: {
                                    i18n: {
                                        fallback_language: "ja",
                                        translations: {
                                            en: "Homework Submission",
                                            ja: "課題",
                                            vi: "Homework Submission",
                                        },
                                    },
                                },
                                field_id: "homework_submission_label",
                                value_type: "VALUE_TYPE_NULL",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 12,
                                        xs: 12,
                                    },
                                },
                                component_props: {
                                    variant: "body2",
                                },
                                component_config: {
                                    type: "TYPOGRAPHY",
                                },
                            },
                            {
                                label: {
                                    i18n: {
                                        fallback_language: "ja",
                                        translations: {
                                            en: "Completion",
                                            ja: "完了率",
                                            vi: "Completion",
                                        },
                                    },
                                },
                                field_id: "homework_submission_completion",
                                value_type: "VALUE_TYPE_INT",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 6,
                                        xs: 6,
                                    },
                                },
                                component_props: {},
                                component_config: {
                                    type: "TEXT_FIELD_PERCENTAGE",
                                },
                            },
                            {
                                label: {
                                    i18n: {
                                        fallback_language: "ja",
                                        translations: {
                                            en: "Score",
                                            ja: "点数",
                                            vi: "Score",
                                        },
                                    },
                                },
                                field_id: "homework_submission_score",
                                value_type: "VALUE_TYPE_INT",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 6,
                                        xs: 6,
                                    },
                                },
                                component_props: {},
                                component_config: {
                                    type: "TEXT_FIELD_PERCENTAGE",
                                },
                            },
                        ],
                        section_id: "homework_submission_section_id",
                        section_name: "homework_submission",
                    },
                    {
                        fields: [
                            {
                                label: {
                                    i18n: {
                                        fallback_language: "ja",
                                        translations: {
                                            en: "Lesson",
                                            ja: "授業",
                                            vi: "Lesson",
                                        },
                                    },
                                },
                                field_id: "lesson_label",
                                value_type: "VALUE_TYPE_NULL",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 6,
                                        xs: 6,
                                    },
                                },
                                component_props: {
                                    variant: "body2",
                                },
                                component_config: {
                                    type: "TYPOGRAPHY",
                                },
                            },
                            {
                                field_id: "lesson_view_study_plan_action",
                                value_type: "VALUE_TYPE_NULL",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 3,
                                        xs: 3,
                                    },
                                },
                                component_config: {
                                    type: "LINK_VIEW_STUDY_PLAN",
                                },
                            },
                            {
                                field_id: "lesson_previous_report_action",
                                value_type: "VALUE_TYPE_NULL",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 3,
                                        xs: 3,
                                    },
                                },
                                component_config: {
                                    type: "BUTTON_PREVIOUS_REPORT",
                                },
                            },
                            {
                                label: {
                                    i18n: {
                                        fallback_language: "ja",
                                        translations: {
                                            en: "Content",
                                            ja: "追加教材",
                                            vi: "Content",
                                        },
                                    },
                                },
                                field_id: "lesson_content",
                                value_type: "VALUE_TYPE_STRING",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 6,
                                        xs: 6,
                                    },
                                },
                                component_config: {
                                    type: "TEXT_FIELD",
                                },
                            },
                            {
                                label: {
                                    i18n: {
                                        fallback_language: "ja",
                                        translations: {
                                            en: "Homework",
                                            ja: "追加課題",
                                            vi: "Homework",
                                        },
                                    },
                                },
                                field_id: "lesson_homework",
                                value_type: "VALUE_TYPE_STRING",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 6,
                                        xs: 6,
                                    },
                                },
                                component_config: {
                                    type: "TEXT_FIELD",
                                },
                            },
                        ],
                        section_id: "lesson_section_id",
                        section_name: "lesson",
                    },
                    {
                        fields: [
                            {
                                label: {
                                    i18n: {
                                        fallback_language: "ja",
                                        translations: {
                                            en: "Remarks",
                                            ja: "備考",
                                            vi: "Remarks",
                                        },
                                    },
                                },
                                field_id: "remarks_section_label",
                                value_type: "VALUE_TYPE_NULL",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 12,
                                        xs: 12,
                                    },
                                },
                                component_props: {
                                    variant: "body2",
                                },
                                component_config: {
                                    type: "TYPOGRAPHY",
                                },
                            },
                            {
                                label: {
                                    i18n: {
                                        fallback_language: "ja",
                                        translations: {
                                            en: "Remarks",
                                            ja: "備考",
                                            vi: "Remarks",
                                        },
                                    },
                                },
                                field_id: "remarks",
                                value_type: "VALUE_TYPE_STRING",
                                is_required: false,
                                display_config: {
                                    size: {
                                        md: 12,
                                        xs: 12,
                                    },
                                },
                                component_props: {
                                    rows: 6,
                                    multiline: true,
                                },
                                component_config: {
                                    type: "TEXT_FIELD_AREA",
                                },
                            },
                        ],
                        section_id: "remarks_section_id",
                        section_name: "remarks",
                    },
                ],
            },
        },
        lesson_report_details: [
            {
                lesson_report_detail_id: "lesson report detail id 1",
                student: {
                    student_id: "student id 01",
                },
                partner_dynamic_form_field_values: partnerDynamicFormFieldValues01,
            },
            {
                lesson_report_detail_id: "lesson report detail id 2",
                student: {
                    student_id: "student id 02",
                },
                partner_dynamic_form_field_values: partnerDynamicFormFieldValues02,
            },
            {
                lesson_report_detail_id: "lesson report detail id 3",
                student: {
                    student_id: "student id 03",
                },
                partner_dynamic_form_field_values: partnerDynamicFormFieldValues03,
            },
        ],
    },
];

export const studentCourseSubscriptions = [
    {
        studentId: lessonData.lesson_members[0].user.user_id,
        courseId: `${lessonData.lesson_members[0].course?.course_id}`,
        id: "id1",
        grade: `${lessonData.lesson_members[0].user.student?.current_grade}`,
        locationIdsList: ["locationId1"],
    },
    {
        studentId: lessonData.lesson_members[1].user.user_id,
        courseId: `${lessonData.lesson_members[1].course?.course_id}`,
        id: "id2",
        grade: `${lessonData.lesson_members[1].user.student?.current_grade}`,
        locationIdsList: ["locationId1"],
    },
    {
        studentId: lessonData.lesson_members[2].user.user_id,
        courseId: `${lessonData.lesson_members[2].course?.course_id}`,
        id: "id3",
        grade: `${lessonData.lesson_members[2].user.student?.current_grade}`,
        locationIdsList: ["locationId1"],
    },
];

export const lessonReportGroupFormConfig = {
    form_config_id: "form_config_id",
    form_config_data: {
        sections: [
            {
                section_id: "this_lesson_id",
                section_name: "this_lesson",
                fields: [
                    {
                        label: {
                            i18n: {
                                translations: {
                                    en: "This Lesson",
                                    ja: "今回の授業",
                                    vi: "This Lesson",
                                },
                                fallback_language: "ja",
                            },
                        },
                        field_id: "this_lesson_label",
                        value_type: "VALUE_TYPE_NULL",
                        is_required: false,
                        is_internal: false,
                        display_config: { size: { md: 10, xs: 10 } },
                        component_props: { variant: "body2" },
                        component_config: { type: "TYPOGRAPHY" },
                    },
                    {
                        field_id: "lesson_previous_report_action",
                        value_type: "VALUE_TYPE_NULL",
                        is_required: false,
                        is_internal: false,
                        display_config: { size: { md: 2, xs: 2 } },
                        component_config: {
                            type: "BUTTON_PREVIOUS_REPORT",
                        },
                    },
                    {
                        label: {
                            i18n: {
                                translations: { en: "Content", ja: "教材", vi: "Content" },
                                fallback_language: "ja",
                            },
                        },
                        field_id: "content",
                        value_type: "VALUE_TYPE_STRING",
                        is_required: true,
                        is_internal: false,
                        display_config: { size: { md: 6, xs: 6 } },
                        component_props: { InputProps: { rows: 6, multiline: true } },
                        component_config: { type: "TEXT_FIELD_AREA" },
                    },
                    {
                        label: {
                            i18n: {
                                translations: {
                                    en: "Remark",
                                    ja: "備考",
                                    vi: "Remark",
                                },
                                fallback_language: "ja",
                            },
                        },
                        field_id: "remark_internal",
                        value_type: "VALUE_TYPE_STRING",
                        is_required: false,
                        is_internal: true,
                        display_config: { size: { md: 6, xs: 6 } },
                        component_props: { InputProps: { rows: 6, multiline: true } },
                        component_config: {
                            type: "TEXT_FIELD_AREA",
                            question_mark: {
                                message: {
                                    i18n: {
                                        translations: {
                                            en: "This is an internal memo, it will not be shared with parents",
                                            ja: "備考",
                                            vi: "This is an internal memo, it will not be shared with parents",
                                        },
                                        fallback_language: "ja",
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            {
                section_id: "next_lesson_id",
                section_name: "next_lesson",
                fields: [
                    {
                        label: {
                            i18n: {
                                translations: {
                                    en: "Next Lesson",
                                    ja: "次回の授業",
                                    vi: "Next Lesson",
                                },
                                fallback_language: "ja",
                            },
                        },
                        field_id: "next_lesson_label",
                        value_type: "VALUE_TYPE_NULL",
                        is_required: false,
                        is_internal: false,
                        display_config: { size: { md: 12, xs: 12 } },
                        component_props: { variant: "body2" },
                        component_config: { type: "TYPOGRAPHY" },
                    },
                    {
                        label: {
                            i18n: {
                                translations: { en: "Homework", ja: "備考", vi: "Homework" },
                                fallback_language: "ja",
                            },
                        },
                        field_id: "homework",
                        value_type: "VALUE_TYPE_STRING",
                        is_required: true,
                        is_internal: false,
                        display_config: { size: { md: 6, xs: 6 } },
                        component_props: { InputProps: { rows: 6, multiline: true } },
                        component_config: { type: "TEXT_FIELD_AREA" },
                    },
                    {
                        label: {
                            i18n: {
                                translations: {
                                    en: "Announcement",
                                    ja: "お知らせ",
                                    vi: "Announcement",
                                },
                                fallback_language: "ja",
                            },
                        },
                        field_id: "announcement",
                        value_type: "VALUE_TYPE_STRING",
                        is_required: true,
                        is_internal: false,
                        display_config: { size: { md: 6, xs: 6 } },
                        component_props: { InputProps: { rows: 6, multiline: true } },
                        component_config: { type: "TEXT_FIELD_AREA" },
                    },
                ],
            },
        ] as LessonGroupDynamicSection[],
    },
};
