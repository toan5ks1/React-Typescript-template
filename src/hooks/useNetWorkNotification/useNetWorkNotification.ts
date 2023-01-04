import { useEffect } from "react";

import { useNetworkState } from "react-use";

import useShowSnackbar from "src/hooks/useShowSnackbar";
import useTranslate from "src/hooks/useTranslate";

const useNetWorkNotification = () => {
    const { online, previous } = useNetworkState();
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    useEffect(() => {
        // Prevent first load
        if (online === previous || typeof previous === "undefined") {
            return;
        }
        if (online) {
            showSnackbar(t("ra.message.youAreRestoredNetwork"));
            return;
        }
        showSnackbar(t("ra.message.youAreOffline"), "error");
    }, [previous, online, showSnackbar, t]);
};

export default useNetWorkNotification;
