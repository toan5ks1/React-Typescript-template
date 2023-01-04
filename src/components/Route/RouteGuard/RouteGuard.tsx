import { useMemo } from "react";

import { Redirect, Route, RouteProps } from "react-router";
import { Features } from "src/common/constants/enum";
import { Rules } from "src/internals/permission/rules";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";
import useAppPermission from "src/app/useAppPermission";
import useFeatureToggle from "src/hooks/useFeatureToggle";

export type ConfigsRouterProps = {
    permissionConfigs?: {
        subject: SubjectKeys<Rules>;
        action: ActionKeys<Rules, SubjectKeys<Rules>>;
    };
    featureConfigs?: {
        feature: Features;
    };
};
export interface RouteGuardProps extends RouteProps, ConfigsRouterProps {}

const RouteGuard = (props: RouteGuardProps) => {
    const { permissionConfigs, featureConfigs, ...routeProps } = props;
    const { permission } = useAppPermission();

    const { isEnabled: isFeatureEnabledOnRemoteConfig } = useFeatureToggle(
        featureConfigs?.feature,
        true
    );

    const isEnabled = useMemo(() => {
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
            featureFlagPassed = isFeatureEnabledOnRemoteConfig;
        }

        if (shouldCheckPermission && shouldCheckFeatureFlag) {
            return permissionPassed && featureFlagPassed;
        }

        if (shouldCheckFeatureFlag) return featureFlagPassed;

        return permissionPassed;
    }, [featureConfigs, permission, permissionConfigs, isFeatureEnabledOnRemoteConfig]);

    if (!isEnabled) {
        return <Redirect to="/page-not-found" />;
    }

    return <Route {...routeProps} />;
};

export default RouteGuard;
