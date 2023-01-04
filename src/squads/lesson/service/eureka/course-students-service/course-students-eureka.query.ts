import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/lesson/internals/hasura-client/execute-query";
import {
    CourseStudentsListByCourseIdsQuery,
    CourseStudentsListByCourseIdsQueryVariables,
} from "src/squads/lesson/service/eureka/eureka-types";
import { InheritedHasuraServiceClient } from "src/squads/lesson/service/service-types";

const courseStudentFragment = gql`
    fragment CourseStudentAttrs on course_students {
        student_id
        course_id
    }
`;

const getListByCourseIdsQuery = gql`
    query CourseStudentsListByCourseIds($course_ids: [String!]) {
        course_students(
            order_by: { created_at: desc }
            where: { course_id: { _in: $course_ids } }
        ) {
            ...CourseStudentAttrs
        }
        course_students_aggregate(where: { course_id: { _in: $course_ids } }) {
            aggregate {
                count
            }
        }
    }
    ${courseStudentFragment}
`;

class CourseStudentEurekaQuery extends InheritedHasuraServiceClient {
    async getListWithFilter(
        variables: CourseStudentsListByCourseIdsQueryVariables
    ): Promise<CourseStudentsListByCourseIdsQuery | null> {
        const response = await this._call<CourseStudentsListByCourseIdsQuery>({
            query: getListByCourseIdsQuery,
            variables,
        });

        return response.data;
    }
}

const courseStudentsQueriesEureka = new CourseStudentEurekaQuery(
    appConfigs,
    "eurekaGraphQL",
    doQuery
);

export default courseStudentsQueriesEureka;
