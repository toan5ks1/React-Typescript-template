import { useEffect, useState } from "react";

import { Features } from "src/common/constants/enum";
import appConfigs from "src/internals/configuration";
import Configuration from "src/packages/configuration";

import { convertEnvKeysToUnleashEnvKeys } from "src/app/useAppInit";
import useFeatureController from "src/squads/user/hooks/useFeatureController";
import useFeatureToggle from "src/squads/user/hooks/useFeatureToggle";

export type FeatureFlag = keyof typeof Features;

export function useInitializeUnleashWithoutIdentification() {
    const { featureController: featureControllerUnleash } = useFeatureController();
    const [initialized, setInitialized] = useState(false);
    const env = Configuration.getDefaultEnv();

    //TODO: remove after implement Unleash without schoolId
    useEffect(() => {
        featureControllerUnleash
            .init({
                env: convertEnvKeysToUnleashEnvKeys(appConfigs.getCurrentEnv()),
                variant: env.pjOwner,
            })
            .then(() => {
                setInitialized(true);
            })
            .catch((err) => {
                window.warner?.warn("Cannot initialize remote config", err);
                setInitialized(true);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return initialized;
}

export default function useUserFeatureToggle(featureFlag: FeatureFlag) {
    return useFeatureToggle(Features[featureFlag]).isEnabled;
}
