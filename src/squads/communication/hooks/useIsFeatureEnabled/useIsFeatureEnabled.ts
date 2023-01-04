import { useCallback } from "react";

import FeatureController from "src/packages/feature-controller";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { AppPermission } from "src/squads/communication/internals/permission";
import { PermissionTypes } from "src/squads/communication/typings/permission-types";

import useStandaloneFeatureToggle from "src/squads/communication/hooks/useStandaloneFeatureToggle";

const useIsFeatureEnabled = (
    featureControllerUnleash: FeatureController<Features>,
    permission: AppPermission
) => {
    const { featureIsEnable: isEnableFeatureFlag } =
        useStandaloneFeatureToggle(featureControllerUnleash);

    const enableOnRoleBasedPermission = useCallback(
        (permissionConfigs: PermissionTypes["permissionConfigs"]) => {
            // if do not pass permission configuration that mean by default that will be enable for all roles
            if (!permissionConfigs) return true;

            const { subject, action } = permissionConfigs;
            return permission.can(subject, action);
        },
        [permission]
    );
    const enableOnFeatureFlag = useCallback(
        (featureConfigs: PermissionTypes["featureConfigs"]) => {
            // if do not pass feature configuration that mean by default that will be enable for all envs
            if (!featureConfigs) return true;

            return isEnableFeatureFlag(featureConfigs?.feature);
        },
        [isEnableFeatureFlag]
    );

    const isFeatureEnable = useCallback(
        (props: PermissionTypes) => {
            const { permissionConfigs, featureConfigs } = props;

            return (
                enableOnRoleBasedPermission(permissionConfigs) &&
                enableOnFeatureFlag(featureConfigs)
            );
        },
        [enableOnFeatureFlag, enableOnRoleBasedPermission]
    );

    return isFeatureEnable;
};

export default useIsFeatureEnabled;
