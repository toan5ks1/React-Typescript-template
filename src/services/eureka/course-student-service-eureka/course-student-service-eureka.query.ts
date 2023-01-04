import { gql } from "graphql-tag";

import {
    CourseStudentsListByCourseIdsQueryVariables,
    CourseStudentsListQueryVariables,
    CourseStudentsListV2QueryVariables,
    GetListCourseStudentStudyPlansByFilterQueryVariables,
} from "../eureka-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const courseStudentFragment = gql`
    fragment CourseStudentAttrs on course_students {
        student_id
        course_id
    }
`;

// TODO: Rename when Syllabus has done Study plan V2
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

// TODO: Remove when Syllabus has done Study plan V2
const getManyQuery = gql`
    query CourseStudentsList($course_id: String) {
        course_students(order_by: { created_at: desc }, where: { course_id: { _eq: $course_id } }) {
            ...CourseStudentAttrs
        }
    }
    ${courseStudentFragment}
`;

const getListByFilter = gql`
    query GetListCourseStudentStudyPlansByFilter(
        $courseId: String!
        $grades: _int4 = "{}"
        $limit: Int = 10
        $search: String = ""
        $bookIds: _text = "{}"
        $status: String = "STUDY_PLAN_STATUS_ACTIVE"
        $offset: Int = 0
    ) {
        get_list_course_student_study_plans_by_filter(
            args: {
                _course_id: $courseId
                _grades: $grades
                search: $search
                _status: $status
                _book_ids: $bookIds
            }
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
        ) {
            course_id
            student_id
        }
        get_list_course_student_study_plans_by_filter_aggregate(
            args: {
                _course_id: $courseId
                _grades: $grades
                search: $search
                _status: $status
                _book_ids: $bookIds
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;

class CourseStudentEurekaQuery {
    getList(variables: CourseStudentsListV2QueryVariables) {
        return {
            query: getListQuery,
            variables,
        };
    }

    getListByFilter(variables: GetListCourseStudentStudyPlansByFilterQueryVariables) {
        return {
            query: getListByFilter,
            variables,
        };
    }

    getMany(variables: CourseStudentsListQueryVariables) {
        return {
            query: getManyQuery,
            variables,
        };
    }

    async getListWithFilter(
        variables: CourseStudentsListByCourseIdsQueryVariables
    ): Promise<GraphqlBody> {
        return {
            query: getListByCourseIdsQuery,
            variables,
        };
    }
}

const courseStudentQueriesEureka = new CourseStudentEurekaQuery();

export default courseStudentQueriesEureka;
