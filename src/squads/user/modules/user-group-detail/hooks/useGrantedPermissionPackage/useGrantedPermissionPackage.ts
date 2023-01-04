import { useMemo } from "react";

import { arrayHasItem } from "src/common/utils/other";
import { LocationInformation } from "src/squads/user/common/types";
import { GrantedPermission, GrantedRoleAccessPath } from "src/squads/user/common/types/user-group";
import { inferQuery, inferQueryPagination } from "src/squads/user/service/infer-service";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

const useGrantedPermissionPackage = (id: string) => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const {
        data: grantedRoles,
        result: { isFetching: isFetchingGrantedRole, refetch: refetchGrantedRole },
        pagination,
    } = inferQueryPagination({
        entity: "grantedRole",
        action: "userGetManyGrantedRoleWithFilter",
    })(
        {
            filter: {
                user_group_id: id,
            },
        },
        {
            enabled: !!id,
            onError(error) {
                window.warner?.warn(`Fetch granted role data`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const grantedRoleIds = useMemo(
        () => grantedRoles?.data?.map((grantedRole) => grantedRole.granted_role_id) || [],
        [grantedRoles]
    );

    const {
        data: grantedRoleList = [],
        isFetching: isFetchingLocation,
        refetch: refetchGrantedRoleAccessPath,
    } = inferQuery({
        entity: "grantedRoleAccessPath",
        action: "userGetManyGrantedRoleAccessPath",
    })(
        { granted_role_ids: grantedRoleIds },
        {
            enabled: arrayHasItem(grantedRoleIds),
            onError(error) {
                window.warner?.warn(`Fetch granted role access path data`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const mappedGrantedRoles = new Map<string, LocationInformation[]>();
    grantedRoleList.forEach(({ granted_role_id, location }: GrantedRoleAccessPath) => {
        if (granted_role_id) {
            const locations = mappedGrantedRoles.get(granted_role_id) || [];
            const mappedLocation: LocationInformation = {
                locationId: location.location_id,
                name: location.name,
                isArchived: location.is_archived,
                parentLocationId: location.parent_location_id || "",
                accessPath: location.access_path || "",
                locationType: location.location_type || "",
            };
            mappedGrantedRoles.set(granted_role_id, [...locations, mappedLocation]);
        }
    });

    const grantedPermissionPackage: GrantedPermission[] =
        grantedRoles?.data?.map((grantedRole) => {
            const grantedRoleLocations = mappedGrantedRoles.get(grantedRole.granted_role_id) || [];
            return {
                granted_role_id: grantedRole.granted_role_id,
                role: grantedRole.role,
                locations: grantedRoleLocations,
            };
        }) || [];

    return {
        grantedPermissionPackage,
        isLoading: isFetchingGrantedRole || isFetchingLocation,
        pagination,
        refetch: async () => {
            await refetchGrantedRole();
            await refetchGrantedRoleAccessPath();
        },
    };
};

export default useGrantedPermissionPackage;
