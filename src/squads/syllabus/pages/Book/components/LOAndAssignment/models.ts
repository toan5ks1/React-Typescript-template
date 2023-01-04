import { KeyAssignmentTypes } from "src/squads/syllabus/common/constants/const";
import {
    TopicAssignmentManyQuery,
    TopicLearningObjectiveManyQuery,
} from "src/squads/syllabus/services/eureka/eureka-types";

export type AssignmentManyByTopicIdQuery =
    TopicAssignmentManyQuery["topics_assignments"][0]["assignment"];

export type LOByTopicIdQuery = Omit<
    Exclude<
        TopicLearningObjectiveManyQuery["topics_learning_objectives"][0]["learning_objective"],
        null | undefined
    >,
    "created_at" | "updated_at"
>;

export type LOAndAssignmentType = LOByTopicIdQuery | AssignmentManyByTopicIdQuery;

type PossibleHasIdLOAndAssignment = LOAndAssignmentType & { lo_id?: LOByTopicIdQuery["lo_id"] } & {
    assignment_id?: AssignmentManyByTopicIdQuery["assignment_id"];
};

export function isLO(data: PossibleHasIdLOAndAssignment): boolean {
    const id = (data as LOByTopicIdQuery).lo_id;
    return Boolean(id);
}

export function isTaskAssignment(type: string): boolean {
    return type === KeyAssignmentTypes.ASSIGNMENT_TYPE_TASK;
}

export function getIdOfLearningObjectiveOrAssignment(data: PossibleHasIdLOAndAssignment): string {
    if (data.lo_id) return data.lo_id;

    if (data.assignment_id) return data.assignment_id;

    // Only type safe data always have lo_id or assignment_id
    return "";
}
