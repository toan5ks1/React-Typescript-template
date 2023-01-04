import { useCallback } from "react";

import { UseCheckFeatureAndPermissionFlagType } from "./routings";

import useAppPermission from "src/app/useAppPermission";
import useStandaloneFeatureToggle from "src/hooks/useStandaloneFeatureToggle";

const useCheckFeatureAndPermissionFlag = () => {
    const { permission } = useAppPermission();
    const { featureIsEnable } = useStandaloneFeatureToggle();

    const checkFeatureAndPermissionFlag = useCallback(
        (props: UseCheckFeatureAndPermissionFlagType) => {
            const { permissionConfigs, featureConfigs } = props;

            const shouldCheckPermission = !!permissionConfigs;
            const shouldCheckFeatureFlag = !!featureConfigs;

            if (!shouldCheckPermission && !shouldCheckFeatureFlag) return true;

            let permissionPassed = false;
            let featureFlagPassed = false;

            if (permissionConfigs) {
                const { subject, action } = permissionConfigs;
                permissionPassed = permission.can(subject, action);
            }

            if (featureConfigs) {
                featureFlagPassed = featureIsEnable(featureConfigs?.feature);
            }

            if (shouldCheckPermission && shouldCheckFeatureFlag) {
                return permissionPassed && featureFlagPassed;
            }

            if (shouldCheckFeatureFlag) return featureFlagPassed;

            return permissionPassed;
        },
        [permission, featureIsEnable]
    );

    return checkFeatureAndPermissionFlag;
};

export default useCheckFeatureAndPermissionFlag;
