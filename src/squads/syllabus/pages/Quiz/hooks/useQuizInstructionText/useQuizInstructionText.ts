import { useMemo } from "react";

import { isFlashCardQuiz, QuizType } from "src/squads/syllabus/models/quiz";

interface InstructionText {
    primary?: string;
    secondary?: string;
    required: boolean;
    subRequired: boolean;
}

interface UseQuizInstructionTextProps {
    kind?: QuizType;
}

const useQuizInstructionText = ({ kind }: UseQuizInstructionTextProps) => {
    const questionInstruction: InstructionText = useMemo(() => {
        let temp: InstructionText = {
            secondary: "questionDescription",
            subRequired: true,
            required: false,
        };

        if (isFlashCardQuiz(kind!)) temp.primary = "term";

        return temp;
    }, [kind]);

    const answerInstruction: InstructionText = useMemo(() => {
        let temp: InstructionText = { primary: "answers", subRequired: true, required: false };

        if (isFlashCardQuiz(kind!)) temp.primary = "definition";

        if (kind === QuizType.QUIZ_TYPE_MAQ || kind === QuizType.QUIZ_TYPE_MCQ) {
            temp.required = true;
        }
        return temp;
    }, [kind]);

    const explanationInstruction: InstructionText = useMemo(() => {
        let temp: InstructionText = {
            primary: "explanation",
            secondary: "explanationDescription",
            subRequired: false,
            required: false,
        };

        if (kind === QuizType.QUIZ_TYPE_MIQ) {
            temp.subRequired = true;
        }

        return temp;
    }, [kind]);

    return { answerInstruction, questionInstruction, explanationInstruction };
};

export default useQuizInstructionText;
