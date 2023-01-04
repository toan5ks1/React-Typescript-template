import { useCallback } from "react";

import isNil from "lodash/isNil";
import { useTranslationContext } from "src/squads/syllabus/contexts/TranslationContext";

interface UseTranslateConfig {
    lowercase?: boolean;
}

export type UseTranslateParams = {
    key: string;
    options?: any;
    config?: UseTranslateConfig;
};

export type UseTranslateReturn = (
    key: UseTranslateParams["key"],
    options?: UseTranslateParams["options"],
    config?: UseTranslateParams["config"]
) => string;

function useTranslate(): UseTranslateReturn {
    const { translate: t } = useTranslationContext();

    return useCallback(
        (key, options, config) => {
            const fallback = isNil(key) ? "" : key;
            if (config?.lowercase && options && typeof options === "object") {
                Object.keys(options).forEach((key: string) => {
                    if (typeof options[key] === "string") {
                        options[key] = options[key]?.toString().toLowerCase();
                    }
                });
            }

            return t(fallback, options) || "";
        },
        [t]
    );
}

export default useTranslate;
