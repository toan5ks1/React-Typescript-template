import { useMemo, Children, ReactNode, useEffect, useState } from "react";

import { Settings } from "luxon";
import Configuration from "src/packages/configuration";
import reactiveStorage from "src/squads/syllabus/internals/reactive-storage";
import { PjOwner } from "src/squads/syllabus/typings/configuration";

import { TranslationContext } from "src/squads/syllabus/contexts/TranslationContext";
import polyglot from "src/squads/syllabus/i18n/polyglot";
import { LanguageEnums } from "src/squads/syllabus/typings/i18n-provider";

export interface TranslationProviderProps {
    locale?: LanguageEnums;
    children: ReactNode;
}

export const getDefaultLanguage = () => {
    const isManabie = Configuration.getDefaultEnv().pjOwner === PjOwner.MANABIE;

    const defaultLanguage = isManabie ? LanguageEnums.EN : LanguageEnums.JA;

    return defaultLanguage;
};

const TranslationProvider = (props: TranslationProviderProps) => {
    const { children } = props;

    const [locale, setLocale] = useState<LanguageEnums>(
        reactiveStorage.get("LANG") || getDefaultLanguage()
    );

    Settings.defaultLocale = props.locale || locale;

    useEffect(() => {
        const unregister = reactiveStorage.registerListener("LANG", (newVal) => {
            if (newVal && newVal !== locale) setLocale(newVal);
        });

        return () => {
            unregister?.();
        };
    }, [locale, setLocale]);

    const value = useMemo(
        () => ({
            locale,
            translate: polyglot(locale),
        }),
        [locale]
    );

    return (
        <TranslationContext.Provider value={value}>
            {Children.only(children)}
        </TranslationContext.Provider>
    );
};

export default TranslationProvider;
