import { useMemo } from "react";

import { Features } from "src/common/constants/enum";

import useFeatureToggle from "../useFeatureToggle";

export enum ActionTypes {
    LO = "LO",
    FLASH_CARD = "FLASH_CARD",
    ASSIGNMENT = "ASSIGNMENT",
    OFFLINE_STUDY = "OFFLINE_STUDY",
    EXAM_LO = "EXAM_LO",
    TASK_ASSIGNMENT = "TASK_ASSIGNMENT",
}

export type ConfigKeysType = { [x in ActionTypes]: boolean };

export interface UseTopicControlReturn {
    configKeys: ConfigKeysType;
}

const useTopicControl = (): UseTopicControlReturn => {
    const { isEnabled: isEnabledFlashCard } = useFeatureToggle(Features.FLASHCARD_MANAGEMENT);
    const { isEnabled: isEnableAssignment } = useFeatureToggle(Features.ASSIGNMENT_MANAGEMENT);
    const { isEnabled: isEnableExamLO } = useFeatureToggle(Features.EXAM_LO_MANAGEMENT);
    const { isEnabled: isEnableOfflineStudy } = useFeatureToggle(Features.OFFLINE_STUDY_MANAGEMENT);
    const { isEnabled: isEnableTaskAssignment } = useFeatureToggle(
        Features.TASK_ASSIGNMENT_MANAGEMENT
    );

    const configKeys: ConfigKeysType = useMemo(() => {
        return {
            [ActionTypes.LO]: true,
            [ActionTypes.FLASH_CARD]: isEnabledFlashCard,
            [ActionTypes.ASSIGNMENT]: isEnableAssignment,
            [ActionTypes.EXAM_LO]: isEnableExamLO,
            [ActionTypes.OFFLINE_STUDY]: isEnableOfflineStudy,
            [ActionTypes.TASK_ASSIGNMENT]: isEnableTaskAssignment,
        };
    }, [
        isEnabledFlashCard,
        isEnableAssignment,
        isEnableExamLO,
        isEnableOfflineStudy,
        isEnableTaskAssignment,
    ]);

    return {
        configKeys,
    };
};

export default useTopicControl;
