import { useCallback, useMemo, Children, ReactNode } from "react";

import { Settings } from "luxon";
import reactiveStorage from "src/internals/reactive-storage";

import { TranslationContext } from "../../contexts/TranslationContext";

import useSafeSetState from "src/hooks/useSafeState";
import i18nProvider from "src/i18n";
import polyglot from "src/i18n/polyglot";
import { I18nProvider, LanguageEnums } from "src/typings/i18n-provider";

export interface TranslationProviderProps {
    locale?: LanguageEnums;
    children: ReactNode;
}

interface State {
    locale: LanguageEnums; // this time it's required
    i18nProvider: I18nProvider;
}

const TranslationProvider = (props: TranslationProviderProps) => {
    const { children } = props;

    const [state, setState] = useSafeSetState<State>({
        locale: i18nProvider ? i18nProvider.getLocale() : LanguageEnums.EN,
        i18nProvider,
    });

    Settings.defaultLocale = props.locale || state.locale;

    const setLocale = useCallback(
        (newLocale: LanguageEnums) => {
            Settings.defaultLocale = newLocale;
            return setState(
                () => (
                    reactiveStorage.set("LANG", newLocale),
                    { i18nProvider: polyglot(), locale: newLocale }
                )
            );
        },
        [setState]
    );

    // Allow locale modification by including setLocale in the context
    // This can't be done in the initial state because setState doesn't exist yet
    const value = useMemo(
        () => ({
            ...state,
            setLocale,
        }),
        [setLocale, state]
    );

    return (
        <TranslationContext.Provider value={value}>
            {Children.only(children)}
        </TranslationContext.Provider>
    );
};

export default TranslationProvider;
export { i18nProvider };
