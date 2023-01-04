import * as Types from '../../__generated__/bob/root-types';

export type CityAttrsFragment = { city_id: number, country: string, display_order: number, name: string };

export type CityOneQueryVariables = Types.Exact<{
  city_id?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type CityOneQuery = { cities: Array<{ city_id: number, country: string, display_order: number, name: string }> };

export type CityManyQueryVariables = Types.Exact<{
  country?: Types.InputMaybe<Types.Scalars['String']>;
  city_id?: Types.InputMaybe<Types.Scalars['Int']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type CityManyQuery = { cities: Array<{ city_id: number, country: string, display_order: number, name: string }> };

export type Lesson_LocationIdsByCourseIdQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
}>;


export type Lesson_LocationIdsByCourseIdQuery = { course_access_paths: Array<{ location_id: string }> };

export type Lesson_LocationIdsByCourseIdV2QueryVariables = Types.Exact<{
  course?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type Lesson_LocationIdsByCourseIdV2Query = { get_locations_active_by_course_id: Array<{ location_id: string }> };

export type User_CourseLocationsByIdsQueryVariables = Types.Exact<{
  course_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_CourseLocationsByIdsQuery = { course_access_paths: Array<{ course_id: string, location: { location_id: string, name: string, access_path?: string | null | undefined, location_type?: string | null | undefined, parent_location_id?: string | null | undefined } }> };

export type User_OneCourseByCourseIdAndLocationIdQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
  location_id: Types.Scalars['String'];
}>;


export type User_OneCourseByCourseIdAndLocationIdQuery = { course_access_paths: Array<{ location_id: string, course_id: string }> };

export type User_CourseLocationsByCourseIdQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
}>;


export type User_CourseLocationsByCourseIdQuery = { course_access_paths: Array<{ location: { location_id: string, name: string, access_path?: string | null | undefined, location_type?: string | null | undefined, parent_location_id?: string | null | undefined } }> };

export type CourseBookAttrsFragment = { course_id: string, book_id: string, books: Array<{ name: string }> };

export type CourseBooksListQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type CourseBooksListQuery = { courses_books: Array<{ course_id: string, book_id: string, books: Array<{ name: string }> }>, courses_books_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_ClassListWithFilterQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
  location_id: Types.Scalars['String'];
}>;


export type User_ClassListWithFilterQuery = { class: Array<{ class_id: string, name: string }> };

export type CourseAttrsFragment = { course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined };

export type User_CourseWithLocationAttrsFragment = { course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, course_access_paths: Array<{ location: { name: string, location_type?: string | null | undefined, location_id: string, parent_location_id?: string | null | undefined, access_path?: string | null | undefined } }> };

export type CoursesOneQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
}>;


export type CoursesOneQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, course_books: Array<{ book_id: string, books: Array<{ book_chapters: Array<{ chapter_id: string }> }> }> }> };

export type CoursesManyQueryVariables = Types.Exact<{
  course_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type CoursesManyQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined }> };

export type User_CoursesManyWithLocationQueryVariables = Types.Exact<{
  course_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_CoursesManyWithLocationQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, course_access_paths: Array<{ location: { name: string, location_type?: string | null | undefined, location_id: string, parent_location_id?: string | null | undefined, access_path?: string | null | undefined } }> }> };

export type CoursesManyReferenceQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type CoursesManyReferenceQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined }>, courses_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_CoursesManyReferenceWithLocationQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type User_CoursesManyReferenceWithLocationQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, course_access_paths: Array<{ location: { name: string, location_type?: string | null | undefined, location_id: string, parent_location_id?: string | null | undefined, access_path?: string | null | undefined } }> }>, courses_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_CoursesManyReferenceWithLocationV2QueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type User_CoursesManyReferenceWithLocationV2Query = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined }> };

export type LessonReportByLessonIdQueryVariables = Types.Exact<{
  lesson_id: Types.Scalars['String'];
}>;


export type LessonReportByLessonIdQuery = { lesson_reports: Array<{ lesson_id?: string | null | undefined, lesson_report_id: string, report_submitting_status: string, partner_form_config?: { form_config_id: string, feature_name: string, form_config_data?: any | null | undefined } | null | undefined, lesson_report_details: Array<{ lesson_report_detail_id: string, student: { student_id: string }, partner_dynamic_form_field_values: Array<{ dynamic_form_field_value_id: string, value_type?: string | null | undefined, int_value?: number | null | undefined, int_set_value?: any | null | undefined, int_array_value?: any | null | undefined, string_value?: string | null | undefined, string_set_value?: any | null | undefined, string_array_value?: any | null | undefined, bool_value?: boolean | null | undefined, field_render_guide?: any | null | undefined, field_id: string }> }> }> };

export type PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
  report_course_id: Types.Scalars['String'];
  report_id?: Types.InputMaybe<Types.Scalars['String']>;
  report_lesson_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdQuery = { get_previous_report_of_student_v2: Array<{ form_config_id?: string | null | undefined, lesson_report_id: string, lesson_id?: string | null | undefined }> };

export type LessonGroupAttrsFragment = { media_ids?: any | null | undefined, lesson_group_id: string };

export type LessonGroupsListQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type LessonGroupsListQuery = { lesson_groups: Array<{ media_ids?: any | null | undefined, lesson_group_id: string }>, lesson_groups_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type LessonGroupsListByIdsQueryVariables = Types.Exact<{
  lesson_group_ids: Array<Types.Scalars['String']> | Types.Scalars['String'];
  course_id?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type LessonGroupsListByIdsQuery = { lesson_groups: Array<{ media_ids?: any | null | undefined, lesson_group_id: string }> };

export type Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables = Types.Exact<{
  lesson_group_ids: Array<Types.Scalars['String']> | Types.Scalars['String'];
  course_id?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery = { lesson_groups: Array<{ media_ids?: any | null | undefined, lesson_group_id: string }> };

export type LessonByLessonIdQueryVariables = Types.Exact<{
  lesson_id: Types.Scalars['String'];
}>;


export type LessonByLessonIdQuery = { lessons: Array<{ lesson_id: string, status?: string | null | undefined, end_time?: any | null | undefined, start_time?: any | null | undefined, name?: string | null | undefined, lesson_group_id?: string | null | undefined, lessons_courses: Array<{ course: { name: string, course_id: string } }>, lessons_teachers: Array<{ teacher: { users?: { name: string, user_id: string, email?: string | null | undefined } | null | undefined } }>, lesson_members: Array<{ user: { user_id: string, name: string, email?: string | null | undefined, last_login_date?: any | null | undefined, student?: { student_id: string, current_grade?: number | null | undefined, enrollment_status: string } | null | undefined } }> }> };

export type LessonsByCourseIdQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
}>;


export type LessonsByCourseIdQuery = { lessons: Array<{ name?: string | null | undefined, lesson_group_id?: string | null | undefined }> };

export type LocationsListByNameLowestLevelQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type LocationsListByNameLowestLevelQuery = { get_locations_lowest_level: Array<{ name: string, location_id: string }> };

export type LocationByLocationIdQueryVariables = Types.Exact<{
  location_id: Types.Scalars['String'];
}>;


export type LocationByLocationIdQuery = { locations: Array<{ location_id: string, name: string }> };

export type LocationListByIdsQueryVariables = Types.Exact<{
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type LocationListByIdsQuery = { locations: Array<{ name: string, location_id: string }> };

export type User_LocationListByIdsQueryVariables = Types.Exact<{
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_LocationListByIdsQuery = { locations: Array<{ location_id: string, name: string, access_path?: string | null | undefined, location_type?: string | null | undefined, parent_location_id?: string | null | undefined }> };

export type MediaAttrsFragment = { media_id: string, resource?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined };

export type MediasOneQueryVariables = Types.Exact<{
  media_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type MediasOneQuery = { media: Array<{ media_id: string, resource?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined }> };

export type MediasListQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  media_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  resource?: Types.InputMaybe<Types.Scalars['String']>;
  type?: Types.InputMaybe<Types.Scalars['String']>;
  converted_images?: Types.InputMaybe<Types.Scalars['Boolean']>;
  comments?: Types.InputMaybe<Types.Scalars['jsonb']>;
}>;


export type MediasListQuery = { media: Array<{ media_id: string, resource?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined }>, media_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type MediasManyQueryVariables = Types.Exact<{
  media_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type MediasManyQuery = { media: Array<{ media_id: string, resource?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined, conversion_tasks: Array<{ status: string }> }> };

export type Users_OrganizationsManyReferenceQueryVariables = Types.Exact<{
  domain_name?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type Users_OrganizationsManyReferenceQuery = { organizations: Array<{ tenant_id?: string | null | undefined, domain_name?: string | null | undefined }> };

export type ParentAttrsFragment = { user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string };

export type ParentsManyReferenceQueryVariables = Types.Exact<{
  email?: Types.InputMaybe<Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ParentsManyReferenceQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string }> };

export type SchoolAdminAttrsFragment = { school_admin_id: string, created_at: any, updated_at: any, users?: { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined };

export type SchoolAdminsTitleQueryVariables = Types.Exact<{
  school_admin_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type SchoolAdminsTitleQuery = { school_admins: Array<{ school_admin_id: string, created_at: any, updated_at: any, users?: { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined }> };

export type SchoolAdminsOneQueryVariables = Types.Exact<{
  school_admin_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type SchoolAdminsOneQuery = { school_admins: Array<{ school_admin_id: string, created_at: any, updated_at: any, users?: { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined }> };

export type SchoolAdminsListQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  school_admin_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  school_id?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type SchoolAdminsListQuery = { school_admins: Array<{ school_admin_id: string, created_at: any, updated_at: any, users?: { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined }>, school_admins_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type SchoolAdminsManyQueryVariables = Types.Exact<{
  school_admin_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type SchoolAdminsManyQuery = { school_admins: Array<{ school_admin_id: string, created_at: any, updated_at: any, users?: { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined }> };

export type SchoolAdminsManyReferenceQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  school_id?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
}>;


export type SchoolAdminsManyReferenceQuery = { school_admins: Array<{ school_admin_id: string, created_at: any, updated_at: any, users?: { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined }>, school_admins_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type CountSchoolAdminsWithFilterQueryVariables = Types.Exact<{
  school_id: Types.Scalars['Int'];
  filterValue?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type CountSchoolAdminsWithFilterQuery = { users_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type GetSchoolAdminsBySchoolIdQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  school_id: Types.Scalars['Int'];
  filterValue?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetSchoolAdminsBySchoolIdQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined }> };

export type SchoolAttrsFragment = { school_id: number, city_id: number, district_id: number, name: string, country: string, phone_number?: string | null | undefined, point?: { type: string; coordinates: number[] } | null | undefined, is_system_school: boolean };

export type SchoolsTitleQueryVariables = Types.Exact<{
  school_id?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SchoolsTitleQuery = { schools: Array<{ school_id: number, name: string }> };

export type SchoolsOneQueryVariables = Types.Exact<{
  school_id?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SchoolsOneQuery = { schools: Array<{ point?: { type: string; coordinates: number[] } | null | undefined, school_id: number, city_id: number, district_id: number, name: string, country: string, phone_number?: string | null | undefined, is_system_school: boolean, classes_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } }> };

export type SchoolsListQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  phone_number?: Types.InputMaybe<Types.Scalars['String']>;
  school_id?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
  is_system_school?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type SchoolsListQuery = { schools: Array<{ school_id: number, city_id: number, district_id: number, name: string, country: string, phone_number?: string | null | undefined, point?: { type: string; coordinates: number[] } | null | undefined, is_system_school: boolean }>, schools_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type SchoolsManyQueryVariables = Types.Exact<{
  school_id?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
}>;


export type SchoolsManyQuery = { schools: Array<{ school_id: number, name: string, country: string, point?: { type: string; coordinates: number[] } | null | undefined, phone_number?: string | null | undefined, is_system_school: boolean, city: { name: string }, district: { city_id: number, name: string } }> };

export type SchoolsManyReferenceQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  phone_number?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SchoolsManyReferenceQuery = { schools: Array<{ school_id: number, name: string, country: string, point?: { type: string; coordinates: number[] } | null | undefined, phone_number?: string | null | undefined, is_system_school: boolean, city: { name: string }, district: { city_id: number, name: string } }>, schools_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type StudentQrCodeByStudentIdsQueryVariables = Types.Exact<{
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type StudentQrCodeByStudentIdsQuery = { student_qr: Array<{ qr_url: string, qr_id: number, student_id: string }> };

export type EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables = Types.Exact<{
  student_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQuery = { student_entryexit_records: Array<{ entry_at: any, entryexit_id: number, exit_at?: any | null | undefined, student_id: string }>, student_entryexit_records_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type StudentParentAttrsFragment = { parent_id: string, student_id: string, relationship: string, parent_user?: { name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string } | null | undefined };

export type ParentsManyQueryVariables = Types.Exact<{
  student_ids: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type ParentsManyQuery = { student_parents: Array<{ parent_id: string, student_id: string, relationship: string, parent_user?: { name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string } | null | undefined }> };

export type ParentRelationshipsByUserIdQueryVariables = Types.Exact<{
  userId?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ParentRelationshipsByUserIdQuery = { student_parents: Array<{ relationship: string }> };

export type StudentFrgFragment = { student_id: string, current_grade?: number | null | undefined, user?: { last_login_date?: any | null | undefined, gender?: string | null | undefined, birthday?: string | null | undefined, user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined };

export type StudentWithoutGradeFrgFragment = { user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined };

export type StudentUserAttrsFragment = { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined };

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

export type StudentsManyQueryVariables = Types.Exact<{
  user_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type StudentsManyQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined }> };

export type StudentsManyReferenceQueryVariables = Types.Exact<{
  user_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type StudentsManyReferenceQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined }> };

export type StudentsManyReferenceByNameAndEmailQueryVariables = Types.Exact<{
  keyword?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type StudentsManyReferenceByNameAndEmailQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined }> };

export type StudentsOneV3QueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type StudentsOneV3Query = { students: Array<{ enrollment_status: string, student_external_id?: string | null | undefined, student_note: string, student_id: string, current_grade?: number | null | undefined, user?: { last_login_date?: any | null | undefined, gender?: string | null | undefined, birthday?: string | null | undefined, user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined }> };

export type GradesOfStudentsListQueryVariables = Types.Exact<{
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type GradesOfStudentsListQuery = { students: Array<{ student_id: string, current_grade?: number | null | undefined, enrollment_status: string }> };

export type CountStudentWithFilterQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  grades?: Types.InputMaybe<Array<Types.Scalars['smallint']> | Types.Scalars['smallint']>;
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  enrollment_status?: Types.InputMaybe<Types.Scalars['String']>;
  last_login_date?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CountStudentWithFilterQuery = { users_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_StudentsListByFiltersWithoutGradeAndAggregateV2QueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  order_by?: Types.Users_Order_By;
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  grades?: Types.InputMaybe<Array<Types.Scalars['smallint']> | Types.Scalars['smallint']>;
  enrollment_status?: Types.InputMaybe<Types.Scalars['String']>;
  last_login_date?: Types.InputMaybe<Types.Scalars['Boolean']>;
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_StudentsListByFiltersWithoutGradeAndAggregateV2Query = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined }> };

export type User_CountStudentWithFilterV2QueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  grades?: Types.InputMaybe<Array<Types.Scalars['smallint']> | Types.Scalars['smallint']>;
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  enrollment_status?: Types.InputMaybe<Types.Scalars['String']>;
  last_login_date?: Types.InputMaybe<Types.Scalars['Boolean']>;
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_CountStudentWithFilterV2Query = { users_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type TeacherAttrsFragment = { teacher_id: string, users?: { name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined };

export type TeacherTitleQueryVariables = Types.Exact<{
  teacher_id: Types.Scalars['String'];
}>;


export type TeacherTitleQuery = { teachers: Array<{ users?: { name: string } | null | undefined }> };

export type TeacherOneQueryVariables = Types.Exact<{
  teacher_id: Types.Scalars['String'];
}>;


export type TeacherOneQuery = { teachers: Array<{ teacher_id: string, teacher_by_school_ids: Array<{ school_id?: number | null | undefined }>, users?: { name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined }> };

export type TeacherManyReferenceQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  school_id?: Types.Scalars['Int'];
}>;


export type TeacherManyReferenceQuery = { find_teacher_by_school_id: Array<{ name: string, email?: string | null | undefined, user_id: string, avatar?: string | null | undefined }> };

export type TeacherListQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  user_name?: Types.InputMaybe<Types.Scalars['String']>;
  user_email?: Types.InputMaybe<Types.Scalars['String']>;
  school_id?: Types.Scalars['Int'];
}>;


export type TeacherListQuery = { find_teacher_by_school_id: Array<{ name: string, email?: string | null | undefined, user_id: string }>, find_teacher_by_school_id_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type TeacherListWithoutTeacherIdsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  user_name?: Types.InputMaybe<Types.Scalars['String']>;
  user_email?: Types.InputMaybe<Types.Scalars['String']>;
  user_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  school_id?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type TeacherListWithoutTeacherIdsQuery = { find_teacher_by_school_id: Array<{ name: string, email?: string | null | undefined, user_id: string, avatar?: string | null | undefined }>, find_teacher_by_school_id_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type TeacherManyQueryVariables = Types.Exact<{
  user_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  school_id?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type TeacherManyQuery = { find_teacher_by_school_id: Array<{ name: string, email?: string | null | undefined, user_id: string }> };

export type User_UserAccessPathWithFilterV2QueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
}>;


export type User_UserAccessPathWithFilterV2Query = { user_access_paths: Array<{ location: { location_id: string, name: string, access_path?: string | null | undefined, location_type?: string | null | undefined, parent_location_id?: string | null | undefined } }> };

export type User_UserAccessPathByUserIdsQueryVariables = Types.Exact<{
  user_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_UserAccessPathByUserIdsQuery = { user_access_paths: Array<{ user_id: string, location: { location_id: string, name: string, access_path?: string | null | undefined, location_type?: string | null | undefined, parent_location_id?: string | null | undefined } }> };

export type User_OneUserByUserIdAndLocationIdQueryVariables = Types.Exact<{
  location_id: Types.Scalars['String'];
  user_id: Types.Scalars['String'];
}>;


export type User_OneUserByUserIdAndLocationIdQuery = { user_access_paths: Array<{ user_id: string, location_id: string }> };

export type UserAttrsFragment = { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string };

export type UsersTitleQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
}>;


export type UsersTitleQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string }> };

export type UserNameByIdsQueryVariables = Types.Exact<{
  user_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type UserNameByIdsQuery = { users: Array<{ user_id: string, name: string }> };

export type UsersManyQueryVariables = Types.Exact<{
  user_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type UsersManyQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string }>, users_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type UserByEmailQueryVariables = Types.Exact<{
  email?: Types.InputMaybe<Types.Scalars['String']>;
  phone_number?: Types.InputMaybe<Types.Scalars['String']>;
  user_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UserByEmailQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string }> };
