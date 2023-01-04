import { useEffect, useState } from "react";

import reactiveStorage from "src/squads/timesheet/internals/reactive-storage";
import { UserIdentity } from "src/squads/timesheet/typings/auth-provider";

function useGetLocalProfile() {
    const [userProfile, setUserProfile] = useState<UserIdentity | null>(null);

    useEffect(() => {
        const unregister = reactiveStorage.registerListener(
            "PROFILE",
            (newVal) => {
                if (newVal) {
                    setUserProfile(newVal);
                }
            },
            { run1st: true }
        );

        return () => {
            if (typeof unregister === "function") {
                unregister();
            }
        };
    }, []);

    return { userProfile };
}

export default useGetLocalProfile;
