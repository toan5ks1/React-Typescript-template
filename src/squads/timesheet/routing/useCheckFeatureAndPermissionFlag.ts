import { useCallback } from "react";

import appConfigs from "src/internals/configuration";
import { PjOwner } from "src/squads/timesheet/typings/configuration";

import { UseCheckFeatureAndPermissionFlagTypeVitePages } from "./routings";

import useStandaloneFeatureToggle from "src/hooks/useStandaloneFeatureToggle";
import useTimesheetPermission from "src/squads/timesheet/hooks/useTimesheetPermission";

const useCheckFeatureAndPermissionFlag = () => {
    const { permission } = useTimesheetPermission();
    const { featureIsEnable } = useStandaloneFeatureToggle();
    const owner = appConfigs.getCurrentPjOwner();

    const checkFeatureAndPermissionFlag = useCallback(
        (props: UseCheckFeatureAndPermissionFlagTypeVitePages) => {
            const { permissionConfigs, featureConfigs, isDisableJPREP } = props;

            if (isDisableJPREP && owner === PjOwner.JPREP) return false;

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
        [owner, permission, featureIsEnable]
    );

    return checkFeatureAndPermissionFlag;
};

export default useCheckFeatureAndPermissionFlag;
