import { memo, useCallback } from "react";

import { EditorState } from "draft-js";
import { Quiz, Answer as AnswerModel, QuizType } from "src/squads/syllabus/models/quiz";

import AnswerManualInput from "./AnswerManualInput";
import AnswerMultipleAnswer from "./AnswerMultipleAnswer";
import AnswerMultipleChoice from "./AnswerMultipleChoice";
import AnswerTermAndDefinition from "./AnswerTermAndDefinition";

export interface AnswerProps {
    quizType: Quiz["kind"];
    labelType: Quiz["answer"]["labelType"];
    answer: AnswerModel;
    readOnly?: boolean;
    onDelete?: (id: string) => void;
    onChange?: (id: string, newEditorState: EditorState) => void;
    onChangeLabel?: (id: string, newVal: string) => void;
    onChangeCorrect?: (id: string, correct: boolean) => void;
}

const Answer = (props: AnswerProps) => {
    const { answer, readOnly, quizType, onChange, onDelete, onChangeCorrect } = props;

    const _onChange = useCallback(
        (newEditorState: EditorState) => {
            if (typeof onChange !== "function") {
                return;
            }
            onChange(answer.id, newEditorState);
        },
        [onChange, answer]
    );

    const _onChangeCorrect = useCallback(
        (correct?: boolean) => {
            if (typeof onChangeCorrect !== "function") {
                return;
            }
            onChangeCorrect(answer.id, Boolean(correct));
        },
        [onChangeCorrect, answer]
    );

    const _onDelete = useCallback(() => {
        if (typeof onDelete !== "function") {
            return;
        }
        onDelete(answer.id);
    }, [onDelete, answer]);

    switch (quizType) {
        case QuizType.QUIZ_TYPE_MAQ:
            return (
                <AnswerMultipleAnswer
                    key={answer.id}
                    content={answer.content}
                    correct={answer.correct}
                    readOnly={readOnly}
                    quizType={quizType}
                    onDelete={_onDelete}
                    onChange={_onChange}
                    onChangeCorrect={_onChangeCorrect}
                />
            );
        case QuizType.QUIZ_TYPE_MCQ:
            return (
                <AnswerMultipleChoice
                    key={answer.id}
                    content={answer.content}
                    correct={answer.correct}
                    readOnly={readOnly}
                    quizType={quizType}
                    onDelete={_onDelete}
                    onChange={_onChange}
                    onChangeCorrect={_onChangeCorrect}
                />
            );

        case QuizType.QUIZ_TYPE_MIQ:
            return (
                <AnswerManualInput
                    key={answer.id}
                    content={answer.content}
                    correct={answer.correct}
                    quizType={quizType}
                    onDelete={_onDelete}
                    onChange={_onChange}
                />
            );
        case QuizType.QUIZ_TYPE_TAD:
        case QuizType.QUIZ_TYPE_POW:
            return (
                <AnswerTermAndDefinition
                    key={answer.id}
                    content={answer.content}
                    correct={answer.correct}
                    quizType={quizType}
                    onDelete={_onDelete}
                    onChange={_onChange}
                />
            );

        default:
            return null;
    }
};

export default memo(Answer);
