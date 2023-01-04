import { isValidPhoneNumber } from "libphonenumber-js";
import type { DebouncedFunc } from "lodash";
import debounce from "lodash/debounce";
import { useWatch } from "react-hook-form";
import { COUNTRY_INFO, REGEX_VALIDATE_EMAIL } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface UseStudentInfoRulesReturn {
    required: {
        value: boolean;
        message: string;
    };
    pattern: {
        email: {
            value: RegExp;
            message: string;
        };
    };
    validate: {
        email: DebouncedFunc<(email: string) => Promise<string | undefined>>;
        phone: (value: string) => Promise<string | undefined>;
    };
}

const useStudentInfoRules = (): UseStudentInfoRulesReturn => {
    const tResource = useResourceTranslate(ERPModules.STUDENTS);
    const t = useTranslate();

    const EMAIL = tResource("descriptions.email");
    const PHONE_NUMBER = tResource("descriptions.phoneNumber");

    const [countryCode, studentId]: [number, string] = useWatch({
        name: ["generalInfo.countryCode", "generalInfo.studentId"],
    });

    const checkExistedUser = async (filter: Object) => {
        const result = await inferStandaloneQuery({
            entity: "users",
            action: "userGetOneUserByEmailOrPhone",
        })({
            filter: { ...filter, user_id: studentId },
        });

        if (result && arrayHasItem(result)) {
            return true;
        }
        return false;
    };

    const validateEmail = async (email: string) => {
        if (await checkExistedUser({ email })) {
            return tResource("messages.error.exited", {
                field: EMAIL,
            });
        }
    };

    const validatePhone = async (phone: string) => {
        if (!phone) return;

        if (!isValidPhoneNumber(phone, COUNTRY_INFO[countryCode].countryCode)) {
            return tResource("messages.error.invalid", { field: PHONE_NUMBER });
        }

        if (await checkExistedUser({ phone_number: phone })) {
            return tResource("messages.error.exited", { field: PHONE_NUMBER });
        }
    };

    return {
        required: {
            value: true,
            message: t("resources.input.error.required"),
        },
        pattern: {
            email: {
                value: REGEX_VALIDATE_EMAIL,
                message: tResource("messages.error.invalid", { field: EMAIL }),
            },
        },
        validate: {
            email: debounce(validateEmail, 500, {
                leading: true,
            }),
            phone: validatePhone,
        },
    };
};

export default useStudentInfoRules;
