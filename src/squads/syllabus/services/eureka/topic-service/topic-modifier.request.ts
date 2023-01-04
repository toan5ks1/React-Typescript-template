import { toArr } from "src/common/utils/other";
import { formInvalidError, paramsInvalidError } from "src/squads/syllabus/internals/errors";

import { TopicStatus, TopicType } from "manabuf/eureka/v1/enums_pb";
import { UpsertTopicsRequest, DeleteTopicsRequest } from "manabuf/eureka/v1/topic_modifier_pb";
import { Topic } from "manabuf/eureka/v1/topic_reader_pb";

import NsSyllabus_TopicService from "./types";

export const validateDeleteTopics = (data: NsSyllabus_TopicService.DeleteTopics) => {
    const shouldThrowErr = !data.topicIdsList || !data.topicIdsList.length;

    if (shouldThrowErr) {
        throw paramsInvalidError;
    }
};

export const validateUpsertTopic = (topics: NsSyllabus_TopicService.UpsertTopics) => {
    if (Array.isArray(topics) && topics.length === 0) throw formInvalidError;

    toArr(topics).forEach((item) => {
        const { schoolId, chapterId, name } = item;

        if (!name || !schoolId || !chapterId) throw formInvalidError;
    });
};

export const createUpsertTopicRequest = (topics: NsSyllabus_TopicService.UpsertTopics) => {
    const request = new UpsertTopicsRequest();

    toArr(topics).forEach((item) => {
        const {
            topic_id: topicId,
            schoolId,
            icon_url: iconUrl,
            chapterId,
            displayOrder,
            name,
        } = item;
        const topicIns = new Topic();

        topicIns.setId(topicId);

        topicIns.setName(name);
        topicIns.setSchoolId(schoolId);
        topicIns.setChapterId(chapterId);
        topicIns.setDisplayOrder(displayOrder);

        // TODO: 2 fields need to ask BE
        topicIns.setType(TopicType.TOPIC_TYPE_LEARNING);
        topicIns.setStatus(TopicStatus.TOPIC_STATUS_PUBLISHED);

        if (iconUrl) topicIns.setIconUrl(iconUrl);

        request.addTopics(topicIns);
    });

    return request;
};

export const createDeleteTopicsRequest = ({
    topicIdsList,
}: NsSyllabus_TopicService.DeleteTopics) => {
    const request = new DeleteTopicsRequest();

    request.setTopicIdsList(topicIdsList);

    return request;
};
