import { useMemo } from "react";

import { Entities, Features } from "src/common/constants/enum";
import { RectTypes } from "src/squads/syllabus/models/canvas";
import { FieldTypes, Quiz, QuizType } from "src/squads/syllabus/models/quiz";
import { answersSelector } from "src/squads/syllabus/store/quiz";

import { Box, Paper, PaperProps, Theme } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";

import OCRSelectionAnswerFIB from "./OCRSelectionAnswerFIB";

import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import { getAllAnswerGroupsByGroupKey } from "src/squads/syllabus/pages/Quiz/common/utils";

const selectionScrollNumber = 12; // Scrollbar shows when field selection >= 12
//TODO: In design, the selection's 30px but in the real component it's 36.5px
const selectionHeight = 36.5;

const sx = {
    root: (theme: Theme) => ({
        padding: theme.spacing(1, 0),
    }),
    selectionList: {
        overflowY: "auto",
        maxHeight: `${selectionHeight * selectionScrollNumber}px`,
    },
    selection: (theme: Theme) => ({
        padding: theme.spacing(0.75, 2),
        minWidth: 156,
    }),
};

export interface FieldTypeSelectionProps extends Omit<PaperProps, "onSelect"> {
    quizType: Quiz["kind"];
    rectType?: RectTypes;
    answers: ReturnType<typeof answersSelector>;
    onSelect: (fieldType: FieldTypes, answerId?: string) => void;
}

const FieldTypeSelection = ({
    quizType,
    answers,
    onSelect,
    rectType,
    ...rest
}: FieldTypeSelectionProps) => {
    const t = useResourceTranslate(Entities.QUIZZES);

    const { isEnabled: isHandwritingEnabled } = useFeatureToggle(
        Features.SYLLABUS_QUIZ_HANDWRITING
    );

    const answerLocationList = useMemo(() => {
        if (quizType === QuizType.QUIZ_TYPE_FIB) {
            if (isHandwritingEnabled && rectType && rectType === RectTypes.TEXT) {
                const answerGroupList = getAllAnswerGroupsByGroupKey(answers);
                return (
                    <>
                        {answerGroupList.map((answers, index) => {
                            return (
                                <OCRSelectionAnswerFIB
                                    sx={sx.selection}
                                    key={index}
                                    answerList={answers}
                                    mainAnswerIndex={index + 1}
                                    onSelect={onSelect}
                                />
                            );
                        })}
                    </>
                );
            }
            return null;
        }

        if (quizType === QuizType.QUIZ_TYPE_MIQ) {
            return null;
        }

        return answers.map((answer, index) => {
            return (
                <ButtonBase
                    key={answer.id}
                    variant="text"
                    sx={sx.selection}
                    color="primary"
                    onClick={() => {
                        onSelect(FieldTypes.ANSWER, answer.id);
                    }}
                    data-testid="FieldTypeSelection__answer"
                >
                    {`${t("answer")} ${index + 1}`}
                </ButtonBase>
            );
        });
    }, [answers, isHandwritingEnabled, onSelect, quizType, rectType, t]);

    return (
        <Paper sx={sx.root} square elevation={2} {...rest}>
            <Box display="flex" flexDirection="column" sx={sx.selectionList}>
                <ButtonBase
                    sx={sx.selection}
                    variant="text"
                    color="primary"
                    onClick={() => {
                        onSelect(FieldTypes.QUESTION);
                    }}
                    data-testid="FieldTypeSelection__question"
                >
                    {t("question")}
                </ButtonBase>
                <ButtonBase
                    sx={sx.selection}
                    variant="text"
                    color="primary"
                    onClick={() => {
                        onSelect(FieldTypes.EXPLANATION);
                    }}
                    data-testid="FieldTypeSelection__explanation"
                >
                    {t("explanation")}
                </ButtonBase>
                {answerLocationList}
            </Box>
        </Paper>
    );
};

export default FieldTypeSelection;
