import { useCallback, useMemo } from "react";

import { EditorState } from "draft-js";
import { Answer, Quiz } from "src/squads/syllabus/models/quiz";
import { NsQuizAction } from "src/squads/syllabus/store/quiz";

import AnswerFillInBlank from "./AnswerFillInBlank";

import { getAllAnswerGroupsByGroupKey } from "src/squads/syllabus/pages/Quiz/common/utils";

interface AnswerFillInBlankListProps {
    answers: Answer[];
    readOnly?: boolean;
    labelType: Quiz["answer"]["labelType"];
    onChangeLabel: (id: string, newVal: string) => void;
    onChange: (id: string, text: EditorState) => void;
    onChangeAttributeConfigs: (
        params: NsQuizAction.ChangeAnswerAttributeConfigs["payload"]
    ) => void;
    onAddNewAnswer: (params: NsQuizAction.AddNewAnswer["payload"]) => void;
    onDeleteAnswer: (id: string) => void;
    onDeleteGroupAnswer: (id: string) => void;
}

const AnswerFillInBlankList = (props: AnswerFillInBlankListProps) => {
    const {
        answers,
        onChange,
        onChangeAttributeConfigs,
        labelType,
        onChangeLabel,
        onAddNewAnswer,
        onDeleteAnswer,
        onDeleteGroupAnswer,
    } = props;
    const answerGroupList = useMemo(() => {
        return getAllAnswerGroupsByGroupKey(answers);
    }, [answers]);

    const _onChange = useCallback(
        (answerId: string, newEditorState: EditorState) => {
            if (typeof onChange === "function") {
                onChange(answerId, newEditorState);
            }
        },
        [onChange]
    );

    return (
        <>
            {answerGroupList.map((answerList, index) => {
                return (
                    <AnswerFillInBlank
                        labelType={labelType}
                        key={index}
                        index={index + 1}
                        list={answerList}
                        onChangeLabel={onChangeLabel}
                        onChange={_onChange}
                        onChangeAttributeConfigs={onChangeAttributeConfigs}
                        onAddNewAnswer={onAddNewAnswer}
                        onDelete={onDeleteAnswer}
                        onDeleteGroup={onDeleteGroupAnswer}
                    />
                );
            })}
        </>
    );
};

export default AnswerFillInBlankList;
