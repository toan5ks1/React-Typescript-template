import debounce from "lodash/debounce";
import { REGEX_VALIDATE_EMAIL } from "src/common/constants/const";

import { UseUserValidateRulesReturn } from "../useUserValidateRules";

const required: UseUserValidateRulesReturn["required"] = {
    value: true,
    message: "message",
};
const pattern: UseUserValidateRulesReturn["pattern"] = {
    email: {
        value: REGEX_VALIDATE_EMAIL,
        message: "message",
    },
};
const validate: UseUserValidateRulesReturn["validate"] = {
    email: debounce(() => Promise.resolve(undefined), 500, {
        leading: true,
    }),
    phone: () => Promise.resolve(undefined),
};

export default (): UseUserValidateRulesReturn => ({
    required,
    pattern,
    validate,
});
