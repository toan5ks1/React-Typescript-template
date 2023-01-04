import { EditorState } from "draft-js";
import { Answer, CreateEmptyQuizParams, FieldTypes, Quiz } from "src/squads/syllabus/models/quiz";

import { QuizOptionConfig, QuizType } from "manabie-yasuo/quiz_pb";
import { QuizItemAttributeConfig } from "manabuf/common/v1/contents_pb";

import { Rect } from "../../models/canvas";
import { LOWithQuizSet } from "../../models/quizset-lo";

export enum QuizActionTypes {
    ADD_NEW_QUIZ = "ADD_NEW_QUIZ",
    ADD_NEW_ANSWER = "ADD_NEW_ANSWER",
    CHANGE_EDITOR_STATE = "CHANGE_EDITOR_STATE",
    CHANGE_CORRECT_ANSWER = "CHANGE_CORRECT_ANSWER",
    CHANGE_QUESTION_OPTION = "CHANGE_QUESTION_OPTION",
    CHANGE_ANSWER_LABEL = "CHANGE_ANSWER_LABEL",
    CHANGE_ANSWER_ATTRIBUTE_CONFIGS = "CHANGE_ANSWER_ATTRIBUTE_CONFIGS",
    DELETE_ANSWER = "DELETE_ANSWER",
    ADD_RECT_TO_QUESTION = "ADD_RECT_TO_QUESTION",
    SET_PDF_URL = "SET_PDF_URL",
    SET_QUIZ_ON_REVIEW = "SET_QUIZ_ON_REVIEW",
    SET_CURRENT_QUIZ = "SET_CURRENT_QUIZ",
    SET_CURRENT_LO = "SET_CURRENT_LO",
    CLEAR_CURRENT_QUIZ = "CLEAR_CURRENT_QUIZ",
    CHANGE_ANSWER_CONFIGS = "CHANGE_ANSWER_CONFIGS",
    CHANGE_QUIZ = "CHANGE_QUIZ",
    CLEAR_STATE = "CLEAR_STATE",
    CHANGE_LABEL_TYPE = "CHANGE_LABEL_TYPE",
    CHANGE_QUIZ_TYPE = "CHANGE_QUIZ_TYPE",
    DELETE_GROUP_ANSWER = "DELETE_GROUP_ANSWER",

    //request will go through saga
    POST_OCR_REQUEST = "POST_OCR_REQUEST",
    REQUEST_ADD_NEW_ANSWER = "REQUEST_ADD_NEW_ANSWER",
    POST_RECT_FIREBASE = "POST_RECT_FIREBASE",
}

export declare namespace NsQuizAction {
    interface AddNewQuiz {
        type: QuizActionTypes.ADD_NEW_QUIZ;
        payload: CreateEmptyQuizParams;
    }

    interface AddNewAnswer {
        type: QuizActionTypes.ADD_NEW_ANSWER;
        payload: {
            answer?: Answer; // TODO: Re-check to make sure we need to send payload with answer param
            groupKey?: string;
            answerAttributeConfigs?: QuizItemAttributeConfig[];
        };
    }

    interface ChangeEditorState {
        type: QuizActionTypes.CHANGE_EDITOR_STATE;
        payload: {
            optionType: FieldTypes;
            answerId?: string;
            newEditorState: EditorState;
        };
    }

    interface ChangeCorrectAnswer {
        type: QuizActionTypes.CHANGE_CORRECT_ANSWER;
        payload: {
            answerId: string;
            correct?: boolean;
        };
    }

    interface DeleteAnswer {
        type: QuizActionTypes.DELETE_ANSWER;
        payload: {
            answerId: string;
        };
    }

    interface DeleteGroupAnswer {
        type: QuizActionTypes.DELETE_GROUP_ANSWER;
        payload: {
            groupKey: string;
        };
    }

    interface ChangeQuestionOption {
        type: QuizActionTypes.CHANGE_QUESTION_OPTION;
        payload: Partial<
            {
                [K in keyof Quiz]: Quiz[K];
            }
        >;
    }

    interface AddRectToQuestion {
        type: typeof QuizActionTypes.ADD_RECT_TO_QUESTION;
        payload: {
            fieldType: FieldTypes;
            answerId?: string;
            rect: Rect;
        };
    }

    interface PostORCRequest {
        type: QuizActionTypes.POST_OCR_REQUEST;
        payload: {
            rect: Omit<Rect, "data">;
            fieldType: FieldTypes;
            answerId?: string;
            language: string | null;
        };
    }

    interface SetPdfUrl {
        type: QuizActionTypes.SET_PDF_URL;
        payload: {
            url: string | null;
        };
    }

    interface SetQuizOnReview {
        type: QuizActionTypes.SET_QUIZ_ON_REVIEW;
        payload: {
            quiz: Quiz | null;
        };
    }

    interface ChangeLabelType {
        type: QuizActionTypes.CHANGE_LABEL_TYPE;
        payload: {
            labelType: Quiz["answer"]["labelType"];
        };
    }

    interface ClearCurrentQuiz {
        type: QuizActionTypes.CLEAR_CURRENT_QUIZ;
    }

    interface ChangeAnswerConfigs {
        type: QuizActionTypes.CHANGE_ANSWER_CONFIGS;
        payload: {
            configs: QuizOptionConfig | QuizOptionConfig[];
        };
    }

    interface SetCurrentQuiz {
        type: QuizActionTypes.SET_CURRENT_QUIZ;
        payload: {
            quiz: Quiz;
        };
    }
    interface SetCurrentLO {
        type: QuizActionTypes.SET_CURRENT_LO;
        payload: {
            lo: LOWithQuizSet;
        };
    }

    interface ChangeQuiz {
        type: QuizActionTypes.CHANGE_QUIZ;
        payload: {
            quizIndex: number;
        };
    }

    interface ClearState {
        type: QuizActionTypes.CLEAR_STATE;
    }

    interface ChangeAnswerLabel {
        type: QuizActionTypes.CHANGE_ANSWER_LABEL;
        payload: {
            answerId: string;
            value: string;
        };
    }

    interface ChangeAnswerAttributeConfigs {
        type: QuizActionTypes.CHANGE_ANSWER_ATTRIBUTE_CONFIGS;
        payload: {
            answerId: string;
            value: QuizItemAttributeConfig[];
        };
    }

    interface ChangeQuizType {
        type: QuizActionTypes.CHANGE_QUIZ_TYPE;
        payload: {
            quizType: QuizType;
        };
    }

    interface RequestAddNewAnswer {
        type: QuizActionTypes.REQUEST_ADD_NEW_ANSWER;
        payload: NsQuizAction.AddNewAnswer["payload"];
    }

    interface PostRectFirebase {
        type: QuizActionTypes.POST_RECT_FIREBASE;
        payload: Rect;
    }
}

export const QuizActions = {
    addNewQuiz(params: CreateEmptyQuizParams): NsQuizAction.AddNewQuiz {
        return {
            type: QuizActionTypes.ADD_NEW_QUIZ,
            payload: params,
        };
    },

    addNewAnswer(payload: NsQuizAction.AddNewAnswer["payload"] = {}): NsQuizAction.AddNewAnswer {
        return {
            type: QuizActionTypes.ADD_NEW_ANSWER,
            payload,
        };
    },

    changeEditorState(
        params: NsQuizAction.ChangeEditorState["payload"]
    ): NsQuizAction.ChangeEditorState {
        return {
            type: QuizActionTypes.CHANGE_EDITOR_STATE,
            payload: params,
        };
    },

    changeCorrectAnswer(
        answerId: NsQuizAction.ChangeCorrectAnswer["payload"]["answerId"],
        correct?: NsQuizAction.ChangeCorrectAnswer["payload"]["correct"]
    ): NsQuizAction.ChangeCorrectAnswer {
        return {
            type: QuizActionTypes.CHANGE_CORRECT_ANSWER,
            payload: {
                answerId,
                correct,
            },
        };
    },

    changeQuestionOption(
        params: NsQuizAction.ChangeQuestionOption["payload"]
    ): NsQuizAction.ChangeQuestionOption {
        return {
            type: QuizActionTypes.CHANGE_QUESTION_OPTION,
            payload: params,
        };
    },

    deleteAnswer(
        answerId: NsQuizAction.DeleteAnswer["payload"]["answerId"]
    ): NsQuizAction.DeleteAnswer {
        return {
            type: QuizActionTypes.DELETE_ANSWER,
            payload: {
                answerId,
            },
        };
    },

    deleteGroupAnswer(groupKey: string): NsQuizAction.DeleteGroupAnswer {
        return {
            type: QuizActionTypes.DELETE_GROUP_ANSWER,
            payload: {
                groupKey,
            },
        };
    },

    sendOrcRequest(params: NsQuizAction.PostORCRequest["payload"]): NsQuizAction.PostORCRequest {
        return {
            type: QuizActionTypes.POST_OCR_REQUEST,
            payload: params,
        };
    },

    addRectToQuestion(
        params: NsQuizAction.AddRectToQuestion["payload"]
    ): NsQuizAction.AddRectToQuestion {
        return {
            type: QuizActionTypes.ADD_RECT_TO_QUESTION,
            payload: params,
        };
    },

    setPdfUrl(params: NsQuizAction.SetPdfUrl["payload"]): NsQuizAction.SetPdfUrl {
        return {
            type: QuizActionTypes.SET_PDF_URL,
            payload: params,
        };
    },

    setQuizOnReview(
        quiz: NsQuizAction.SetQuizOnReview["payload"]["quiz"]
    ): NsQuizAction.SetQuizOnReview {
        return {
            type: QuizActionTypes.SET_QUIZ_ON_REVIEW,
            payload: {
                quiz,
            },
        };
    },

    changeLabelType(
        labelType: NsQuizAction.ChangeLabelType["payload"]["labelType"]
    ): NsQuizAction.ChangeLabelType {
        return {
            type: QuizActionTypes.CHANGE_LABEL_TYPE,
            payload: {
                labelType,
            },
        };
    },

    clearCurrentQuiz(): NsQuizAction.ClearCurrentQuiz {
        return {
            type: QuizActionTypes.CLEAR_CURRENT_QUIZ,
        };
    },

    changeAnswerConfigs(
        configs: QuizOptionConfig | QuizOptionConfig[]
    ): NsQuizAction.ChangeAnswerConfigs {
        return {
            type: QuizActionTypes.CHANGE_ANSWER_CONFIGS,
            payload: {
                configs: configs,
            },
        };
    },

    setCurrentQuiz(
        quiz: NsQuizAction.SetCurrentQuiz["payload"]["quiz"]
    ): NsQuizAction.SetCurrentQuiz {
        return {
            type: QuizActionTypes.SET_CURRENT_QUIZ,
            payload: {
                quiz,
            },
        };
    },

    setCurrentLO(lo: NsQuizAction.SetCurrentLO["payload"]["lo"]): NsQuizAction.SetCurrentLO {
        return {
            type: QuizActionTypes.SET_CURRENT_LO,
            payload: {
                lo,
            },
        };
    },

    changeQuiz(
        quizIndex: NsQuizAction.ChangeQuiz["payload"]["quizIndex"]
    ): NsQuizAction.ChangeQuiz {
        return {
            type: QuizActionTypes.CHANGE_QUIZ,
            payload: {
                quizIndex,
            },
        };
    },

    clearState(): NsQuizAction.ClearState {
        return {
            type: QuizActionTypes.CLEAR_STATE,
        };
    },

    changeAnswerLabel(answerId: string, newVal: string): NsQuizAction.ChangeAnswerLabel {
        return {
            type: QuizActionTypes.CHANGE_ANSWER_LABEL,
            payload: {
                answerId,
                value: newVal,
            },
        };
    },

    changeAnswerAttributeConfigs(
        payload: NsQuizAction.ChangeAnswerAttributeConfigs["payload"]
    ): NsQuizAction.ChangeAnswerAttributeConfigs {
        return {
            type: QuizActionTypes.CHANGE_ANSWER_ATTRIBUTE_CONFIGS,
            payload,
        };
    },

    changeQuizType(quizType: QuizType): NsQuizAction.ChangeQuizType {
        return {
            type: QuizActionTypes.CHANGE_QUIZ_TYPE,
            payload: {
                quizType,
            },
        };
    },

    requestAddNewAnswer(
        payload: NsQuizAction.RequestAddNewAnswer["payload"]
    ): NsQuizAction.RequestAddNewAnswer {
        return {
            type: QuizActionTypes.REQUEST_ADD_NEW_ANSWER,
            payload,
        };
    },
};

export type IQuizActions =
    | NsQuizAction.AddNewQuiz
    | NsQuizAction.AddNewAnswer
    | NsQuizAction.ChangeEditorState
    | NsQuizAction.ChangeCorrectAnswer
    | NsQuizAction.DeleteAnswer
    | NsQuizAction.ChangeQuestionOption
    | NsQuizAction.AddRectToQuestion
    | NsQuizAction.PostORCRequest
    | NsQuizAction.SetPdfUrl
    | NsQuizAction.SetQuizOnReview
    | NsQuizAction.ChangeLabelType
    | NsQuizAction.ClearCurrentQuiz
    | NsQuizAction.ChangeAnswerConfigs
    | NsQuizAction.SetCurrentQuiz
    | NsQuizAction.SetCurrentLO
    | NsQuizAction.ChangeQuiz
    | NsQuizAction.ClearState
    | NsQuizAction.ChangeAnswerLabel
    | NsQuizAction.ChangeAnswerAttributeConfigs
    | NsQuizAction.ChangeQuizType
    | NsQuizAction.DeleteGroupAnswer;
