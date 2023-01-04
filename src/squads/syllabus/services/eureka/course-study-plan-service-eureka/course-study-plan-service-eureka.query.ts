import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    CourseStudyPlansListByFilterQuery,
    CourseStudyPlansListByFilterQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";

import { InheritedHasuraServiceClient } from "../../service-types";
import { studyPlanFragmentV3 } from "../study-plan-eureka/study-plan-eureka.query";

export const studyPlanItemFragment = gql`
    fragment StudyPlanItemAttrs on study_plan_items {
        study_plan_item_id
        available_from
        available_to
        content_structure
        start_date
        end_date
        status
        assignment_study_plan_item {
            assignment_id
        }
        lo_study_plan_item {
            lo_id
        }
    }
`;

const getListQueryFilter = gql`
    query CourseStudyPlansListByFilter(
        $courseId: String!
        $grades: _int4 = "{}"
        $limit: Int = 10
        $search: String = ""
        $bookIds: _text = "{}"
        $status: _text = "{}"
        $offset: Int = 0
    ) {
        get_list_course_study_plan_by_filter(
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
            ...CourseStudyPlanAttrsV3
        }
        get_list_course_study_plan_by_filter_aggregate(
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

    fragment CourseStudyPlanAttrsV3 on course_study_plans {
        course_id
        study_plan_id
        study_plan {
            ...StudyPlanAttrsV3
        }
    }
    ${studyPlanFragmentV3}
`;

class CourseStudyPlanEurekaQuery extends InheritedHasuraServiceClient {
    async getListFilter(
        variables: CourseStudyPlansListByFilterQueryVariables
    ): Promise<
        DataWithTotal<
            CourseStudyPlansListByFilterQuery["get_list_course_study_plan_by_filter"] | undefined
        >
    > {
        const body = {
            query: getListQueryFilter,
            variables,
        };

        const resp = await this._call<CourseStudyPlansListByFilterQuery>(body);

        return {
            data: resp.data?.get_list_course_study_plan_by_filter,
            total: resp.data?.get_list_course_study_plan_by_filter_aggregate.aggregate?.count ?? 0,
        };
    }
}

const courseStudyPlanQueriesEureka = new CourseStudyPlanEurekaQuery(
    appConfigs,
    "eurekaGraphQL",
    doQuery
);

export default courseStudyPlanQueriesEureka;
