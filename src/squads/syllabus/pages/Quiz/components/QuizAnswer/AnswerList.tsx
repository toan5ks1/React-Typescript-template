import { EditorState } from "draft-js";
import { Answer as AnswerModel, isQuizFIB, Quiz } from "src/squads/syllabus/models/quiz";
import { NsQuizAction } from "src/squads/syllabus/store/quiz";

import ButtonCreate from "src/components/Buttons/ButtonCreate";
import SpacingGroup from "src/components/Utilities/SpacingGroup";

import Answer from "./Answer";
import AnswerFillInBlankList from "./AnswerFillInBlankList";

import useAddQuestionBtnConfig from "src/squads/syllabus/pages/Quiz/hooks/useAddQuestionBtnConfig";

export interface AnswerListProps {
    readOnly?: boolean;
    quizType: Quiz["kind"];
    labelType: Quiz["answer"]["labelType"];
    answers: AnswerModel[];
    labelAddNew: string;
    onAddNewAnswer: (params: NsQuizAction.AddNewAnswer["payload"]) => void;
    onDeleteAnswer: (id: string) => void;
    onChangeCorrect: (id: string, correct: boolean) => void;
    onChangeLabel: (id: string, newVal: string) => void;
    onChangeAnswer: (id: string, state: EditorState) => void;
    onChangeAnswerAttributeConfigs: (
        params: NsQuizAction.ChangeAnswerAttributeConfigs["payload"]
    ) => void;
    onDeleteGroupAnswer: (id: string) => void;
}

const AnswerList = (props: AnswerListProps) => {
    const {
        quizType,
        answers,
        readOnly,
        labelType,
        labelAddNew,
        onDeleteAnswer,
        onChangeAnswer,
        onChangeAnswerAttributeConfigs,
        onAddNewAnswer,
        onChangeLabel,
        onChangeCorrect,
        onDeleteGroupAnswer,
    } = props;

    const { shouldVisible, disabled } = useAddQuestionBtnConfig({
        readOnly,
        quizType,
        totalAnswer: answers.length,
    });

    return (
        <div>
            <SpacingGroup spacing="1.25rem" data-js="Quiz__answer">
                {isQuizFIB(quizType) ? (
                    <AnswerFillInBlankList
                        answers={answers}
                        onChange={onChangeAnswer}
                        onChangeAttributeConfigs={onChangeAnswerAttributeConfigs}
                        labelType={labelType}
                        onChangeLabel={onChangeLabel}
                        onAddNewAnswer={onAddNewAnswer}
                        onDeleteAnswer={onDeleteAnswer}
                        onDeleteGroupAnswer={onDeleteGroupAnswer}
                    />
                ) : (
                    answers.map((answer) => {
                        return (
                            <Answer
                                key={answer.id}
                                answer={answer}
                                readOnly={readOnly}
                                quizType={quizType}
                                labelType={labelType}
                                onChange={onChangeAnswer}
                                onDelete={onDeleteAnswer}
                                onChangeLabel={onChangeLabel}
                                onChangeCorrect={onChangeCorrect}
                            />
                        );
                    })
                )}
            </SpacingGroup>

            {shouldVisible && (
                <ButtonCreate
                    fullWidth
                    size="large"
                    color="primary"
                    variant="contained"
                    disabled={disabled}
                    data-testid="AnswerList__addNewAnswer"
                    style={{ marginTop: "1rem" }}
                    onClick={() => onAddNewAnswer({})}
                >
                    {labelAddNew}
                </ButtonCreate>
            )}
        </div>
    );
};

export default AnswerList;
