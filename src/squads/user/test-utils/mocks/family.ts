import { REGEX_VALIDATE_EMAIL } from "src/common/constants/const";
import { CreateParentFormProps, ParentUpdateInfo } from "src/squads/user/common/types";

import { Country } from "manabuf/common/v1/enums_pb";
import { FamilyRelationship } from "manabuf/usermgmt/v2/enums_pb";

import { UseParentValidateRulesReturn } from "src/squads/user/modules/student-family/hooks/useParentValidateRules";
import { UseParentsListReturn } from "src/squads/user/modules/student-family/hooks/useParentsList";

export const mockParentUpdate: ParentUpdateInfo = {
    index: 1,
    parent: {
        countryCode: Country.COUNTRY_VN,
        email: "test@manabie.com",
        name: "test_name_parent",
        phoneNumber: "0321111111",
        relationship: FamilyRelationship.FAMILY_RELATIONSHIP_FATHER,
    },
};

export const useParentsListDataMock: UseParentsListReturn["parents"] = [
    {
        user_id: "parent_01",
        name: "Parent",
        email: "parent+parent_01@gmail.com",
        phone_number: "0233429896",
        country: "COUNTRY_JP",
    },
    {
        user_id: "parent_02",
        name: "Mother",
        email: "parent+parent_02@gmail.com",
        phone_number: "0233429896",
        country: "COUNTRY_JP",
    },
];

interface UseParentValidateRulesMessagesReturn {
    exited: string;
    hasOnList: string;
    hasOnGeneralInfo: string;
    invalid: string;
}

interface UseParentValidateRulesMockReturn {
    required: UseParentValidateRulesReturn["required"];
    pattern: UseParentValidateRulesReturn["pattern"];
    messages: UseParentValidateRulesMessagesReturn;
}

const required: UseParentValidateRulesReturn["required"] = {
    value: true,
    message: "resources.input.error.required",
};

const pattern: UseParentValidateRulesReturn["pattern"] = {
    email: {
        value: REGEX_VALIDATE_EMAIL,
        message: "messages.error.invalid",
    },
};

const messages: UseParentValidateRulesMessagesReturn = {
    exited: "messages.error.exited",
    hasOnList: "messages.error.hasInsertedOnListParents",
    hasOnGeneralInfo: "messages.error.hasInsertedOnGeneralInfo",
    invalid: "messages.error.invalid",
};

export const mockUseParentValidateRulesResult: UseParentValidateRulesMockReturn = {
    required,
    pattern,
    messages,
};

export type CreateMockParentUpsertParam = {
    id: string;
    relationship?: FamilyRelationship;
    country?: string;
};
export const createMockParentUpsertInfo = ({
    id,
    country = "COUNTRY_JP",
    relationship = FamilyRelationship.FAMILY_RELATIONSHIP_FATHER,
}: CreateMockParentUpsertParam): CreateParentFormProps => ({
    countryCode: Country[country],
    name: `Parent Name ${id}`,
    userId: id,
    email: `parent_email_${id}@manabie.com`,
    phoneNumber: "0322222222",
    relationship: relationship,
});
