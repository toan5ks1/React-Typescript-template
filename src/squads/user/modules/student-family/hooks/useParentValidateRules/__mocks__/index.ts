import debounce from "lodash/debounce";
import { REGEX_VALIDATE_EMAIL } from "src/common/constants/const";

import { UseParentValidateRulesReturn } from "../useParentValidateRules";

const required: UseParentValidateRulesReturn["required"] = {
    value: true,
    message: "message",
};

const pattern: UseParentValidateRulesReturn["pattern"] = {
    email: {
        value: REGEX_VALIDATE_EMAIL,
        message: "message",
    },
};

const validate: UseParentValidateRulesReturn["validate"] = {
    email: debounce(() => Promise.resolve(undefined), 500, {
        leading: true,
    }),
    phone: () => Promise.resolve(undefined),
    relationship: () => Promise.resolve(undefined),
};

export default (): UseParentValidateRulesReturn => {
    return {
        required,
        pattern,
        validate,
    };
};
