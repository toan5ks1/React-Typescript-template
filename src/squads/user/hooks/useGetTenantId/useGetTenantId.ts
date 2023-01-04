import { isEmpty } from "lodash";
import { ArrayElement } from "src/common/constants/types";
import {
    GradesOfStudentsListQuery,
    Users_OrganizationsManyReferenceQuery,
} from "src/squads/user/service/bob/bob-types";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface GradeStudent extends ArrayElement<GradesOfStudentsListQuery["students"]> {}

export interface UseGetTenantIdReturn {
    getTenantIdByTenantName: (
        domainName: string
    ) => Promise<ArrayElement<Users_OrganizationsManyReferenceQuery["organizations"]>["tenant_id"]>;
}

function useGetTenantId(): UseGetTenantIdReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const getTenantIdByTenantName = async (domainName: string) => {
        const result = await inferStandaloneQuery({
            entity: "organizations",
            action: "userGetManyOrganizationsReference",
        })({ domain_name: domainName });

        if (isEmpty(result)) {
            showSnackbar(t("ra.manabie-error.specified.organization_not_found"), "error");
            return;
        }

        return result?.[0].tenant_id;
    };

    return { getTenantIdByTenantName };
}

export default useGetTenantId;
