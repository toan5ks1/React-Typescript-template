import { studyPlanModifierServiceEureka } from "./eureka/study-plan-modifier-eureka";
import { NsEurekaStudyPlanModifierService } from "./eureka/study-plan-modifier-eureka/types";
import { defineService } from "./service-creator";

export const studyPlanItemService = defineService({
    mutation: {
        syllabusStudyPlanItemUpsert: (
            payload: NsEurekaStudyPlanModifierService.UpsertStudyPlanItems
        ) => studyPlanModifierServiceEureka.upsertStudyPlanItems(payload),
    },
});
