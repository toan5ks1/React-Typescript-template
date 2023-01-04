import * as Types from '../../__generated__/bob/root-types';

export type User_ClassManyQueryVariables = Types.Exact<{
  class_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_ClassManyQuery = { class: Array<{ name: string, class_id: string }> };

export type User_ClassListWithFilterQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
  location_id: Types.Scalars['String'];
}>;


export type User_ClassListWithFilterQuery = { class: Array<{ class_id: string, name: string }> };

export type User_OneCourseByCourseIdAndLocationIdQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
  location_id: Types.Scalars['String'];
}>;


export type User_OneCourseByCourseIdAndLocationIdQuery = { course_access_paths: Array<{ location_id: string, course_id: string }> };

export type User_CourseLocationsByCourseIdQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
}>;


export type User_CourseLocationsByCourseIdQuery = { course_access_paths: Array<{ location: { location_id: string, name: string, access_path?: string | null | undefined, location_type?: string | null | undefined, parent_location_id?: string | null | undefined } }> };

export type CourseAttrsFragment = { course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined };

export type CoursesOneQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
}>;


export type CoursesOneQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, course_books: Array<{ book_id: string, books: Array<{ book_chapters: Array<{ chapter_id: string }> }> }> }> };

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

export type User_CourseWithLocationAttrsFragment = { course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, course_access_paths: Array<{ location: { name: string, location_type?: string | null | undefined, location_id: string, parent_location_id?: string | null | undefined, access_path?: string | null | undefined } }> };

export type User_CoursesManyWithLocationQueryVariables = Types.Exact<{
  course_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_CoursesManyWithLocationQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, course_access_paths: Array<{ location: { name: string, location_type?: string | null | undefined, location_id: string, parent_location_id?: string | null | undefined, access_path?: string | null | undefined } }> }> };

export type User_CoursesManyReferenceWithLocationV2QueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type User_CoursesManyReferenceWithLocationV2Query = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined }> };

export type UserAttrsFragment = { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string };

export type User_GrantedRoleAccessPathByGrantedRoleIdsQueryVariables = Types.Exact<{
  granted_role_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_GrantedRoleAccessPathByGrantedRoleIdsQuery = { granted_role_access_path: Array<{ granted_role_id: string, location: { location_id: string, name: string, parent_location_id?: string | null | undefined, access_path?: string | null | undefined, location_type?: string | null | undefined, is_archived: boolean } }> };

export type User_GrantedRoleListQueryVariables = Types.Exact<{
  user_group_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type User_GrantedRoleListQuery = { granted_role: Array<{ granted_role_id: string, role: { role_id: string, role_name: string } }>, granted_role_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_LocationListByIdsQueryVariables = Types.Exact<{
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_LocationListByIdsQuery = { locations: Array<{ location_id: string, name: string, access_path?: string | null | undefined, location_type?: string | null | undefined, parent_location_id?: string | null | undefined }> };

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

export type Users_PrefectureListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Users_PrefectureListQuery = { prefecture: Array<{ prefecture_id: string, name: string }> };

export type User_RoleListV2QueryVariables = Types.Exact<{
  is_system?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type User_RoleListV2Query = { role: Array<{ role_id: string, role_name: string }>, role_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_RoleListV3QueryVariables = Types.Exact<{
  is_system?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type User_RoleListV3Query = { role: Array<{ role_id: string, role_name: string }>, role_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_GetManyReferenceSchoolCourseQueryVariables = Types.Exact<{
  school_id?: Types.Scalars['String'];
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type User_GetManyReferenceSchoolCourseQuery = { school_course: Array<{ school_course_id: string, school_course_name: string, is_archived: boolean }> };

export type User_GetManyManyReferenceSchoolInfoQueryVariables = Types.Exact<{
  school_level_id?: Types.InputMaybe<Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type User_GetManyManyReferenceSchoolInfoQuery = { school_info: Array<{ school_id: string, school_name: string, address?: string | null | undefined, is_archived: boolean, school_level_id: string }> };

export type User_GetManyReferenceSchoolLevelQueryVariables = Types.Exact<{
  school_id?: Types.InputMaybe<Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type User_GetManyReferenceSchoolLevelQuery = { school_level: Array<{ school_level_id: string, school_level_name: string, is_archived: boolean, school_infos: Array<{ school_id: string }> }> };

export type User_StaffListV2QueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  user_name?: Types.InputMaybe<Types.Scalars['String']>;
  user_email?: Types.InputMaybe<Types.Scalars['String']>;
  school_id?: Types.Scalars['Int'];
}>;


export type User_StaffListV2Query = { find_teacher_by_school_id: Array<{ name: string, email?: string | null | undefined, user_id: string, resource_path: string }>, find_teacher_by_school_id_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_StaffListV3QueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  user_name?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type User_StaffListV3Query = { staff: Array<{ staff_id: string, user: { email?: string | null | undefined, name: string, user_group_members: Array<{ user_group: { user_group_id: string, user_group_name: string } }> } }>, staff_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_StaffListV4QueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  user_name?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type User_StaffListV4Query = { staff: Array<{ staff_id: string, user: { email?: string | null | undefined, name: string, resource_path: string, user_group_members: Array<{ user_group: { user_group_id: string, user_group_name: string } }> } }>, staff_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_StaffAttrsFragment = { teacher_id: string, users?: { name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined };

export type User_StaffOneQueryVariables = Types.Exact<{
  teacher_id: Types.Scalars['String'];
}>;


export type User_StaffOneQuery = { teachers: Array<{ teacher_id: string, teacher_by_school_ids: Array<{ school_id?: number | null | undefined }>, users?: { name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined }> };

export type User_StaffOneV2QueryVariables = Types.Exact<{
  staff_id: Types.Scalars['String'];
}>;


export type User_StaffOneV2Query = { staff: Array<{ staff_id: string, user: { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string, user_group_members: Array<{ user_group: { user_group_id: string, user_group_name: string } }> } }> };

export type User_StaffTimesheetConfigQueryVariables = Types.Exact<{
  staff_id: Types.Scalars['String'];
}>;


export type User_StaffTimesheetConfigQuery = { staff: Array<{ staff_id: string, auto_create_timesheet?: boolean | null | undefined, updated_at: any }> };

export type EntryExit_StudentQrCodeByStudentIdsV2QueryVariables = Types.Exact<{
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type EntryExit_StudentQrCodeByStudentIdsV2Query = { student_qr: Array<{ qr_url: string, qr_id: number, student_id: string, version?: string | null | undefined }> };

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

export type StudentFrgV2Fragment = { student_id: string, current_grade?: number | null | undefined, user?: { last_login_date?: any | null | undefined, gender?: string | null | undefined, birthday?: string | null | undefined, first_name: string, last_name: string, first_name_phonetic?: string | null | undefined, last_name_phonetic?: string | null | undefined, full_name_phonetic?: string | null | undefined, user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined };

export type StudentWithoutGradeFrgFragment = { user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined, resource_path: string };

export type StudentWithoutGradeFrgV2Fragment = { user_id: string, name: string, full_name_phonetic?: string | null | undefined, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined, resource_path: string };

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


export type StudentsListByFiltersWithoutGradeAndAggregateQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined, resource_path: string }> };

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


export type User_StudentsListByFiltersWithoutGradeAndAggregateV2Query = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined, resource_path: string }> };

export type StudentUserAttrsFragment = { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined };

export type User_StudentsListByFiltersWithoutGradeAndAggregateV3QueryVariables = Types.Exact<{
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


export type User_StudentsListByFiltersWithoutGradeAndAggregateV3Query = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined, resource_path: string }> };

export type User_GetManyStudentsFiltersQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  full_name_phonetic?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  order_by?: Types.Users_Order_By;
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  grades?: Types.InputMaybe<Array<Types.Scalars['smallint']> | Types.Scalars['smallint']>;
  enrollment_status?: Types.InputMaybe<Types.Scalars['String']>;
  last_login_date?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type User_GetManyStudentsFiltersQuery = { users: Array<{ user_id: string, name: string, full_name_phonetic?: string | null | undefined, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined, resource_path: string }> };

export type StudentsManyQueryVariables = Types.Exact<{
  user_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type StudentsManyQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined }> };

export type StudentsOneV3QueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type StudentsOneV3Query = { students: Array<{ enrollment_status: string, student_external_id?: string | null | undefined, student_note: string, student_id: string, current_grade?: number | null | undefined, user?: { last_login_date?: any | null | undefined, gender?: string | null | undefined, birthday?: string | null | undefined, user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined }> };

export type User_StudentsOneV4QueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type User_StudentsOneV4Query = { students: Array<{ enrollment_status: string, student_external_id?: string | null | undefined, student_note: string, student_id: string, current_grade?: number | null | undefined, user?: { last_login_date?: any | null | undefined, gender?: string | null | undefined, birthday?: string | null | undefined, first_name: string, last_name: string, first_name_phonetic?: string | null | undefined, last_name_phonetic?: string | null | undefined, full_name_phonetic?: string | null | undefined, user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string } | null | undefined }> };

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

export type User_CountStudentWithFilterV3QueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  full_name_phonetic?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  grades?: Types.InputMaybe<Array<Types.Scalars['smallint']> | Types.Scalars['smallint']>;
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  enrollment_status?: Types.InputMaybe<Types.Scalars['String']>;
  last_login_date?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type User_CountStudentWithFilterV3Query = { users_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_StudentsListByFiltersWithoutGradeAndAggregateV4QueryVariables = Types.Exact<{
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


export type User_StudentsListByFiltersWithoutGradeAndAggregateV4Query = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined, resource_path: string }> };

export type User_GetManyStudentLocationsFiltersQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  full_name_phonetic?: Types.InputMaybe<Types.Scalars['String']>;
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


export type User_GetManyStudentLocationsFiltersQuery = { users: Array<{ user_id: string, name: string, full_name_phonetic?: string | null | undefined, email?: string | null | undefined, phone_number?: string | null | undefined, country: string, last_login_date?: any | null | undefined, resource_path: string }> };

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

export type User_CountStudentWithLocationsFilterQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  full_name_phonetic?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  grades?: Types.InputMaybe<Array<Types.Scalars['smallint']> | Types.Scalars['smallint']>;
  student_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  enrollment_status?: Types.InputMaybe<Types.Scalars['String']>;
  last_login_date?: Types.InputMaybe<Types.Scalars['Boolean']>;
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_CountStudentWithLocationsFilterQuery = { users_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_UserAccessPathWithFilterV2QueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
}>;


export type User_UserAccessPathWithFilterV2Query = { user_access_paths: Array<{ location: { location_id: string, name: string, access_path?: string | null | undefined, location_type?: string | null | undefined, parent_location_id?: string | null | undefined } }> };

export type User_UserAccessPathWithFilterV3QueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
}>;


export type User_UserAccessPathWithFilterV3Query = { user_access_paths: Array<{ location: { location_id: string, name: string, access_path?: string | null | undefined, location_type?: string | null | undefined, parent_location_id?: string | null | undefined, is_archived: boolean } }> };

export type User_UserAccessPathByUserIdsV2QueryVariables = Types.Exact<{
  user_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type User_UserAccessPathByUserIdsV2Query = { user_access_paths: Array<{ user_id: string, location: { location_id: string, name: string, access_path?: string | null | undefined, location_type?: string | null | undefined, parent_location_id?: string | null | undefined, is_archived: boolean } }> };

export type User_OneUserByUserIdAndLocationIdQueryVariables = Types.Exact<{
  location_id: Types.Scalars['String'];
  user_id: Types.Scalars['String'];
}>;


export type User_OneUserByUserIdAndLocationIdQuery = { user_access_paths: Array<{ user_id: string, location_id: string }> };

export type Users_UserAddressByUserIdsQueryVariables = Types.Exact<{
  user_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Users_UserAddressByUserIdsQuery = { user_address: Array<{ user_id: string, user_address_id: string, postal_code?: string | null | undefined, city?: string | null | undefined, first_street?: string | null | undefined, second_street?: string | null | undefined, prefecture?: { prefecture_id: string, name: string } | null | undefined }> };

export type User_UserGroupListV2QueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  is_system?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type User_UserGroupListV2Query = { user_group: Array<{ user_group_id: string, user_group_name: string }>, user_group_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type User_UserGroupOneQueryVariables = Types.Exact<{
  user_group_id: Types.Scalars['String'];
}>;


export type User_UserGroupOneQuery = { user_group: Array<{ user_group_id: string, user_group_name: string }> };

export type User_UserGroupsManyReferenceV2QueryVariables = Types.Exact<{
  user_group_name?: Types.InputMaybe<Types.Scalars['String']>;
  is_system?: Types.InputMaybe<Types.Scalars['Boolean']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type User_UserGroupsManyReferenceV2Query = { user_group: Array<{ user_group_id: string, user_group_name: string }> };

export type UserByEmailQueryVariables = Types.Exact<{
  email?: Types.InputMaybe<Types.Scalars['String']>;
  phone_number?: Types.InputMaybe<Types.Scalars['String']>;
  user_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UserByEmailQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined, phone_number?: string | null | undefined, user_group: string, country: string }> };
