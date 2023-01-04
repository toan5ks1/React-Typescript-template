import { useTranslationContext } from "src/squads/timesheet/contexts/TranslationContext";

function useLocale(): string {
    const { locale } = useTranslationContext();
    return locale;
}

export default useLocale;
