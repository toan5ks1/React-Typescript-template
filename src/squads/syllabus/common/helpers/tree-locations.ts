import { NsMasterDataReaderService } from "src/squads/syllabus/services/bob/master-reader-service/type";

import {
    NodeLocationProps,
    TreeLocationProps,
} from "src/squads/syllabus/hooks/useMapTreeLocations";

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
) => {
    if (root.locationId === id) {
        Object.assign(result, root);
    }
    if (root.children && root.children?.length !== 0) {
        for (const child of root.children) getNodeTreeByRecursive(child, id, result);
    }
    return result;
};
