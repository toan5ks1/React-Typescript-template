import { useCallback } from "react";

import { initNewConfigWithOrganization } from "src/internals/configuration/dynamic-config";
import reactiveStorage from "src/squads/user/internals/reactive-storage";
import { PjOwner } from "src/squads/user/typings/configuration";

import useAuthProvider from "./useAuthProvider";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useSubRedirect from "src/squads/user/hooks/useSubRedirect";
import useTranslate from "src/squads/user/hooks/useTranslate";

const handleAuthError = (error: unknown): Error => {
    if (typeof error === "string") return new Error(error);
    if (error instanceof Error) return error;
    return new Error("ra.auth.auth_check_error");
};

export default function useCheckAuth(isNotLogin?: boolean): {
    onCheckAuth: () => Promise<void | unknown>;
    additionalQuery: string;
} {
    const authProvider = useAuthProvider();
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const { convertCurrentUrlToSearch, currentSearchParams } = useSubRedirect();
    const additionalQuery = isNotLogin ? currentSearchParams : convertCurrentUrlToSearch();

    const onCheckAuth = useCallback(async () => {
        const organizationInfo = reactiveStorage.get("ORGANIZATION_INFO");

        try {
            const active_organization = organizationInfo?.active_organization as PjOwner;

            await initNewConfigWithOrganization(active_organization);

            await authProvider.checkAuth();
        } catch (e) {
            const saved_organization = organizationInfo?.saved_organization || "";

            reactiveStorage.set("ORGANIZATION_INFO", {
                saved_organization,
                active_organization: "",
            });

            await initNewConfigWithOrganization();

            if (isNotLogin) {
                reactiveStorage.clear();
                throw e;
            }

            const error = handleAuthError(e);
            try {
                // I use showSnackbar before function checkError
                // Because if user jprep checkAuth gets an error,
                // We need to show the error first and then delay 5s so that the user can read the error message.
                showSnackbar(t(error.message), "error");
                await authProvider.checkError(error, {
                    additionalQuery,
                });
            } finally {
                throw e;
            }
        }
    }, [authProvider, additionalQuery, showSnackbar, isNotLogin, t]);

    return { onCheckAuth, additionalQuery };
}
