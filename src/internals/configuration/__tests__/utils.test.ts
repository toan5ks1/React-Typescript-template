import { UserRoles } from "src/common/constants/const";
import { PjOwner } from "src/typings/configuration";

import { getTenantConfigNameFromTenantID, getVariantsImport, getVersionOwner } from "../utils";

const mockData = {
    "manabie-p7muf": "manabie",
    "renseikai-5ayyd": "renseikai",
    "aic-school-xhy07": "aic",
    "e2e-tokyo-1lpnq": "tokyo",
    "end-to-end-school-5xn27": "e2e",
    "prod-ga-uq2rq": "ga",
    "prod-synersia-trscc": "synersia",
    "prod-e2e-tokyo-2k4xb": "tokyo",
    "prod-test-2k4xb": "",
    "e2e-test-2k4xb": "",
    "test-2k4xb": "",
};

describe("configuration utils", () => {
    it("getTenantConfigNameFromTenantID should return correct tenant", () => {
        const listTenantIDAfterConvert = Object.keys(mockData).map((tenantId) =>
            getTenantConfigNameFromTenantID(tenantId)
        );

        const listOrganizations = Object.values(mockData);

        expect(listTenantIDAfterConvert).toMatchObject(listOrganizations);
    });
});

describe("getVersionOwner", () => {
    it("should return jprep if owner is PjOwner.JPREP", () => {
        expect(getVersionOwner(PjOwner.JPREP)).toEqual("jprep");
    });

    it("should return manabie if owner is the others PJOwner", () => {
        expect(getVersionOwner(PjOwner.RENSEIKAI)).toEqual("manabie");
    });
});

describe("getVariantsImport", () => {
    it("should return import path based on owner and role", () => {
        expect(getVariantsImport(PjOwner.MANABIE, UserRoles.USER_GROUP_SCHOOL_ADMIN)).toEqual(
            `./variants/${PjOwner.MANABIE}/${UserRoles.USER_GROUP_SCHOOL_ADMIN}.ts`
        );
    });
});
