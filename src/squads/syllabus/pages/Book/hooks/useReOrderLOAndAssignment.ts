import { useCallback } from "react";

import { swapDisplayOrder } from "src/squads/syllabus/common/helpers/display-order";
import logger from "src/squads/syllabus/internals/logger";
import { NsEurekaCourseModifierService } from "src/squads/syllabus/services/eureka/course-modifier-eureka/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import {
    AssignmentManyByTopicIdQuery,
    isLO,
    LOAndAssignmentType,
    LOByTopicIdQuery,
} from "../components/LOAndAssignment/models";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface UseReOrderLOAndAssignmentValues {
    updateOrder: (items: LOAndAssignmentType[], options: { onSuccess?: () => void }) => void;
    isLoading: boolean;
}

// TODO: Move transformer data out of this hook
const useReOrderLOAndAssignment = (topicId: string): UseReOrderLOAndAssignmentValues => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { mutate, isLoading } = inferMutation({
        entity: "learningObjective",
        action: "LO_ASSIGNMENT_UPDATE_DISPLAY_ORDER",
    })();

    const makePayload = useCallback(
        (lOAndAssignments: LOAndAssignmentType[]): LOAndAssignmentType[] => {
            return swapDisplayOrder(lOAndAssignments[0], lOAndAssignments[1]);
        },
        []
    );

    const updateOrder = useCallback(
        async (
            lOAndAssignments: LOAndAssignmentType[],
            { onSuccess }: { onSuccess?: () => void }
        ) => {
            const lOAndAssignmentsSwapped = makePayload(lOAndAssignments);

            const learningObjectivesList: NsEurekaCourseModifierService.UpdateDisplayOrdersOfLOsAndAssignments["learningObjectivesList"] =
                [];

            const assignmentsList: NsEurekaCourseModifierService.UpdateDisplayOrdersOfLOsAndAssignments["assignmentsList"] =
                [];

            lOAndAssignmentsSwapped.forEach((lOAndAssignment) => {
                const { display_order } = lOAndAssignment;
                const displayOrder = display_order ?? 1;

                if (isLO(lOAndAssignment)) {
                    const data = lOAndAssignment as LOByTopicIdQuery;
                    learningObjectivesList.push({
                        displayOrder,
                        loId: data.lo_id,
                        topicId,
                    });

                    return;
                }

                // Otherwise, data will be an assignment
                const assignment = lOAndAssignment as AssignmentManyByTopicIdQuery;

                assignmentsList.push({
                    displayOrder,
                    assignmentId: assignment.assignment_id,
                    topicId,
                });
            });

            mutate(
                { learningObjectivesList, assignmentsList },
                {
                    onSuccess: () => {
                        showSnackbar(t("ra.message.moveSuccess"));
                        onSuccess && onSuccess();
                    },
                    onError: (e) => {
                        logger.warn("[useReOrderLOAndAssignment]", e);

                        showSnackbar(`${t("ra.message.moveFail")}: ${t(e.message)}`, "error");
                    },
                }
            );
        },
        [makePayload, mutate, topicId, showSnackbar, t]
    );

    return { updateOrder, isLoading };
};

export default useReOrderLOAndAssignment;
