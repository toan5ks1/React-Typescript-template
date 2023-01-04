import { useCallback } from "react";

import { ERPModules } from "src/common/constants/enum";
import { DynamicFormFieldLabel } from "src/squads/lesson/common/types";

import useLocale from "src/squads/lesson/hooks/useLocale";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export interface UseDynamicFieldLabelLessonGroupReturn {
    getDynamicFieldLabelLessonGroup: (
        label?: DynamicFormFieldLabel,
        isInternal?: boolean
    ) => string;
}

const useDynamicFieldLabelLessonGroup = (): UseDynamicFieldLabelLessonGroupReturn => {
    const currentLanguage = useLocale();

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const tLessonReport = useResourceTranslate(ERPModules.LESSON_REPORTS);
    const getDynamicFieldLabelLessonGroup = useCallback(
        (label?: DynamicFormFieldLabel, isInternal?: boolean): string => {
            if (label) {
                const fallbackLabel = label.i18n.translations[label.i18n.fallback_language];

                if (currentLanguage) {
                    const translatedLabel = isInternal
                        ? `${label.i18n.translations[currentLanguage]} (${tLessonReport(
                              "internalOnly"
                          )})`
                        : label.i18n.translations[currentLanguage];

                    return (
                        translatedLabel || fallbackLabel || tLessonManagement("missingTranslation")
                    );
                }
            }

            return tLessonManagement("missingTranslation");
        },
        [currentLanguage, tLessonManagement, tLessonReport]
    );

    return {
        getDynamicFieldLabelLessonGroup,
    };
};

export default useDynamicFieldLabelLessonGroup;
