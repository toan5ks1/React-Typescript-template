import { useCallback } from "react";

import { ERPModules } from "src/common/constants/enum";
import {
    DynamicAutocompleteOptionInConfig,
    DynamicAutocompleteOptionProps,
    DynamicFormFieldLabel,
} from "src/squads/lesson/common/types";

import useLocale from "src/squads/lesson/hooks/useLocale";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export interface UseDynamicFieldLabelReturn {
    getDynamicFieldLabel: (label?: DynamicFormFieldLabel) => string;
    convertToAutocompleteOptionProps: (
        option: DynamicAutocompleteOptionInConfig
    ) => DynamicAutocompleteOptionProps;
}

const useDynamicFieldLabel = (): UseDynamicFieldLabelReturn => {
    const currentLanguage = useLocale();

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const getDynamicFieldLabel = useCallback(
        (label?: DynamicFormFieldLabel): string => {
            if (label) {
                const fallbackLabel = label.i18n.translations[label.i18n.fallback_language];

                if (currentLanguage) {
                    const translatedLabel = label.i18n.translations[currentLanguage];

                    return (
                        translatedLabel || fallbackLabel || tLessonManagement("missingTranslation")
                    );
                }
            }

            return tLessonManagement("missingTranslation");
        },
        [currentLanguage, tLessonManagement]
    );

    const convertToAutocompleteOptionProps = useCallback(
        (option: DynamicAutocompleteOptionInConfig): DynamicAutocompleteOptionProps => ({
            key: option.key,
            label: getDynamicFieldLabel(option.label),
        }),
        [getDynamicFieldLabel]
    );

    return {
        getDynamicFieldLabel,
        convertToAutocompleteOptionProps,
    };
};

export default useDynamicFieldLabel;
