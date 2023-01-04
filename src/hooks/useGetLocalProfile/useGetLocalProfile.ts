import { useEffect, useState } from "react";

import { UserIdentity } from "src/typings/auth-provider";

import reactiveStorage from "../../internals/reactive-storage";

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
