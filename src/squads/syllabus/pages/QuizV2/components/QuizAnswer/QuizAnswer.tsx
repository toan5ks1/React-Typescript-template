import { FC, useMemo } from "react";

import { useWatch } from "react-hook-form";
import { Entities } from "src/common/constants/enum";

import useQuizInstructionText from "../../hooks/useQuizInstructionText";
import QuizMAQAnswer from "../QuizMAQAnswer";
import QuizMCQAnswer from "../QuizMCQAnswer";
import QuizSection from "../QuizSection";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import QuizV2, { QuizType } from "src/squads/syllabus/models/quizV2";

const QuizAnswer: FC = () => {
    const t = useResourceTranslate(Entities.QUIZZES);
    const quizType = useWatch<QuizV2, "kind">({
        name: "kind",
    });
    const { answerInstruction } = useQuizInstructionText({ kind: quizType });

    const Answers = useMemo(() => {
        switch (quizType) {
            case QuizType.QUIZ_TYPE_MCQ:
                return <QuizMCQAnswer />;
            case QuizType.QUIZ_TYPE_MAQ:
                return <QuizMAQAnswer />;
            default:
                return null;
        }
    }, [quizType]);

    if (quizType === QuizType.QUIZ_TYPE_MIQ) return null;

    return (
        <QuizSection
            title={
                <>
                    {answerInstruction.primary && (
                        <>
                            {t(answerInstruction.primary)}
                            {answerInstruction.required && (
                                <>
                                    &nbsp;<span>*</span>
                                </>
                            )}
                        </>
                    )}
                </>
            }
        >
            {Answers}
        </QuizSection>
    );
};

export default QuizAnswer;
