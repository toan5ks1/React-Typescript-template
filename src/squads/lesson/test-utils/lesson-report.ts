import { ArrayElement } from "src/common/constants/types";
import {
    DynamicFieldsComponentType,
    LessonReportIndividualDynamicComponentType,
    PartnerFormConfigLatestQueried,
    StudentAndDynamicLessonReportDetail,
} from "src/squads/lesson/common/types";
import {
    LessonReportByLessonIdQuery,
    PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQuery,
    PartnerFormConfigsOneQuery,
} from "src/squads/lesson/service/bob/bob-types";

import { DetailSectionPreviousReportInfoIndProps } from "src/squads/lesson/components/DetailSections/DetailSectionPreviousReportInfoInd";

import { lessonReports } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import {
    LessonDataWithStudentSubscriptions,
    LessonManagementLessonReportDetailData,
    LessonManagementReportsIndividualData,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

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
        size: {
            xs: width,
            md: width,
        },
    };
};

export const mockDataConfig: ArrayElement<PartnerFormConfigsOneQuery["partner_form_configs"]> = {
    form_config_id: "mock_data_config",
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
                        display_config: generateSize(WidthVariants.FULL_WIDTH),
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
                        display_config: generateSize(WidthVariants.HALF_WIDTH),
                        component_config: {
                            type: "ATTENDANCE_STATUS",
                        },
                    },
                    {
                        field_id: "attendance_remark",
                        value_type: "VALUE_TYPE_STRING",
                        is_required: false,
                        display_config: generateSize(WidthVariants.HALF_WIDTH),
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
                        display_config: generateSize(WidthVariants.FULL_WIDTH),
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
                                    en: "Homework Status",
                                    ja: "提出状況",
                                    vi: "Homework Status",
                                },
                            },
                        },
                        field_id: "homework_submission_status",
                        value_type: "VALUE_TYPE_STRING",
                        is_required: false,
                        display_config: generateSize(WidthVariants.HALF_WIDTH),
                        component_props: {
                            options: [
                                {
                                    key: "COMPLETED",
                                    label: {
                                        i18n: {
                                            fallback_language: "ja",
                                            translations: {
                                                en: "Completed",
                                                ja: "完了",
                                                vi: "Completed",
                                            },
                                        },
                                    },
                                },
                                {
                                    key: "INCOMPLETE",
                                    label: {
                                        i18n: {
                                            fallback_language: "ja",
                                            translations: {
                                                en: "Incomplete",
                                                ja: "未完了",
                                                vi: "Incomplete",
                                            },
                                        },
                                    },
                                },
                            ],
                            optionLabelKey: "label",
                        },
                        component_config: {
                            type: "AUTOCOMPLETE",
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
                        display_config: generateSize(WidthVariants.HALF_WIDTH),
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
                        display_config: generateSize(WidthVariants.HALF_WIDTH),
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
                        display_config: generateSize(WidthVariants.HALF_WIDTH),
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
                        display_config: generateSize(WidthVariants.QUARTER_WIDTH),
                        component_config: {
                            type: "LINK_VIEW_STUDY_PLAN",
                        },
                    },
                    {
                        field_id: "lesson_previous_report_action",
                        value_type: "VALUE_TYPE_NULL",
                        is_required: false,
                        display_config: generateSize(WidthVariants.QUARTER_WIDTH),
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
                        display_config: generateSize(WidthVariants.HALF_WIDTH),
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
                        display_config: generateSize(WidthVariants.HALF_WIDTH),
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
                        display_config: generateSize(WidthVariants.FULL_WIDTH),
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
                        display_config: generateSize(WidthVariants.FULL_WIDTH),
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
};

export const mockFields: DetailSectionPreviousReportInfoIndProps["fields"] = [
    {
        component_config: { type: DynamicFieldsComponentType.TYPOGRAPHY },
        component_props: { variant: "body2" },
        display_config: { size: { md: 12, xs: 12 } },
        field_id: "attendance_label",
        is_required: false,
        label: {
            i18n: {
                translations: { en: "Attendance", ja: "出席情報", vi: "Attendance" },
                fallback_language: LanguageEnums.JA,
            },
        },
        value_type: "VALUE_TYPE_NULL",
    },
    {
        field_id: "attendance_status",
        value_type: "VALUE_TYPE_STRING",
        is_required: true,
        display_config: { size: { md: 6, xs: 6 } },
        component_config: {
            type: LessonReportIndividualDynamicComponentType.ATTENDANCE_STATUS,
        },
    },
    {
        field_id: "attendance_remark",
        value_type: "VALUE_TYPE_STRING",
        is_required: false,
        display_config: { size: { md: 6, xs: 6 } },
        component_config: {
            type: LessonReportIndividualDynamicComponentType.ATTENDANCE_REMARK,
        },
    },
    {
        label: {
            i18n: {
                translations: { en: "Homework Status", ja: "提出状況", vi: "Homework Status" },
                fallback_language: LanguageEnums.JA,
            },
        },
        field_id: "homework_submission_status",
        value_type: "VALUE_TYPE_STRING",
        is_required: false,
        display_config: {
            size: { md: 6, xs: 6 },
        },
        component_config: { type: DynamicFieldsComponentType.AUTOCOMPLETE },
        component_props: {
            options: [
                {
                    key: "COMPLETED",
                    label: {
                        i18n: {
                            translations: { en: "Completed", ja: "完了", vi: "Completed" },
                            fallback_language: LanguageEnums.JA,
                        },
                    },
                },
                {
                    key: "INCOMPLETE",
                    label: {
                        i18n: {
                            translations: { en: "Incomplete", ja: "未完了", vi: "Incomplete" },
                            fallback_language: LanguageEnums.JA,
                        },
                    },
                },
            ],
            optionLabelKey: "label",
        },
    },
];

export const mockDynamicLessonReportData = [
    {
        field_id: "attendance_status",
        value: "STUDENT_ATTEND_STATUS_ABSENT",
    },
    { field_id: "attendance_remark", value: "not good" },
    { field_id: "homework_submission_status", value: "COMPLETED" },
];

export const mockPreviousLessonReportLessonReport: PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQuery["get_partner_dynamic_form_field_values_by_student"] =
    [
        {
            bool_value: false,
            field_id: "homework_submission_status",
            int_array_value: null,
            int_set_value: null,
            int_value: 0,
            string_array_value: null,
            string_set_value: null,
            string_value: "COMPLETED",
            value_type: null,
        },
    ];

export const createLessonReportDetail = (
    id: string,
    haveAttendanceStatus: boolean = true
): LessonManagementLessonReportDetailData => {
    return {
        student: {
            attendance_remark: "Sample Remark",
            attendance_status: haveAttendanceStatus ? "STUDENT_ATTEND_STATUS_LATE" : null,
            course: {
                course_id: `Course_Id_${id}`,
                name: `Course Name ${id}`,
            },
            user: {
                user_id: `Student_Id_${id}`,
                name: `Student Name ${id}`,
                email: "sample-student@manabie.com",
            },
        },
        lessonId: "Lesson_Id",
        dynamicFields: {
            attendance_status: haveAttendanceStatus
                ? { key: "STUDENT_ATTEND_STATUS_LATE", label: "Late" }
                : null,
            attendance_remark: "Sample Remark",
            homework_submission_status: {
                key: "INCOMPLETE",
                label: "Incomplete",
            },
            lesson_content: "Sample Content",
            lesson_homework: "Sample Homework",
            remarks: "Sample Remark",
        },
    };
};

export const createMockConvertLessonReportData = (
    uniqueId: string
): LessonManagementReportsIndividualData => {
    const lessonReportDetails = [createLessonReportDetail("1"), createLessonReportDetail("2")];

    return {
        lessonId: `Lesson_Id_${uniqueId}`,
        lessonReportId: `Lesson_Report_Id_${uniqueId}`,
        lessonReportDetails,
        students: lessonReportDetails.map((report) => report.student),
    };
};

export const createMockLessonData = (
    uniqueId: string,
    options: Partial<{
        teachingMethod: "INDIVIDUAL" | "GROUP";
        studentHasAttendanceStatus: boolean;
        isNonLessonStudent: boolean;
    }> = {}
): LessonDataWithStudentSubscriptions => {
    const locationId = "Location_Id_ABC";
    const {
        teachingMethod,
        studentHasAttendanceStatus = true,
        isNonLessonStudent = false,
    } = options;

    const teaching_method =
        teachingMethod === "GROUP"
            ? "LESSON_TEACHING_METHOD_GROUP"
            : "LESSON_TEACHING_METHOD_INDIVIDUAL";
    const attendance_status = studentHasAttendanceStatus ? "STUDENT_ATTEND_STATUS_ABSENT" : null;

    return {
        lesson_id: `Lesson_Id,${uniqueId}`,
        center_id: locationId,
        course: {
            course_id: "Course_Id_1",
            name: "Course Name 1",
        },
        class_id: teachingMethod === "GROUP" ? "Class_Id_1" : null,
        lesson_group_id: "Lesson_Group_Id",
        teaching_medium: "LESSON_TEACHING_MEDIUM_ONLINE",
        teaching_method,
        lesson_type: "LESSON_TYPE_ONLINE",
        scheduling_status: "LESSON_SCHEDULING_STATUS_PUBLISHED",
        scheduler_id: "Scheduler_Id_1",
        start_time: "2022-07-14T17:15:00+00:00",
        end_time: "2022-07-15T18:15:00+00:00",
        lessons_teachers: [
            {
                teacher: {
                    users: {
                        user_id: "Teacher_Id_1",
                        name: "Teacher Name 1",
                        email: "teacher-1@gmail.com",
                    },
                },
            },
        ],
        lesson_members: !isNonLessonStudent
            ? [
                  {
                      attendance_remark: "Sample Remark",
                      attendance_status,
                      course: {
                          course_id: "Course_Id_1",
                          name: "Course Name 1",
                      },
                      user: {
                          user_id: "Student_Id_1",
                          name: "Student Name 1",
                          email: "student-1@manabie.com",
                          student: { current_grade: 3 },
                      },
                  },
                  {
                      attendance_remark: "Sample Remark",
                      attendance_status,
                      course: {
                          course_id: "Course_Id_2",
                          name: "Course Name 2",
                      },
                      user: {
                          user_id: "Student_Id_2",
                          name: "Student Name 2",
                          email: "student-2@manabie.com",
                          student: { current_grade: 4 },
                      },
                  },
              ]
            : [],
        studentSubscriptions: !isNonLessonStudent
            ? [
                  {
                      id: "Student_Id_1",
                      studentId: "Student_Id_1",
                      courseId: "Course_Id_1",
                      grade: "",
                      locationIdsList: [locationId],
                  },
                  {
                      id: "Student_Id_2",
                      studentId: "Student_Id_2",
                      courseId: "Course_Id_2",
                      grade: "",
                      locationIdsList: [locationId],
                  },
              ]
            : [],
    };
};

export const createMockLessonReportData = (
    uniqueId: string
): ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]> => {
    return {
        lesson_id: `Lesson_Id_${uniqueId}`,
        lesson_report_id: `Lesson_Report_Id_${uniqueId}`,
        report_submitting_status: "LESSON_REPORT_SUBMITTING_STATUS_SAVED",
        partner_form_config: {
            feature_name: "PARTNER_FORM_CONFIG_FEATURE_NAME",
            ...mockDataConfig,
        },
        lesson_report_details: [
            {
                lesson_report_detail_id: "Lesson_Report_Detail_Id_1",
                student: { student_id: "Student_Id_1" },
                partner_dynamic_form_field_values: [
                    {
                        dynamic_form_field_value_id: "Dynamic_Form_Field_Value_1",
                        value_type: null,
                        int_value: 0,
                        int_set_value: null,
                        int_array_value: null,
                        string_value: "COMPLETED",
                        string_set_value: null,
                        string_array_value: null,
                        bool_value: false,
                        field_render_guide: null,
                        field_id: "homework_submission_status",
                    },
                ],
            },
            {
                lesson_report_detail_id: "Lesson_Report_Detail_Id_2",
                student: { student_id: "Student_Id_2" },
                partner_dynamic_form_field_values: [
                    {
                        dynamic_form_field_value_id: "Dynamic_Form_Field_Value_2",
                        value_type: null,
                        int_value: 0,
                        int_set_value: null,
                        int_array_value: null,
                        string_value: "INCOMPLETE",
                        string_set_value: null,
                        string_array_value: null,
                        bool_value: false,
                        field_render_guide: null,
                        field_id: "homework_submission_status",
                    },
                ],
            },
        ],
    };
};

export const tempPartnerFormConfigGroup: PartnerFormConfigLatestQueried = {
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
                        display_config: {
                            grid_size: {
                                md: 10,
                                xs: 10,
                            },
                        },
                        component_props: { variant: "h6" },
                        component_config: { type: "TYPOGRAPHY" },
                    },
                    {
                        field_id: "lesson_previous_report_action",
                        value_type: "VALUE_TYPE_NULL",
                        is_required: false,
                        is_internal: false,
                        display_config: {
                            grid_size: {
                                md: 2,
                                xs: 2,
                            },
                        },
                        component_config: { type: "BUTTON_PREVIOUS_REPORT" },
                    },
                    {
                        label: {
                            i18n: {
                                translations: {
                                    en: "Content",
                                    ja: "備考",
                                    vi: "Content",
                                },
                                fallback_language: "ja",
                            },
                        },
                        field_id: "content",
                        value_type: "VALUE_TYPE_STRING",
                        is_required: true,
                        is_internal: false,
                        display_config: {
                            grid_size: {
                                md: 6,
                                xs: 6,
                            },
                        },
                        component_props: {
                            InputProps: { rows: 6, multiline: true },
                        },
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
                        field_id: "lesson_remark",
                        value_type: "VALUE_TYPE_STRING",
                        is_required: false,
                        is_internal: true,
                        display_config: {
                            grid_size: {
                                md: 6,
                                xs: 6,
                            },
                        },
                        component_props: {
                            InputProps: { rows: 6, multiline: true },
                        },
                        component_config: {
                            type: "TEXT_FIELD_AREA",
                            question_mark: {
                                message: {
                                    i18n: {
                                        translations: {
                                            en: "This is an internal memo, it will not be shared with parents",
                                            ja: "これは社内用メモです。保護者には共有されません",
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
                        display_config: {
                            grid_size: {
                                md: 12,
                                xs: 12,
                            },
                        },
                        component_props: { variant: "h6" },
                        component_config: { type: "TYPOGRAPHY" },
                    },
                    {
                        label: {
                            i18n: {
                                translations: {
                                    en: "Homework",
                                    ja: "備考",
                                    vi: "Homework",
                                },
                                fallback_language: "ja",
                            },
                        },
                        field_id: "homework",
                        value_type: "VALUE_TYPE_STRING",
                        is_required: true,
                        is_internal: false,
                        display_config: {
                            grid_size: {
                                md: 6,
                                xs: 6,
                            },
                        },
                        component_props: {
                            InputProps: { rows: 6, multiline: true },
                        },
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
                        is_required: false,
                        is_internal: false,
                        display_config: {
                            grid_size: {
                                md: 6,
                                xs: 6,
                            },
                        },
                        component_props: {
                            InputProps: { rows: 6, multiline: true },
                        },
                        component_config: { type: "TEXT_FIELD_AREA" },
                    },
                ],
            },
            {
                section_id: "student_list_id",
                section_name: "student_list",
                fields: [
                    {
                        label: {
                            i18n: {
                                translations: {
                                    en: "Student List",
                                    ja: "出席情報",
                                    vi: "Student List",
                                },
                                fallback_language: "ja",
                            },
                        },
                        field_id: "student_list_label",
                        value_type: "VALUE_TYPE_NULL",
                        is_required: false,
                        is_internal: false,
                        display_config: {
                            grid_size: {
                                md: 12,
                                xs: 12,
                            },
                        },
                        component_props: { variant: "h6" },
                        component_config: { type: "TYPOGRAPHY" },
                    },
                    {
                        field_id: "student_list_tables",
                        value_type: "VALUE_TYPE_NULL",
                        is_required: false,
                        is_internal: false,
                        display_config: {
                            grid_size: {
                                md: 12,
                                xs: 12,
                            },
                        },
                        component_props: {
                            toggleButtons: [
                                {
                                    label: {
                                        i18n: {
                                            translations: {
                                                en: "Performance",
                                                ja: "成績",
                                                vi: "Performance",
                                            },
                                            fallback_language: "ja",
                                        },
                                    },
                                    field_id: "performance",
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
                                    field_id: "remark",
                                },
                            ],
                            dynamicFields: [
                                {
                                    label: {
                                        i18n: {
                                            translations: {
                                                en: "Homework Completion",
                                                ja: "宿題提出",
                                                vi: "Homework Completion",
                                            },
                                            fallback_language: "ja",
                                        },
                                    },
                                    field_id: "homework_completion",
                                    value_type: "VALUE_TYPE_STRING",
                                    is_required: false,
                                    is_internal: false,
                                    display_config: {
                                        table_size: {
                                            width: "22%",
                                        },
                                    },
                                    component_props: {
                                        options: [
                                            { key: "COMPLETED", icon: "CircleOutlined" },
                                            { key: "IN_PROGRESS", icon: "ChangeHistoryOutlined" },
                                            { key: "INCOMPLETE", icon: "CloseOutlined" },
                                        ],
                                        optionIconLabelKey: "icon",
                                        valueKey: "key",
                                        placeholder: {
                                            i18n: {
                                                translations: {
                                                    en: "Homework Completion",
                                                    ja: "宿題提出",
                                                    vi: "Homework Completion",
                                                },
                                                fallback_language: "ja",
                                            },
                                        },
                                    },
                                    component_config: {
                                        type: "SELECT_ICON",
                                        table_key: "performance",
                                        has_bulk_action: true,
                                    },
                                },
                                {
                                    label: {
                                        i18n: {
                                            translations: {
                                                en: "in-lesson Quiz",
                                                ja: "小テスト",
                                                vi: "in-lesson Quiz",
                                            },
                                            fallback_language: "ja",
                                        },
                                    },
                                    field_id: "in_lesson_quiz",
                                    value_type: "VALUE_TYPE_INT",
                                    is_required: false,
                                    is_internal: false,
                                    display_config: {
                                        table_size: {
                                            width: "22%",
                                        },
                                    },
                                    component_props: {
                                        placeholder: {
                                            i18n: {
                                                translations: {
                                                    en: "in-lesson Quiz",
                                                    ja: "小テスト",
                                                    vi: "in-lesson Quiz",
                                                },
                                                fallback_language: "ja",
                                            },
                                        },
                                    },
                                    component_config: {
                                        type: "TEXT_FIELD_PERCENTAGE",
                                        table_key: "performance",
                                        has_bulk_action: true,
                                    },
                                },
                                {
                                    label: {
                                        i18n: {
                                            translations: {
                                                en: "Remark",
                                                ja: "提出状況",
                                                vi: "Remark",
                                            },
                                            fallback_language: "ja",
                                        },
                                    },
                                    field_id: "student_remark",
                                    value_type: "VALUE_TYPE_STRING",
                                    is_required: false,
                                    is_internal: true,
                                    display_config: {
                                        table_size: {
                                            width: "70%",
                                        },
                                    },
                                    component_props: {
                                        placeholder: {
                                            i18n: {
                                                translations: {
                                                    en: "Remark",
                                                    ja: "提出状況",
                                                    vi: "Remark",
                                                },
                                                fallback_language: "ja",
                                            },
                                        },
                                    },
                                    component_config: {
                                        type: "TEXT_FIELD",
                                        table_key: "remark",
                                        has_bulk_action: false,
                                        question_mark: {
                                            message: {
                                                i18n: {
                                                    translations: {
                                                        en: "This is an internal memo, it will not be shared with parents",
                                                        ja: "これは社内用メモです。保護者には共有されません",
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
                        component_config: {
                            type: "TOGGLE_TABLE",
                        },
                    },
                ],
            },
        ],
    },
};
