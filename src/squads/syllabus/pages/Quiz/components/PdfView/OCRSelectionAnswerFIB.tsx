import { Entities } from "src/common/constants/enum";
import { Answer, FieldTypes } from "src/squads/syllabus/models/quiz";

import { SxProps, Theme } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import { isMainAnswerFIB } from "src/squads/syllabus/pages/Quiz/common/utils";

export interface OCRAnswerLocationFIBProps {
    answerList: Answer[];
    mainAnswerIndex: number;
    onSelect: (fieldType: FieldTypes, answerId?: string) => void;
    sx?: SxProps<Theme>;
}

const OCRSelectionAnswerFIB = ({
    answerList,
    mainAnswerIndex,
    onSelect,
    sx = [],
}: OCRAnswerLocationFIBProps) => {
    const tQuizzes = useResourceTranslate(Entities.QUIZZES);

    return (
        <>
            {answerList.map((answer, index) => {
                return (
                    <ButtonBase
                        key={answer.id}
                        variant="text"
                        sx={sx}
                        color="primary"
                        onClick={() => {
                            onSelect(FieldTypes.ANSWER, answer.id);
                        }}
                        data-testid={
                            isMainAnswerFIB(index)
                                ? "OCRSelectionAnswerFIB__answer"
                                : "OCRSelectionAnswerFIB__alternative"
                        }
                    >
                        {isMainAnswerFIB(index)
                            ? `${tQuizzes("answer")} ${mainAnswerIndex}`
                            : `${tQuizzes("alternative")} ${index}`}
                    </ButtonBase>
                );
            })}
        </>
    );
};

export default OCRSelectionAnswerFIB;
