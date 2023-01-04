import { uploadServiceClientBob } from "src/squads/syllabus/services/bob/upload-reader-service-bob";
import { createFile } from "src/squads/syllabus/test-utils/file";
import {
    createFakeProtoResponse,
    createMockClass,
} from "src/squads/syllabus/test-utils/service/mutation";

import { TopicModifierServicePromiseClient } from "manabuf/eureka/v1/topic_modifier_grpc_web_pb";

import topicModifierService from "../topic-modifier.mutation";
import { createDeleteTopicsRequest, createUpsertTopicRequest } from "../topic-modifier.request";
import { createMockDataUpsertTopic, createMockDataDeleteTopics } from "./data";

describe(topicModifierService.upsertTopics, () => {
    it("should upsert topic with image file and return correct data", async () => {
        const response = "response_topicUpsert";
        const newIconUrl = "http:// new image topic";
        const files = [createFile()];

        const payload = createMockDataUpsertTopic({
            icon_url: "Image current URL",
            files,
        });

        const request = createUpsertTopicRequest({ ...payload, icon_url: newIconUrl });

        createMockClass<TopicModifierServicePromiseClient>(TopicModifierServicePromiseClient, {
            upsert: () => createFakeProtoResponse(response),
        });

        const uploadFn = jest.spyOn(uploadServiceClientBob, "generateResumableUploadURL");

        uploadFn.mockResolvedValue(
            Promise.resolve([
                {
                    gRPC: { downloadUrl: newIconUrl, resumableUploadUrl: "", fileName: "" },
                    file: new File([], ""),
                },
            ])
        );

        const result = await topicModifierService.upsertTopics(payload);

        expect(uploadFn).toBeCalledWith({ files });

        expect(TopicModifierServicePromiseClient.prototype.upsert).toBeCalledWith(request);
        expect(result).toEqual(response);
    });

    it("should upsert topic with icon url and without upload image when file not found", async () => {
        const response = "response_topicUpsert";

        const iconUrl = "http:// image";

        const payload = createMockDataUpsertTopic({
            icon_url: iconUrl,
        });

        const request = createUpsertTopicRequest(payload);

        createMockClass<TopicModifierServicePromiseClient>(TopicModifierServicePromiseClient, {
            upsert: () => createFakeProtoResponse(response),
        });

        const uploadFn = jest.spyOn(uploadServiceClientBob, "generateResumableUploadURL");

        await topicModifierService.upsertTopics(payload);

        expect(uploadFn).not.toBeCalled();

        expect(TopicModifierServicePromiseClient.prototype.upsert).toBeCalledWith(request);
        expect(request.toObject().topicsList[0].iconUrl).toEqual(iconUrl);
    });
});

describe(topicModifierService.deleteTopics.name, () => {
    it("should return correct request and response after success", async () => {
        const payload = createMockDataDeleteTopics();
        const response = "response_deleteTopics";

        createMockClass<TopicModifierServicePromiseClient>(TopicModifierServicePromiseClient, {
            deleteTopics: () => createFakeProtoResponse(response),
        });

        const request = createDeleteTopicsRequest(payload);

        const result = await topicModifierService.deleteTopics(payload);

        expect(result).toEqual(response);
        expect(TopicModifierServicePromiseClient.prototype.deleteTopics).toBeCalledWith(request);
    });
});
