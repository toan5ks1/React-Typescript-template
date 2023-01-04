import { createEmptyQuiz, FieldTypes } from "src/squads/syllabus/models/quiz";
import { createMockModelAnswer } from "src/squads/syllabus/test-utils/quiz";
import { createRect } from "src/squads/syllabus/test-utils/rect";

import { QuizItemAttributeConfig } from "manabuf/common/v1/contents_pb";

import { NsQuizAction, QuizActions, QuizActionTypes } from "../actions";

describe("QuizActions", () => {
    test(QuizActions.setPdfUrl.name, () => {
        const payload = { url: "TEST_URL" };

        expect(QuizActions.setPdfUrl(payload)).toEqual({
            type: QuizActionTypes.SET_PDF_URL,
            payload: payload,
        });
    });

    test(QuizActions.addNewAnswer.name, () => {
        const answer = createMockModelAnswer();
        const payload: NsQuizAction.AddNewAnswer["payload"] = {
            answer,
            groupKey: "groupKey_1",
            answerAttributeConfigs: [QuizItemAttributeConfig.LANGUAGE_CONFIG_ENG],
        };

        expect(QuizActions.addNewAnswer({ answer: payload.answer })).toEqual({
            type: QuizActionTypes.ADD_NEW_ANSWER,
            payload: { answer },
        });

        // Payload for FIB answer
        expect(
            QuizActions.addNewAnswer({
                groupKey: payload.groupKey,
                answerAttributeConfigs: payload.answerAttributeConfigs,
            })
        ).toEqual({
            type: QuizActionTypes.ADD_NEW_ANSWER,
            payload: {
                groupKey: payload.groupKey,
                answerAttributeConfigs: payload.answerAttributeConfigs,
            },
        });
    });

    test(QuizActions.addRectToQuestion.name, () => {
        const payload: NsQuizAction.AddRectToQuestion["payload"] = {
            answerId: "testId",
            fieldType: FieldTypes.QUESTION,
            rect: createRect(),
        };

        expect(QuizActions.addRectToQuestion(payload)).toEqual({
            type: QuizActionTypes.ADD_RECT_TO_QUESTION,
            payload: payload,
        });
    });

    test(QuizActions.changeCorrectAnswer.name, () => {
        const answerId = "answerId";

        expect(QuizActions.changeCorrectAnswer(answerId)).toEqual({
            type: QuizActionTypes.CHANGE_CORRECT_ANSWER,
            payload: {
                answerId: answerId,
            },
        });
    });

    test(QuizActions.changeAnswerAttributeConfigs.name, () => {
        const payload: NsQuizAction.ChangeAnswerAttributeConfigs["payload"] = {
            answerId: "answerId",
            value: [QuizItemAttributeConfig.LANGUAGE_CONFIG_ENG],
        };

        expect(QuizActions.changeAnswerAttributeConfigs(payload)).toEqual({
            type: QuizActionTypes.CHANGE_ANSWER_ATTRIBUTE_CONFIGS,
            payload,
        });
    });

    test(QuizActions.changeEditorState.name, () => {
        const payload: NsQuizAction.ChangeEditorState["payload"] = {
            answerId: "answerId",
            newEditorState: createEmptyQuiz({
                schoolId: 1,
                loId: "",
                isLo: false,
            }).question.content,
            optionType: FieldTypes.QUESTION,
        };

        expect(QuizActions.changeEditorState(payload)).toEqual({
            type: QuizActionTypes.CHANGE_EDITOR_STATE,
            payload: payload,
        });
    });

    test(QuizActions.deleteAnswer.name, () => {
        const payload: NsQuizAction.DeleteAnswer["payload"] = {
            answerId: "answerId",
        };

        expect(QuizActions.deleteAnswer(payload.answerId)).toEqual({
            type: QuizActionTypes.DELETE_ANSWER,
            payload: payload,
        });
    });

    test(QuizActions.sendOrcRequest.name, () => {
        const payload: NsQuizAction.PostORCRequest["payload"] = {
            language: "vi",
            fieldType: FieldTypes.QUESTION,
            rect: createRect(),
        };

        expect(QuizActions.sendOrcRequest(payload)).toEqual({
            type: QuizActionTypes.POST_OCR_REQUEST,
            payload: payload,
        });
    });

    test(QuizActions.setQuizOnReview.name, () => {
        const quiz = createEmptyQuiz({
            loId: "",
            schoolId: 123,
            isLo: false,
        });

        const payload: NsQuizAction.SetQuizOnReview["payload"] = {
            quiz,
        };

        expect(QuizActions.setQuizOnReview(payload.quiz)).toEqual({
            type: QuizActionTypes.SET_QUIZ_ON_REVIEW,
            payload: payload,
        });
    });
});
