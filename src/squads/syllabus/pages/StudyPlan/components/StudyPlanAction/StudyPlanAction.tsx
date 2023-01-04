import { useCallback } from "react";

import { MutationMenus, ProviderTypes } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { StudyPlanOneV2Query } from "src/squads/syllabus/services/eureka/eureka-types";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import ActionPanel from "src/components/Menus/ActionPanel";

import { StudyPlanStatusKey } from "../../common/constants";

import useStudyPlanMutation from "src/squads/syllabus/hooks/useStudyPlanMutation";

export interface StudyPlanActionProps {
    studyPlan: ArrayElement<StudyPlanOneV2Query["study_plans"]>;
    refetchStudyPlan: () => void;
    handleOpenEditStudyPlanDialog: () => void;
}

const StudyPlanAction = (props: StudyPlanActionProps) => {
    const { studyPlan, refetchStudyPlan, handleOpenEditStudyPlanDialog } = props;
    const actions = [
        MutationMenus.EDIT,
        studyPlan.status === StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE
            ? MutationMenus.ARCHIVE
            : MutationMenus.UNARCHIVE,
    ];
    const disables = {
        [MutationMenus.EDIT]: studyPlan.status === StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED,
    };

    const { archiveStudyPlan, activateStudyPlan } = useStudyPlanMutation({
        action: ProviderTypes.UPDATE,
        courseId: convertString(studyPlan.course_id),
        studyPlanId: studyPlan.study_plan_id,
    });

    const onAction = useCallback(
        (action: MutationMenus) => {
            switch (action) {
                case MutationMenus.EDIT: {
                    return handleOpenEditStudyPlanDialog();
                }
                case MutationMenus.ARCHIVE:
                    return archiveStudyPlan(studyPlan, {
                        onSuccess: () => {
                            refetchStudyPlan();
                        },
                    });
                case MutationMenus.UNARCHIVE:
                    return activateStudyPlan(studyPlan, {
                        onSuccess: () => {
                            refetchStudyPlan();
                        },
                    });
                default:
                    return;
            }
        },
        [
            activateStudyPlan,
            archiveStudyPlan,
            handleOpenEditStudyPlanDialog,
            refetchStudyPlan,
            studyPlan,
        ]
    );

    return (
        <ActionPanel
            recordName=""
            actions={actions}
            disables={disables}
            buttonStyle="square"
            onAction={onAction}
        />
    );
};

export default StudyPlanAction;
