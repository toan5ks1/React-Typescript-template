import { useCallback } from "react";

import FeatureController from "src/packages/feature-controller";
import { Features } from "src/squads/communication/common/constants/feature-keys";

const useStandaloneFeatureToggle = (featureControllerUnleash: FeatureController<Features>) => {
    const featureIsEnable = useCallback(
        (toggleName: Features | undefined) => {
            if (!toggleName) return false;

            return featureControllerUnleash.isFeatureEnabled(toggleName);
        },
        [featureControllerUnleash]
    );

    return { featureIsEnable };
};

export default useStandaloneFeatureToggle;
