import { createContext, PropsWithChildren } from "react";

import { CommunicationRules } from "src/squads/communication/internals/permission/rules";
import { UserGroupKeys } from "src/squads/communication/typings/remote";

import {
    ManaPermission,
    Ability,
    AbilityType,
    useAbility,
} from "@manabie-com/role-based-permission";

export const PermissionContext = createContext<Ability<AbilityType<CommunicationRules>>>(
    new Ability()
);

export interface PermissionProviderProps {
    value: ManaPermission<UserGroupKeys, CommunicationRules>;
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
