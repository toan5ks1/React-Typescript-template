import type { DebouncedFunc } from "lodash";
import debounce from "lodash/debounce";
import { useFormContext } from "react-hook-form";
import { REGEX_VALIDATE_EMAIL } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface UseStaffInfoRulesReturn {
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
    };
}

const useStaffInfoRules = () => {
    const tResource = useResourceTranslate(ERPModules.STUDENTS);
    const t = useTranslate();

    const { getValues } = useFormContext();
    const staffId = getValues("staffId");

    const EMAIL = tResource("descriptions.email");

    const hasUserOnSystem = async (filter: Object) => {
        const result = await inferStandaloneQuery({
            entity: "users",
            action: "userGetOneUserByEmailOrPhone",
        })({
            filter: {
                ...filter,
                user_id: staffId,
            },
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
        },
    };
};

export default useStaffInfoRules;
