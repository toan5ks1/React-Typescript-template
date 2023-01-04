import { useMemo } from "react";

import { MutationMenus } from "src/common/constants/enum";
import { SyllabusRules } from "src/squads/syllabus/internals/permission/rules";

import { Action, CustomAction } from "src/components/Menus/ActionPanel";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";
import useSyllabusPermission from "src/squads/syllabus/hooks/useSyllabusPermission";

export interface MapActionModel {
    action: ActionKeys<SyllabusRules, SubjectKeys<SyllabusRules>>;
}

export type MapAction = {
    [x in MutationMenus]?: MapActionModel;
};

export interface UseFilterActionPermissionsReturn {
    actions: Action[];
}

export interface UseFilterActionPermissionParams {
    entity: SubjectKeys<SyllabusRules>;
    customActions?: { [x: string]: CustomAction };
    mapActions: MapAction;
}

const useFilterActionPermissions = ({
    entity,
    customActions = {},
    mapActions,
}: UseFilterActionPermissionParams): UseFilterActionPermissionsReturn => {
    const { permission } = useSyllabusPermission();

    const actions: Action[] = useMemo(() => {
        const entries = Object.entries<MapActionModel>(mapActions);

        return entries
            .filter(([, { action }]) => permission.can(entity, action))
            .map(([key]) => customActions[key] || (key as MutationMenus));
    }, [permission, entity, customActions, mapActions]);

    return { actions };
};

export default useFilterActionPermissions;
