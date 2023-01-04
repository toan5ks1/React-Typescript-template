import { KeyQuestionTypes } from "src/squads/communication/common/constants/const";
import {
    AnswerFormValue,
    QuestionFormValue,
    Questionnaire,
    QuestionnaireQuestion,
} from "src/squads/communication/common/constants/types";
import { createQuestionsListFromQuestionFieldArray } from "src/squads/communication/common/utils/questionnaire-utils";
import { addAlphabetToArrayString } from "src/squads/communication/common/utils/utils";

import { GetAnswersByFilterResponse } from "manabuf/bob/v1/notifications_pb";
import { QuestionType } from "manabuf/common/v1/notifications_pb";

export function createMockQuestionAnswerItems({ numberOfQuestions = 1, numberOfAnswer = 10 }) {
    return [...Array(numberOfQuestions)].map<QuestionFormValue>((_, index) => {
        const questionIndex = index + 1;

        return {
            questionType: KeyQuestionTypes.QUESTION_TYPE_MULTIPLE_CHOICE,
            isRequiredQuestion: false,
            content: `Question ${questionIndex}`,
            answerFieldArrayItem: [...Array(numberOfAnswer)].map<AnswerFormValue>(
                (_, answerIndex) => ({
                    content: `Answer ${answerIndex + 1} of question ${questionIndex}`,
                })
            ),
        };
    });
}

export function createMockQuestionsListFormData(): QuestionnaireQuestion[] {
    const questionFieldArrayItem = createMockQuestionAnswerItems({
        numberOfQuestions: 1,
        numberOfAnswer: 2,
    });

    return createQuestionsListFromQuestionFieldArray(questionFieldArrayItem);
}

export function createMockQuestionnaireFormData(): Questionnaire {
    const questionsList = createMockQuestionsListFormData();

    return {
        questionnaireId: "",
        questionsList,
        resubmitAllowed: false,
        expirationDate: new Date("2020-01-01T00:03:00.000Z"),
    };
}

export function createQuestionsList(): GetAnswersByFilterResponse.AsObject["questionsList"] {
    return [
        {
            questionnaireQuestionId: "questionnaire_question_id_1",
            orderIndex: 0,
            title: "Question 1",
            type: QuestionType.QUESTION_TYPE_CHECK_BOX,
            required: true,
            choicesList: ["Answer 2", "Answer 1"],
        },
        {
            questionnaireQuestionId: "questionnaire_question_id_2",
            orderIndex: 1,
            title: "Question 2",
            type: QuestionType.QUESTION_TYPE_MULTIPLE_CHOICE,
            required: true,
            choicesList: ["Answer 1", "Answer 2"],
        },
        {
            questionnaireQuestionId: "questionnaire_question_id_3",
            orderIndex: 2,
            title: "Question 3",
            type: QuestionType.QUESTION_TYPE_CHECK_BOX,
            required: false,
            choicesList: ["Answer 1", "Answer 3", "Answer 2"],
        },
        {
            questionnaireQuestionId: "questionnaire_question_id_4",
            orderIndex: 3,
            title: "Question 4",
            type: QuestionType.QUESTION_TYPE_FREE_TEXT,
            required: true,
            choicesList: [],
        },
    ];
}

export function createUserAnswersList(): GetAnswersByFilterResponse.AsObject["userAnswersList"] {
    return [
        {
            answersList: [
                {
                    questionnaireQuestionId: "questionnaire_question_id_1",
                    answer: "Answer 1",
                },
                {
                    questionnaireQuestionId: "questionnaire_question_id_1",
                    answer: "Answer 2",
                },
                {
                    questionnaireQuestionId: "questionnaire_question_id_2",
                    answer: "Answer 2",
                },
                {
                    questionnaireQuestionId: "questionnaire_question_id_2",
                    answer: "Answer 1",
                },
                {
                    questionnaireQuestionId: "questionnaire_question_id_3",
                    answer: "Answer 2",
                },
                {
                    questionnaireQuestionId: "questionnaire_question_id_3",
                    answer: "Answer 1",
                },
                {
                    questionnaireQuestionId: "questionnaire_question_id_3",
                    answer: "Answer 3",
                },
                {
                    questionnaireQuestionId: "questionnaire_question_id_4",
                    answer: "Answer free text",
                },
            ],
            isParent: false,
            responderName: "Responder Name 1",
            targetName: "Target Name 1",
            targetId: "user_id_1",
            userId: "user_id_1",
            submittedAt: {
                nanos: 791672000,
                seconds: 1652954840,
            },
        },
        {
            answersList: [
                {
                    questionnaireQuestionId: "questionnaire_question_id_1",
                    answer: "Answer 1",
                },
                {
                    questionnaireQuestionId: "questionnaire_question_id_2",
                    answer: "Answer 2",
                },
                {
                    questionnaireQuestionId: "questionnaire_question_id_3",
                    answer: "Answer 3",
                },
                {
                    questionnaireQuestionId: "questionnaire_question_id_4",
                    answer: "Answer free",
                },
            ],
            isParent: true,
            responderName: "Responder Name 2",
            targetName: "Target Name 2",
            targetId: "user_id_2",
            userId: "user_id_2",
            submittedAt: {
                nanos: 791672000,
                seconds: 1652954840,
            },
        },
    ];
}

export function createMockQuestionnaireUserAnswer(): GetAnswersByFilterResponse.AsObject {
    return {
        questionsList: createQuestionsList(),
        userAnswersList: createUserAnswersList(),
        totalItems: createUserAnswersList().length,
        nextPage: {
            limit: 10,
            offsetInteger: 1,
            offsetString: "0",
        },
        previousPage: {
            limit: 10,
            offsetInteger: 0,
            offsetString: "0",
        },
    };
}

export function createListAnswers(): QuestionnaireQuestion["choicesList"] {
    return addAlphabetToArrayString([
        "answer 1",
        "answer 2",
        "answer 3",
        "answer 4",
        "answer 5",
        "answer 6",
        "answer 7",
    ]);
}
