import { useEffect } from "react";

import FeatureController from "src/packages/feature-controller";
import { AppPermission } from "src/squads/communication/internals/permission";

export interface IUseSubscribeUnleashServer<T> {
    callback?: () => void;
    onError?: (err: any) => void;
    permissionRules: ReturnType<AppPermission["getInstance"]>["rules"];
    featureController: FeatureController<T>;
    initParams: Parameters<FeatureController<T>["init"]>[0];
}

//TODO: will move to react-utils package
function useSubscribeUnleashServer<T>({
    callback,
    permissionRules,
    featureController,
    initParams,
    onError,
}: IUseSubscribeUnleashServer<T>) {
    useEffect(() => {
        let mounted = true;
        const fnName = featureController.initiated ? "update" : "init";

        featureController[fnName](initParams)
            .then(() => {
                if (!mounted || !permissionRules.length) {
                    return;
                }
                callback && callback();
            })
            .catch((err) => {
                window.warner?.warn("Cannot initialize remote config", err);
                onError && onError(err);
            });

        return () => {
            mounted = false;
            featureController.unsubscribe();
        };
    }, [initParams, permissionRules, featureController, callback, onError]);

    useEffect(() => {
        if (!callback) return; // dont subscribe when callback dont exist
        featureController.subscribeToRemoteChanges(() => {
            callback();
        });

        //already call unsubscribe in above useEffect
    }, [featureController, callback]);
}
export default useSubscribeUnleashServer;
