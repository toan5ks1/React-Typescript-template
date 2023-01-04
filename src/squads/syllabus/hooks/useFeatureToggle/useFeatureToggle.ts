import { useEffect, useState } from "react";

import { Features } from "src/common/constants/enum";

import useFeatureController from "src/squads/syllabus/hooks/useFeatureController";

const useFeatureToggle = (toggleName: Features, shouldSubscribe: boolean = true) => {
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
