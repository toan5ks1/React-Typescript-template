import { createContext, PropsWithChildren } from "react";

import { Rules } from "src/internals/permission/rules";
import { UserGroupKeys } from "src/typings/remote";

import {
    ManaPermission,
    Ability,
    AbilityType,
    useAbility,
} from "@manabie-com/role-based-permission";

export const PermissionContext = createContext<Ability<AbilityType<Rules>>>(new Ability());

export interface PermissionProviderProps {
    value: ManaPermission<UserGroupKeys, Rules>;
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
