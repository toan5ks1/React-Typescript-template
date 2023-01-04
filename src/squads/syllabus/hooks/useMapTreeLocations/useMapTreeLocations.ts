import { handleUnknownError } from "src/common/utils/error";
import { LocationInformation } from "src/squads/syllabus/common/types/common";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import logger from "../../internals/logger";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface TreeLocationProps extends LocationInformation {
    children?: TreeLocationProps[];
    disabled?: boolean;
    level?: number;
}
export interface NodeLocationProps extends LocationInformation {
    disabled?: boolean;
    level?: number;
}

interface BuildTreeLocationsReturn {
    roots: TreeLocationProps[];
    maxLevel: number;
}

interface UseMapTreeLocationsReturn {
    treeLocations: TreeLocationProps[];
    isLoading: boolean;
}

const shouldDisableParent = (parent: TreeLocationProps) => {
    const children = parent.children?.filter((child) => child.disabled !== true);
    return children?.length === 0;
};

// Remove invalid location
export function removeInvalidNodeByRecursive(
    root: TreeLocationProps,
    highestLevel: number = 3,
    parent: TreeLocationProps = {
        locationId: "",
        name: "",
        locationType: "",
        parentLocationId: "",
        accessPath: "",
    }
): TreeLocationProps {
    if (root.level! < highestLevel && root.children?.length === 0) {
        parent.children?.forEach((p) => {
            if (p.locationId === root.locationId) {
                Object.assign(root, { ...root, disabled: true });
            }
        });
        if (shouldDisableParent(parent)) {
            Object.assign(parent, { ...parent, disabled: true });
        }
    }

    if (root.children && root.children?.length !== 0) {
        for (const child of root.children) removeInvalidNodeByRecursive(child, highestLevel, root);
    }

    return root;
}

// arrange and build location tree
const buildTreeLocations = (locations: LocationInformation[]): BuildTreeLocationsReturn => {
    const map = new Map<string, number>();
    const roots: TreeLocationProps[] = [];
    let maxLevel = 0;

    locations.forEach((location, i) => {
        map.set(location.locationId, i);
        location["children"] = [];
    });

    locations.forEach((location) => {
        if (location.parentLocationId === "") return roots.push(location);
        const indexChild = map.get(location.parentLocationId) || 0;
        const level = location.accessPath.split("/").length - 1;

        if (level > maxLevel) maxLevel = level;

        locations[indexChild]["children"].push({ ...location, level });
    });

    return { roots, maxLevel };
};

export default function useMapTreeLocations(): UseMapTreeLocationsReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { isLoading: loadingLocations, data: dataLocation } = inferQuery({
        entity: "masterReader",
        action: "masterReaderGetLocation",
    })<NodeLocationProps[], TreeLocationProps[]>(undefined, {
        enabled: true,
        onError: (err) => {
            const error = handleUnknownError(err);
            showSnackbar(t(error.message), "error");
            logger.warn("Get locations was fail", error);
        },
        selector: (locations) => {
            const { roots, maxLevel } = buildTreeLocations(locations);
            return removeInvalidNodeByRecursive(roots[0], maxLevel).children || [];
        },
    });

    return {
        treeLocations: dataLocation || [],
        isLoading: loadingLocations,
    };
}
