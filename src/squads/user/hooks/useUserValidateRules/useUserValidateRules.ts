import type { DebouncedFunc } from "lodash";
import debounce from "lodash/debounce";
import { REGEX_VALIDATE_EMAIL } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { UserByEmailQueryVariables } from "src/squads/user/service/bob/bob-types";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface UseUserValidateRulesReturn {
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

//TODO: This hook for student v1
const useUserValidateRules = () => {
    const tResource = useResourceTranslate(ERPModules.STUDENTS);
    const t = useTranslate();

    const EMAIL = tResource("descriptions.email");
    const PHONE_NUMBER = tResource("descriptions.phoneNumber");

    const hasUserOnSystem = async (filter: UserByEmailQueryVariables) => {
        const result = await inferStandaloneQuery({
            entity: "users",
            action: "userGetOneUserByEmailOrPhone",
        })({
            filter: { ...filter },
        });

        if (result && arrayHasItem(result)) {
            return true;
        }
        return false;
    };

    const validateEmail = async (email: string) => {
        if (
            await hasUserOnSystem({
                email,
            })
        ) {
            return tResource("messages.error.exited", {
                field: EMAIL,
            });
        }
    };

    const validatePhone = async (phone: string) => {
        if (!phone) return;

        if (
            await hasUserOnSystem({
                phone_number: phone,
            })
        ) {
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

export default useUserValidateRules;
