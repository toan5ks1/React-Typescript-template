import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    Lesson_LessonByLessonIdForLessonManagementV3Query,
    Lesson_LessonByLessonIdForLessonManagementV3QueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";

// @ts-ignore: not used query
const getOneForLessonManagement = gql`
    query Lesson_LessonByLessonIdForLessonManagementV2($lesson_id: String!) {
        lessons(where: { lesson_id: { _eq: $lesson_id } }) {
            lesson_id
            center_id
            course {
                course_id
                name
            }
            class_id
            lesson_group_id
            teaching_medium
            teaching_method
            lesson_type
            scheduling_status
            start_time
            end_time
            lessons_teachers {
                teacher {
                    users {
                        user_id
                        name
                        email
                    }
                }
            }
            lesson_members {
                attendance_remark
                attendance_status
                course {
                    course_id
                    name
                    subject
                }
                user {
                    user_id
                    name
                    email
                    student {
                        current_grade
                    }
                }
            }
        }
    }
`;

const lessonGetOneForLessonManagementV2 = gql`
    query Lesson_LessonByLessonIdForLessonManagementV3($lesson_id: String!) {
        lessons(where: { lesson_id: { _eq: $lesson_id } }) {
            lesson_id
            center_id
            course {
                course_id
                name
            }
            class_id
            lesson_group_id
            teaching_medium
            teaching_method
            lesson_type
            scheduling_status
            scheduler_id
            start_time
            end_time
            lessons_teachers {
                teacher {
                    users {
                        user_id
                        name
                        email
                    }
                }
            }
            lesson_members {
                attendance_remark
                attendance_status
                course {
                    course_id
                    name
                    subject
                }
                user {
                    user_id
                    name
                    email
                    student {
                        current_grade
                    }
                }
            }
        }
    }
`;

class LessonsBobQuery extends InheritedHasuraServiceClient {
    async getOneForLessonManagement(
        variables: Lesson_LessonByLessonIdForLessonManagementV3QueryVariables
    ): Promise<
        ArrayElement<Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]> | undefined
    > {
        const response = await this._call<Lesson_LessonByLessonIdForLessonManagementV3Query>({
            query: lessonGetOneForLessonManagementV2,
            variables,
        });

        return response.data?.lessons[0];
    }
}

const lessonsQueriesBob = new LessonsBobQuery(appConfigs, "bobGraphQL", doQuery);

export default lessonsQueriesBob;
