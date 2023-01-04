import { memo, useCallback } from "react";

import { Entities } from "src/common/constants/enum";
import { isFlashCardQuiz } from "src/squads/syllabus/models/quiz";

import { Box } from "@mui/material";
import CheckboxBase from "src/components/Checkboxes/CheckboxBase";
import QuizEditor from "src/squads/syllabus/pages/Quiz/components/QuizEditor";
import {
    allToolbar,
    onlyInlineToolbar,
} from "src/squads/syllabus/pages/Quiz/components/WYSWYG/EditorToolbar/Controls";

import FormControlLabel from "../FormControlLabel";
import DeleteAnswerButton from "./DeleteAnswerButton";
import { CommonAnswerProps } from "./types";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface AnswerMultipleAnswerProps extends CommonAnswerProps {
    onChangeCorrect?: (correct?: boolean) => void;
}

const AnswerMultipleAnswer = (props: AnswerMultipleAnswerProps) => {
    const { content, correct, onDelete, readOnly, onChange, onChangeCorrect, quizType } = props;
    const t = useResourceTranslate(Entities.QUIZZES);
    const toolbar = isFlashCardQuiz(quizType!) ? onlyInlineToolbar : allToolbar;

    const _onChangeCorrect = useCallback(
        (_: any, checked: boolean) => {
            if (onChangeCorrect) onChangeCorrect(checked);
        },
        [onChangeCorrect]
    );

    return (
        <Box display="flex" flexDirection="column" data-testid="AnswerMultipleAnswer__form">
            <FormControlLabel
                onChange={_onChangeCorrect}
                label={t("correctAnswer")}
                control={<CheckboxBase checked={correct} color="primary" />}
            />
            <QuizEditor
                editorState={content}
                readOnly={readOnly}
                toolbar={readOnly ? undefined : toolbar}
                actions={<DeleteAnswerButton onClick={onDelete} />}
                onChange={onChange}
            />
        </Box>
    );
};

export default memo(AnswerMultipleAnswer);
