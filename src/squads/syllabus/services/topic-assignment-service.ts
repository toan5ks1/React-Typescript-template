import { TopicAssignmentManyQueryVariables } from "./eureka/eureka-types";
import { topicAssignmentQueriesEureka } from "./eureka/topic-assignment-eureka";
import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";

export const topicAssignmentService = defineService({
    query: {
        syllabusTopicAssignmentGetManyByTopicId: (params: TopicAssignmentManyQueryVariables) => {
            if (params.topic_id) return topicAssignmentQueriesEureka.getManyByTopicId(params);

            return createEmptyResponse(undefined);
        },
    },
});
