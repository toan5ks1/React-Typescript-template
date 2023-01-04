import { toArr } from "src/common/utils/other";
import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/syllabus/services/service-types";

import { TopicModifierServicePromiseClient } from "manabuf/eureka/v1/topic_modifier_grpc_web_pb";

import { uploadServiceClientBob } from "../../bob/upload-reader-service-bob";
import {
    createUpsertTopicRequest,
    validateUpsertTopic,
    createDeleteTopicsRequest,
    validateDeleteTopics,
} from "./topic-modifier.request";
import NsSyllabus_TopicService from "./types";

class TopicModifierService extends InheritedGrpcServiceClient<TopicModifierServicePromiseClient> {
    async upsertTopics(topics: NsSyllabus_TopicService.UpsertTopics) {
        validateUpsertTopic(topics);

        const promise = Promise.all(
            toArr(topics).map(async (topic) => {
                let iconUrl = topic.icon_url;

                if (topic.files?.length) {
                    const resp = await uploadServiceClientBob.generateResumableUploadURL({
                        files: topic.files,
                    });
                    iconUrl = resp[0]?.gRPC.downloadUrl;
                }

                return {
                    ...topic,
                    icon_url: iconUrl,
                };
            })
        );

        const topicsWithIcon = await promise;

        const request = createUpsertTopicRequest(topicsWithIcon);

        const response = await this._call("upsert", request);

        return response.toObject();
    }

    async deleteTopics(payload: NsSyllabus_TopicService.DeleteTopics) {
        validateDeleteTopics(payload);

        const request = createDeleteTopicsRequest(payload);

        const response = await this._call("deleteTopics", request);

        return response.toObject();
    }
}

const topicModifierService = new TopicModifierService(
    TopicModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default topicModifierService;
