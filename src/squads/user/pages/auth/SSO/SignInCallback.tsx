import { useEffect } from "react";

import { handleUnknownError } from "src/common/utils/error";
import authManager from "src/internals/auth-manager";
import { AppError } from "src/internals/errors";
import { ProviderTypes } from "src/packages/abstract-auth";

import SSOLayout from "src/squads/user/components/Layout/SSOLayout";

import useSafeState from "src/squads/user/hooks/useSafeState";
import useSubRedirect from "src/squads/user/hooks/useSubRedirect";
import i18nProvider from "src/squads/user/i18n";

const SignInCallback = () => {
    const [error, setError] = useSafeState<Error | null>(null);
    const { navigateToRedirectUrl } = useSubRedirect();

    useEffect(() => {
        if (authManager.getType() !== ProviderTypes.oidc) {
            return;
        }

        (async function () {
            try {
                await authManager.getInstance().signinRedirectCallback();

                if (!(await authManager.isAuthenticated(true))) {
                    throw new AppError("Cannot get token");
                }

                navigateToRedirectUrl("/");
            } catch (err) {
                const error = handleUnknownError(err);
                window.warner?.warn(error);
                setError(error);
            }
        })();
    }, [navigateToRedirectUrl, setError]);

    const handleGoBack = async () => {
        try {
            await authManager.signOut();
        } catch (err) {
            const error = handleUnknownError(err);
            window.warner?.warn(error);
        }
    };

    return (
        <SSOLayout loading={!error} error={Boolean(error)} onBack={handleGoBack}>
            {error
                ? i18nProvider.translate("ra.manabie-error.cannotIdentifyYourCredentials")
                : i18nProvider.translate("ra.auth.checkingProfile")}
        </SSOLayout>
    );
};

export default SignInCallback;
