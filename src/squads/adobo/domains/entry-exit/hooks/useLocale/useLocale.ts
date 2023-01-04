import { useTranslationContext } from "src/squads/adobo/domains/entry-exit/contexts/TranslationContext";

function useLocale(): string {
    const { locale } = useTranslationContext();
    return locale;
}

export default useLocale;
