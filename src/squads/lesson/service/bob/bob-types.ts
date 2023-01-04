import * as Types from '../../__generated__/bob/root-types';

export type Lesson_ClassByClassIdForLessonManagementQueryVariables = Types.Exact<{
  class_id: Types.Scalars['String'];
}>;


export type Lesson_ClassByClassIdForLessonManagementQuery = { class: Array<{ class_id: string, name: string }> };

export type Lesson_ClassManyForLessonManagementQueryVariables = Types.Exact<{
  class_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Lesson_ClassManyForLessonManagementQuery = { class: Array<{ class_id: string, name: string }> };

export type Lesson_ClassManyReferenceByNameAndCourseIdQueryVariables = Types.Exact<{
  location_id: Types.Scalars['String'];
  course_id: Types.Scalars['String'];
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  order_by?: Types.InputMaybe<Array<Types.Class_Order_By> | Types.Class_Order_By>;
}>;


export type Lesson_ClassManyReferenceByNameAndCourseIdQuery = { class: Array<{ class_id: string, name: string }> };

export type Lesson_ClassManyByNullableCourseIdsAndNameQueryVariables = Types.Exact<{
  course_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  order_by?: Types.InputMaybe<Array<Types.Class_Order_By> | Types.Class_Order_By>;
}>;


export type Lesson_ClassManyByNullableCourseIdsAndNameQuery = { class: Array<{ class_id: string, name: string }> };

export type Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables = Types.Exact<{
  location_id: Types.Scalars['String'];
  course_id: Types.Scalars['String'];
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  order_by?: Types.InputMaybe<Array<Types.Class_Order_By> | Types.Class_Order_By>;
}>;


export type Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery = { class: Array<{ class_id: string, name: string }> };

export type Lesson_CourseManyReferenceByNameAndLocationIdQueryVariables = Types.Exact<{
  location_id: Types.Scalars['String'];
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  order_by?: Types.InputMaybe<Array<Types.Course_Access_Paths_Order_By> | Types.Course_Access_Paths_Order_By>;
}>;


export type Lesson_CourseManyReferenceByNameAndLocationIdQuery = { course_access_paths: Array<{ course: { course_id: string, name: string } }> };

export type CourseAttrsFragment = { course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined };

export type CoursesManyQueryVariables = Types.Exact<{
  course_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type CoursesManyQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined }> };

export type CoursesManyReferenceQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type CoursesManyReferenceQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined }>, courses_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type LessonGroupAttrsFragment = { media_ids?: any | null | undefined, lesson_group_id: string };

export type LessonGroupByIdQueryVariables = Types.Exact<{
  lesson_group_id: Types.Scalars['String'];
}>;


export type LessonGroupByIdQuery = { lesson_groups: Array<{ media_ids?: any | null | undefined, lesson_group_id: string }> };

export type LessonMemberByUserIdAndCourseIdAndLessonIdV2QueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
  course_id: Types.Scalars['String'];
  lesson_id: Types.Scalars['String'];
}>;


export type LessonMemberByUserIdAndCourseIdAndLessonIdV2Query = { lesson_members: Array<{ attendance_remark?: string | null | undefined, attendance_status?: string | null | undefined }> };

export type LessonReportByLessonIdQueryVariables = Types.Exact<{
  lesson_id: Types.Scalars['String'];
}>;


export type LessonReportByLessonIdQuery = { lesson_reports: Array<{ lesson_id?: string | null | undefined, lesson_report_id: string, report_submitting_status: string, partner_form_config?: { form_config_id: string, feature_name: string, form_config_data?: any | null | undefined } | null | undefined, lesson_report_details: Array<{ lesson_report_detail_id: string, student: { student_id: string }, partner_dynamic_form_field_values: Array<{ dynamic_form_field_value_id: string, value_type?: string | null | undefined, int_value?: number | null | undefined, int_set_value?: any | null | undefined, int_array_value?: any | null | undefined, string_value?: string | null | undefined, string_set_value?: any | null | undefined, string_array_value?: any | null | undefined, bool_value?: boolean | null | undefined, field_render_guide?: any | null | undefined, field_id: string }> }> }> };

export type PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables = Types.Exact<{
  report_user_id: Types.Scalars['String'];
  report_course_id: Types.Scalars['String'];
  report_id?: Types.InputMaybe<Types.Scalars['String']>;
  report_lesson_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2Query = { get_previous_report_of_student_v3: Array<{ form_config_id?: string | null | undefined, lesson_report_id: string, lesson_id?: string | null | undefined }> };

export type Lesson_LessonReportListByLessonIdsQueryVariables = Types.Exact<{
  lesson_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Lesson_LessonReportListByLessonIdsQuery = { lesson_reports: Array<{ report_submitting_status: string, lesson_report_id: string, lesson_id?: string | null | undefined }> };

export type Lesson_LessonByLessonIdForLessonManagementV2QueryVariables = Types.Exact<{
  lesson_id: Types.Scalars['String'];
}>;


export type Lesson_LessonByLessonIdForLessonManagementV2Query = { lessons: Array<{ lesson_id: string, center_id?: string | null | undefined, class_id?: string | null | undefined, lesson_group_id?: string | null | undefined, teaching_medium?: string | null | undefined, teaching_method?: string | null | undefined, lesson_type?: string | null | undefined, scheduling_status?: string | null | undefined, start_time?: any | null | undefined, end_time?: any | null | undefined, course?: { course_id: string, name: string } | null | undefined, lessons_teachers: Array<{ teacher: { users?: { user_id: string, name: string, email?: string | null | undefined } | null | undefined } }>, lesson_members: Array<{ attendance_remark?: string | null | undefined, attendance_status?: string | null | undefined, course?: { course_id: string, name: string, subject?: string | null | undefined } | null | undefined, user: { user_id: string, name: string, email?: string | null | undefined, student?: { current_grade?: number | null | undefined } | null | undefined } }> }> };

export type Lesson_LessonByLessonIdForLessonManagementV3QueryVariables = Types.Exact<{
  lesson_id: Types.Scalars['String'];
}>;


export type Lesson_LessonByLessonIdForLessonManagementV3Query = { lessons: Array<{ lesson_id: string, center_id?: string | null | undefined, class_id?: string | null | undefined, lesson_group_id?: string | null | undefined, teaching_medium?: string | null | undefined, teaching_method?: string | null | undefined, lesson_type?: string | null | undefined, scheduling_status?: string | null | undefined, scheduler_id?: string | null | undefined, start_time?: any | null | undefined, end_time?: any | null | undefined, course?: { course_id: string, name: string } | null | undefined, lessons_teachers: Array<{ teacher: { users?: { user_id: string, name: string, email?: string | null | undefined } | null | undefined } }>, lesson_members: Array<{ attendance_remark?: string | null | undefined, attendance_status?: string | null | undefined, course?: { course_id: string, name: string, subject?: string | null | undefined } | null | undefined, user: { user_id: string, name: string, email?: string | null | undefined, student?: { current_grade?: number | null | undefined } | null | undefined } }> }> };

export type LocationByLocationIdQueryVariables = Types.Exact<{
  location_id: Types.Scalars['String'];
}>;


export type LocationByLocationIdQuery = { locations: Array<{ location_id: string, name: string }> };

export type LocationListByIdsQueryVariables = Types.Exact<{
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type LocationListByIdsQuery = { locations: Array<{ name: string, location_id: string }> };

export type MediaAttrsFragment = { media_id: string, resource?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined };

export type MediasManyQueryVariables = Types.Exact<{
  media_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type MediasManyQuery = { media: Array<{ media_id: string, resource?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined, conversion_tasks: Array<{ status: string }> }> };

export type PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
  report_id: Types.Scalars['String'];
}>;


export type PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQuery = { get_partner_dynamic_form_field_values_by_student: Array<{ value_type?: string | null | undefined, string_value?: string | null | undefined, string_set_value?: any | null | undefined, string_array_value?: any | null | undefined, int_set_value?: any | null | undefined, int_array_value?: any | null | undefined, field_id: string, bool_value?: boolean | null | undefined, int_value?: number | null | undefined }> };

export type PartnerFormConfigsOneQueryVariables = Types.Exact<{
  feature_name?: Types.InputMaybe<Types.Scalars['String']>;
  school_id?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type PartnerFormConfigsOneQuery = { partner_form_configs: Array<{ form_config_id: string, form_config_data?: any | null | undefined }> };

export type PartnerFormConfigByIdQueryVariables = Types.Exact<{
  form_config_id: Types.Scalars['String'];
}>;


export type PartnerFormConfigByIdQuery = { partner_form_configs: Array<{ form_config_data?: any | null | undefined }> };

export type Lesson_SchedulerBySchedulerIdQueryVariables = Types.Exact<{
  scheduler_id: Types.Scalars['String'];
}>;


export type Lesson_SchedulerBySchedulerIdQuery = { scheduler: Array<{ scheduler_id: string, start_date: any, end_date: any, freq?: any | null | undefined }> };

export type StudentUserAttrsFragment = { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined };

export type StudentWithoutGradeFrgFragment = { user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined };

export type StudentsManyQueryVariables = Types.Exact<{
  user_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type StudentsManyQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined }> };

export type GradesOfStudentsListQueryVariables = Types.Exact<{
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type GradesOfStudentsListQuery = { students: Array<{ student_id: string, current_grade?: number | null | undefined, enrollment_status: string }> };

export type StudentsListByFiltersWithoutGradeAndAggregateQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  order_by?: Types.Users_Order_By;
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  grades?: Types.InputMaybe<Array<Types.Scalars['smallint']> | Types.Scalars['smallint']>;
  enrollment_status?: Types.InputMaybe<Types.Scalars['String']>;
  last_login_date?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type StudentsListByFiltersWithoutGradeAndAggregateQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined }> };

export type CountStudentWithFilterQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  grades?: Types.InputMaybe<Array<Types.Scalars['smallint']> | Types.Scalars['smallint']>;
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  enrollment_status?: Types.InputMaybe<Types.Scalars['String']>;
  last_login_date?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CountStudentWithFilterQuery = { users_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type TeacherManyQueryVariables = Types.Exact<{
  user_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  school_id?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type TeacherManyQuery = { find_teacher_by_school_id: Array<{ name: string, email?: string | null | undefined, user_id: string }> };
