import { createContext, useContext } from "react";

import { I18nProvider, LanguageEnums } from "src/squads/architecture/typings/i18n-provider";

export interface TranslationContextProps {
    locale: LanguageEnums;
    setLocale: (locale: LanguageEnums) => void;
    i18nProvider: I18nProvider;
}

const TranslationContext = createContext<TranslationContextProps>({
    locale: LanguageEnums.EN,
    setLocale: () => {},
    i18nProvider: {
        translate: (x) => x,
        changeLocale: () => Promise.resolve(),
        getLocale: () => LanguageEnums.EN,
    },
});

TranslationContext.displayName = "TranslationContext";

const useTranslationContext = () => useContext(TranslationContext);
export { TranslationContext, useTranslationContext };
