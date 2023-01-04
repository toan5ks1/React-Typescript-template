import { EditorState } from "draft-js";
import produce, { Draft } from "immer";
import { isArray } from "lodash";
import { LabelTypes } from "src/common/utils/label-generator";
import { replaceText } from "src/squads/syllabus/common/utils/draft-js";
import { genId } from "src/squads/syllabus/common/utils/generator";
import {
    Answer,
    createDefaultAnswerField,
    createEmptyAnswer,
    createEmptyQuiz,
    FieldTypes,
    getDefaultAnswerAttribute,
    hasMultiCorrectAnswer,
    isQuizFIB,
    Quiz,
    regenerateAnswersLabel,
} from "src/squads/syllabus/models/quiz";

import {
    addImageBlock,
    addInlineImage,
    addInlineMathJax,
    addMathJaxBlock,
} from "src/squads/syllabus/pages/Quiz/components/WYSWYG/wyswyg-utils";

import { QuizType } from "manabie-yasuo/quiz_pb";

import { RectTypes } from "../../models/canvas";
import { createEmptyQuizState } from "../../test-utils/quiz";
import { IQuizActions, NsQuizAction, QuizActionTypes } from "./actions";
import { QuizState } from "./quiz-types";

export const initialState: QuizState = {
    ...createEmptyQuizState(),
    quizzes: [],
    lo: null,
    pdfUrl: null,
    quizOnReview: null,
    currentQuizIndex: -1,
};

function reducer(state: QuizState = initialState, action: IQuizActions): QuizState {
    return produce(state, (draft: Draft<QuizState>) => {
        const currentQuiz = draft.quizzes[draft.currentQuizIndex];

        switch (action.type) {
            case QuizActionTypes.ADD_NEW_QUIZ:
                draft.quizzes.push(createEmptyQuiz(action.payload));
                draft.currentQuizIndex = draft.quizzes.length - 1;
                break;

            case QuizActionTypes.ADD_NEW_ANSWER:
                addNewAnswer(currentQuiz, action);
                break;

            case QuizActionTypes.CHANGE_CORRECT_ANSWER:
                changeCorrectAnswer(currentQuiz, action);
                break;

            case QuizActionTypes.DELETE_ANSWER:
                if (!currentQuiz) return;

                currentQuiz.answer.list.delete(action.payload.answerId);

                regenerateAnswersLabel(
                    currentQuiz.answer.labelType,
                    currentQuiz.answer.list,
                    currentQuiz.kind
                );
                break;
            case QuizActionTypes.DELETE_GROUP_ANSWER:
                const { groupKey } = action.payload;
                deleteGroupAnswer(currentQuiz, groupKey);
                regenerateAnswersLabel(
                    currentQuiz.answer.labelType,
                    currentQuiz.answer.list,
                    currentQuiz.kind
                );
                break;
            case QuizActionTypes.CHANGE_EDITOR_STATE:
                changeEditorState(currentQuiz, action);
                break;

            case QuizActionTypes.CHANGE_QUESTION_OPTION:
                Object.entries(action.payload).forEach(([key, value]) => {
                    currentQuiz[key] = value;
                });

                break;

            case QuizActionTypes.ADD_RECT_TO_QUESTION:
                addRectToQuestion(draft, action);
                break;

            case QuizActionTypes.SET_PDF_URL:
                draft.pdfUrl = action.payload.url;
                break;

            case QuizActionTypes.SET_QUIZ_ON_REVIEW:
                draft.quizOnReview = action.payload.quiz;
                break;

            case QuizActionTypes.CLEAR_CURRENT_QUIZ:
                draft.quizzes.splice(draft.currentQuizIndex, 1);
                break;

            case QuizActionTypes.CHANGE_ANSWER_CONFIGS:
                changeAnswerConfigs(currentQuiz, action);
                break;

            case QuizActionTypes.SET_CURRENT_QUIZ:
                draft.quizzes = [action.payload.quiz];
                draft.currentQuizIndex = 0;
                break;

            case QuizActionTypes.SET_CURRENT_LO:
                draft.lo = action.payload.lo;
                break;

            case QuizActionTypes.CHANGE_LABEL_TYPE:
                changeAnswerLabelType(currentQuiz, action.payload.labelType);
                break;

            case QuizActionTypes.CHANGE_ANSWER_LABEL:
                const as = currentQuiz.answer.list.get(action.payload.answerId);

                // we only allow max 5 characters
                if (as && action.payload.value.length <= 5) {
                    as.label = action.payload.value;
                }
                break;

            case QuizActionTypes.CHANGE_ANSWER_ATTRIBUTE_CONFIGS:
                const answer = currentQuiz.answer.list.get(action.payload.answerId);

                if (answer && answer.attribute) {
                    answer.attribute.configs = action.payload.value;
                }
                break;

            case QuizActionTypes.CHANGE_QUIZ_TYPE:
                currentQuiz.kind = action.payload.quizType;
                currentQuiz.answer = createDefaultAnswerField(action.payload.quizType);

                regenerateAnswersLabel(
                    currentQuiz.answer.labelType,
                    currentQuiz.answer.list,
                    currentQuiz.kind
                );
                break;

            case QuizActionTypes.CLEAR_STATE:
                return initialState;
        }
    });
}

const blockFn: { [x in RectTypes]: (ed: EditorState, data: string) => EditorState } = {
    [RectTypes.TEXT]: replaceText,
    [RectTypes.IMAGE]: addImageBlock,
    [RectTypes.TEX]: addMathJaxBlock,
    [RectTypes.INLINE_IMAGE]: addInlineImage,
    [RectTypes.INLINE_TEX]: addInlineMathJax,
};

function addRectToQuestion(draft: Draft<QuizState>, action: NsQuizAction.AddRectToQuestion) {
    let op = blockFn[action.payload.rect.rectType] || replaceText;
    const currentQuiz = draft.quizzes[draft.currentQuizIndex];

    if (!currentQuiz) return;

    switch (action.payload.fieldType) {
        case FieldTypes.QUESTION:
            const { question } = currentQuiz;

            if (action.payload.rect.data) {
                question.content = op(question.content, action.payload.rect.data);
                question.rects.push(action.payload.rect);
            }

            break;

        case FieldTypes.ANSWER:
            const { answer } = currentQuiz;

            if (action.payload.answerId) {
                const answerOfId = answer.list.get(action.payload.answerId);

                if (answerOfId && action.payload.rect.data) {
                    answerOfId.content = op(answerOfId.content, action.payload.rect.data);
                    answerOfId.rects = [...answerOfId.rects, action.payload.rect];
                }
            }

            break;

        case FieldTypes.EXPLANATION:
            const { explanation } = currentQuiz;
            if (action.payload.rect.data) {
                explanation.content = op(explanation.content, action.payload.rect.data);
            }

            explanation.rects.push(action.payload.rect);
            break;
    }
}

function deleteGroupAnswer(currentQuiz: Quiz, groupKey: string) {
    currentQuiz.answer.list.forEach((answer) => {
        if (answer.groupKey === groupKey) currentQuiz.answer.list.delete(answer.id);
    });
}

function changeAnswerConfigs(currentQuiz: Quiz, action: NsQuizAction.ChangeAnswerConfigs) {
    const { configs: configsPayload } = action.payload;

    if (isArray(configsPayload)) {
        currentQuiz.answer.configs = configsPayload;
        return;
    }

    const index = currentQuiz.answer.configs.indexOf(configsPayload);
    // toggle element in the array
    if (index === -1) return currentQuiz.answer.configs.push(configsPayload);

    currentQuiz.answer.configs.splice(index, 1);
}

function addNewAnswer(currentQuiz: Quiz, action: NsQuizAction.AddNewAnswer) {
    // TODO: Re-check to make sure we need to send payload with answer param
    if (action.payload.answer) {
        currentQuiz.answer.list.set(action.payload.answer.id, action.payload.answer);
        return;
    }

    let groupKey = genId();
    let attribute = getDefaultAnswerAttribute();

    if (isQuizFIB(currentQuiz.kind)) {
        if (action.payload.groupKey) {
            groupKey = action.payload.groupKey;
        }
        if (action.payload.answerAttributeConfigs) {
            attribute.configs = action.payload.answerAttributeConfigs;
        }
    }

    //create a new one if payload is not exist
    const newAnswerId = genId();
    const correct =
        currentQuiz.answer.list.size === 0 || currentQuiz.kind === QuizType.QUIZ_TYPE_FIB;
    currentQuiz.answer.list.set(
        newAnswerId,
        createEmptyAnswer(newAnswerId, correct, groupKey, attribute)
    );

    regenerateAnswersLabel(currentQuiz.answer.labelType, currentQuiz.answer.list, currentQuiz.kind);
}

const setCorrectAnswer = (currentQuiz: Quiz, answerId: string, correct: boolean = true) => {
    currentQuiz.answer.list.set(answerId, {
        ...currentQuiz.answer.list.get(answerId),
        correct,
    } as Answer);
};

function changeCorrectAnswer(currentQuiz: Quiz, action: NsQuizAction.ChangeCorrectAnswer) {
    const { answerId, correct } = action.payload;
    if (hasMultiCorrectAnswer(currentQuiz.kind)) {
        setCorrectAnswer(currentQuiz, answerId, correct);
        return;
    }

    //set all answer to false before set one to true because one answer is correct
    currentQuiz.answer.list.forEach((value) => {
        value.correct = false;
    });

    setCorrectAnswer(currentQuiz, answerId);
}

function changeEditorState(currentQuiz: Quiz, action: NsQuizAction.ChangeEditorState) {
    const { newEditorState, optionType, answerId } = action.payload;

    switch (optionType) {
        case FieldTypes.QUESTION:
            currentQuiz.question.content = newEditorState;
            return;

        case FieldTypes.EXPLANATION:
            currentQuiz.explanation.content = newEditorState;
            return;

        case FieldTypes.ANSWER:
            const answerOfId = currentQuiz.answer.list.get(answerId as string); //in answer case, answerId is a must
            if (!answerOfId) return;

            answerOfId.content = newEditorState;
    }
}

function changeAnswerLabelType(quiz: Draft<Quiz>, labelType: Quiz["answer"]["labelType"]) {
    quiz.answer.labelType = labelType;
    const customLabelType: Quiz["answer"]["labelType"] =
        labelType === LabelTypes.CUSTOM ? null : labelType;

    regenerateAnswersLabel(customLabelType, quiz.answer.list, quiz.kind);
}

export default reducer;
