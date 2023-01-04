import { Entities, MutationMenus } from "src/common/constants/enum";

import useFilterActionPermissions, {
    MapAction,
    UseFilterActionPermissionsReturn,
} from "../useFilterActionPermissions";

export interface UseCourseControlReturn extends UseFilterActionPermissionsReturn {
    mapActions: MapAction;
}

const mapActions: MapAction = {
    [MutationMenus.EDIT]: {
        action: MutationMenus.EDIT,
    },
    [MutationMenus.DELETE]: {
        action: "delete.course_delete",
    },
};

const useCourseControl = (): UseCourseControlReturn => {
    const { actions } = useFilterActionPermissions({ entity: Entities.COURSES, mapActions });

    return {
        mapActions,
        actions,
    };
};

export default useCourseControl;
