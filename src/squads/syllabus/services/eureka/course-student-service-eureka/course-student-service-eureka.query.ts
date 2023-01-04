import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    GetListCourseStudentStudyPlansByFilterQuery,
    GetListCourseStudentStudyPlansByFilterQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";

import { InheritedHasuraServiceClient } from "../../service-types";

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

class CourseStudentEurekaQuery extends InheritedHasuraServiceClient {
    async getListByFilter(
        variables: GetListCourseStudentStudyPlansByFilterQueryVariables
    ): Promise<
        DataWithTotal<
            | GetListCourseStudentStudyPlansByFilterQuery["get_list_course_student_study_plans_by_filter"]
            | undefined
        >
    > {
        const body = {
            query: getListByFilter,
            variables,
        };

        const resp = await this._call<GetListCourseStudentStudyPlansByFilterQuery>(body);

        return {
            data: resp.data?.get_list_course_student_study_plans_by_filter,
            total:
                resp.data?.get_list_course_student_study_plans_by_filter_aggregate.aggregate
                    ?.count ?? 0,
        };
    }
}

const courseStudentQueriesEureka = new CourseStudentEurekaQuery(
    appConfigs,
    "eurekaGraphQL",
    doQuery
);

export default courseStudentQueriesEureka;
