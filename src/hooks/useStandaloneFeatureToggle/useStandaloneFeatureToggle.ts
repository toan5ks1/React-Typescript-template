import { useCallback } from "react";

import { Features } from "src/common/constants/enum";

import useFeatureController from "src/app/useFeatureController";

const useStandaloneFeatureToggle = () => {
    const { featureController } = useFeatureController();

    const featureIsEnable = useCallback(
        (toggleName: Features | undefined) => {
            if (!toggleName) return false;
            return featureController.isFeatureEnabled(toggleName);
        },
        [featureController]
    );

    return { featureIsEnable };
};

export default useStandaloneFeatureToggle;
