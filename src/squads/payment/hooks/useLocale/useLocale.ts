import { useTranslationContext } from "src/squads/payment/contexts/TranslationContext";

function useLocale(): string {
    const { locale } = useTranslationContext();
    return locale;
}

export default useLocale;
