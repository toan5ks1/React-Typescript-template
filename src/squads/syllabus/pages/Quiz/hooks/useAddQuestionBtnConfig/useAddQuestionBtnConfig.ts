import { useMemo } from "react";

import {
    Quiz,
    isFlashCardQuiz,
    QuizType,
    isQuizFIB,
    isQuizMCQ,
    isQuizMAQ,
} from "src/squads/syllabus/models/quiz";

export interface UseAddQuestionBtnConfig {
    readOnly?: boolean;
    quizType: Quiz["kind"];
    totalAnswer: number;
}

export interface UseAddQuestionBtnConfigValue {
    shouldVisible: boolean;
    disabled: boolean;
}

const useAddQuestionBtnConfig = (params: UseAddQuestionBtnConfig): UseAddQuestionBtnConfigValue => {
    const { readOnly, quizType, totalAnswer } = params;
    const shouldVisible = useMemo(() => {
        if (isQuizFIB(quizType)) return true;

        if (quizType == QuizType.QUIZ_TYPE_MIQ) return false;

        return !readOnly && !isFlashCardQuiz(quizType);
    }, [quizType, readOnly]);

    const disabled = useMemo(() => {
        // For multiple choice || multiple answer maximum answer is 20
        if (isQuizMCQ(quizType) || isQuizMAQ(quizType)) return totalAnswer >= 20;
        return false;
    }, [quizType, totalAnswer]);

    return {
        disabled,
        shouldVisible,
    };
};

export default useAddQuestionBtnConfig;
