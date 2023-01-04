import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    GetManyStudentStudyPlansByFilterQuery,
    GetManyStudentStudyPlansByFilterQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";

import { InheritedHasuraServiceClient } from "../../service-types";
import { studyPlanFragmentV3 } from "../study-plan-eureka/study-plan-eureka.query";

const getManyStudentStudyPlanV2 = gql`
    query GetManyStudentStudyPlansByFilter(
        $courseId: String!
        $grades: _int4 = "{}"
        $search: String = ""
        $bookIds: _text = "{}"
        $status: String = "STUDY_PLAN_STATUS_ACTIVE"
        $studentIds: _text = "{}"
    ) {
        get_student_study_plans_by_filter(
            args: {
                _course_id: $courseId
                _book_ids: $bookIds
                _grades: $grades
                _status: $status
                search: $search
                _student_ids: $studentIds
            }
            order_by: { created_at: desc }
        ) {
            ...StudyPlanAttrsV3
            student_study_plans {
                student_id
            }
        }
    }

    ${studyPlanFragmentV3}
`;

class StudentStudyPlanEurekaQuery extends InheritedHasuraServiceClient {
    async getManyV2(
        variables: GetManyStudentStudyPlansByFilterQueryVariables
    ): Promise<
        GetManyStudentStudyPlansByFilterQuery["get_student_study_plans_by_filter"] | undefined
    > {
        const body = {
            query: getManyStudentStudyPlanV2,
            variables,
        };

        const resp = await this._call<GetManyStudentStudyPlansByFilterQuery>(body);

        return resp.data?.get_student_study_plans_by_filter;
    }
}

const studentStudyPlanQueriesEureka = new StudentStudyPlanEurekaQuery(
    appConfigs,
    "eurekaGraphQL",
    doQuery
);

export default studentStudyPlanQueriesEureka;
