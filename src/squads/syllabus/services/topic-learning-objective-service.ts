import { TopicLearningObjectiveManyQueryVariables } from "./eureka/eureka-types";
import { topicLearningObjectiveQueriesBob } from "./eureka/topic-learning-objective";
import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";

export const bobTopicLearningObjectiveService = defineService({
    query: {
        TOPIC_LEARNING_OBJECTIVE_GET_MANY: (params: TopicLearningObjectiveManyQueryVariables) => {
            if (params.topic_id) return topicLearningObjectiveQueriesBob.getMany(params);

            return createEmptyResponse(undefined);
        },
    },
});
