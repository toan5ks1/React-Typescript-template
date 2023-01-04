import { memo } from "react";

import { Entities } from "src/common/constants/enum";

import QuizEditor from "src/squads/syllabus/pages/Quiz/components/QuizEditor";
import { allToolbar } from "src/squads/syllabus/pages/Quiz/components/WYSWYG/EditorToolbar/Controls";

import { CommonAnswerProps } from "./types";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const AnswerManualInput = (props: CommonAnswerProps) => {
    const t = useResourceTranslate(Entities.QUIZZES);
    const { content } = props;

    return (
        <QuizEditor
            toolbar={allToolbar}
            placeholder={t("explanation")}
            editorState={content}
            onChange={props.onChange}
        />
    );
};

export default memo(AnswerManualInput);
