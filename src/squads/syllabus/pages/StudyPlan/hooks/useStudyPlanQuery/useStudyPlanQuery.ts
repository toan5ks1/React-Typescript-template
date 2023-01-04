import { useCallback, useMemo } from "react";

import { arrayHasItem } from "src/common/utils/other";
import { StudyPlanItemAttrsFragment } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { groupStudyPlanItemsByTopic } from "../../common/utils";
import useStudyPlanTopicQuery from "../useStudyPlanTopicQuery";

const useStudyPlanQuery = (studyPlanId: string) => {
    const initialData = {
        studyPlanItemsByAssignmentId: {},
        studyPlanItemsByLoId: {},
    };

    const {
        data: studyPlan,
        isFetching: isFetchingStudyPlan,
        refetch: refetchStudyPlan,
    } = inferQuery({
        entity: "studyPlan",
        action: "STUDY_PLAN_GET_ONE",
    })(
        {
            study_plan_id: studyPlanId,
        },
        {
            enabled: true,
        }
    );

    const {
        result: {
            data: topicData = { itemsList: [] },
            isFetching: isFetchingTopics,
            refetch: refetchTopics,
        },
        pagination,
    } = useStudyPlanTopicQuery(studyPlanId);

    const { studyPlanItemsByAssignmentId, studyPlanItemsByLoId } =
        studyPlan?.study_plan_items.reduce<{
            studyPlanItemsByLoId: Record<string, StudyPlanItemAttrsFragment>;
            studyPlanItemsByAssignmentId: Record<string, StudyPlanItemAttrsFragment>;
        }>(
            (previous, current) => {
                const result = { ...previous };
                const { assignment_study_plan_item, lo_study_plan_item } = current;

                if (lo_study_plan_item) {
                    result.studyPlanItemsByLoId[lo_study_plan_item.lo_id] = current;
                }

                if (assignment_study_plan_item) {
                    result.studyPlanItemsByAssignmentId[assignment_study_plan_item.assignment_id] =
                        current;
                }

                return result;
            },
            { ...initialData }
        ) || initialData;

    const assignmentIds = Object.keys(studyPlanItemsByAssignmentId);

    const {
        data: assignments = [],
        isFetching: isFetchingAssignments,
        refetch: refetchAssignments,
    } = inferQuery({
        entity: "assignment",
        action: "syllabusAssignmentGetMany",
    })(
        {
            assignment_id: assignmentIds,
        },
        { enabled: arrayHasItem(assignmentIds) }
    );

    const loIds = Object.keys(studyPlanItemsByLoId);
    const {
        data: learningObjectives = [],
        isFetching: isFetchingLearningObjectives,
        refetch: refetchLearningObjectives,
    } = inferQuery({
        entity: "learningObjective",
        action: "LO_GET_MANY_BY_IDS",
    })(
        {
            lo_id: loIds,
        },
        {
            enabled: arrayHasItem(loIds),
        }
    );

    const isFetching =
        isFetchingStudyPlan ||
        isFetchingTopics ||
        isFetchingAssignments ||
        isFetchingLearningObjectives;

    const studyPlanItemsByTopic = useMemo(
        () =>
            isFetching
                ? []
                : groupStudyPlanItemsByTopic({
                      topics: topicData.itemsList,
                      assignments,
                      learningObjectives,
                      studyPlanItemsByAssignmentId,
                      studyPlanItemsByLoId,
                  }),
        [
            assignments,
            isFetching,
            learningObjectives,
            studyPlanItemsByAssignmentId,
            studyPlanItemsByLoId,
            topicData.itemsList,
        ]
    );

    const refetch = useCallback(
        () =>
            Promise.all([
                refetchStudyPlan({ queryKey: new Date().toDateString() }),
                refetchTopics(),
                refetchAssignments(),
                refetchLearningObjectives(),
            ]),
        [refetchAssignments, refetchLearningObjectives, refetchStudyPlan, refetchTopics]
    );

    return {
        studyPlan,
        studyPlanItemsByTopic,
        isFetching,
        pagination,
        refetch,
        refetchStudyPlan,
    };
};

export default useStudyPlanQuery;
