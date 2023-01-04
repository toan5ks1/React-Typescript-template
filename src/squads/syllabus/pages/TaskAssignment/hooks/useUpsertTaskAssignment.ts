import { useCallback } from "react";

import { EurekaEntities, ProviderTypes } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { MicroFrontendTypes } from "src/routing/type";
import logger from "src/squads/syllabus/internals/logger";
import { NsAssignmentEureka } from "src/squads/syllabus/services/eureka/assignment-eureka/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { UseMutationOptions } from "src/squads/syllabus/services/service-creator";
import { MutationParams } from "src/squads/syllabus/services/service-types";

import { AssignmentType } from "manabuf/eureka/v1/enums_pb";

import { TaskAssignmentFormValues } from "../common/types";

import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface UseUpsertTaskAssignmentProps {
    action: ProviderTypes.CREATE | ProviderTypes.UPDATE;
    searchUrl: string;
}

export interface UseUpsertTaskAssignmentReturn {
    upsertTaskAssignment: (
        formData: TaskAssignmentFormValues,
        options: UseMutationOptions<
            MutationParams<NsAssignmentEureka.UpsertAssignment>,
            Promise<{ id: string }>
        >
    ) => void;
    isLoading: boolean;
}

const useUpsertTaskAssignment = (props: UseUpsertTaskAssignmentProps) => {
    const { action, searchUrl } = props;
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();
    const navigation = useNavigation();

    const isCreating = action === ProviderTypes.CREATE;

    const { mutate, isLoading } = inferMutation({
        entity: "assignment",
        action: "syllabusAssignmentUpsert",
    })({
        onSuccess: ({ assignmentIdsList }) => {
            const message = t(
                isCreating ? "ra.common.createdSuccess" : "ra.common.updatedSuccess",
                { smart_count: t(`resources.${EurekaEntities.TASK_ASSIGNMENTS}.task`) },
                { lowercase: true }
            );

            showSnackbar(message, "success");
            navigation.push(
                `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.TASK_ASSIGNMENTS}/${assignmentIdsList[0]}/show${searchUrl}`
            );
        },
        onError: (error) => {
            logger.error(`${action} assignment failed`, error);

            showSnackbar(
                t(isCreating ? "ra.common.createdFail" : "ra.common.updatedFail"),
                "error"
            );
        },
    });

    const makePayload = useCallback(
        (formData: TaskAssignmentFormValues): NsAssignmentEureka.UpsertAssignment => {
            const { assignment_id, content, display_order, instruction, name, files, settings } =
                formData;
            const displayOrder = isCreating ? 0 : Number(display_order);

            const payload: NsAssignmentEureka.UpsertAssignment = {
                name,
                files,
                settings,
                assignmentId: assignment_id,
                content: { loIdList: content.lo_id, topicId: content.topic_id },
                displayOrder,
                instruction: convertString(instruction),
                requiredGrade: false,
                maxGrade: 0,
                assignmentType: AssignmentType.ASSIGNMENT_TYPE_TASK,
            };

            return payload;
        },
        [isCreating]
    );

    const upsertTaskAssignment = useCallback(
        (formData: TaskAssignmentFormValues, options: Parameters<typeof mutate>[1]) => {
            if (isLoading) return;

            const payload = makePayload(formData);

            mutate(payload, options);
        },
        [makePayload, mutate, isLoading]
    );

    return {
        upsertTaskAssignment,
        isLoading,
    };
};

export default useUpsertTaskAssignment;
