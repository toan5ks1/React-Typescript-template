import { FC, useCallback } from "react";

import { Path, useController, useFormContext } from "react-hook-form";

import { Radio } from "@mui/material";
import FormControlLabelBase from "src/components/Forms/FormControlLabelBase";

import QuizV2 from "src/squads/syllabus/models/quizV2";

export interface QuizMCQRadioHFProps {
    name: Path<QuizV2>;
    label?: string;
}

const QuizMCQRadioHF: FC<QuizMCQRadioHFProps> = ({ name, label }) => {
    const { getValues, setValue } = useFormContext<QuizV2>();
    const { field } = useController<QuizV2>({
        name,
    });

    const onChange = useCallback(
        (_, checked: boolean) => {
            const answers = getValues<"answer.list">("answer.list");
            answers.forEach((_, index) => {
                setValue(`answer.list.${index}.correct`, false);
            });
            field.onChange(checked);
        },
        [field, getValues, setValue]
    );

    return (
        <FormControlLabelBase
            label={label}
            control={
                <Radio
                    data-testid="QuizMCQRadioHF__radio"
                    color="primary"
                    {...field}
                    checked={field.value}
                    onChange={onChange}
                />
            }
        />
    );
};

export default QuizMCQRadioHF;
