import { gql } from "graphql-tag";

import {
    Lesson_LocationIdsByCourseIdQueryVariables,
    Lesson_LocationIdsByCourseIdV2QueryVariables,
    User_CourseLocationsByIdsQueryVariables,
    User_OneCourseByCourseIdAndLocationIdQueryVariables,
    User_CourseLocationsByCourseIdQueryVariables,
} from "../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const getLocationIdsByCourseId = gql`
    query Lesson_LocationIdsByCourseId($course_id: String!) {
        course_access_paths(where: { course_id: { _eq: $course_id } }) {
            location_id
        }
    }
`;

const getLocationIdsByCourseIdV2 = gql`
    query Lesson_LocationIdsByCourseIdV2($course: String = "") {
        get_locations_active_by_course_id(args: { course: $course }) {
            location_id
        }
    }
`;

const getManyQuery = gql`
    query User_CourseLocationsByIds($course_ids: [String!] = []) {
        course_access_paths(where: { course_id: { _in: $course_ids } }) {
            course_id
            location {
                location_id
                name
                access_path
                location_type
                parent_location_id
            }
        }
    }
`;
//TODO: Move to user squad
const getOne = gql`
    query User_OneCourseByCourseIdAndLocationId($course_id: String!, $location_id: String!) {
        course_access_paths(
            where: { course_id: { _eq: $course_id }, location_id: { _eq: $location_id } }
        ) {
            location_id
            course_id
        }
    }
`;

//TODO: Move to user squad
const getCourseLocationsByCourseIdQuery = gql`
    query User_CourseLocationsByCourseId($course_id: String!) {
        course_access_paths(where: { course_id: { _eq: $course_id } }) {
            location {
                location_id
                name
                access_path
                location_type
                parent_location_id
            }
        }
    }
`;

class CourseAccessPathsBobQuery {
    getLocationIdsByCourseId(
        variables: Lesson_LocationIdsByCourseIdQueryVariables
    ): GraphqlBody<Lesson_LocationIdsByCourseIdQueryVariables> {
        return {
            query: getLocationIdsByCourseId,
            variables,
        };
    }

    getLocationIdsByCourseIdV2(
        variables: Lesson_LocationIdsByCourseIdV2QueryVariables
    ): GraphqlBody<Lesson_LocationIdsByCourseIdV2QueryVariables> {
        return {
            query: getLocationIdsByCourseIdV2,
            variables,
        };
    }

    getMany(
        variables: User_CourseLocationsByIdsQueryVariables
    ): GraphqlBody<User_CourseLocationsByIdsQueryVariables> {
        return {
            query: getManyQuery,
            variables,
        };
    }
    getOne(
        variables: User_OneCourseByCourseIdAndLocationIdQueryVariables
    ): GraphqlBody<User_OneCourseByCourseIdAndLocationIdQueryVariables> {
        return {
            query: getOne,
            variables,
        };
    }
    getCourseLocationsByCourseId(
        variables: User_CourseLocationsByCourseIdQueryVariables
    ): GraphqlBody<User_CourseLocationsByCourseIdQueryVariables> {
        return {
            query: getCourseLocationsByCourseIdQuery,
            variables,
        };
    }
}

const courseAccessPathsQueriesBob = new CourseAccessPathsBobQuery();

export default courseAccessPathsQueriesBob;
