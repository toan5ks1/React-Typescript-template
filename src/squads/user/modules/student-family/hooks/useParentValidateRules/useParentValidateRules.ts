import { isValidPhoneNumber } from "libphonenumber-js";
import type { DebouncedFunc } from "lodash";
import debounce from "lodash/debounce";
import { useWatch } from "react-hook-form";
import { COUNTRY_INFO, REGEX_VALIDATE_EMAIL } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { ParentUpdateInfo, UserByEmailOrPhoneQuery } from "src/squads/user/common/types";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import { FamilyRelationship } from "manabuf/usermgmt/v2/enums_pb";

import { StudentParentDataType } from "src/squads/user/hooks/useParentMapStudent";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

export interface UseParentValidateRulesReturn {
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
        relationship: (value: number) => Promise<string | undefined>;
    };
}

type FilterByEmailOrPhone = {
    email?: UserByEmailOrPhoneQuery["email"];
    phone_number?: UserByEmailOrPhoneQuery["phone_number"];
};

export default function useParentValidateRules(
    parents: StudentParentDataType[],
    parentUpdate?: ParentUpdateInfo
): UseParentValidateRulesReturn {
    const tResource = useResourceTranslate(ERPModules.STUDENTS);
    const t = useTranslate();

    const EMAIL = tResource("descriptions.email");
    const PHONE_NUMBER = tResource("descriptions.phoneNumber");
    const indexParent = parentUpdate?.index;

    const countryCode: number = useWatch({ name: "countryCode" });
    const isShowRelationship = useUserFeatureToggle(
        "STUDENT_MANAGEMENT_STUDENT_RELATIONSHIP_PARENTS"
    );
    const hasUserOnSystem = async (filter: FilterByEmailOrPhone) => {
        const result = await inferStandaloneQuery({
            entity: "users",
            action: "userGetOneUserByEmailOrPhone",
        })({
            filter: { ...filter, user_id: parentUpdate?.parent.userId },
        });

        if (result && arrayHasItem(result)) {
            return true;
        }
        return false;
    };

    const validateEmail = async (email: string) => {
        const hasEmailInListParent = parents.some(
            (parent, index) => parent.parent_user?.email === email && index !== indexParent
        );

        if (hasEmailInListParent)
            return tResource("messages.error.hasInsertedOnListParents", {
                field: EMAIL,
            });

        if (await hasUserOnSystem({ email }))
            return tResource("messages.error.exited", { field: EMAIL });
    };

    const validateRelationship = async (relationship: number) => {
        const isUseNewRelationship = ![
            FamilyRelationship.FAMILY_RELATIONSHIP_FATHER,
            FamilyRelationship.FAMILY_RELATIONSHIP_MOTHER,
        ].includes(relationship);
        if (!isShowRelationship && isUseNewRelationship) return t("resources.input.error.required");
    };

    const validatePhone = async (phone: string) => {
        if (!phone) return;

        const hasPhoneInListParent = parents.some(
            (parent, index) => parent.parent_user?.phone_number === phone && index !== indexParent
        );

        if (hasPhoneInListParent)
            return tResource("messages.error.hasInsertedOnListParents", {
                field: PHONE_NUMBER,
            });

        if (!isValidPhoneNumber(phone, COUNTRY_INFO[countryCode].countryCode))
            return tResource("messages.error.invalid", { field: PHONE_NUMBER });

        if (await hasUserOnSystem({ phone_number: phone }))
            return tResource("messages.error.exited", { field: PHONE_NUMBER });
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
            relationship: validateRelationship,
        },
    };
}
