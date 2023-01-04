import { memo } from "react";

import { useSelector } from "react-redux";
import { Entities } from "src/common/constants/enum";
import { isFlashCardQuiz, QuizType } from "src/squads/syllabus/models/quiz";
import { currentQuizQuestionSelector } from "src/squads/syllabus/store/quiz";

import QuizEditor from "src/squads/syllabus/pages/Quiz/components/QuizEditor";
import { EditorProps } from "src/squads/syllabus/pages/Quiz/components/WYSWYG/Editor/types";
import {
    onlyInlineToolbar,
    allToolbar,
} from "src/squads/syllabus/pages/Quiz/components/WYSWYG/EditorToolbar/Controls";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface QuizQuestionProps {
    kind: QuizType;
    onChange: EditorProps["onChange"];
}

const QuizQuestion = (props: QuizQuestionProps) => {
    const currentQuizQuestion = useSelector(currentQuizQuestionSelector);
    const t = useResourceTranslate(Entities.QUIZZES);
    const isFlashCard = isFlashCardQuiz(props.kind!);

    return (
        <div>
            <QuizEditor
                toolbar={isFlashCard ? onlyInlineToolbar : allToolbar}
                editorState={currentQuizQuestion!.content}
                onChange={props.onChange}
                placeholder={t("questionDescription")}
            />
        </div>
    );
};

export default memo(QuizQuestion);
