import { useCallback } from "react";

import { EditorState } from "draft-js";
import { useDispatch } from "react-redux";
import { CreateEmptyQuizParams, FieldTypes, Quiz } from "src/squads/syllabus/models/quiz";
import { NsQuizAction, QuizActions } from "src/squads/syllabus/store/quiz";

import { QuizOptionConfig, QuizType } from "manabie-yasuo/quiz_pb";

export interface UseQuizUpdateValues {
    onRequestOCR: (params: NsQuizAction.PostORCRequest["payload"]) => void;
    onRemoveMaterial: () => void;
    onChangeQuestion: (newEditorState: EditorState) => void;
    onAddNewAnswer: (params: NsQuizAction.AddNewAnswer["payload"]) => void;
    onAddNewQuiz: ({ loId, schoolId, isLo }: CreateEmptyQuizParams) => void;
    onChangeAnswer: (answerId: string, newEditorState: EditorState) => void;
    onChangeAnswerConfigs: (configs: QuizOptionConfig | QuizOptionConfig[]) => void;
    onChangeAnswerAttributeConfigs: (
        params: NsQuizAction.ChangeAnswerAttributeConfigs["payload"]
    ) => void;
    onChangeCorrectAnswer: (answerId: string, correct: boolean) => void;
    onChangeExplanation: (newEditorState: EditorState) => void;
    onChangeLabelType: (newValue: Quiz["answer"]["labelType"]) => void;
    onChangeQuestionOptions: (params: NsQuizAction.ChangeQuestionOption["payload"]) => void;
    onDeleteAnswer: (answerId: string) => void;
    onDeleteGroupAnswer: (groupKey: string) => void;
    onCloseReview: () => void;
    onClearAllQuiz: () => void;
    onChangeQuiz: (quizIndex: number) => void;
    onClearState: () => void;
    onChangeAnswerLabel: (answerId: string, newVal: string) => void;
    onChangeQuizType: (quizType: QuizType) => void;
}

function useQuizUpdate(): UseQuizUpdateValues {
    const dispatch = useDispatch();

    const onRequestOCR = useCallback(
        (params: NsQuizAction.PostORCRequest["payload"]) => {
            dispatch(QuizActions.sendOrcRequest(params));
        },
        [dispatch]
    );

    const onRemoveMaterial = useCallback(() => {
        dispatch(QuizActions.setPdfUrl({ url: null }));
    }, [dispatch]);

    const updateEditorState = useCallback(
        (params: NsQuizAction.ChangeEditorState["payload"]) => {
            dispatch(QuizActions.changeEditorState(params));
        },
        [dispatch]
    );

    const onChangeQuestion = useCallback(
        (newEditorState: EditorState) => {
            updateEditorState({
                optionType: FieldTypes.QUESTION,
                newEditorState,
            });
        },
        [updateEditorState]
    );

    const onChangeExplanation = useCallback(
        (newEditorState: EditorState) => {
            updateEditorState({
                optionType: FieldTypes.EXPLANATION,
                newEditorState,
            });
        },
        [updateEditorState]
    );

    const onChangeAnswer = useCallback(
        (answerId: string, newEditorState: EditorState) => {
            updateEditorState({
                answerId,
                newEditorState,
                optionType: FieldTypes.ANSWER,
            });
        },
        [updateEditorState]
    );

    const onChangeCorrectAnswer = useCallback(
        (answerId: string, correct: boolean = true) => {
            dispatch(QuizActions.changeCorrectAnswer(answerId, correct));
        },
        [dispatch]
    );

    const onDeleteAnswer = useCallback(
        (answerId: string) => {
            dispatch(QuizActions.deleteAnswer(answerId));
        },
        [dispatch]
    );

    const onDeleteGroupAnswer = useCallback(
        (groupKey: string) => {
            dispatch(QuizActions.deleteGroupAnswer(groupKey));
        },
        [dispatch]
    );

    const onAddNewAnswer = useCallback(
        (params: NsQuizAction.AddNewAnswer["payload"] = {}) => {
            dispatch(QuizActions.requestAddNewAnswer(params));
        },
        [dispatch]
    );

    const onChangeQuestionOptions = useCallback(
        (params: NsQuizAction.ChangeQuestionOption["payload"]) => {
            dispatch(QuizActions.changeQuestionOption(params));
        },
        [dispatch]
    );

    const onChangeLabelType = useCallback(
        (newValue: Quiz["answer"]["labelType"]) => {
            dispatch(QuizActions.changeLabelType(newValue));
        },
        [dispatch]
    );

    const onChangeAnswerConfigs = useCallback(
        (configs: QuizOptionConfig | QuizOptionConfig[]) => {
            dispatch(QuizActions.changeAnswerConfigs(configs));
        },
        [dispatch]
    );

    const onCloseReview = useCallback(() => {
        dispatch(QuizActions.setQuizOnReview(null));
    }, [dispatch]);

    const onAddNewQuiz = useCallback(
        (config: CreateEmptyQuizParams) => {
            dispatch(QuizActions.addNewQuiz(config));
        },
        [dispatch]
    );

    const onClearAllQuiz = useCallback(() => {
        dispatch(QuizActions.clearCurrentQuiz());
    }, [dispatch]);

    const onChangeQuiz = useCallback(
        (quizIndex: number) => {
            dispatch(QuizActions.changeQuiz(quizIndex));
        },
        [dispatch]
    );

    const onClearState = useCallback(() => {
        dispatch(QuizActions.clearState());
    }, [dispatch]);

    const onChangeAnswerLabel = useCallback(
        (answerId: string, newVal: string) => {
            dispatch(QuizActions.changeAnswerLabel(answerId, newVal));
        },
        [dispatch]
    );

    const onChangeAnswerAttributeConfigs = useCallback(
        (params: NsQuizAction.ChangeAnswerAttributeConfigs["payload"]) => {
            dispatch(QuizActions.changeAnswerAttributeConfigs(params));
        },
        [dispatch]
    );

    const onChangeQuizType = useCallback(
        (quizType: QuizType) => {
            dispatch(QuizActions.changeQuizType(quizType));
        },
        [dispatch]
    );

    return {
        onRequestOCR,
        onRemoveMaterial,
        onAddNewAnswer,
        onAddNewQuiz,
        onChangeAnswer,
        onChangeAnswerConfigs,
        onChangeAnswerAttributeConfigs,
        onChangeCorrectAnswer,
        onChangeExplanation,
        onChangeLabelType,
        onChangeQuestionOptions,
        onDeleteAnswer,
        onDeleteGroupAnswer,
        onChangeQuestion,
        onCloseReview,
        onClearAllQuiz,
        onChangeQuiz,
        onClearState,
        onChangeAnswerLabel,
        onChangeQuizType,
    };
}

export default useQuizUpdate;
