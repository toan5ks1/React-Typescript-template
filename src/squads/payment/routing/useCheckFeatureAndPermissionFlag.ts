import { useCallback } from "react";

import { UseCheckFeatureAndPermissionFlagType } from "./routings";

// TODO: Refactor this when feature-controller gets moved into mana packs
import useStandaloneFeatureToggle from "src/hooks/useStandaloneFeatureToggle";
import usePaymentPermission from "src/squads/payment/hooks/usePaymentPermission";

const useCheckFeatureAndPermissionFlag = () => {
    const { permission } = usePaymentPermission();
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
