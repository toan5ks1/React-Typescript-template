import { NsMasterDataReaderService } from "src/squads/user/service/bob/master-data-reader-bob/types";

import { LocationInformation } from "../types";

import type {
    TreeLocationProps,
    NodeLocationProps,
} from "src/squads/user/hooks/useMapTreeLocations";

interface GetLeafLocationsByRecursiveProps {
    node: TreeLocationProps;
    result?: NsMasterDataReaderService.LocationObjectResponse[];
}

export function getLeafLocationsByRecursive(
    props: GetLeafLocationsByRecursiveProps
): NsMasterDataReaderService.LocationObjectResponse[] {
    const { node, result = [] } = props;

    if (!node.children?.length) result.push(node);

    if (node?.children)
        for (const child of node.children) getLeafLocationsByRecursive({ node: child, result });

    return result;
}
export function flatTreeLocationByRecursive(
    root: TreeLocationProps,
    arrayFlat: NodeLocationProps[] = []
) {
    const copyRoot = { ...root };
    delete copyRoot.children;
    arrayFlat.push(copyRoot);

    if (root.children && root.children?.length !== 0) {
        for (const child of root.children) flatTreeLocationByRecursive(child, arrayFlat);
    }
    return arrayFlat;
}

export const getNodeTreeByRecursive = (
    root: TreeLocationProps,
    id: string = "",
    result: TreeLocationProps = {
        locationId: "",
        name: "",
        locationType: "",
        parentLocationId: "",
        accessPath: "",
    }
): TreeLocationProps => {
    if (result.locationId) return result;
    if (root.locationId === id) {
        Object.assign(result, root);
    }
    if (root.children && root.children?.length !== 0) {
        for (const child of root.children) getNodeTreeByRecursive(child, id, result);
    }
    return result;
};

export const getParentLocationNameByRecursive = (
    root: TreeLocationProps = {
        locationId: "",
        name: "",
        locationType: "",
        parentLocationId: "",
        accessPath: "",
    },
    selectedLocations: LocationInformation[]
) => {
    if (root.children && root.children?.length !== 0) {
        for (const child of root.children) {
            getParentLocationNameByRecursive(child, selectedLocations);
        }
        const locationsInParent = root.children!.filter(
            (c) => selectedLocations.findIndex((l) => l.locationId === c.locationId) >= 0
        );
        if (locationsInParent.length === root.children?.length) {
            locationsInParent.forEach((l) => {
                const index = selectedLocations.findIndex((r) => r.locationId === l.locationId);
                selectedLocations.splice(index, 1);
            });
            selectedLocations.push(root);
        }
    }
    return selectedLocations;
};
export const getAncestralLocationByAccessPath = (
    accessPath: string,
    checkedList: LocationInformation[]
): LocationInformation | undefined => {
    const slashIndex = accessPath.lastIndexOf("/");
    const parentAccessPath = accessPath.substring(0, slashIndex);
    const ancestralLocation = checkedList?.find(
        (location) => location.accessPath === parentAccessPath
    );
    if (parentAccessPath.lastIndexOf("/") !== -1 && !ancestralLocation) {
        return getAncestralLocationByAccessPath(parentAccessPath, checkedList);
    }
    return ancestralLocation;
};

export const getAncestralChildrenLocation = (
    node: TreeLocationProps,
    accessPath: string,
    result: TreeLocationProps[] = []
): TreeLocationProps[] => {
    const children = node.children?.filter((location) => !location.disabled) || [];
    const index = children?.findIndex((location) => accessPath.includes(location.accessPath));
    if (index !== -1 && children.length) {
        const selectedAncestor = children?.splice(index, 1);
        result = result.concat(children);
        return getAncestralChildrenLocation(selectedAncestor[0], accessPath, result);
    }
    return result;
};
