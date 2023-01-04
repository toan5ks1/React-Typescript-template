import { useEffect, useState } from "react";

import { handleUnknownError } from "src/common/utils/error";
import authManager from "src/internals/auth-manager";
import sanitizer from "src/internals/sanitizer";
import reactiveStorage from "src/squads/user/internals/reactive-storage";

import SSOLayout from "src/squads/user/components/Layout/SSOLayout";

import useSubRedirect from "src/squads/user/hooks/useSubRedirect";
import i18nProvider from "src/squads/user/i18n";

const SignOutCallback = () => {
    const [error, setError] = useState<Error | null>(null);
    const { currentSearchParams } = useSubRedirect();

    useEffect(() => {
        (async () => {
            try {
                await authManager.getInstance().signoutRedirectCallback();

                reactiveStorage.clear();
                // redirect to login with reserved search
                window.location.assign(`/login${sanitizer.forURL(currentSearchParams)}`);
            } catch (err) {
                const error = handleUnknownError(err);
                window.warner?.warn("SignInCallback: ", error);
                setError(error);
            }
        })();
    }, [currentSearchParams]);

    const hasError = Boolean(error);
    return (
        <SSOLayout error={hasError} loading={!hasError}>
            {error
                ? i18nProvider.translate("ra.auth.auth/cannot-sign-out")
                : i18nProvider.translate("ra.auth.signingOut")}
        </SSOLayout>
    );
};

export default SignOutCallback;
