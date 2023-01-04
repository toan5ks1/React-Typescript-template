import { memo } from "react";

import { Entities } from "src/common/constants/enum";
import { isFlashCardQuiz } from "src/squads/syllabus/models/quiz";

import { Box, Radio } from "@mui/material";
import QuizEditor from "src/squads/syllabus/pages/Quiz/components/QuizEditor";
import {
    allToolbar,
    onlyInlineToolbar,
} from "src/squads/syllabus/pages/Quiz/components/WYSWYG/EditorToolbar/Controls";

import FormControlLabel from "../FormControlLabel";
import DeleteAnswerButton from "./DeleteAnswerButton";
import { CommonAnswerProps } from "./types";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface AnswerMultipleChoiceProps extends CommonAnswerProps {
    onChangeCorrect?: () => void;
}

const AnswerMultipleChoice = (props: AnswerMultipleChoiceProps) => {
    const { content, correct, onDelete, readOnly, onChange, onChangeCorrect, quizType } = props;
    const t = useResourceTranslate(Entities.QUIZZES);
    const toolbar = isFlashCardQuiz(quizType!) ? onlyInlineToolbar : allToolbar;

    return (
        <Box display="flex" flexDirection="column" data-testid="AnswerMultipleChoice__form">
            <FormControlLabel
                onChange={onChangeCorrect}
                label={t("correctAnswer")}
                control={<Radio checked={correct} color="primary" />}
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

export default memo(AnswerMultipleChoice);
