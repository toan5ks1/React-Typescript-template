import { createSelectFromEnum, defaultSelectOptions } from "../select-utils";

import { LanguageEnums } from "src/squads/syllabus/typings/i18n-provider";

const LanguageSelect = createSelectFromEnum(LanguageEnums, {
    ...defaultSelectOptions,
    createTranslatorKey: (key) => `resources.choices.languages.${key}`,
    label: `ra.common.language`,
});

export default LanguageSelect;
