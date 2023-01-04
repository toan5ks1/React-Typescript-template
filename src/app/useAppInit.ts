import { useCallback, useEffect, useMemo, useState } from "react";

import { unstable_batchedUpdates } from "react-dom";
import appConfigs from "src/internals/configuration";
import reactiveStorage from "src/internals/reactive-storage";
import Configuration from "src/packages/configuration";
import { EnvKeys, EnvKeysForUnleash, PjOwner } from "src/typings/configuration";

import { IAppResource } from "../models/resource";
import useFeatureController from "./useFeatureController";

import useAppPermission from "src/app/useAppPermission";

// This is based on our BE configuration in unleash yaml file
export const convertEnvKeysToUnleashEnvKeys = (envKey: EnvKeys): EnvKeysForUnleash => {
    switch (envKey) {
        case EnvKeys.DEVELOPMENT:
            return EnvKeysForUnleash.STAGING;
        case EnvKeys.STAGING:
            return EnvKeysForUnleash.STAGING;
        case EnvKeys.UAT:
            return EnvKeysForUnleash.UAT;
        case EnvKeys.PREPRODUCTION:
            return EnvKeysForUnleash.PRODUCTION;
        case EnvKeys.PRODUCTION:
            return EnvKeysForUnleash.PRODUCTION;
        default:
            // If no config exist or maybe we make some typos, I think it's safest to assume that it's prod
            return EnvKeysForUnleash.PRODUCTION;
    }
};

function useAppInit(modules: IAppResource[]) {
    const { permission } = useAppPermission();
    const { featureController } = useFeatureController();

    const owner = appConfigs.getCurrentPjOwner();
    const env = Configuration.getDefaultEnv();

    const [ready, setReady] = useState(false);
    const [modulesToDisplay, setModulesToDisplay] = useState<IAppResource[]>([]);

    const updateEnabledModules = useCallback(
        (callback?: () => void) => {
            const enabledModulesOnFirebaseConfig = modules.filter((module) => {
                if (module.isDisableJPREP && owner === PjOwner.JPREP) {
                    return false;
                }
                return featureController.isFeatureEnabled(module.feature);
            });
            unstable_batchedUpdates(() => {
                setModulesToDisplay(enabledModulesOnFirebaseConfig);
                if (typeof callback === "function") {
                    callback();
                }
            });
        },
        [featureController, modules, owner]
    );

    const profile = reactiveStorage.get("PROFILE");

    const initParams = useMemo(
        () => ({
            userId: profile?.id,
            schoolId: profile?.schoolId?.toString(),
            env: convertEnvKeysToUnleashEnvKeys(appConfigs.getCurrentEnv()),
            variant: env.pjOwner,
        }),
        [profile?.id, profile?.schoolId, env.pjOwner]
    );

    useEffect(() => {
        if (!modules.length) return; // This usually mean that we haven't get basic profile yet

        let mounted = true;

        Promise.all([featureController.init(initParams)])
            .then(() => {
                if (!mounted || !permission.getInstance().rules.length) {
                    return;
                }

                updateEnabledModules(() => {
                    setReady(true);
                });
            })
            .catch((err) => {
                window.warner?.warn("Cannot initialize remote config", err);
                // TODO: notify user about this error
                setReady(true);
            });

        return () => {
            mounted = false;
            featureController.unsubscribe();
        };
    }, [modules, initParams, permission, featureController, updateEnabledModules]);

    useEffect(() => {
        if (!modules.length) return; // This usually mean that we haven't get basic profile yet

        featureController.subscribeToRemoteChanges(() => {
            updateEnabledModules();
        });
        // I don't think we need to handle clean up because this hook never unmounts
        // And to be honest I don't know how to clean up our remote configs subscribers yet
    }, [featureController, modules.length, updateEnabledModules]);
    return { modules: modulesToDisplay, ready };
}

export default useAppInit;
