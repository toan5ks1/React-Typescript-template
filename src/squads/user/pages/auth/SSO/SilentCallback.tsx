import { useEffect, useState } from "react";

import { handleUnknownError } from "src/common/utils/error";
import authManager from "src/internals/auth-manager";

import SSOLayout from "src/squads/user/components/Layout/SSOLayout";

import i18nProvider from "src/squads/user/i18n";

const SilentCallback = () => {
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        void (async function () {
            try {
                await authManager.getInstance().signinSilentCallback();

                if (!(await authManager.isAuthenticated(true))) {
                    throw new Error("Cannot get token");
                }

                // using location.href for fresh data
                window.location.assign("/");
            } catch (err) {
                const error = handleUnknownError(err);
                window.warner?.warn(error);
                setError(error);
            }
        })();
    }, []);

    return (
        <SSOLayout loading={!error} error={Boolean(error)}>
            {error
                ? i18nProvider.translate("ra.manabie-error.cannotIdentifyYourCredentials")
                : i18nProvider.translate("ra.auth.checkingProfile")}
        </SSOLayout>
    );
};

export default SilentCallback;
