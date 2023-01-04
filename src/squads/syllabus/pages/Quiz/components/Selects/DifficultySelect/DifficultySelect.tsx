import { Entities } from "src/common/constants/enum";
import { DifficultyLevels } from "src/squads/syllabus/models/quiz";

import { createSelectFromEnum } from "../select-utils";

const DifficultySelect = createSelectFromEnum(DifficultyLevels, {
    label: `resources.${Entities.QUIZZES}.difficultyLevel`,
});

export default DifficultySelect;
