import { PropsWithChildren, useMemo } from "react";

import { LanguageEnums } from "../../typings/i18n-provider";

import { TranslationContext } from "src/squads/syllabus/contexts/TranslationContext";
import polyglot from "src/squads/syllabus/i18n/polyglot";

const TestTranslationProvider = ({ children }: PropsWithChildren<{}>) => {
    const value = useMemo(
        () => ({
            locale: LanguageEnums.EN,
            translate: polyglot(LanguageEnums.EN),
        }),
        []
    );

    return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

export default TestTranslationProvider;
