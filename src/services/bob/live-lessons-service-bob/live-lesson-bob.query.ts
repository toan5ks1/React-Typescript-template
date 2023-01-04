import { gql } from "graphql-tag";
import {
    LessonByLessonIdQueryVariables,
    LessonsByCourseIdQueryVariables,
} from "src/services/bob/bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const getOneQuery = gql`
    query LessonByLessonId($lesson_id: String!) {
        lessons(where: { lesson_id: { _eq: $lesson_id } }) {
            lesson_id
            lessons_courses {
                course {
                    name
                    course_id
                }
            }
            status
            end_time
            start_time
            name
            lessons_teachers {
                teacher {
                    users {
                        name
                        user_id
                        email
                    }
                }
            }
            lesson_members {
                user {
                    user_id
                    name
                    email
                    last_login_date
                    student {
                        student_id
                        current_grade
                        enrollment_status
                    }
                }
            }
            lesson_group_id
        }
    }
`;

const getManyQuery = gql`
    query LessonsByCourseId($course_id: String!) {
        lessons(where: { course_id: { _eq: $course_id }, deleted_at: { _is_null: true } }) {
            name
            lesson_group_id
        }
    }
`;

class LiveLessonBobQuery {
    getOne(variables: LessonByLessonIdQueryVariables): GraphqlBody<LessonByLessonIdQueryVariables> {
        return {
            query: getOneQuery,
            variables,
        };
    }

    getMany(
        variables: LessonsByCourseIdQueryVariables
    ): GraphqlBody<LessonsByCourseIdQueryVariables> {
        return {
            query: getManyQuery,
            variables,
        };
    }
}

const liveLessonQueriesBob = new LiveLessonBobQuery();

export default liveLessonQueriesBob;
