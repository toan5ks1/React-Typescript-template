import { gql } from "graphql-tag";

import {
    LessonGroupsListQueryVariables,
    Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables,
} from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const lessonGroupFragment = gql`
    fragment LessonGroupAttrs on lesson_groups {
        media_ids
        lesson_group_id
    }
`;

const getListQuery = gql`
    query LessonGroupsList($course_id: String!, $limit: Int = 10, $offset: Int = 0) {
        lesson_groups(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: { course_id: { _eq: $course_id } }
        ) {
            ...LessonGroupAttrs
        }
        lesson_groups_aggregate(where: { course_id: { _eq: $course_id } }) {
            aggregate {
                count
            }
        }
    }
    ${lessonGroupFragment}
`;

// @ts-ignore no-unused-vars
const getListWithFilterQuery = gql`
    query LessonGroupsListByIds(
        $lesson_group_ids: [String!]!
        $course_id: String
        $limit: Int = 10
        $offset: Int = 0
    ) {
        lesson_groups(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: { lesson_group_id: { _in: $lesson_group_ids }, course_id: { _eq: $course_id } }
        ) {
            ...LessonGroupAttrs
        }
    }
    ${lessonGroupFragment}
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

class LessonGroupBobQuery {
    getList(
        variables: LessonGroupsListQueryVariables
    ): GraphqlBody<LessonGroupsListQueryVariables> {
        return {
            query: getListQuery,
            variables,
        };
    }

    getListWithFilter(
        variables: Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables
    ): GraphqlBody<Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables> {
        return {
            query: getListWithFilterQueryV2,
            variables,
        };
    }
}

const lessonGroupQueriesBob = new LessonGroupBobQuery();

export default lessonGroupQueriesBob;
