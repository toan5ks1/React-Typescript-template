import { useState } from "react";

import { isShortAnswerTypeQuestion } from "src/squads/communication/common/utils/questionnaire-utils";

import { UseQuestionnaireQuestionDetailReturn } from "src/squads/communication/pages/Notification/hooks/useQuestionnaireQuestionDetail";

export interface UseCheckExpandingQuestionnaireDetailProps {
    questionnaireQuestions: Exclude<
        UseQuestionnaireQuestionDetailReturn["questionnaireQuestions"],
        undefined
    >;
}

export interface StatusExpandQuestion {
    expanding: boolean;
    isShortAnswer: boolean;
}

export interface UseCheckExpandingQuestionnaireDetailReturn {
    listStatusQuestions: Array<StatusExpandQuestion>;
    expandEachQuestion: (index: number) => void;
    toggleViewMoreLess: () => void;
    isExpandingAll: boolean;
}

const useCheckExpandingQuestionnaireDetail = ({
    questionnaireQuestions,
}: UseCheckExpandingQuestionnaireDetailProps): UseCheckExpandingQuestionnaireDetailReturn => {
    function convertQuestionnaireQuestionsToStatusExpanding(expand = false) {
        return questionnaireQuestions.map((question) => ({
            expanding: expand,
            isShortAnswer: isShortAnswerTypeQuestion(question.type),
        }));
    }

    function setListStatusWhenExpandAll(expand = false) {
        setListStatusQuestions(convertQuestionnaireQuestionsToStatusExpanding(expand));
        setExpandingAll(expand);
    }

    const [listStatusQuestions, setListStatusQuestions] = useState<
        UseCheckExpandingQuestionnaireDetailReturn["listStatusQuestions"]
    >(convertQuestionnaireQuestionsToStatusExpanding());
    const [isExpandingAll, setExpandingAll] =
        useState<UseCheckExpandingQuestionnaireDetailReturn["isExpandingAll"]>(false);

    const expandEachQuestion = (index: number) => {
        const newListStatus = listStatusQuestions.map((statusQuestion, indexQuestion) => {
            if (index === indexQuestion)
                return {
                    ...statusQuestion,
                    expanding: !statusQuestion.expanding,
                };
            return statusQuestion;
        });
        setListStatusQuestions(newListStatus);

        const listStatusQuestionNotShortAnswer = newListStatus.filter(
            (question) => !question.isShortAnswer
        );

        const isAllOpen = listStatusQuestionNotShortAnswer.every((item) => item.expanding);
        const isAllClose = listStatusQuestionNotShortAnswer.every((item) => !item.expanding);

        if (isAllOpen) setExpandingAll(true);
        else if (isAllClose) setExpandingAll(false);
    };

    const toggleViewMoreLess = () => {
        setListStatusWhenExpandAll(!isExpandingAll);
    };

    return {
        listStatusQuestions,
        expandEachQuestion,
        toggleViewMoreLess,
        isExpandingAll,
    };
};

export default useCheckExpandingQuestionnaireDetail;
