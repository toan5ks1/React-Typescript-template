import { useCallback, useState } from "react";

import { useSelector } from "react-redux";
import { ArrayElement } from "src/common/constants/types";
import { FirebaseError } from "src/common/utils/error";
import { initNewConfigWithOrganization } from "src/internals/configuration/dynamic-config";
import { getTenantConfigNameFromTenantID } from "src/internals/configuration/utils";
import reactiveStorage, {
    OrganizationProperties,
} from "src/squads/user/internals/reactive-storage";
import { Users_OrganizationsManyReferenceQuery } from "src/squads/user/service/bob/bob-types";
import { RootState } from "src/squads/user/stores/store-types";
import { LoginCredential } from "src/squads/user/typings/auth-provider";
import { PjOwner } from "src/squads/user/typings/configuration";

import useAuthProvider from "./useAuthProvider";

import useGetTenantId from "src/squads/user/hooks/useGetTenantId";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useSubRedirect from "src/squads/user/hooks/useSubRedirect";
import useTranslate from "src/squads/user/hooks/useTranslate";

function getLoginError(error: Error | FirebaseError | string): string {
    if (typeof error === "string") {
        return error;
    }

    if (typeof error === "undefined" || !error.message) {
        return "ra.auth.sign_in_error"; //default message
    }

    return error.message;
}

export default function useLogin(): {
    onLogin: (values: LoginCredential) => Promise<void>;
    loading: boolean;
} {
    const authProvider = useAuthProvider();
    const { navigateToRedirectUrl, currentSearchParams } = useSubRedirect();
    const { getTenantIdByTenantName } = useGetTenantId();
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const [loading, setLoading] = useState<boolean>(false);
    const redirectAfterLogin = useSelector((state: RootState) => state.app.redirectAfterLogin);

    const onLogin = useCallback(
        async ({ username, password, tenantName }: LoginCredential) => {
            setLoading(true);
            let tenantId: ArrayElement<
                Users_OrganizationsManyReferenceQuery["organizations"]
            >["tenant_id"] = "";
            let tenantConfigName: PjOwner;

            if (tenantName) {
                tenantId = await getTenantIdByTenantName(tenantName);

                if (!tenantId) {
                    setLoading(false);
                    return;
                }

                tenantConfigName = getTenantConfigNameFromTenantID(tenantId) as PjOwner;

                await initNewConfigWithOrganization(tenantConfigName);
            }

            authProvider
                .login(
                    {
                        username,
                        password,
                        tenantId,
                    },
                    { additionalQuery: currentSearchParams }
                )
                .then(() => {
                    const organizationInfo: OrganizationProperties = {
                        active_organization: tenantConfigName,
                        saved_organization: tenantName || "",
                    };

                    reactiveStorage.set("ORGANIZATION_INFO", organizationInfo);

                    navigateToRedirectUrl(redirectAfterLogin);
                })
                .catch(async (error) => {
                    reactiveStorage.clear("ORGANIZATION_INFO");

                    showSnackbar(t(getLoginError(error)), "error");

                    await initNewConfigWithOrganization();
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [
            authProvider,
            currentSearchParams,
            navigateToRedirectUrl,
            redirectAfterLogin,
            showSnackbar,
            getTenantIdByTenantName,
            t,
        ]
    );

    return { onLogin, loading };
}
