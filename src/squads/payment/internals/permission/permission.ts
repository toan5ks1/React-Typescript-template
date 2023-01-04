import { UserRoles } from "src/common/constants/const";
// TODO: Update when configuration is moved to mana-packs
import appConfigs from "src/internals/configuration";
import { getVariantsImport, getVersionOwner } from "src/internals/configuration/utils";
import { PaymentRules } from "src/squads/payment/internals/permission/rules";
import { TypeEntity } from "src/squads/payment/typings/react-admin";
import { UserGroupKeys } from "src/squads/payment/typings/remote";

import {
    Ability,
    AbilityType,
    ManaPermission,
    RawRuleOf,
} from "@manabie-com/role-based-permission";

export type IPageResourceProperties = {
    key: TypeEntity;
    name: TypeEntity;
};

export enum AbilityAllows {
    CREATE = "create",
    EDIT = "edit",
    DELETE = "delete",
    SHOW = "show",
    LIST = "list",
}

async function defineAbilityFor(
    ability: Ability<AbilityType<PaymentRules>>,
    roles: UserGroupKeys | UserGroupKeys[]
) {
    const owner = appConfigs.getCurrentPjOwner();
    const versionOwner = getVersionOwner(owner);

    const allRolesPermission = import.meta.globEager<{
        default: RawRuleOf<Ability<AbilityType<PaymentRules>>>[];
    }>("./variants/**/*.ts");

    const rolesList = typeof roles === "string" ? [roles] : roles;

    try {
        const rules = rolesList
            .map((role) => allRolesPermission[getVariantsImport(versionOwner, role)]["default"])
            .flat();

        ability.update(rules);
    } catch (error) {
        window.warner?.warn("permission", error);
    }

    return ability;
}

export function isTeacher(userGroup: UserGroupKeys | UserGroupKeys[]) {
    return typeof userGroup === "string"
        ? userGroup === UserRoles.USER_GROUP_TEACHER
        : userGroup.includes(UserRoles.USER_GROUP_TEACHER);
}

export function isSchoolAdmin(userGroup: UserGroupKeys | UserGroupKeys[]) {
    return typeof userGroup === "string"
        ? userGroup === UserRoles.USER_GROUP_SCHOOL_ADMIN
        : userGroup.includes(UserRoles.USER_GROUP_SCHOOL_ADMIN);
}

export type AppPermission = ManaPermission<UserGroupKeys, PaymentRules>;
const permission: AppPermission = new ManaPermission<UserGroupKeys, PaymentRules>(defineAbilityFor);

export default permission;
