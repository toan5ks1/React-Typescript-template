import * as Types from '../../__generated__/bob/root-types';

export type Lesson_ClassListByCourseIdQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Lesson_ClassListByCourseIdQuery = { class: Array<{ class_id: string, name: string, location: { location_id: string, name: string } }>, class_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Lesson_ClassListByCourseIdV2QueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Lesson_ClassListByCourseIdV2Query = { class: Array<{ class_id: string, name: string, location: { location_id: string, name: string } }>, class_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Lesson_ClassListByCourseIdV3QueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  order_by?: Types.InputMaybe<Array<Types.Class_Order_By> | Types.Class_Order_By>;
}>;


export type Lesson_ClassListByCourseIdV3Query = { class: Array<{ class_id: string, name: string, location: { location_id: string, name: string } }>, class_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type Lesson_ClassAssociationByClassIdQueryVariables = Types.Exact<{
  class_id: Types.Scalars['String'];
}>;


export type Lesson_ClassAssociationByClassIdQuery = { class_member_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined }, lessons_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type CourseAttrsFragment = { course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined };

export type Lesson_CoursesAttrsFragment = { course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, teaching_method?: string | null | undefined };

export type Lesson_CourseAttrsFragment = { course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, teaching_method?: string | null | undefined };

export type CoursesOneQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
}>;


export type CoursesOneQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, course_books: Array<{ book_id: string, books: Array<{ book_chapters: Array<{ chapter_id: string }> }> }> }> };

export type Lesson_CoursesOneQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
}>;


export type Lesson_CoursesOneQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, teaching_method?: string | null | undefined, course_books: Array<{ book_id: string, books: Array<{ book_chapters: Array<{ chapter_id: string }> }> }> }> };

export type CoursesListQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  course_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  course_type?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type CoursesListQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined }>, courses_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type CourseTitleQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
}>;


export type CourseTitleQuery = { courses: Array<{ name: string }> };

export type Lesson_CoursesListQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  course_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  course_type?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Lesson_CoursesListQuery = { courses: Array<{ course_id: string, name: string, icon?: string | null | undefined, grade?: number | null | undefined, subject?: string | null | undefined, country?: string | null | undefined, school_id: number, display_order?: number | null | undefined, teaching_method?: string | null | undefined }>, courses_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type LessonGroupAttrsFragment = { media_ids?: any | null | undefined, lesson_group_id: string };

export type Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables = Types.Exact<{
  lesson_group_ids: Array<Types.Scalars['String']> | Types.Scalars['String'];
  course_id?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery = { lesson_groups: Array<{ media_ids?: any | null | undefined, lesson_group_id: string }> };

export type LessonsByCourseIdQueryVariables = Types.Exact<{
  course_id: Types.Scalars['String'];
}>;


export type LessonsByCourseIdQuery = { lessons: Array<{ name?: string | null | undefined, lesson_group_id?: string | null | undefined }> };

export type LocationListByIdsQueryVariables = Types.Exact<{
  location_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type LocationListByIdsQuery = { locations: Array<{ name: string, location_id: string }> };

export type Lesson_LocationIdsByCourseIdV2QueryVariables = Types.Exact<{
  course?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type Lesson_LocationIdsByCourseIdV2Query = { get_locations_active_by_course_id: Array<{ location_id: string }> };

export type MediaAttrsFragment = { media_id: string, resource?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined };

export type MediasManyQueryVariables = Types.Exact<{
  media_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type MediasManyQuery = { media: Array<{ media_id: string, resource?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined, conversion_tasks: Array<{ status: string }> }> };

export type Syllabus_MediasManyQueryVariables = Types.Exact<{
  media_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type Syllabus_MediasManyQuery = { media: Array<{ media_id: string, resource?: string | null | undefined, type?: string | null | undefined, name?: string | null | undefined }> };

export type StudentUserAttrsFragment = { user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined };

export type StudentsManyQueryVariables = Types.Exact<{
  user_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type StudentsManyQuery = { users: Array<{ user_id: string, name: string, email?: string | null | undefined, avatar?: string | null | undefined }> };
