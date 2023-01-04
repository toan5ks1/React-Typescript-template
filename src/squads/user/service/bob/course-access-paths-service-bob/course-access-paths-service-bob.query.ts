import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    User_OneCourseByCourseIdAndLocationIdQueryVariables,
    User_CourseLocationsByCourseIdQueryVariables,
    User_OneCourseByCourseIdAndLocationIdQuery,
    User_CourseLocationsByCourseIdQuery,
} from "src/squads/user/service/bob/bob-types";

import { InheritedHasuraServiceClient } from "../../service-types";

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

class CourseAccessPathsBobQuery extends InheritedHasuraServiceClient {
    async getOneCourseByCourseIdAndLocationId(
        variables: User_OneCourseByCourseIdAndLocationIdQueryVariables
    ): Promise<User_OneCourseByCourseIdAndLocationIdQuery["course_access_paths"] | undefined> {
        const query = {
            query: getOne,
            variables,
        };
        const resp = await this._call<User_OneCourseByCourseIdAndLocationIdQuery>(query);
        return resp.data?.course_access_paths;
    }
    async getCourseLocationsByCourseId(
        variables: User_CourseLocationsByCourseIdQueryVariables
    ): Promise<User_CourseLocationsByCourseIdQuery["course_access_paths"] | undefined> {
        const query = {
            query: getCourseLocationsByCourseIdQuery,
            variables,
        };
        const resp = await this._call<User_CourseLocationsByCourseIdQuery>(query);
        return resp.data?.course_access_paths;
    }
}

const courseAccessPathsQueriesBob = new CourseAccessPathsBobQuery(
    appConfigs,
    "bobGraphQL",
    doQuery
);

export default courseAccessPathsQueriesBob;
