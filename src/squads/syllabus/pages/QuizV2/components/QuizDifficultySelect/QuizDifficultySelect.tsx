import { FC } from "react";

import { Entities } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { DifficultyLevels } from "src/squads/syllabus/models/quiz";
import { $enum } from "ts-enum-util";

import SelectHF from "src/components/Select/SelectHF";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const difficultyValues = $enum(DifficultyLevels).getValues();

const difficultyOptions: OptionSelectType[] = difficultyValues.map((value) => ({
    id: value,
    value: value.toString(),
}));

const QuizDifficultySelect: FC = () => {
    const t = useResourceTranslate(Entities.QUIZZES);

    return (
        <SelectHF name="difficultyLevel" label={t("difficultyLevel")} options={difficultyOptions} />
    );
};

export default QuizDifficultySelect;
