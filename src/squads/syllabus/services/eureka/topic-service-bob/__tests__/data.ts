import { CreateMockDataTest } from "src/squads/syllabus/test-utils/types";
import { createArrayNumber } from "src/squads/syllabus/test-utils/utils";

import { TopicOneQuery, TopicsManyQuery, TopicTitleQuery } from "../../eureka-types";

export const createMockDataGetTopicTitleQuery: CreateMockDataTest<TopicTitleQuery["topics"][0]> = (
    overrides = {}
) => {
    return {
        name: "topic_name",
        ...overrides,
    };
};

export const createMockDataGetTopicOneQuery: CreateMockDataTest<TopicOneQuery["topics"][0]> = (
    override = {}
) => {
    return {
        topic_id: "topic_id_getOne",
        name: "topic_name_getOne",
        school_id: 1,
        display_order: 1,
        topic_type: "TOPIC_TYPE_LEARNING",
        chapter_id: "chapter_id_topicGetOne",
        essay_required: false,
        created_at: "2022-03-21T06:21:31.569081+00:00",
        updated_at: "2022-04-06T07:56:36.094837+00:00",
        grade: -1,
        subject: "SUBJECT_NONE",
        ...override,
    };
};

export const createMockDataGetTopicManyQuery: CreateMockDataTest<
    TopicsManyQuery["topics"],
    {
        quantity: number;
    }
> = (_, options = { quantity: 3 }) => {
    return createArrayNumber(options.quantity).map((i) => ({
        topic_id: `topic_id_${i}`,
        name: `topic_name_${i}`,
        school_id: 1,
        display_order: 1 + i,
        topic_type: "TOPIC_TYPE_LEARNING",
        chapter_id: "chapter_id",
        created_at: "2022-03-21T06:21:31.569081+00:00",
        updated_at: "2022-04-06T07:56:36.094837+00:00",
        essay_required: false,
        grade: -1,
        subject: "SUBJECT_NONE",
    }));
};
