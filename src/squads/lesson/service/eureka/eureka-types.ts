import * as Types from '../../__generated__/eureka/root-types';

export type CourseStudentAttrsFragment = { student_id: string, course_id: string };

export type CourseStudentsListByCourseIdsQueryVariables = Types.Exact<{
  course_ids?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type CourseStudentsListByCourseIdsQuery = { course_students: Array<{ student_id: string, course_id: string }>, course_students_aggregate: { aggregate?: { count?: number | null | undefined } | null | undefined } };
