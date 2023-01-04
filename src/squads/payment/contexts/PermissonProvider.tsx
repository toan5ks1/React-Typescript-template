import { createContext, PropsWithChildren } from "react";

import { PaymentRules } from "src/squads/payment/internals/permission/rules";
import { UserGroupKeys } from "src/squads/payment/typings/remote";

import {
    ManaPermission,
    Ability,
    AbilityType,
    useAbility,
} from "@manabie-com/role-based-permission";

export const PermissionContext = createContext<Ability<AbilityType<PaymentRules>>>(new Ability());

export interface PermissionProviderProps {
    value: ManaPermission<UserGroupKeys, PaymentRules>;
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
