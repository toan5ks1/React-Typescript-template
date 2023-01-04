import { useEffect, useState } from "react";

import { PaymentFeaturesType } from "src/squads/payment/constants/permission";

import useFeatureController from "src/squads/payment/hooks/useFeatureController";

const useFeatureToggle = (
    toggleName: PaymentFeaturesType | undefined,
    shouldSubscribe: boolean = true
) => {
    const { featureController: featureControllerUnleash } = useFeatureController();

    const [isEnabled, setIsEnabled] = useState(
        featureControllerUnleash.isFeatureEnabled(toggleName)
    );

    useEffect(() => {
        if (!shouldSubscribe) return;

        featureControllerUnleash.subscribeToRemoteChanges(() => {
            setIsEnabled(featureControllerUnleash.isFeatureEnabled(toggleName));
        });
    }, [featureControllerUnleash, shouldSubscribe, toggleName]);

    return { isEnabled };
};

export default useFeatureToggle;
