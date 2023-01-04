import { UserRoles } from "src/common/constants/const";
// TODO: Update when configuration is moved to mana-packs
import appConfigs from "src/internals/configuration";
import { getVariantsImport, getVersionOwner } from "src/internals/configuration/utils";
import { TypeEntity } from "src/squads/communication/typings/react-admin";
import { UserGroupKeys } from "src/squads/communication/typings/remote";

import { CommunicationRules } from "./rules";

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

type UserGroupRoles = UserGroupKeys | UserGroupKeys[];

async function defineAbilityFor(
    ability: Ability<AbilityType<CommunicationRules>>,
    roles: UserGroupRoles
) {
    const owner = appConfigs.getCurrentPjOwner();
    const versionOwner = getVersionOwner(owner);

    const allRolesPermission = import.meta.globEager<{
        default: RawRuleOf<Ability<AbilityType<CommunicationRules>>>[];
    }>("./variants/**/*.ts");

    const rolesList = typeof roles === "string" ? [roles] : roles;

    try {
        const rules = rolesList
            .map((role) => allRolesPermission[getVariantsImport(versionOwner, role)]["default"])
            .flat();

        ability.update(rules);
    } catch (error) {
        window.warner?.warn("communication permission", error);
    }

    return ability;
}

export function isTeacher(userGroup: UserGroupRoles) {
    return typeof userGroup === "string"
        ? userGroup === UserRoles.USER_GROUP_TEACHER
        : userGroup.includes(UserRoles.USER_GROUP_TEACHER);
}

export function isSchoolAdmin(userGroup: UserGroupRoles) {
    return typeof userGroup === "string"
        ? userGroup === UserRoles.USER_GROUP_SCHOOL_ADMIN
        : userGroup.includes(UserRoles.USER_GROUP_SCHOOL_ADMIN);
}

export type AppPermission = ManaPermission<UserGroupKeys, CommunicationRules>;

const permission: AppPermission = new ManaPermission<UserGroupKeys, CommunicationRules>(
    defineAbilityFor
);

export default permission;
