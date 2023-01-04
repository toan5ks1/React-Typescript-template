import { Entities } from "src/common/constants/enum";
import { HandwritingLanguages } from "src/squads/syllabus/models/quiz";

import { createSelectFromEnum, defaultSelectOptions } from "../Selects/select-utils";

// TODO: [LT-17086] Refactor legacy component
const HandwritingSetting = createSelectFromEnum(HandwritingLanguages, {
    ...defaultSelectOptions,
    createTranslatorKey: (key) =>
        `resources.${Entities.QUIZZES}.choices.handwritingLanguage.${key}`,
    label: `resources.${Entities.QUIZZES}.handwriting`,
});

export default HandwritingSetting;
