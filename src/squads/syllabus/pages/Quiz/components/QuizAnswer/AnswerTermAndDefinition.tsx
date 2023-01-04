import { memo } from "react";

import { isFlashCardQuiz } from "src/squads/syllabus/models/quiz";

import QuizEditor from "src/squads/syllabus/pages/Quiz/components/QuizEditor";
import {
    allToolbar,
    onlyInlineToolbar,
} from "src/squads/syllabus/pages/Quiz/components/WYSWYG/EditorToolbar/Controls";

import { CommonAnswerProps } from "./types";

const AnswerTermAndDefinition = (props: CommonAnswerProps) => {
    const { content, quizType } = props;
    const toolbar = isFlashCardQuiz(quizType!) ? onlyInlineToolbar : allToolbar;

    return <QuizEditor toolbar={toolbar} editorState={content} onChange={props.onChange} />;
};

export default memo(AnswerTermAndDefinition);
