import {
    TopicAssignmentManyQuery,
    TopicLearningObjectiveManyQuery,
} from "src/squads/syllabus/services/eureka/eureka-types";

// TODO: We have 2 places define it
export type AssignmentManyByTopicIdQuery =
    TopicAssignmentManyQuery["topics_assignments"][0]["assignment"];
export type LOByTopicIdQuery = Exclude<
    TopicLearningObjectiveManyQuery["topics_learning_objectives"][0]["learning_objective"],
    null | undefined
>;

export type LOAndAssignmentType = LOByTopicIdQuery | AssignmentManyByTopicIdQuery;
