import * as Types from '../../__generated__/eureka/root-types';

export type BrandAttrsFragment = { brand_id: string, name: string, owner?: string | null | undefined };

export type BrandsListQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type BrandsListQuery = { brands: Array<{ brand_id: string, name: string, owner?: string | null | undefined }> };

export type CenterAttrsFragment = { center_id: string, name: string, owner?: string | null | undefined };

export type CentersListQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type CentersListQuery = { centers: Array<{ center_id: string, name: string, owner?: string | null | undefined }> };

export type CourseStudentAttrsFragment = { student_id: string, course_id: string };

export type CourseStudentsListV2QueryVariables = Types.Exact<{
  course_id?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type CourseStudentsListV2Query = { course_students: Array<{ student_id: string, course_id: string }>, course_students_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type CourseStudentsListByCourseIdsQueryVariables = Types.Exact<{
  course_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type CourseStudentsListByCourseIdsQuery = { course_students: Array<{ student_id: string, course_id: string }>, course_students_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type CourseStudentsListQueryVariables = Types.Exact<{
  course_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type CourseStudentsListQuery = { course_students: Array<{ student_id: string, course_id: string }> };

export type GetListCourseStudentStudyPlansByFilterQueryVariables = Types.Exact<{
  courseId: Types.Scalars['String'];
  grades?: Types.InputMaybe<Types.Scalars['_int4']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  bookIds?: Types.InputMaybe<Types.Scalars['_text']>;
  status?: Types.InputMaybe<Types.Scalars['String']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetListCourseStudentStudyPlansByFilterQuery = { get_list_course_student_study_plans_by_filter: Array<{ course_id: string, student_id: string }>, get_list_course_student_study_plans_by_filter_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };
