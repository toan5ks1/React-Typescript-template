import { createContext, useContext } from "react";

import { LanguageEnums, Translate } from "src/squads/syllabus/typings/i18n-provider";

export interface TranslationContextProps {
    locale: LanguageEnums;
    translate: Translate;
}

const TranslationContext = createContext<TranslationContextProps>({
    locale: LanguageEnums.EN,
    translate: (x) => x,
});

TranslationContext.displayName = "TranslationContext";

const useTranslationContext = () => useContext(TranslationContext);
export { TranslationContext, useTranslationContext };
