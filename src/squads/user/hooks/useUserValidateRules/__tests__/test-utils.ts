import { REGEX_VALIDATE_EMAIL } from "src/common/constants/const";

import { UseUserValidateRulesReturn } from "../useUserValidateRules";

interface UseUserValidateRulesMessagesReturn {
    exited: string;
    hasOnList: string;
    hasOnGeneralInfo: string;
    invalid: string;
}

interface UseUserValidateRulesMockReturn {
    required: UseUserValidateRulesReturn["required"];
    pattern: UseUserValidateRulesReturn["pattern"];
    messages: UseUserValidateRulesMessagesReturn;
}

const required: UseUserValidateRulesReturn["required"] = {
    value: true,
    message: "resources.input.error.required",
};

const pattern: UseUserValidateRulesReturn["pattern"] = {
    email: {
        value: REGEX_VALIDATE_EMAIL,
        message: "messages.error.invalid",
    },
};

const messages: UseUserValidateRulesMessagesReturn = {
    exited: "messages.error.exited",
    hasOnList: "messages.error.hasInsertedOnListParents",
    hasOnGeneralInfo: "messages.error.hasInsertedOnGeneralInfo",
    invalid: "messages.error.invalid",
};

export const mockExpectResult: UseUserValidateRulesMockReturn = {
    required,
    pattern,
    messages,
};
