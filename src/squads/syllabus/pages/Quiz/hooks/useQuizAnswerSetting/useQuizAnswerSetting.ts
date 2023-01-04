import { useMemo } from "react";

import {
    QuizOptionConfig,
    QuizType,
    hasAnswerSetting,
    isQuizFIB,
} from "src/squads/syllabus/models/quiz";

export interface UseQuizAnswerSettingProps {
    kind: QuizType;
}
export interface UseQuizAnswerSettingValue {
    hasSetting: boolean;
    settings: QuizOptionConfig[];
}

const useQuizAnswerSetting = ({ kind }: UseQuizAnswerSettingProps): UseQuizAnswerSettingValue => {
    const hasSetting = useMemo(() => hasAnswerSetting(kind), [kind]);

    const settings = useMemo(() => {
        if (!hasSetting) return [];
        if (isQuizFIB(kind))
            return [
                QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE,
                QuizOptionConfig.QUIZ_OPTION_CONFIG_PARTIAL_CREDIT,
            ];
        return [QuizOptionConfig.QUIZ_OPTION_CONFIG_PARTIAL_CREDIT];
    }, [hasSetting, kind]);

    return {
        hasSetting,
        settings,
    };
};

export default useQuizAnswerSetting;
