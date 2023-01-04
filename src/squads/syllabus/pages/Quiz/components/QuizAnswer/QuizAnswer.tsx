import { memo, PropsWithChildren, useMemo } from "react";

import { EditorState } from "draft-js";
import { Entities } from "src/common/constants/enum";
import { Quiz } from "src/squads/syllabus/models/quiz";
import { NsQuizAction } from "src/squads/syllabus/store/quiz";

import SpacingGroup from "src/components/Utilities/SpacingGroup";

import { QuizType } from "manabie-yasuo/quiz_pb";

import AnswerList from "./AnswerList";
import AnswerOptions from "./AnswerOptions";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

interface QuestionAnswerProps {
    readOnly?: boolean;
    answer: Quiz["answer"];
    quizType: Quiz["kind"];
    onAddNewAnswer: (params: NsQuizAction.AddNewAnswer["payload"]) => void;
    onDeleteAnswer: (answerId: string) => void;
    onChangeCorrect: (answerId: string, correct: boolean) => void;
    onChangeAnswer: (answerId: string, newEditorState: EditorState) => void;
    onChangeAnswerAttributeConfigs: (
        params: NsQuizAction.ChangeAnswerAttributeConfigs["payload"]
    ) => void;
    onChangeLabelType: (labelType: Quiz["answer"]["labelType"]) => void;
    onChangeLabel: (id: string, newVal: string) => void;
    onDeleteGroupAnswer: (id: string) => void;
}

const QuizAnswer = (props: PropsWithChildren<QuestionAnswerProps>) => {
    const {
        answer,
        readOnly,
        quizType,
        onChangeCorrect,
        onDeleteAnswer,
        onAddNewAnswer,
        onChangeAnswer,
        onChangeAnswerAttributeConfigs,
        onChangeLabel,
        onChangeLabelType,
        onDeleteGroupAnswer,
    } = props;
    const t = useResourceTranslate(Entities.QUIZZES);

    const memoizedAnswers = useMemo(() => {
        const answerTemp = Array.from(answer.list.values());

        if (quizType === QuizType.QUIZ_TYPE_MIQ) return [];

        return answerTemp;
    }, [answer, quizType]);

    return (
        <SpacingGroup spacing="32px">
            {quizType === QuizType.QUIZ_TYPE_FIB ? (
                <AnswerOptions
                    labelType={answer.labelType}
                    configs={answer.configs}
                    onChangeLabelType={onChangeLabelType}
                />
            ) : null}
            <AnswerList
                readOnly={readOnly}
                answers={memoizedAnswers}
                labelType={answer.labelType}
                quizType={quizType}
                labelAddNew={t("addAnswer")}
                onDeleteAnswer={onDeleteAnswer}
                onChangeAnswer={onChangeAnswer}
                onChangeAnswerAttributeConfigs={onChangeAnswerAttributeConfigs}
                onChangeCorrect={onChangeCorrect}
                onChangeLabel={onChangeLabel}
                onDeleteGroupAnswer={onDeleteGroupAnswer}
                onAddNewAnswer={onAddNewAnswer}
            />
        </SpacingGroup>
    );
};

export default memo(QuizAnswer);
