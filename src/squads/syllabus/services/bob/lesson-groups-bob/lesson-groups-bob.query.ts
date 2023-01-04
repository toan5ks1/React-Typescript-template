import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery,
    Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/syllabus/services/service-types";

const lessonGroupFragment = gql`
    fragment LessonGroupAttrs on lesson_groups {
        media_ids
        lesson_group_id
    }
`;

const getListWithFilterQueryV2 = gql`
    query Lesson_LessonGroupsListByLessonGroupIdsAndCourseId(
        $lesson_group_ids: [String!]!
        $course_id: String
        $limit: Int = 10
        $offset: Int = 0
    ) {
        lesson_groups(
            limit: $limit
            offset: $offset
            order_by: { lesson_group_id: asc }
            where: { lesson_group_id: { _in: $lesson_group_ids }, course_id: { _eq: $course_id } }
        ) {
            ...LessonGroupAttrs
        }
    }
    ${lessonGroupFragment}
`;

class LessonGroupsBobQuery extends InheritedHasuraServiceClient {
    async getListWithFilter(
        variables: Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables
    ): Promise<
        Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery["lesson_groups"] | undefined
    > {
        const response = await this._call<Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery>({
            query: getListWithFilterQueryV2,
            variables,
        });

        return response.data?.lesson_groups;
    }
}

const lessonGroupsQueriesBob = new LessonGroupsBobQuery(appConfigs, "bobGraphQL", doQuery);

export default lessonGroupsQueriesBob;
