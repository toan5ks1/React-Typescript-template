import { arrayHasItem } from "src/common/utils/other";

import {
    courseModifierServiceEureka,
    NsEurekaCourseModifierService,
} from "./eureka/course-modifier-eureka";
import {
    LearningObjectivesManyQueryVariables,
    LearningObjectivesOneQueryVariables,
    Syllabus_LearningObjectivesOneQueryVariables,
    Syllabus_LearningObjectiveListQueryVariables,
} from "./eureka/eureka-types";
import { learningObjectiveModifierService } from "./eureka/learning-objective";
import NsSyllabus_LearningObjectiveService from "./eureka/learning-objective/types";
import { learningObjectivesQueriesBob } from "./eureka/learning-objectives-service-bob";
import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";

export const learningObjectiveService = defineService({
    query: {
        LO_GET_ONE: (params: LearningObjectivesOneQueryVariables) => {
            if (params.lo_id) return learningObjectivesQueriesBob.getOne(params);

            return createEmptyResponse(undefined);
        },
        syllabusLOGetOneV2: (params: Syllabus_LearningObjectivesOneQueryVariables) => {
            if (params.lo_id) return learningObjectivesQueriesBob.getOneV2(params);

            return createEmptyResponse(undefined);
        },
        LO_GET_MANY_BY_IDS: (params: LearningObjectivesManyQueryVariables) => {
            if (arrayHasItem(params.lo_id)) return learningObjectivesQueriesBob.getMany(params);

            return createEmptyResponse(undefined);
        },
        LO_GET_LIST: (params: Syllabus_LearningObjectiveListQueryVariables) => {
            return learningObjectivesQueriesBob.getList(params);
        },
    },

    mutation: {
        LO_ASSIGNMENT_UPDATE_DISPLAY_ORDER: (
            payload: NsEurekaCourseModifierService.UpdateDisplayOrdersOfLOsAndAssignments
        ) => {
            return courseModifierServiceEureka.updateDisplayOrdersOfLOsAndAssignments(payload);
        },

        syllabusLOUpsert: (payload: NsSyllabus_LearningObjectiveService.UpsertLOs) => {
            return learningObjectiveModifierService.upsertLOs(payload);
        },

        syllabusLODelete: (payload: NsSyllabus_LearningObjectiveService.DeleteLOs) => {
            return learningObjectiveModifierService.deleteLOs(payload);
        },
    },
});
