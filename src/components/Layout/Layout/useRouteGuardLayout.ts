import { useEffect } from "react";

import useUIToggleSchema from "src/hooks/useUIToggleSchema";

const useRouteGuardLayout = (fullscreen: boolean) => {
    const { setUISchema } = useUIToggleSchema();

    useEffect(() => {
        setUISchema({
            contentSpacing: !fullscreen,
            menu: !fullscreen,
            appbar: !fullscreen,
        });
    }, [setUISchema, fullscreen]);

    return;
};
export default useRouteGuardLayout;
