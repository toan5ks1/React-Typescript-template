import { useTranslationContext } from "src/contexts/TranslationContext";
import { LanguageEnums } from "src/typings/i18n-provider";

function useLocale(): LanguageEnums {
    const { locale } = useTranslationContext();
    return locale;
}

export default useLocale;
