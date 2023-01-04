import { useTranslationContext } from "src/squads/lesson/contexts/TranslationContext";

function useLocale(): string {
    const { locale } = useTranslationContext();
    return locale;
}

export default useLocale;
