import { KeyQuestionTypes } from "src/squads/communication/common/constants/const";
import {
    QuestionFormValue,
    QuestionnaireQuestion,
    QuestionnaireQuestionType,
} from "src/squads/communication/common/constants/types";
import { getAlphabetArray } from "src/squads/communication/common/utils/other";
import { Communication_GetUserAnswersByQuestionIdsQuery } from "src/squads/communication/service/bob/bob-types";

import { QuestionType } from "manabuf/common/v1/notifications_pb";

import { arrayHasItem } from "@manabie-com/mana-utils";

export const checkShouldDisableRemoveAnswerButton = (
    numberOfAnswerField: number,
    minimumAnswers: number
) => numberOfAnswerField <= minimumAnswers;

export const checkShouldHideAddAnswerButton = (
    numberOfAnswerField: number,
    maximumAnswers: number
) => numberOfAnswerField >= maximumAnswers;

export const createQuestionsListFromQuestionFieldArray = (
    questionFieldArray: QuestionFormValue[]
): QuestionnaireQuestion[] =>
    questionFieldArray.reduce<QuestionnaireQuestion[]>((prevQuestion, currentQuestion) => {
        const answerList: QuestionnaireQuestion["choicesList"] =
            currentQuestion.answerFieldArrayItem.map((answer) => answer.content);

        const choiceListOnQuestionType =
            currentQuestion.questionType === "QUESTION_TYPE_FREE_TEXT" ? [] : answerList;

        const question: QuestionnaireQuestion = {
            questionnaireQuestionId: "",
            type: QuestionType[currentQuestion.questionType],
            title: currentQuestion.content,
            choicesList: choiceListOnQuestionType,
            orderIndex: currentQuestion.order || 0,
            required: currentQuestion.isRequiredQuestion,
        };

        prevQuestion.push(question);

        return prevQuestion;
    }, []);

export const isShortAnswerTypeQuestion = (currentQuestionType: QuestionnaireQuestionType) =>
    currentQuestionType === KeyQuestionTypes.QUESTION_TYPE_FREE_TEXT;

export const getQuestionnaireQuestionNameByIndex = (questionIndex: number) =>
    `questionFieldArrayItem.${questionIndex}`;

export const calculateQuestionnaireResultPercentage = (
    numberOfElement: number,
    totalOfElement: number,
    fractionDigits: number = 2
) => {
    if (totalOfElement === 0) return "";
    if (numberOfElement / totalOfElement === 1) {
        return "100%";
    }
    return `${((numberOfElement / totalOfElement) * 100).toFixed(fractionDigits)}%`;
};

export const getNumberResponderOfQuestion = (
    answers:
        | Communication_GetUserAnswersByQuestionIdsQuery["questionnaire_user_answers"]
        | undefined
) => {
    if (!answers || !arrayHasItem(answers)) return 0;
    return new Set(answers.map((answer) => answer.target_id)).size;
};

export const getAnswerItemContent = (
    answerIndex: number,
    answer: string,
    numberOfVotesLabel: string
) => {
    return `${getAlphabetArray("uppercase")[answerIndex]}. ${answer} (${numberOfVotesLabel})`;
};
