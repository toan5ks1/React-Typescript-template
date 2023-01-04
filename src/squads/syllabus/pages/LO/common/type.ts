import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";

import { ActionTypes } from "src/squads/syllabus/hooks/useTopicControl";

export type LOsWithAssignmentType = {
    [x in keyof typeof ActionTypes]: keyof typeof KeyLOTypes | "ASSIGNMENT" | "TASK_ASSIGNMENT";
};

export const losWithAssignmentTypes: LOsWithAssignmentType = {
    ASSIGNMENT: "ASSIGNMENT",
    LO: "LEARNING_OBJECTIVE_TYPE_LEARNING",
    FLASH_CARD: "LEARNING_OBJECTIVE_TYPE_FLASH_CARD",
    OFFLINE_STUDY: "LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING",
    EXAM_LO: "LEARNING_OBJECTIVE_TYPE_EXAM_LO",
    TASK_ASSIGNMENT: "TASK_ASSIGNMENT",
};

export interface UpdateLOFormData {
    name: string;
}

export interface CreateLOFormData extends UpdateLOFormData {
    type: LOsWithAssignmentType[keyof LOsWithAssignmentType];
}
