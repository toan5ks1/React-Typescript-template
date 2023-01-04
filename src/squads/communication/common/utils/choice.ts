import { ERPModules } from "src/common/constants/enum";
import { convertToChoices } from "src/common/utils/choice";
import { KeyQuestionTypes } from "src/squads/communication/common/constants/const";

export const questionTypeChoice = convertToChoices(
    KeyQuestionTypes,
    "questionType",
    ERPModules.NOTIFICATIONS
);
