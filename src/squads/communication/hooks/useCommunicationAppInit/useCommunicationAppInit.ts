import { useCallback, useState } from "react";

import { unstable_batchedUpdates } from "react-dom";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { CommunicationRoutes } from "src/squads/communication/typings/route-types";

import useCommunicationUpdatePermissionMicroApplication from "../useCommunicationUpdatePermissionMicroApplication";

import useCommunicationPermission from "src/squads/communication/hooks/useCommunicationPermission";
import useFeatureController from "src/squads/communication/hooks/useFeatureController";
import useInitUnleashParams from "src/squads/communication/hooks/useInitUnleashParams";
import useIsFeatureEnabled from "src/squads/communication/hooks/useIsFeatureEnabled";
import useSubscribeUnleashServer from "src/squads/communication/hooks/useSubscribeUnleashServer";

function useCommunicationAppInit(rawRoutes: CommunicationRoutes[]) {
    useCommunicationUpdatePermissionMicroApplication(); //to enable permission in communication
    const { permission } = useCommunicationPermission();
    const { featureController } = useFeatureController();

    const [ready, setReady] = useState(false);
    const [routes, setRoutes] = useState<CommunicationRoutes[]>([]);

    const isFeatureEnabled = useIsFeatureEnabled(featureController, permission);

    const onReady = useCallback(() => {
        setReady(true);
    }, []);

    const updateEnabledModules = useCallback(() => {
        const enableRoutes = rawRoutes.filter(isFeatureEnabled);

        unstable_batchedUpdates(() => {
            setRoutes(enableRoutes);
            onReady();
        });
    }, [isFeatureEnabled, onReady, rawRoutes]);

    const initParams = useInitUnleashParams<Features>();

    useSubscribeUnleashServer({
        callback: updateEnabledModules,
        onError: onReady,
        featureController,
        permissionRules: permission.getInstance().rules, //CommunicationRules
        initParams,
    });

    return { ready, routes };
}

export default useCommunicationAppInit;
