import { useCallback } from "react";

import { swapDisplayOrder } from "src/squads/syllabus/common/helpers/display-order";
import { TopicsManyQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import NsSyllabus_TopicService from "src/squads/syllabus/services/eureka/topic-service/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { UseMutationOptions } from "src/squads/syllabus/services/service-creator";

import { TopicFormData } from "../components/TopicForm";

import { TopicStatus } from "manabie-bob/enum_pb";

export interface UseUpdateTopicReturn {
    updateTopic: (
        data: { formData: TopicFormData; topic: TopicsManyQuery["topics"][0] },
        options: UseMutationOptions<NsSyllabus_TopicService.UpsertTopics, {}>
    ) => void;
    updateOrder: (
        topics: TopicsManyQuery["topics"],
        options: UseMutationOptions<NsSyllabus_TopicService.UpsertTopics, {}>
    ) => void;
    isLoading: boolean;
}

const useUpdateTopic = (): UseUpdateTopicReturn => {
    const makePayload = useCallback(
        (
            { name, files }: TopicFormData,
            topic: TopicsManyQuery["topics"][0]
        ): NsSyllabus_TopicService.UpsertTopics => {
            const { school_id: schoolId, display_order, chapter_id: chapterId, icon_url } = topic;
            return {
                ...topic,

                icon_url: icon_url || undefined,
                chapterId: chapterId || "",
                displayOrder: display_order as number,
                schoolId,
                name,
                files: files ? [...files] : [],
            };
        },
        []
    );

    const makePayloadReOrder = useCallback(
        (topics: TopicsManyQuery["topics"]): NsSyllabus_TopicService.UpsertTopics => {
            return swapDisplayOrder(topics[0], topics[1]).map(
                (topic: TopicsManyQuery["topics"][0]) => ({
                    ...topic,
                    status: topic.status as keyof typeof TopicStatus,
                    icon_url: topic.icon_url || undefined,
                    chapterId: topic.chapter_id || "",
                    displayOrder: topic.display_order as number,
                    schoolId: topic.school_id,
                    files: [],
                })
            );
        },
        []
    );

    const { mutate, isLoading } = inferMutation({
        entity: "topic",
        action: "syllabusTopicUpsert",
    })();

    const updateTopic: UseUpdateTopicReturn["updateTopic"] = useCallback(
        ({ formData, topic }, options) => {
            const payload = makePayload(formData, topic);

            mutate(payload, options);
        },
        [makePayload, mutate]
    );

    const updateOrder: UseUpdateTopicReturn["updateOrder"] = useCallback(
        (topics, options) => {
            const payload = makePayloadReOrder(topics);
            mutate(payload, options);
        },
        [makePayloadReOrder, mutate]
    );

    return {
        updateTopic,
        isLoading,
        updateOrder,
    };
};

export default useUpdateTopic;
