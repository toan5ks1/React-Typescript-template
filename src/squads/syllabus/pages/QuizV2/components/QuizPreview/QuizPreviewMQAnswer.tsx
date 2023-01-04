import { EditorState } from "draft-js";

import QuizEditor from "src/squads/syllabus/pages/QuizV2/components/QuizEditor";

import QuizPreviewAnswer from "./QuizPreviewAnswer";

export type QuizPreviewMQAnswerProps = {
    correct: boolean;
    content: EditorState;
};

const QuizPreviewMQAnswer = ({ content, correct }: QuizPreviewMQAnswerProps) => (
    <QuizPreviewAnswer correct={correct} mt={2}>
        <QuizEditor displayOnly editorState={content} />
    </QuizPreviewAnswer>
);

export default QuizPreviewMQAnswer;
