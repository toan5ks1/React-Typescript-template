import { useCallback } from "react";

import { NotifyTypes } from "src/common/constants/enum";
import { genId } from "src/squads/syllabus/common/utils/generator";
import logger from "src/squads/syllabus/internals/logger";
import { ChapterAttrsFragment } from "src/squads/syllabus/services/eureka/eureka-types";
import NsSyllabus_TopicService from "src/squads/syllabus/services/eureka/topic-service/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { UseMutationOptions } from "src/squads/syllabus/services/service-creator";

import { TopicFormData } from "../components/TopicForm";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface UseCreateTopicReturn {
    isLoading: boolean;
    createTopic: (
        data: { formData: TopicFormData; chapter: ChapterAttrsFragment },
        options: UseMutationOptions<NsSyllabus_TopicService.UpsertTopics, {}>
    ) => void;
}

const useCreateTopic = () => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { mutate, isLoading } = inferMutation({
        entity: "topic",
        action: "syllabusTopicUpsert",
    })({
        onSuccess: () => {
            showSnackbar(
                t(
                    "ra.common.addedSuccess",
                    { smart_count: t("resources.topics.name") },
                    { lowercase: true }
                )
            );
        },
        onError: (e) => {
            logger.warn("[Create topic]", e);

            showSnackbar(t("ra.common.createdFail"), NotifyTypes.ERROR);
        },
    });

    const makePayload = useCallback(
        (
            { name, files }: TopicFormData,
            chapter: ChapterAttrsFragment
        ): NsSyllabus_TopicService.UpsertTopics => {
            const { chapter_id: chapterId, school_id: schoolId } = chapter;

            const payload: NsSyllabus_TopicService.UpsertTopics = {
                schoolId,
                chapterId,
                topic_id: genId(),
                name,
                files: files ? [...files] : [],
                displayOrder: 0,
            };

            return payload;
        },
        []
    );

    const createTopic: UseCreateTopicReturn["createTopic"] = useCallback(
        ({ formData, chapter }, options) => {
            const payload = makePayload(formData, chapter);
            mutate(payload, options);
        },
        [makePayload, mutate]
    );

    return {
        createTopic,
        isLoading,
    };
};

export default useCreateTopic;
