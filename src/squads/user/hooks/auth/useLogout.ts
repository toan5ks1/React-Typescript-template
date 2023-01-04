import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { clearState } from "src/squads/user/stores/root-action";

import { LOGIN_ROUTE, LOGIN_TENANT } from "../../common/constants/routers";
import useUserFeatureToggle from "../useUserFeatureFlag";
import useAuthProvider from "./useAuthProvider";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export default function useLogout(): { onLogout: () => Promise<void> } {
    const authProvider = useAuthProvider();
    const dispatch = useDispatch();
    const history = useHistory();
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    // Use multi tenant at the main flow
    const isEnabledLoginMultiTenant = useUserFeatureToggle("USER_MULTI_TENANT_LOGIN");

    const redirectAfterLogout = `/${isEnabledLoginMultiTenant ? LOGIN_TENANT : LOGIN_ROUTE}`;

    const onLogout = useCallback(async () => {
        try {
            await authProvider.logout();
            dispatch(clearState());
            history.push(redirectAfterLogout);
        } catch (e) {
            window.warner?.log("[useLogout]", e);
            const err = handleUnknownError(e);
            showSnackbar(t(err.message), NotifyTypes.ERROR);
        }
    }, [authProvider, dispatch, history, redirectAfterLogout, showSnackbar, t]);

    return { onLogout };
}
