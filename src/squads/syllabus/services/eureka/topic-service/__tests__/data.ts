import { CreateMockDataTest } from "src/squads/syllabus/test-utils/types";

import NsSyllabus_TopicService from "../types";

export const createMockDataUpsertTopic: CreateMockDataTest<NsSyllabus_TopicService.UpsertTopics> = (
    overrides = {}
) => {
    return {
        chapterId: "chapterId_S1",
        displayOrder: 1,
        files: [],
        name: "topicName_S1",
        schoolId: 99,
        topic_id: "topicId_S1",
        ...overrides,
    };
};

export const createMockDataDeleteTopics: CreateMockDataTest<NsSyllabus_TopicService.DeleteTopics> =
    (overrides = {}) => {
        return {
            topicIdsList: ["topicId_01", "topicId_02"],
            ...overrides,
        };
    };
