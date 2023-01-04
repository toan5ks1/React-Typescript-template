import { EditorState } from "draft-js";
import { Answer, Quiz } from "src/squads/syllabus/models/quiz";

export interface CommonAnswerProps {
    readOnly?: boolean;
    content: Answer["content"];
    correct: Answer["correct"];
    quizType: Quiz["kind"];
    onChange?: (newEditorState: EditorState) => void;
    onDelete?: () => void;
}
