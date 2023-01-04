import {
    TopicOneQueryVariables,
    TopicsManyQueryVariables,
    TopicTitleQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { topicQueriesBob } from "src/squads/syllabus/services/eureka/topic-service-bob";

import topicModifierService from "./eureka/topic-service/topic-modifier.mutation";
import NsSyllabus_TopicService from "./eureka/topic-service/types";
import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";

export const topicService = defineService({
    query: {
        syllabusTopicGetOne: (params: TopicOneQueryVariables) => {
            if (params.topic_id) return topicQueriesBob.getOne(params);

            return createEmptyResponse(undefined);
        },
        syllabusTopicGetManyByChapterId: (params: TopicsManyQueryVariables) => {
            if (params.chapter_id) return topicQueriesBob.getMany(params);

            return createEmptyResponse(undefined);
        },
        syllabusTopicGetTitle: (params: TopicTitleQueryVariables) => {
            if (params.topic_id) return topicQueriesBob.getTitle(params);

            return createEmptyResponse(undefined);
        },
    },
    mutation: {
        syllabusTopicUpsert: (payload: NsSyllabus_TopicService.UpsertTopics) => {
            return topicModifierService.upsertTopics(payload);
        },
        syllabusTopicDelete: (payload: NsSyllabus_TopicService.DeleteTopics) => {
            return topicModifierService.deleteTopics(payload);
        },
    },
});
