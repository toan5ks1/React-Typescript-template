import { useEffect, useState } from "react";

import reactiveStorage from "src/internals/reactive-storage";

import useAppPermission from "./useAppPermission";

function useUpdatePermissionMicroApplication() {
    const { permission } = useAppPermission();
    const [initialize, setInitialize] = useState(false);

    const profile = reactiveStorage.get("PROFILE");

    useEffect(() => {
        if (profile) {
            (async () => {
                try {
                    await permission.update(profile.userGroup);
                } catch (err) {
                    window.warner?.error("useUpdatePermissionMicroApplication", profile, err);
                    //TODO: handle err after update EventEmitter
                }
            })();
        }
    }, [permission, profile]);

    useEffect(() => {
        setInitialize(!!permission.currentRoles.length);
    }, [permission.currentRoles]);

    return initialize;
}

export default useUpdatePermissionMicroApplication;
