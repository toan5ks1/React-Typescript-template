import { PjOwner } from "src/typings/configuration";
import { UserGroupKeys } from "src/typings/remote";

type IdOfTenantType = {
    [key: string]: PjOwner;
};

const IdOfTenantStaging: IdOfTenantType = {
    "aic-school-xhy07": PjOwner.AIC,
    "ga-school-rtaas": PjOwner.GA,
    "manabie-p7muf": PjOwner.MANABIE,
    "renseikai-5ayyd": PjOwner.RENSEIKAI,
    "synersia-m3hr5": PjOwner.SYNERSIA,
    "e2e-tokyo-1lpnq": PjOwner.TOKYO,
    "end-to-end-school-5xn27": PjOwner.E2E,
};

const IdOfTenantProd: IdOfTenantType = {
    "prod-aic-u3d1m": PjOwner.AIC,
    "prod-ga-uq2rq": PjOwner.GA,
    "prod-manabie-bj1ok": PjOwner.MANABIE,
    "prod-renseikai-8xr29": PjOwner.RENSEIKAI,
    "prod-synersia-trscc": PjOwner.SYNERSIA,
    "prod-e2e-tokyo-2k4xb": PjOwner.TOKYO,
    "prod-end-to-end-og7nh": PjOwner.E2E,
};

export const getTenantConfigNameFromTenantID = (tenantId: string): string => {
    return IdOfTenantStaging[tenantId] || IdOfTenantProd[tenantId] || "";
};

export const unleashCommonConfig = {
    clientKey: "123",
    appName: "your-app-name",
};

export const getVersionOwner = (owner: PjOwner): PjOwner.MANABIE | PjOwner.JPREP => {
    if (owner === PjOwner.JPREP) return PjOwner.JPREP;
    return PjOwner.MANABIE;
};

export const getVariantsImport = (
    owner: PjOwner.MANABIE | PjOwner.JPREP,
    role: UserGroupKeys
): string => {
    return `./variants/${owner}/${role}.ts`;
};
