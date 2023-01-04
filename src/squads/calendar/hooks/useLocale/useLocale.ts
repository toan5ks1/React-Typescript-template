import { useTranslationContext } from "src/squads/calendar/contexts/TranslationContext";

function useLocale(): string {
    const { locale } = useTranslationContext();
    return locale;
}

export default useLocale;
