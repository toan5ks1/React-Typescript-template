import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    CourseStudentsListV2QueryVariables,
    CourseStudentsListByCourseIdsQueryVariables,
    CourseStudentsListByCourseIdsQuery,
} from "src/squads/user/service/eureka/eureka-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

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

const getListQuery = gql`
    query CourseStudentsListV2($course_id: String, $limit: Int = 10, $offset: Int = 0) {
        course_students(
            order_by: { created_at: desc }
            where: { course_id: { _eq: $course_id } }
            limit: $limit
            offset: $offset
        ) {
            ...CourseStudentAttrs
        }
        course_students_aggregate(where: { course_id: { _eq: $course_id } }) {
            aggregate {
                count
            }
        }
    }
    ${courseStudentFragment}
`;

class CourseStudentEurekaQuery extends InheritedHasuraServiceClient {
    getList(variables: CourseStudentsListV2QueryVariables) {
        return {
            query: getListQuery,
            variables,
        };
    }

    async getListWithFilter(
        variables: CourseStudentsListByCourseIdsQueryVariables
    ): Promise<CourseStudentsListByCourseIdsQuery["course_students"] | undefined> {
        const query = {
            query: getListByCourseIdsQuery,
            variables,
        };

        const res = await this._call<CourseStudentsListByCourseIdsQuery>(query);

        return res.data?.course_students;
    }
}

const courseStudentQueriesEureka = new CourseStudentEurekaQuery(
    appConfigs,
    "eurekaGraphQL",
    doQuery
);

export default courseStudentQueriesEureka;
