import { useCallback } from "react";

import { Entities, MutationMenus, NotifyActions } from "src/common/constants/enum";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import logger from "src/squads/syllabus/internals/logger";
import NsSyllabus_LearningObjectiveService from "src/squads/syllabus/services/eureka/learning-objective/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import { LOByTopicIdQuery } from "src/squads/syllabus/pages/Book/components/LOAndAssignment/models";

import useNotifyForm from "src/squads/syllabus/hooks/useNotifyForm";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import { UpdateLOFormData } from "src/squads/syllabus/pages/LO/common/type";

export interface UpdateLOsParams {
    formData: UpdateLOFormData;
    LOData: LOByTopicIdQuery;
    topicId: string;
}

const useUpdateLOs = () => {
    const tLO = useResourceTranslate(Entities.LOS);
    const onNotify = useNotifyForm({ action: MutationMenus.EDIT, entityName: tLO("lo") });

    const { mutate, isLoading } = inferMutation({
        entity: "learningObjective",
        action: "syllabusLOUpsert",
    })({
        onSuccess: () => {
            onNotify(NotifyActions.SUCCESS, {}, "");
        },
        onError: (error) => {
            logger.warn("[useUpdateLOs]", error);

            onNotify(NotifyActions.FAILURE, {}, error.message);
        },
    });

    // TODO: Refactor
    const makePayload = useCallback(
        ({
            formData,
            LOData,
            topicId,
        }: UpdateLOsParams): NsSyllabus_LearningObjectiveService.UpsertLOs => {
            const {
                type: typeString,
                display_order,
                lo_id,
                school_id,
                video,
                study_guide,
                prerequisites,
            } = LOData;
            const displayOrder = display_order ?? 1;
            const type = typeString as keyof typeof KeyLOTypes;

            const payload: NsSyllabus_LearningObjectiveService.UpsertLOs = {
                ...formData,
                loId: lo_id,
                type,
                topicId,
                schoolId: school_id,
                displayOrder,
                prerequisitesList: prerequisites,
                studyGuide: study_guide || undefined,
                video: video || undefined,
            };

            return payload;
        },
        []
    );

    const updateLOs = useCallback(
        (params: UpdateLOsParams, options: Parameters<typeof mutate>[1]) => {
            if (isLoading) return;

            const payload = makePayload(params);

            mutate(payload, options);
        },
        [makePayload, mutate, isLoading]
    );

    return { updateLOs, isLoading };
};

export default useUpdateLOs;
