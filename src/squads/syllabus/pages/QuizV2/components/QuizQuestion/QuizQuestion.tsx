import { FC } from "react";

import { useWatch } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { Quiz, QuizType } from "src/squads/syllabus/models/quiz";

import { Box } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import QuizEditorHF from "src/squads/syllabus/pages/QuizV2/components/QuizEditorHF";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useQuizInstructionText from "src/squads/syllabus/pages/QuizV2/hooks/useQuizInstructionText";
import useQuizValidation from "src/squads/syllabus/pages/QuizV2/hooks/useQuizValidation";

const QuizQuestion: FC = () => {
    const t = useResourceTranslate(Entities.QUIZZES);
    const kind = useWatch<Quiz, "kind">({
        name: "kind",
    });
    const { questionInstruction } = useQuizInstructionText({ kind });
    const rules = useQuizValidation();

    return (
        <Box>
            {kind !== QuizType.QUIZ_TYPE_FIB && questionInstruction.primary && (
                <TypographyBase data-testid="QuizQuestion__title" variant="h6">
                    {t(questionInstruction.primary)}
                </TypographyBase>
            )}
            <QuizEditorHF
                label={
                    questionInstruction.secondary && (
                        <Box mt={2} mb={1}>
                            <TypographyBase
                                variant="subtitle2"
                                data-testid="QuizQuestion__subtitle"
                            >
                                {t(questionInstruction.secondary)}{" "}
                                {questionInstruction.subRequired && <span>*</span>}
                            </TypographyBase>
                        </Box>
                    )
                }
                name="question.content"
                placeholder={t("questionDescription")}
                rules={rules["question.content"]}
            />
        </Box>
    );
};

export default QuizQuestion;
