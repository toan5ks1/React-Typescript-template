import { arrayHasItem } from "src/common/utils/other";

import {
    assignmentModifierServiceEureka,
    assignmentQueriesEureka,
    NsAssignmentEureka,
} from "./eureka/assignment-eureka";
import { AssignmentOneQueryVariables, AssignmentsManyQueryVariables } from "./eureka/eureka-types";
import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";

export const assignmentService = defineService({
    query: {
        syllabusAssignmentGetOne: (params: AssignmentOneQueryVariables) => {
            const { assignment_id } = params;

            if (assignment_id) return assignmentQueriesEureka.getOne(params);

            return createEmptyResponse(undefined);
        },
        syllabusAssignmentGetMany: (params: AssignmentsManyQueryVariables) => {
            const { assignment_id } = params;

            if (arrayHasItem(assignment_id)) return assignmentQueriesEureka.getMany(params);

            return createEmptyResponse(undefined);
        },
    },

    mutation: {
        syllabusAssignmentUpsert: (payload: NsAssignmentEureka.UpsertAssignment) => {
            return assignmentModifierServiceEureka.upsertAssignmentV2(payload);
        },
        syllabusDeleteAssignments: (payload: NsAssignmentEureka.DeleteAssignments) => {
            return assignmentModifierServiceEureka.deleteAssignments(payload);
        },
    },
});
