import { useCallback } from "react";

import { PermissionAndFeatureConfig } from "./routings";

import useFeatureController from "src/app/useFeatureController";
import useSyllabusPermission from "src/squads/syllabus/hooks/useSyllabusPermission";

const useCheckFeatureAndPermissionFlag = () => {
    const { permission } = useSyllabusPermission();
    const { featureController } = useFeatureController();

    const checkFeatureAndPermissionFlag = useCallback(
        (props: PermissionAndFeatureConfig) => {
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
                featureFlagPassed = featureController.isFeatureEnabled(featureConfigs?.feature);
            }

            if (shouldCheckPermission && shouldCheckFeatureFlag) {
                return permissionPassed && featureFlagPassed;
            }

            if (shouldCheckFeatureFlag) return featureFlagPassed;

            return permissionPassed;
        },
        [permission, featureController]
    );

    return checkFeatureAndPermissionFlag;
};

export default useCheckFeatureAndPermissionFlag;
