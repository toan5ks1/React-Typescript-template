import { useMemo } from "react";

import { Redirect, Route, RouteProps } from "react-router";
import { PaymentFeaturesType } from "src/squads/payment/constants/permission";
import { PaymentRules } from "src/squads/payment/internals/permission/rules";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";
import useFeatureToggle from "src/squads/payment/hooks/useFeatureToggle";
import usePaymentPermission from "src/squads/payment/hooks/usePaymentPermission";

export type ConfigsRouterProps = {
    permissionConfigs?: {
        subject: SubjectKeys<PaymentRules>;
        action: ActionKeys<PaymentRules, SubjectKeys<PaymentRules>>;
    };
    featureConfigs?: {
        feature: PaymentFeaturesType;
    };
};
export interface RouteGuardProps extends RouteProps, ConfigsRouterProps {}

const RouteGuard = (props: RouteGuardProps) => {
    const { permissionConfigs, featureConfigs, ...routeProps } = props;
    const { permission } = usePaymentPermission();

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
