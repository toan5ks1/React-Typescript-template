import { toArr } from "src/common/utils/other";
import { paramsInvalidError } from "src/squads/syllabus/internals/errors";
import { TestCaseValidateRequest } from "src/squads/syllabus/test-utils/service/validate";

import {
    createUpsertTopicRequest,
    validateUpsertTopic,
    createDeleteTopicsRequest,
    validateDeleteTopics,
} from "../topic-modifier.request";
import NsSyllabus_TopicService from "../types";
import { createMockDataDeleteTopics, createMockDataUpsertTopic } from "./data";

describe(`${validateUpsertTopic.name} with invalid data`, () => {
    const testCases: TestCaseValidateRequest<NsSyllabus_TopicService.UpsertTopics, false>[] = [
        {
            input: [],
            title: "an empty array data",
        },
        {
            input: {
                schoolId: undefined,
            },
            title: "missing schoolId",
        },
        {
            input: {
                schoolId: 99,
                name: undefined,
            },
            title: "missing the name field",
        },
        {
            input: {
                schoolId: 99,
                name: "Name",
                chapterId: undefined,
            },
            title: "missing the chapterId field",
        },
    ];
    testCases.forEach(({ input, title }) => {
        it(`should throw error when it is ${title}`, () => {
            expect(() =>
                validateUpsertTopic(input as NsSyllabus_TopicService.UpsertTopics)
            ).toThrowError();
        });
    });
});

describe(`${validateUpsertTopic.name} with valid data`, () => {
    const testCases: TestCaseValidateRequest<NsSyllabus_TopicService.UpsertTopics>[] = [
        {
            input: [
                {
                    chapterId: "chapterId",
                    schoolId: 99,
                    name: "Name",
                    files: [],
                    topic_id: "topicId",
                    displayOrder: 0,
                },
            ],
            title: "an array valid",
        },
        {
            input: {
                chapterId: "chapterId",
                schoolId: 99,
                name: "Name",
                files: [],
                topic_id: "topicId",
                displayOrder: 0,
            },
            title: "object valid",
        },
    ];
    testCases.forEach(({ input, title }) => {
        it(`shouldn't throw error when data is ${title}`, () => {
            expect(() =>
                validateUpsertTopic(input as NsSyllabus_TopicService.UpsertTopics)
            ).not.toThrowError();
        });
    });
});

describe(createUpsertTopicRequest.name, () => {
    it("should create correct upsert topic request with icon url", () => {
        const iconUrl = "http://topic image";
        const displayOrder = 10;
        const payload = toArr(
            createMockDataUpsertTopic({
                icon_url: iconUrl,
                displayOrder,
            })
        )[0];

        expect(createUpsertTopicRequest(payload).toObject()).toEqual({
            topicsList: [
                {
                    id: payload.topic_id,
                    name: payload.name,
                    schoolId: payload.schoolId,
                    chapterId: payload.chapterId,
                    displayOrder: displayOrder,
                    iconUrl: iconUrl,
                    type: 1,
                    status: 2,

                    createdAt: undefined,
                    essayRequired: false,
                    grade: "",
                    attachmentsList: [],
                    copiedTopicId: undefined,
                    country: 0,
                    publishedAt: undefined,
                    instruction: "",
                    subject: 0,
                    totalLos: 0,
                    updatedAt: undefined,
                },
            ],
        });
    });
});

describe(`${validateDeleteTopics.name} with invalid data`, () => {
    const invalidData: TestCaseValidateRequest<NsSyllabus_TopicService.DeleteTopics>[] = [
        {
            title: "id list is undefined",
            input: {} as NsSyllabus_TopicService.DeleteTopics,
        },
        {
            title: "id list is empty",
            input: { topicIdsList: [] },
        },
    ];

    invalidData.forEach(({ title, input }) => {
        it(`should throw err when ${title}`, () => {
            expect(() => validateDeleteTopics(input)).toThrowError(paramsInvalidError);
        });
    });
});

describe(`${validateDeleteTopics.name} with valid data`, () => {
    const validData: TestCaseValidateRequest<NsSyllabus_TopicService.DeleteTopics>[] = [
        {
            title: "id list has only an element",
            input: { topicIdsList: ["topic_id"] },
        },
        {
            title: "id list has multiple element",
            input: { topicIdsList: ["topic_id_01", "topic_id_02"] },
        },
    ];

    validData.forEach(({ title, input }) => {
        it(`should not throw err when ${title}`, () => {
            expect(() => validateDeleteTopics(input)).not.toThrowError();
        });
    });
});

describe(createDeleteTopicsRequest.name, () => {
    it("should create correct delete topic request", () => {
        const payload = createMockDataDeleteTopics({
            topicIdsList: ["topicId_01", "topicId_02"],
        });

        expect(createDeleteTopicsRequest(payload).toObject()).toEqual(payload);
    });
});
