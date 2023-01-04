import { useMemo } from "react";

import appConfigs from "src/internals/configuration";
import Configuration from "src/packages/configuration";
import FeatureController from "src/packages/feature-controller";
import reactiveStorage from "src/squads/communication/internals/reactive-storage";

import { convertEnvKeysToUnleashEnvKeys } from "./get-unleash-env";

export type UnleashInitParams<Features> = Parameters<FeatureController<Features>["init"]>[0];

function useInitUnleashParams<Features>() {
    const profile = reactiveStorage.get("PROFILE");
    const env = Configuration.getDefaultEnv();

    const initParams: UnleashInitParams<Features> = useMemo(
        () => ({
            userId: profile?.id,
            schoolId: profile?.schoolId?.toString(),
            env: convertEnvKeysToUnleashEnvKeys(appConfigs.getCurrentEnv()),
            variant: env.pjOwner,
        }),
        [profile?.id, profile?.schoolId, env.pjOwner]
    );
    return initParams;
}
export default useInitUnleashParams;
