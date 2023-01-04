import { useMemo } from "react";

import { rawRoutes } from "./routings";
import useCheckFeatureAndPermissionFlag from "./useCheckFeatureAndPermissionFlag";

const useInitModules = () => {
    const checkFeatureAndPermissionFlag = useCheckFeatureAndPermissionFlag();

    const routes = useMemo(() => {
        return rawRoutes.filter((route) => {
            const isEnabled = checkFeatureAndPermissionFlag(route);

            if (!isEnabled) {
                return;
            }

            return route;
        });
    }, [checkFeatureAndPermissionFlag]);

    return {
        routes,
    };
};

export default useInitModules;
