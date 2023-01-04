import { TopicOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";

export const createMockTopicGetOneQueryData = (
    override: Partial<TopicOneQuery["topics"][0]> = {}
): TopicOneQuery["topics"][0] => {
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
