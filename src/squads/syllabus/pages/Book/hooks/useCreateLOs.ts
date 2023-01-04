import { useCallback } from "react";

import NsSyllabus_LearningObjectiveService from "src/squads/syllabus/services/eureka/learning-objective/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { CreateLOFormData } from "src/squads/syllabus/pages/LO/common/type";

interface UseCreateLOsProps {
    topicId: string;
}

// Current follow after the user created, user will be redirect to LO detail page
const useCreateLOs = (params: UseCreateLOsProps) => {
    const { topicId } = params;

    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const { data, isLoading: isPrepareLoading } = inferQuery({
        entity: "topic",
        action: "syllabusTopicGetOne",
    })(
        {
            topic_id: topicId,
        },
        {
            enabled: Boolean(topicId),
        }
    );

    const { mutate, isLoading } = inferMutation({
        entity: "learningObjective",
        action: "syllabusLOUpsert",
    })();

    const makePayload = useCallback(
        (formData: CreateLOFormData): NsSyllabus_LearningObjectiveService.UpsertLOs | null => {
            // Prevent ts-safe error (LO type is not include ASSIGNMENT)
            if (formData.type === "ASSIGNMENT" || formData.type === "TASK_ASSIGNMENT" || !data) {
                return null;
            }

            const payload: NsSyllabus_LearningObjectiveService.UpsertLOs = {
                name: formData.name,
                type: formData.type,
                topicId: data.topic_id,
                schoolId: data.school_id,
                displayOrder: 0,
            };

            return payload;
        },
        [data]
    );

    const createLOs = useCallback(
        (formData: CreateLOFormData, options: Parameters<typeof mutate>[1]) => {
            if (isLoading) return;

            const payload = makePayload(formData);

            if (!payload) {
                // To prevent can not get topic's data.
                showSnackbar(t("ra.common.someThingWentWrong"), "error");
                return;
            }

            mutate(payload, options);
        },
        [isLoading, makePayload, mutate, showSnackbar, t]
    );

    return {
        isLoading,
        isPrepareLoading,
        createLOs,
    };
};

export default useCreateLOs;
