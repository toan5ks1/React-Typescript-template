import { useEffect, useState } from "react";

import { Features } from "src/common/constants/enum";

import useFeatureController from "src/app/useFeatureController";

// If a feature toggle name is undefined, we think of it as no longer need a remote feature toggle.
// That feature will always show on all envs.
type ReleasedFeaturesToggleNameType = undefined;
// This is used when we have multiple modules.map() but only some of them have featureToggleName while the others don't have it
// because they have been fully released to production
// When a feature is fully released to production. We should not have feature toggle for it anymore
// This follows https://trunkbaseddevelopment.com which is what is recommended by the guy that work with Unleash on the video linked in this post:
// https://manabie.slack.com/archives/CJEBZ1L0M/p1638244871049800

const useFeatureToggle = (
    toggleName: Features | ReleasedFeaturesToggleNameType,
    shouldUpdateOnRemoteToggle: boolean = true
) => {
    const { featureController } = useFeatureController();

    const [isEnabled, setIsEnabled] = useState(
        toggleName ? featureController.isFeatureEnabled(toggleName) : true
    );

    useEffect(() => {
        if (!shouldUpdateOnRemoteToggle || !toggleName) return;

        featureController.subscribeToRemoteChanges(() => {
            setIsEnabled(featureController.isFeatureEnabled(toggleName));
        });
    }, [featureController, shouldUpdateOnRemoteToggle, toggleName]);

    return { isEnabled };
};

export default useFeatureToggle;
