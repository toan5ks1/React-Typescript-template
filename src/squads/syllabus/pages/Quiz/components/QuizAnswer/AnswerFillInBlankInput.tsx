import { ChangeEvent, useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { Answer } from "src/squads/syllabus/models/quiz";

import { TextField } from "@mui/material";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import { isMainAnswerFIB } from "src/squads/syllabus/pages/Quiz/common/utils";

export interface AnswerFillInBlankInputProps {
    id: Answer["id"];
    content: Answer["content"];
    mainAnswerNumber: number;
    alternativeIndex: number;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => void;
    readOnly?: boolean;
}
const AnswerFillInBlankInput = (props: AnswerFillInBlankInputProps) => {
    const { id, content, mainAnswerNumber, alternativeIndex, onChange, readOnly } = props;
    const tQuizzes = useResourceTranslate(Entities.QUIZZES);

    const textFieldProps = useMemo(() => {
        if (isMainAnswerFIB(alternativeIndex)) {
            return {
                "data-js": "FillInBlank__input",
                label: `${tQuizzes("answer")} ${mainAnswerNumber}`,
                placeholder: `${tQuizzes("answer")} ${mainAnswerNumber}`,
                inputProps: { "data-testid": "AnswerFillInBlankInput__answer" },
            };
        }

        return {
            "data-js": "FillInBlank__inputAlter",
            label: `${tQuizzes("alternative")} ${alternativeIndex}`,
            placeholder: tQuizzes("enterAlternativeVal"),
            inputProps: { "data-testid": "AnswerFillInBlankInput__alternative" },
        };
    }, [alternativeIndex, mainAnswerNumber, tQuizzes]);

    return (
        <TextField
            {...textFieldProps}
            variant="outlined"
            value={content.getCurrentContent().getPlainText()}
            onChange={(e) => onChange(e, id)}
            inputProps={{ readOnly, ...textFieldProps.inputProps }}
            data-testid="AnswerFillInBlankInput__root"
        />
    );
};

export default AnswerFillInBlankInput;
