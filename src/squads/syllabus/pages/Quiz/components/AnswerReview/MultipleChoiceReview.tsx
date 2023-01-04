import { Answer } from "src/squads/syllabus/models/quiz";

import QuizEditor from "src/squads/syllabus/pages/Quiz/components/QuizEditor";

import AnswerReview from "./AnswerReview";

export interface MultipleChoiceReviewProps {
    className?: string;
    answer: Answer;
}

const MultipleChoiceReview = (props: MultipleChoiceReviewProps) => {
    const { answer } = props;

    return (
        <AnswerReview {...answer}>
            <QuizEditor displayOnly editorState={answer.content} />
        </AnswerReview>
    );
};

export default MultipleChoiceReview;
