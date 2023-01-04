import * as Types from '../../__generated__/eureka/root-types';

export type AssignmentAttrsFragment = { assignment_id: string, instruction?: string | null | undefined, content?: any | null | undefined, check_list?: any | null | undefined, attachment?: any | null | undefined, type?: string | null | undefined, name: string, max_grade?: number | null | undefined, settings?: any | null | undefined, is_required_grade?: boolean | null | undefined, created_at: any, display_order?: number | null | undefined };

export type AssignmentOneQueryVariables = Types.Exact<{
  assignment_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AssignmentOneQuery = { assignments: Array<{ assignment_id: string, instruction?: string | null | undefined, content?: any | null | undefined, check_list?: any | null | undefined, attachment?: any | null | undefined, type?: string | null | undefined, name: string, max_grade?: number | null | undefined, settings?: any | null | undefined, is_required_grade?: boolean | null | undefined, created_at: any, display_order?: number | null | undefined }> };

export type AssignmentsManyQueryVariables = Types.Exact<{
  assignment_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type AssignmentsManyQuery = { assignments: Array<{ assignment_id: string, instruction?: string | null | undefined, content?: any | null | undefined, check_list?: any | null | undefined, attachment?: any | null | undefined, type?: string | null | undefined, name: string, max_grade?: number | null | undefined, settings?: any | null | undefined, is_required_grade?: boolean | null | undefined, created_at: any, display_order?: number | null | undefined }> };

export type BookAttrsFragment = { book_id: string, country?: string | null | undefined, name: string, school_id: number, subject?: string | null | undefined };

export type BooksTitleQueryVariables = Types.Exact<{
  book_id: Types.Scalars['String'];
}>;


export type BooksTitleQuery = { books: Array<{ name: string }> };

export type BooksOneQueryVariables = Types.Exact<{
  book_id: Types.Scalars['String'];
}>;


export type BooksOneQuery = { books: Array<{ book_id: string, country?: string | null | undefined, name: string, school_id: number, subject?: string | null | undefined, book_chapters: Array<{ chapter_id: string, chapter?: { display_order?: number | null | undefined } | null | undefined }> }> };

export type Syllabus_BookOneQueryVariables = Types.Exact<{
  book_id: Types.Scalars['String'];
}>;


export type Syllabus_BookOneQuery = { books: Array<{ book_id: string, name: string, school_id: number, book_type?: string | null | undefined, book_chapters: Array<{ chapter_id: string, chapter?: { display_order?: number | null | undefined } | null | undefined }> }> };

export type BooksManyQueryVariables = Types.Exact<{
  book_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type BooksManyQuery = { books: Array<{ book_id: string, country?: string | null | undefined, name: string, school_id: number, subject?: string | null | undefined }> };

export type Syllabus_BooksManyReferenceQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  type?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type Syllabus_BooksManyReferenceQuery = { books: Array<{ name: string, book_id: string }> };

export type Syllabus_BooksListV2QueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  type?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type Syllabus_BooksListV2Query = { books: Array<{ book_id: string, name: string }>, books_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type ChapterAttrsFragment = { chapter_id: string, name: string, country?: string | null | undefined, school_id: number, subject?: string | null | undefined, grade?: number | null | undefined, display_order?: number | null | undefined };

export type ChaptersTitleQueryVariables = Types.Exact<{
  chapter_id: Types.Scalars['String'];
}>;


export type ChaptersTitleQuery = { chapters: Array<{ name: string }> };

export type ChaptersManyQueryVariables = Types.Exact<{
  chapter_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type ChaptersManyQuery = { chapters: Array<{ chapter_id: string, name: string, country?: string | null | undefined, school_id: number, subject?: string | null | undefined, grade?: number | null | undefined, display_order?: number | null | undefined }> };

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

export type StudyPlanItemAttrsFragment = { study_plan_item_id: string, available_from?: any | null | undefined, available_to?: any | null | undefined, content_structure?: any | null | undefined, start_date?: any | null | undefined, end_date?: any | null | undefined, status?: string | null | undefined, assignment_study_plan_item?: { assignment_id: string } | null | undefined, lo_study_plan_item?: { lo_id: string } | null | undefined };

export type CourseStudyPlansListByFilterQueryVariables = Types.Exact<{
  courseId: Types.Scalars['String'];
  grades?: Types.InputMaybe<Types.Scalars['_int4']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  bookIds?: Types.InputMaybe<Types.Scalars['_text']>;
  status?: Types.InputMaybe<Types.Scalars['_text']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type CourseStudyPlansListByFilterQuery = { get_list_course_study_plan_by_filter: Array<{ course_id: string, study_plan_id: string, study_plan: { name?: string | null | undefined, study_plan_id: string, created_at: any, master_study_plan_id?: string | null | undefined, book_id?: string | null | undefined, grades?: any | null | undefined, status?: string | null | undefined } }>, get_list_course_study_plan_by_filter_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };

export type CourseStudyPlanAttrsV3Fragment = { course_id: string, study_plan_id: string, study_plan: { name?: string | null | undefined, study_plan_id: string, created_at: any, master_study_plan_id?: string | null | undefined, book_id?: string | null | undefined, grades?: any | null | undefined, status?: string | null | undefined } };

export type LearningObjectiveAttrsFragment = { lo_id: string, topic_id?: string | null | undefined, name: string, video?: string | null | undefined, country?: string | null | undefined, study_guide?: string | null | undefined, display_order?: number | null | undefined, master_lo_id?: string | null | undefined, prerequisites?: any | null | undefined, video_script?: string | null | undefined, school_id: number, subject?: string | null | undefined, grade?: number | null | undefined, type?: string | null | undefined, created_at: any, updated_at: any };

export type LearningObjectivesOneQueryVariables = Types.Exact<{
  lo_id: Types.Scalars['String'];
}>;


export type LearningObjectivesOneQuery = { learning_objectives: Array<{ lo_id: string, topic_id?: string | null | undefined, name: string, video?: string | null | undefined, country?: string | null | undefined, study_guide?: string | null | undefined, display_order?: number | null | undefined, master_lo_id?: string | null | undefined, prerequisites?: any | null | undefined, video_script?: string | null | undefined, school_id: number, subject?: string | null | undefined, grade?: number | null | undefined, type?: string | null | undefined, created_at: any, updated_at: any, quiz_sets: Array<{ quiz_external_ids: any }> }> };

export type Syllabus_LearningObjectivesOneQueryVariables = Types.Exact<{
  lo_id: Types.Scalars['String'];
}>;


export type Syllabus_LearningObjectivesOneQuery = { learning_objectives: Array<{ lo_id: string, topic_id?: string | null | undefined, name: string, video?: string | null | undefined, study_guide?: string | null | undefined, display_order?: number | null | undefined, prerequisites?: any | null | undefined, school_id: number, type?: string | null | undefined }> };

export type LearningObjectivesManyQueryVariables = Types.Exact<{
  lo_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type LearningObjectivesManyQuery = { learning_objectives: Array<{ lo_id: string, topic_id?: string | null | undefined, name: string, video?: string | null | undefined, country?: string | null | undefined, study_guide?: string | null | undefined, display_order?: number | null | undefined, master_lo_id?: string | null | undefined, prerequisites?: any | null | undefined, video_script?: string | null | undefined, school_id: number, subject?: string | null | undefined, grade?: number | null | undefined, type?: string | null | undefined, created_at: any, updated_at: any }> };

export type Syllabus_LearningObjectiveListQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  order_by?: Types.Learning_Objectives_Order_By;
}>;


export type Syllabus_LearningObjectiveListQuery = { learning_objectives: Array<{ lo_id: string, name: string }> };

export type QuizzesAttrsFragment = { approved_by: string, country: string, difficulty_level?: number | null | undefined, explanation: any, external_id: string, kind: string, options: any, question: any, quiz_id: string, school_id: number, tagged_los?: any | null | undefined };

export type QuizzesByExternalIdQueryVariables = Types.Exact<{
  external_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type QuizzesByExternalIdQuery = { quizzes: Array<{ external_id: string, quiz_id: string }> };

export type QuizzesOneQueryVariables = Types.Exact<{
  quiz_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type QuizzesOneQuery = { quizzes: Array<{ approved_by: string, country: string, difficulty_level?: number | null | undefined, explanation: any, external_id: string, kind: string, options: any, question: any, quiz_id: string, school_id: number, tagged_los?: any | null | undefined }> };

export type QuizzesManyByLearningObjectIdQueryVariables = Types.Exact<{
  lo_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type QuizzesManyByLearningObjectIdQuery = { find_quiz_by_lo_id: Array<{ approved_by: string, country: string, difficulty_level?: number | null | undefined, explanation: any, external_id: string, kind: string, options: any, question: any, quiz_id: string, school_id: number, tagged_los?: any | null | undefined }> };

export type GetManyStudentStudyPlansByFilterQueryVariables = Types.Exact<{
  courseId: Types.Scalars['String'];
  grades?: Types.InputMaybe<Types.Scalars['_int4']>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  bookIds?: Types.InputMaybe<Types.Scalars['_text']>;
  status?: Types.InputMaybe<Types.Scalars['String']>;
  studentIds?: Types.InputMaybe<Types.Scalars['_text']>;
}>;


export type GetManyStudentStudyPlansByFilterQuery = { get_student_study_plans_by_filter: Array<{ name?: string | null | undefined, study_plan_id: string, created_at: any, master_study_plan_id?: string | null | undefined, book_id?: string | null | undefined, grades?: any | null | undefined, status?: string | null | undefined, student_study_plans: Array<{ student_id: string }> }> };

export type StudyPlanAttrsFragment = { name?: string | null | undefined, study_plan_id: string };

export type StudyPlanAttrsV2Fragment = { name?: string | null | undefined, study_plan_id: string, created_at: any, master_study_plan_id?: string | null | undefined, book_id?: string | null | undefined, grades?: any | null | undefined, status?: string | null | undefined };

export type StudyPlanAttrsV3Fragment = { name?: string | null | undefined, study_plan_id: string, created_at: any, master_study_plan_id?: string | null | undefined, book_id?: string | null | undefined, grades?: any | null | undefined, status?: string | null | undefined };

export type StudyPlanOneV2QueryVariables = Types.Exact<{
  study_plan_id: Types.Scalars['String'];
}>;


export type StudyPlanOneV2Query = { study_plans: Array<{ study_plan_type?: string | null | undefined, course_id?: string | null | undefined, track_school_progress?: boolean | null | undefined, name?: string | null | undefined, study_plan_id: string, created_at: any, master_study_plan_id?: string | null | undefined, book_id?: string | null | undefined, grades?: any | null | undefined, status?: string | null | undefined, study_plan_items: Array<{ study_plan_item_id: string, available_from?: any | null | undefined, available_to?: any | null | undefined, content_structure?: any | null | undefined, start_date?: any | null | undefined, end_date?: any | null | undefined, status?: string | null | undefined, assignment_study_plan_item?: { assignment_id: string } | null | undefined, lo_study_plan_item?: { lo_id: string } | null | undefined }> }> };

export type TopicAssignmentManyQueryVariables = Types.Exact<{
  topic_id: Types.Scalars['String'];
}>;


export type TopicAssignmentManyQuery = { topics_assignments: Array<{ display_order?: number | null | undefined, assignment: { assignment_id: string, instruction?: string | null | undefined, content?: any | null | undefined, check_list?: any | null | undefined, attachment?: any | null | undefined, type?: string | null | undefined, name: string, max_grade?: number | null | undefined, settings?: any | null | undefined, is_required_grade?: boolean | null | undefined, created_at: any, display_order?: number | null | undefined } }> };

export type TopicLearningObjectiveManyQueryVariables = Types.Exact<{
  topic_id: Types.Scalars['String'];
}>;


export type TopicLearningObjectiveManyQuery = { topics_learning_objectives: Array<{ display_order?: number | null | undefined, learning_objective?: { lo_id: string, topic_id?: string | null | undefined, name: string, video?: string | null | undefined, country?: string | null | undefined, study_guide?: string | null | undefined, display_order?: number | null | undefined, master_lo_id?: string | null | undefined, prerequisites?: any | null | undefined, video_script?: string | null | undefined, school_id: number, subject?: string | null | undefined, grade?: number | null | undefined, type?: string | null | undefined, created_at: any, updated_at: any } | null | undefined }> };

export type TopicAttrsFragment = { topic_id: string, name: string, country?: string | null | undefined, school_id: number, subject: string, grade: number, display_order?: number | null | undefined, topic_type: string, status?: string | null | undefined, chapter_id?: string | null | undefined, instruction?: string | null | undefined, icon_url?: string | null | undefined, essay_required: boolean, created_at: any, updated_at: any };

export type TopicTitleQueryVariables = Types.Exact<{
  topic_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TopicTitleQuery = { topics: Array<{ name: string }> };

export type TopicOneQueryVariables = Types.Exact<{
  topic_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TopicOneQuery = { topics: Array<{ topic_id: string, name: string, country?: string | null | undefined, school_id: number, subject: string, grade: number, display_order?: number | null | undefined, topic_type: string, status?: string | null | undefined, chapter_id?: string | null | undefined, instruction?: string | null | undefined, icon_url?: string | null | undefined, essay_required: boolean, created_at: any, updated_at: any }> };

export type TopicsManyQueryVariables = Types.Exact<{
  topic_id?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  chapter_id?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TopicsManyQuery = { topics: Array<{ topic_id: string, name: string, country?: string | null | undefined, school_id: number, subject: string, grade: number, display_order?: number | null | undefined, topic_type: string, status?: string | null | undefined, chapter_id?: string | null | undefined, instruction?: string | null | undefined, icon_url?: string | null | undefined, essay_required: boolean, created_at: any, updated_at: any }> };
