import { Entities } from "src/common/constants/enum";

import { Input } from "@mui/material";

import { QuizOptionConfig } from "manabie-yasuo/quiz_pb";

import { BaseSelectProps } from "../BaseSelect";
import { createSelectFromEnum, defaultSelectOptions } from "../select-utils";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const Select = createSelectFromEnum(QuizOptionConfig, {
    ...defaultSelectOptions,
    createTranslatorKey: (key) => `resources.choices.answerConfigs.${key}`,
    label: `resources.${Entities.QUIZZES}.answerConfigs`,
});

const AnswerConfigSelect = ({ value, ...rest }: BaseSelectProps<QuizOptionConfig>) => {
    const t = useTranslate();

    const renderSelected = (selected: unknown) =>
        (selected as string[]).map((key) => t(`resources.choices.answerConfigs.${key}`)).join(", ");

    return (
        <Select
            {...rest}
            multiple
            input={<Input />}
            variant="outlined"
            value={value}
            renderValue={renderSelected}
        />
    );
};

export default AnswerConfigSelect;
