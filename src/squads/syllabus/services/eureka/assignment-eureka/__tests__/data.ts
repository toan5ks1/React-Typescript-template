import { AssignmentOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";

import { AssignmentType } from "manabuf/eureka/v1/enums_pb";

import { NsAssignmentEureka } from "../types";

export const createMockDataUpsertAssignment = (
    override: Partial<NsAssignmentEureka.UpsertAssignment> = {}
): NsAssignmentEureka.UpsertAssignment => {
    return {
        assignmentId: "assignmentId01",
        content: { topicId: "topicId", loIdList: [] },
        displayOrder: 0,
        instruction: "instruction text",
        maxGrade: 15,
        name: "Assignment name",
        requiredGrade: true,
        assignmentType: AssignmentType.ASSIGNMENT_TYPE_LEARNING_OBJECTIVE,
        ...override,
    };
};

export const createMockAssignmentGetOneQueryData = (
    override: Partial<AssignmentOneQuery["assignments"][0]> = {}
): AssignmentOneQuery["assignments"][0] => {
    return {
        assignment_id: "assignment_id_getOne",
        name: "assignment_name_getOne",
        created_at: "2022-03-14T16:51:51.621797+00:00",
        attachment: ["assignment_attachment_video"],
        ...override,
    };
};
