import {
    TopicOneQueryVariables,
    TopicsManyQueryVariables,
    TopicTitleQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";

import { topicQueriesBob } from "../eureka/topic-service-bob";
import {
    createMockDataDeleteTopics,
    createMockDataUpsertTopic,
} from "../eureka/topic-service/__tests__/data";
import { topicService } from "../topic-service";

import topicModifierService from "src/squads/syllabus/services/eureka/topic-service/topic-modifier.mutation";

jest.mock("src/squads/syllabus/services/eureka/topic-service-bob/topic-service-bob.query", () => ({
    __esModule: true,
    default: {
        getOne: jest.fn(),
        getMany: jest.fn(),
        getTitle: jest.fn(),
    },
}));

jest.mock("src/squads/syllabus/services/eureka/topic-service/topic-modifier.mutation", () => ({
    __esModule: true,
    default: {
        upsertTopics: jest.fn(),
        deleteTopics: jest.fn(),
    },
}));

describe(`test for query get one topic ${topicService.query.syllabusTopicGetOne.name}`, () => {
    it("shouldn't call query and return undefined when missing identity", async () => {
        const result = await topicService.query.syllabusTopicGetOne({});

        expect(topicQueriesBob.getOne).not.toBeCalled();
        expect(result).toEqual(undefined);
    });

    it("should return correct after query success", async () => {
        const fakeQueryResponse = "fakeQueryResponse";
        (topicQueriesBob.getOne as jest.Mock).mockResolvedValue(fakeQueryResponse);

        const params: TopicOneQueryVariables = { topic_id: "topicId_01" };

        const result = await topicService.query.syllabusTopicGetOne(params);

        expect(topicQueriesBob.getOne).toBeCalledWith(params);
        expect(result).toEqual(fakeQueryResponse);
    });
});

describe(topicService.query.syllabusTopicGetTitle.name, () => {
    it("should not call query and return undefined when missing identity", async () => {
        const result = await topicService.query.syllabusTopicGetTitle({});

        expect(result).toBeUndefined();
        expect(topicQueriesBob.getTitle).not.toBeCalled();
    });

    it("should call getTitle and return correct data after query success", async () => {
        const response = "response_topic_getTitle";
        const params: TopicTitleQueryVariables = {
            topic_id: "topicId_1",
        };

        (topicQueriesBob.getTitle as jest.Mock).mockResolvedValue(response);

        const result = await topicService.query.syllabusTopicGetTitle(params);

        expect(result).toEqual(response);
        expect(topicQueriesBob.getTitle).toBeCalledWith(params);
    });
});

describe(`test for query get many topic by chapterId ${topicService.query.syllabusTopicGetManyByChapterId.name}`, () => {
    it("shouldn't call query and return undefined when missing chapterId", async () => {
        const result = await topicService.query.syllabusTopicGetManyByChapterId({});

        expect(topicQueriesBob.getMany).not.toBeCalled();
        expect(result).toEqual(undefined);
    });

    it("should return correct after query success", async () => {
        const fakeQueryResponse = "fakeQueryResponse";
        (topicQueriesBob.getMany as jest.Mock).mockResolvedValue(fakeQueryResponse);

        const params: TopicsManyQueryVariables = { chapter_id: "chapter_id" };

        const result = await topicService.query.syllabusTopicGetManyByChapterId(params);

        expect(topicQueriesBob.getMany).toBeCalledWith(params);
        expect(result).toEqual(fakeQueryResponse);
    });
});

describe(`test for upsert topics ${topicService.mutation.syllabusTopicUpsert.name}`, () => {
    it("should return correct data after success", async () => {
        const upsertTopicsResponse = "upsertTopicsResponse";
        const payload = createMockDataUpsertTopic();

        (topicModifierService.upsertTopics as jest.Mock).mockResolvedValue(upsertTopicsResponse);

        const result = await topicService.mutation.syllabusTopicUpsert(payload);

        expect(topicModifierService.upsertTopics).toBeCalledWith(payload);
        expect(result).toEqual(upsertTopicsResponse);
    });
});

describe(`test for delete topic ${topicService.mutation.syllabusTopicDelete.name}`, () => {
    it("should return correct response after successfully delete topic", async () => {
        const payload = createMockDataDeleteTopics();
        const deleteTopicsResponse = "DeleteTopicsResponse";

        (topicModifierService.deleteTopics as jest.Mock).mockResolvedValue(deleteTopicsResponse);

        const result = await topicService.mutation.syllabusTopicDelete(payload);

        expect(topicModifierService.deleteTopics).toBeCalledWith(payload);
        expect(result).toEqual(deleteTopicsResponse);
    });
});
