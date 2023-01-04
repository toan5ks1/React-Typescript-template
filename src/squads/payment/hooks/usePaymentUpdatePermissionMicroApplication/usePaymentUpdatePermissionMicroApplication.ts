import { useEffect, useState } from "react";

import usePaymentPermission from "src/squads/payment/hooks/usePaymentPermission";

function usePaymentUpdatePermissionMicroApplication() {
    const { permission } = usePaymentPermission();
    const [initialize, setInitialize] = useState(false);
    // TODO: because we cannot share ReactiveStorage object. so temporary using localStorage here until we can moving to window.addEventListener('storage')
    // https://manabie.atlassian.net/wiki/spaces/TECH/pages/420841477/Micro+front-ends+Knowledge+P2#2.-Authentication-%26-Authorization
    const profile = localStorage.getItem("manabie_PROFILE");

    useEffect(() => {
        if (profile) {
            (async () => {
                try {
                    await permission.update(JSON.parse(profile).userGroup);
                } catch (err) {
                    window.warner?.error(
                        "usePaymentUpdatePermissionMicroApplication",
                        profile,
                        err
                    );
                    //TODO: handle err after update EventEmitter
                }
            })();
        }
    }, [permission, profile]);

    useEffect(() => {
        setInitialize(!!permission.currentRoles.length);
    }, [permission.currentRoles.length]);

    return initialize;
}

export default usePaymentUpdatePermissionMicroApplication;
