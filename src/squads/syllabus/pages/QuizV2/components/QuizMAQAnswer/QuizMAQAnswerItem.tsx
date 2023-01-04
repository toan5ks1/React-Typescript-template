import { FC, useCallback } from "react";

import { Entities } from "src/common/constants/enum";

import { Box } from "@mui/material";
import CheckboxLabelHF from "src/components/Checkboxes/CheckboxLabelHF";
import QuizAnswerEditor from "src/squads/syllabus/pages/QuizV2/components/QuizAnswerEditor";
import { WithAnswerProps } from "src/squads/syllabus/pages/QuizV2/components/QuizAnswerList";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useQuizValidation from "src/squads/syllabus/pages/QuizV2/hooks/useQuizValidation";

export interface QuizMAQAnswerItemProps extends WithAnswerProps {}

const QuizMAQAnswerItem: FC<QuizMAQAnswerItemProps> = ({ itemIndex, onRemove, answersCount }) => {
    const t = useResourceTranslate(Entities.QUIZZES);
    const rules = useQuizValidation();

    const onDeleteClick = useCallback(() => {
        onRemove(itemIndex);
    }, [itemIndex, onRemove]);

    return (
        <Box data-testid="QuizMAQAnswerItem__root">
            <CheckboxLabelHF
                data-testid="QuizMAQAnswerItem__checkbox"
                label={t("correctAnswer")}
                name={`answer.list.${itemIndex}.correct`}
            />
            <QuizAnswerEditor
                testId="QuizMAQAnswerItem__editor"
                name={`answer.list.${itemIndex}.content`}
                onRemove={onDeleteClick}
                rules={rules["answerField.content"]}
                shouldDisableRemove={answersCount <= 1}
            />
        </Box>
    );
};

export default QuizMAQAnswerItem;
