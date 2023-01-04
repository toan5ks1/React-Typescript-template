import { Entities } from "src/common/constants/enum";
import { LabelTypes } from "src/common/utils/label-generator";

import { createSelectFromEnum, defaultSelectOptions } from "../select-utils";

const ListLabelSelect = createSelectFromEnum(LabelTypes, {
    ...defaultSelectOptions,
    createTranslatorKey: (key: any) => `resources.choices.listTypes.${key}`,
    label: `resources.${Entities.QUIZZES}.listType`,
});

export default ListLabelSelect;
