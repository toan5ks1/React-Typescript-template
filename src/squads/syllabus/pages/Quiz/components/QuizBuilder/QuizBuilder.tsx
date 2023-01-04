import { Entities } from "src/common/constants/enum";
import {
    Quiz,
    QuizSelectors,
    QuizType,
    shouldVisibleExplanation,
} from "src/squads/syllabus/models/quiz";

import SpacingGroup from "src/components/Utilities/SpacingGroup";
import Asterisk from "src/squads/syllabus/pages/Quiz/components/Asterisk";
import QuizEditor from "src/squads/syllabus/pages/Quiz/components/QuizEditor";
import { allToolbar } from "src/squads/syllabus/pages/Quiz/components/WYSWYG/EditorToolbar/Controls";

import { ExternalIdProps } from "../../types";
import QuizAnswer from "../QuizAnswer";
import QuizItemLayout from "../QuizAnswer/QuizItemLayout";
import QuizQuestion from "../QuizQuestion";
import QuizAnswerSetting from "./QuizAnswerSetting";
import QuizOptions from "./QuizOptions";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useQuizAnswerSetting from "src/squads/syllabus/pages/Quiz/hooks/useQuizAnswerSetting";
import useQuizInstructionText from "src/squads/syllabus/pages/Quiz/hooks/useQuizInstructionText";
import useQuizUpdate from "src/squads/syllabus/pages/Quiz/hooks/useQuizUpdate";

interface QuestionProps {
    currentQuiz: Quiz | null;
    externalIdProps: ExternalIdProps;
}

const QuizBuilder = ({ currentQuiz, externalIdProps }: QuestionProps) => {
    const t = useResourceTranslate(Entities.QUIZZES);
    const { questionInstruction, answerInstruction, explanationInstruction } =
        useQuizInstructionText({
            kind: currentQuiz?.kind,
        });

    const { hasSetting, settings } = useQuizAnswerSetting({
        kind: currentQuiz?.kind || QuizType.QUIZ_TYPE_MCQ,
    });

    const {
        onAddNewAnswer,
        onDeleteAnswer,
        onDeleteGroupAnswer,
        onChangeAnswer,
        onChangeQuestion,
        onChangeQuizType,
        onChangeLabelType,
        onChangeAnswerLabel,
        onChangeExplanation,
        onChangeCorrectAnswer,
        onChangeAnswerConfigs,
        onChangeAnswerAttributeConfigs,
        onChangeQuestionOptions,
    } = useQuizUpdate();

    if (!currentQuiz) {
        return null;
    }

    return (
        <SpacingGroup spacing="0rem" direction="vertical">
            <div>
                <QuizOptions
                    questionType={currentQuiz.kind}
                    taggedLOs={currentQuiz.taggedLOs}
                    externalId={currentQuiz.externalId}
                    difficultyLevel={currentQuiz.difficultyLevel}
                    externalIdProps={externalIdProps}
                    onChangeQuizType={onChangeQuizType}
                    onChange={onChangeQuestionOptions}
                />
            </div>
            <div data-js={QuizSelectors.question}>
                <QuizItemLayout
                    visibleDivider={false}
                    primaryTitle={
                        currentQuiz.kind !== QuizType.QUIZ_TYPE_FIB && (
                            <>{questionInstruction.primary && t(questionInstruction.primary)}</>
                        )
                    }
                    secondaryTitle={
                        <>
                            {questionInstruction.secondary && t(questionInstruction.secondary)}
                            &nbsp;
                            {questionInstruction.subRequired && <Asterisk />}
                        </>
                    }
                >
                    <QuizQuestion kind={currentQuiz.kind} onChange={onChangeQuestion} />
                </QuizItemLayout>
            </div>

            {currentQuiz.kind !== QuizType.QUIZ_TYPE_MIQ ? (
                <QuizItemLayout
                    visibleDivider
                    primaryTitle={
                        <>
                            {answerInstruction.primary && (
                                <>
                                    {t(answerInstruction.primary)}&nbsp;
                                    {answerInstruction.required && <Asterisk />}
                                </>
                            )}
                        </>
                    }
                    secondaryTitle={
                        <>
                            {answerInstruction.secondary && (
                                <>
                                    {t(answerInstruction.secondary)}&nbsp;
                                    {answerInstruction.subRequired && <Asterisk />}
                                </>
                            )}
                        </>
                    }
                >
                    <div data-js={QuizSelectors.answers}>
                        <QuizAnswer
                            answer={currentQuiz.answer}
                            quizType={currentQuiz.kind}
                            onAddNewAnswer={onAddNewAnswer}
                            onDeleteAnswer={onDeleteAnswer}
                            onChangeAnswer={onChangeAnswer}
                            onChangeAnswerAttributeConfigs={onChangeAnswerAttributeConfigs}
                            onChangeLabel={onChangeAnswerLabel}
                            onChangeLabelType={onChangeLabelType}
                            onChangeCorrect={onChangeCorrectAnswer}
                            onDeleteGroupAnswer={onDeleteGroupAnswer}
                        />
                    </div>
                </QuizItemLayout>
            ) : null}

            {hasSetting && (
                <div data-js={QuizSelectors.settings}>
                    <QuizAnswerSetting
                        settings={settings}
                        settingValues={currentQuiz.answer.configs}
                        onChangeAnswerConfigs={onChangeAnswerConfigs}
                    />
                </div>
            )}

            {shouldVisibleExplanation(currentQuiz.kind) && (
                <QuizItemLayout
                    visibleDivider
                    primaryTitle={
                        <>
                            {explanationInstruction.primary && (
                                <>
                                    {t(explanationInstruction.primary)}&nbsp;
                                    {explanationInstruction.required && <Asterisk />}
                                </>
                            )}
                        </>
                    }
                    secondaryTitle={
                        <>
                            {explanationInstruction.secondary && (
                                <>
                                    {t(explanationInstruction.secondary)}&nbsp;
                                    {explanationInstruction.subRequired && <Asterisk />}
                                </>
                            )}
                        </>
                    }
                >
                    <div data-js={QuizSelectors.explanation}>
                        <QuizEditor
                            toolbar={allToolbar}
                            editorState={currentQuiz.explanation.content}
                            onChange={onChangeExplanation}
                            data-js="Quiz__explanation"
                            placeholder={t("explanation")}
                        />
                    </div>
                </QuizItemLayout>
            )}
        </SpacingGroup>
    );
};

export default QuizBuilder;
