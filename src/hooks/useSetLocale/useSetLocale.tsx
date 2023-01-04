import { useCallback } from "react";

import useShowSnackbar from "../useShowSnackbar";

import { useTranslationContext } from "src/contexts/TranslationContext";
import useTranslate from "src/hooks/useTranslate";
import { LanguageEnums } from "src/typings/i18n-provider";

type SetLocale = (locale: LanguageEnums) => Promise<void>;

function useSetLocale(): SetLocale {
    const { setLocale, i18nProvider } = useTranslationContext();

    const snackbar = useShowSnackbar();
    const t = useTranslate();

    return useCallback(
        (newLocale: LanguageEnums) =>
            new Promise((resolve) => {
                // so we systematically return a Promise for the messages
                // i18nProvider may return a Promise for language changes,
                resolve(i18nProvider.changeLocale(newLocale));
            })
                .then(() => {
                    setLocale(newLocale);
                })
                .catch((error) => {
                    window.warner?.log("[useSetLocale]:", error);
                    snackbar(t("ra.notification.i18n_error"), "error");
                }),
        [i18nProvider, setLocale, snackbar, t]
    );
}

export default useSetLocale;
