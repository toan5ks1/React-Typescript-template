import { useCallback, useMemo } from "react";

import { sortDisplayOrderEntities } from "src/squads/syllabus/common/helpers/display-order";
import {
    TopicAssignmentManyQuery,
    TopicLearningObjectiveManyQuery,
} from "src/squads/syllabus/services/eureka/eureka-types";

import {
    LOAndAssignmentType,
    LOByTopicIdQuery,
} from "src/squads/syllabus/components/RelatedTopic/LOAndAssignmentTable/models";

import logger from "../../internals/logger";
import { inferQuery } from "../../services/infer-query";
import useShowSnackbar from "../useShowSnackbar";
import useTranslate from "../useTranslate";

interface UseGetLOAndAssignmentTableParams {
    topicId: string;
}

export interface UseGetLOAndAssignmentTableValues {
    data: LOAndAssignmentType[];
    refetch: () => void;
    isFetching: boolean;
}

export const sortLOAndAssignment = (
    los: TopicLearningObjectiveManyQuery["topics_learning_objectives"],
    assignments: TopicAssignmentManyQuery["topics_assignments"]
): LOAndAssignmentType[] => {
    const safeLos = los.map((lo) => ({
        ...(lo.learning_objective as LOByTopicIdQuery),
        display_order: lo.display_order,
    }));

    const safeAssignment = assignments.map((assignment) => ({
        ...assignment.assignment,
        display_order: assignment.display_order,
    }));

    return [...safeLos, ...safeAssignment].sort(sortDisplayOrderEntities);
};

const useGetLOAndAssignmentTable = (
    params: UseGetLOAndAssignmentTableParams
): UseGetLOAndAssignmentTableValues => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { topicId } = params;

    const {
        data: los = [],
        refetch: refetchLOs,
        isFetching: isFetchingLOs,
    } = inferQuery({
        entity: "topicLearningObjective",
        action: "TOPIC_LEARNING_OBJECTIVE_GET_MANY",
    })<TopicLearningObjectiveManyQuery["topics_learning_objectives"]>(
        {
            topic_id: topicId,
        },
        {
            enabled: true,
            onError(error) {
                logger.warn("[useGetLOAndAssignmentTable] fetchLOs", error);

                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );
    const {
        data: assignments = [],
        refetch: refetchAssignment,
        isFetching: isFetchingAssignment,
    } = inferQuery({
        action: "syllabusTopicAssignmentGetManyByTopicId",
        entity: "topicAssignment",
    })(
        {
            topic_id: topicId,
        },
        {
            enabled: true,
            onError(error) {
                logger.warn("[useGetLOAndAssignmentTable] fetchAssignment", error);

                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );
    const data = useMemo<LOAndAssignmentType[]>(
        () => sortLOAndAssignment(los, assignments),
        [los, assignments]
    );

    const handleRefetch = useCallback(() => {
        void refetchLOs();
        void refetchAssignment();
    }, [refetchAssignment, refetchLOs]);

    return {
        data,
        isFetching: isFetchingLOs || isFetchingAssignment,
        refetch: handleRefetch,
    };
};

export default useGetLOAndAssignmentTable;
