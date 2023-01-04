import { gql } from "graphql-tag";
import { toArr } from "src/common/utils/other";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    StudyPlanOneV2Query,
    StudyPlanOneV2QueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";

import { InheritedHasuraServiceClient } from "../../service-types";

export const studyPlanFragment = gql`
    fragment StudyPlanAttrs on study_plans {
        name
        study_plan_id
    }
`;

export const studyPlanFragmentV2 = gql`
    fragment StudyPlanAttrsV2 on study_plans {
        name
        study_plan_id
        created_at
        master_study_plan_id
        book_id
        grades
        status
    }
`;

export const studyPlanFragmentV3 = gql`
    fragment StudyPlanAttrsV3 on study_plans {
        name
        study_plan_id
        created_at
        master_study_plan_id
        book_id
        grades
        status
    }
`;

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

const getOneQuery = gql`
    query StudyPlanOneV2($study_plan_id: String!) {
        study_plans(where: { study_plan_id: { _eq: $study_plan_id } }) {
            ...StudyPlanAttrsV2
            study_plan_type
            course_id
            track_school_progress
            study_plan_items {
                ...StudyPlanItemAttrs
            }
        }
    }
    ${studyPlanFragmentV2}
    ${studyPlanItemFragment}
`;

class StudyPlanEurekaQuery extends InheritedHasuraServiceClient {
    async getOne(
        variables: StudyPlanOneV2QueryVariables
    ): Promise<StudyPlanOneV2Query["study_plans"][0] | undefined> {
        const body = {
            query: getOneQuery,
            variables,
        };

        const resp = await this._call<StudyPlanOneV2Query>(body);

        return toArr(resp.data?.study_plans)[0];
    }
}

const studyPlanQueriesEureka = new StudyPlanEurekaQuery(appConfigs, "eurekaGraphQL", doQuery);

export default studyPlanQueriesEureka;
