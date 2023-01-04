import { FC, useCallback } from "react";

import { useFieldArray, UseFieldArrayReturn } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { genId } from "src/squads/syllabus/common/utils/generator";
import { createEmptyAnswer } from "src/squads/syllabus/models/quiz";

import Add from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import QuizV2, { Answer } from "src/squads/syllabus/models/quizV2";

export type WithAnswerProps = {
    answer: Answer;
    itemIndex: number;
    onRemove: UseFieldArrayReturn["remove"];
    answersCount: number;
};

export type ItemRenderer = (props: WithAnswerProps) => JSX.Element;

export interface QuizAnswerListProps {
    renderItem: ItemRenderer;
    testId?: string;
}

const QuizAnswerList: FC<QuizAnswerListProps> = ({ renderItem, testId }) => {
    const t = useResourceTranslate(Entities.QUIZZES);
    const {
        fields: answers,
        remove,
        append,
    } = useFieldArray<QuizV2, "answer.list">({
        name: "answer.list",
    });

    const onAdd = useCallback(() => {
        const answer = createEmptyAnswer(genId());
        append(answer);
    }, [append]);

    return (
        <Box data-testid={testId} display="flex" flexDirection="column" gap={2}>
            {answers.map((answer, index) => (
                <Box data-testid="QuizAnswerList__item" key={answer.id}>
                    {renderItem({
                        answer,
                        itemIndex: index,
                        onRemove: remove,
                        answersCount: answers.length,
                    })}
                </Box>
            ))}
            <ButtonPrimaryOutlined
                data-testid="QuizAnswerList__btnAddAnswer"
                onClick={onAdd}
                startIcon={<Add />}
            >
                {t("addAnswer")}
            </ButtonPrimaryOutlined>
        </Box>
    );
};

export default QuizAnswerList;
