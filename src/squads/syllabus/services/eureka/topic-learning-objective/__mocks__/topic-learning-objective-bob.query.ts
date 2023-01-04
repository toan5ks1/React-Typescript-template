import { TopicLearningObjectiveManyQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { createArrayNumber } from "src/squads/syllabus/test-utils/utils";

import { LOByTopicIdQuery } from "src/squads/syllabus/pages/Book/components/LOAndAssignment/models";

export const mockLOByTopicIdQueryData = (
    override: Partial<LOByTopicIdQuery> = {}
): LOByTopicIdQuery => {
    return {
        lo_id: "lo_id_by_topic_id",
        topic_id: "topic_id",
        name: "lo_name_by_topic_id",
        display_order: 6,
        school_id: 1,
        type: "LEARNING_OBJECTIVE_TYPE_LEARNING",
        ...override,
    };
};

export const createMockTopicLOGetManyQueryData = (
    quantity: number
): TopicLearningObjectiveManyQuery["topics_learning_objectives"] =>
    createArrayNumber(quantity).map((i) => {
        return {
            learning_objective: {
                lo_id: `topic_lo_id${i}_getMany`,
                name: `topic_lo_name${i}_getMany`,
                school_id: 1,
                created_at: "2022-04-26T11:37:56.282708+00:00",
                updated_at: "2022-05-26T11:37:56.282708+00:00",
            },
            display_order: i,
        };
    });
