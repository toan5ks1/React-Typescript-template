import { createContext, PropsWithChildren } from "react";

import { TimesheetRules } from "src/squads/timesheet/internals/permission/rules";
import { UserGroupKeys } from "src/typings/remote";

import {
    ManaPermission,
    Ability,
    AbilityType,
    useAbility,
} from "@manabie-com/role-based-permission";

export const PermissionContext = createContext<Ability<AbilityType<TimesheetRules>>>(new Ability());

export interface PermissionProviderProps {
    value: ManaPermission<UserGroupKeys, TimesheetRules>;
}

export const PermissionProvider = ({
    children,
    value,
}: PropsWithChildren<PermissionProviderProps>) => {
    return (
        <PermissionContext.Provider value={value.getInstance()}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermission = () => useAbility(PermissionContext);

export default PermissionProvider;
