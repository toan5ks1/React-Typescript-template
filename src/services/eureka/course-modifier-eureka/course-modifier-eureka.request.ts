import { UpdateDisplayOrdersOfLOsAndAssignmentsRequest } from "manabuf/eureka/v1/course_modifier_pb";

import { NsEurekaCourseModifierService } from "./types";

const invalidFormErr = new Error("ra.message.invalid_form");

export function validateDuplicateBook(data?: NsEurekaCourseModifierService.DuplicateBook) {
    if (!data || !data.bookId || !data.bookName) {
        throw invalidFormErr;
    }
}

export const updateDisplayOrdersOfLOsAndAssignmentsRequest = (
    data: NsEurekaCourseModifierService.UpdateDisplayOrdersOfLOsAndAssignments
): UpdateDisplayOrdersOfLOsAndAssignmentsRequest => {
    const req = new UpdateDisplayOrdersOfLOsAndAssignmentsRequest();

    data.assignmentsList.forEach((item, index) => {
        const assignment = new UpdateDisplayOrdersOfLOsAndAssignmentsRequest.Assignment();
        assignment.setTopicId(item.topicId);
        assignment.setAssignmentId(item.assignmentId);
        assignment.setDisplayOrder(item.displayOrder);
        req.addAssignments(assignment, index);
    });

    data.learningObjectivesList.forEach((item, index) => {
        const lo = new UpdateDisplayOrdersOfLOsAndAssignmentsRequest.LearningObjective();
        lo.setTopicId(item.topicId);
        lo.setLoId(item.loId);
        lo.setDisplayOrder(item.displayOrder);
        req.addLearningObjectives(lo, index);
    });

    return req;
};
