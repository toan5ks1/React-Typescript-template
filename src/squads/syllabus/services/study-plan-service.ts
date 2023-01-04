import { StudyPlanOneV2QueryVariables } from "src/squads/syllabus/services/eureka/eureka-types";

import { studyPlanQueriesEureka } from "./eureka/study-plan-eureka";
import { studyPlanModifierServiceEureka } from "./eureka/study-plan-modifier-eureka";
import { NsEurekaStudyPlanModifierService } from "./eureka/study-plan-modifier-eureka/types";
import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";

export const studyPlanService = defineService({
    query: {
        STUDY_PLAN_GET_ONE: (params: StudyPlanOneV2QueryVariables) => {
            if (params.study_plan_id) return studyPlanQueriesEureka.getOne(params);
            return createEmptyResponse(undefined);
        },
    },
    mutation: {
        STUDY_PLAN_UPSERT: (payload: NsEurekaStudyPlanModifierService.UpsertStudyPlan) => {
            return studyPlanModifierServiceEureka.upsertStudyPlan(payload);
        },
    },
});
