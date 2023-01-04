import { GlobalLocationItem, GlobalLocationTreeNode } from "src/typings/locations-provider";

import { turnLocationArrayIntoTree } from "src/hooks/useFetchGlobalLocations/useFetchGlobalLocations";

const transformLocations = (locationItems: GlobalLocationItem[]): GlobalLocationTreeNode[] => {
    const result: GlobalLocationTreeNode[] = locationItems.map((location) => ({
        isChecked: false,
        indeterminate: false,
        children: [],
        ...location,
    }));
    return result;
};
const assignChildrenForLocation = (
    parentLocation: GlobalLocationItem,
    children: GlobalLocationTreeNode[]
): GlobalLocationTreeNode => {
    const result: GlobalLocationTreeNode = {
        ...parentLocation,
        isChecked: false,
        indeterminate: false,
        children: transformLocations(children),
    };
    return result;
};
export const prefecture_1_1_centers: GlobalLocationItem[] = [
    {
        locationId: "center_1",
        name: "Location 1",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_1",
        isUnauthorized: false,
    },
    {
        locationId: "center_2",
        name: "Location 2",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_2",
        isUnauthorized: false,
    },
    {
        locationId: "center_3",
        name: "Location 3",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_3",
        isUnauthorized: false,
    },
    {
        locationId: "center_4",
        name: "Location 4",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_4",
        isUnauthorized: false,
    },
    {
        locationId: "center_5",
        name: "Location 5",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_5",
        isUnauthorized: false,
    },
    {
        locationId: "center_6",
        name: "Location 6",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_6",
        isUnauthorized: false,
    },
    {
        locationId: "center_7",
        name: "Location 7",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_7",
        isUnauthorized: false,
    },
    {
        locationId: "center_8",
        name: "Location 8",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_8",
        isUnauthorized: false,
    },
    {
        locationId: "center_9",
        name: "Location 9",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_9",
        isUnauthorized: false,
    },
    {
        locationId: "center_10",
        name: "Location 10",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_10",
        isUnauthorized: false,
    },
    {
        locationId: "center_11",
        name: "Location 11",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_11",
        isUnauthorized: false,
    },
    {
        locationId: "center_12",
        name: "Location 12",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_12",
        isUnauthorized: false,
    },
    {
        locationId: "center_13",
        name: "Location 13",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_1",
        accessPath: "org_1/brand_1/prefecture_1_1/center_13",
        isUnauthorized: false,
    },
];
export const prefecture_1_2_centers: GlobalLocationItem[] = [
    {
        locationId: "center_14",
        name: "Location 14",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_2",
        accessPath: "org_1/brand_1/prefecture_1_2/center_14",
        isUnauthorized: false,
    },
    {
        locationId: "center_15",
        name: "Location 15",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_1_2",
        accessPath: "org_1/brand_1/prefecture_1_2/center_15",
        isUnauthorized: false,
    },
];
export const prefecture_2_1_centers: GlobalLocationItem[] = [
    {
        locationId: "center_16",
        name: "Location 16",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_2_1",
        accessPath: "org_1/brand_2/prefecture_2_1/center_16",
        isUnauthorized: false,
    },
    {
        locationId: "center_17",
        name: "Location 17",
        locationType: "location_type_id_center_1",
        parentLocationId: "prefecture_2_1",
        accessPath: "org_1/brand_2/prefecture_2_1/center_17",
        isUnauthorized: false,
    },
];

export const brand_1_prefectures: GlobalLocationItem[] = [
    {
        locationId: "prefecture_1_1",
        name: "Nara prefecture",
        locationType: "location_type_id_prefecture_1",
        parentLocationId: "brand_1",
        accessPath: "org_1/brand_1/prefecture_1_1",
        isUnauthorized: false,
    },
    {
        locationId: "prefecture_1_2",
        name: "Osaka prefecture",
        locationType: "location_type_id_prefecture_1",
        parentLocationId: "brand_1",
        accessPath: "org_1/brand_1/prefecture_1_2",
        isUnauthorized: false,
    },
];

export const brand_2_prefectures: GlobalLocationItem[] = [
    {
        locationId: "prefecture_2_1",
        name: "Test prefecture",
        locationType: "location_type_id_prefecture_1",
        parentLocationId: "brand_2",
        accessPath: "org_1/brand_2/prefecture_2_1",
        isUnauthorized: false,
    },
];

export const org_1_brands: GlobalLocationItem[] = [
    {
        locationId: "brand_1",
        name: "Individual Brand",
        locationType: "location_type_id_brand_1",
        parentLocationId: "org_1",
        accessPath: "org_1/brand_1",
        isUnauthorized: false,
    },
    {
        locationId: "brand_2",
        name: "Group Brand",
        locationType: "location_type_id_brand_1",
        parentLocationId: "org_1",
        accessPath: "org_1/brand_2",
        isUnauthorized: false,
    },
];

export const org_1: GlobalLocationItem = {
    locationId: "org_1",
    name: "Organization",
    locationType: "location_type_id_org_1",
    parentLocationId: "",
    accessPath: "org_1",
    isUnauthorized: false,
};

export const mockFlatLocations: GlobalLocationItem[] = [
    org_1,
    ...org_1_brands,
    ...brand_1_prefectures,
    ...brand_2_prefectures,
    ...prefecture_1_1_centers,
    ...prefecture_1_2_centers,
    ...prefecture_2_1_centers,
];

export const mockUnauthorizedLocationNode: GlobalLocationTreeNode = {
    locationId: "center_unauthorized",
    name: "unauthorized_Location",
    locationType: "location_type_unauthorized",
    parentLocationId: "",
    accessPath: "",
    isChecked: false,
    indeterminate: false,
    isUnauthorized: true,
};

export const mockAuthorizedLocationNode: GlobalLocationTreeNode = {
    locationId: "center_authorized",
    name: "authorized Location",
    locationType: "location_type_authorized",
    parentLocationId: "",
    accessPath: "",
    isChecked: false,
    indeterminate: false,
    isUnauthorized: false,
};

export const createMockLocationsObject = () => {
    let locationsArrayRef: GlobalLocationTreeNode[] = [];
    const locationsMap = new Map<GlobalLocationTreeNode["locationId"], GlobalLocationTreeNode>();
    const locationsTree = turnLocationArrayIntoTree(mockFlatLocations, "", locationsArrayRef);
    locationsArrayRef.forEach((location) => locationsMap.set(location.locationId, location));
    return { locationsArray: locationsArrayRef, locationsTree, locationsMap };
};

export const mockBranchLocationParent = brand_1_prefectures[0];
export const mockBranchLocationChildren = prefecture_1_1_centers;

export const mockTreeLocations: GlobalLocationTreeNode[] = [
    assignChildrenForLocation(org_1, [
        assignChildrenForLocation(org_1_brands[0], [
            assignChildrenForLocation(
                brand_1_prefectures[0],
                transformLocations(prefecture_1_1_centers)
            ),
            assignChildrenForLocation(
                brand_1_prefectures[1],
                transformLocations(prefecture_1_2_centers)
            ),
        ]),
        assignChildrenForLocation(org_1_brands[1], [
            assignChildrenForLocation(
                brand_2_prefectures[0],
                transformLocations(prefecture_2_1_centers)
            ),
        ]),
    ]),
];

let flattenedTreeLocations: GlobalLocationTreeNode[] = [];
const flattenTreeLocations = (treeRoot: GlobalLocationTreeNode) => {
    if (!treeRoot.children?.length) return;

    treeRoot.children.forEach((tree) => {
        flattenTreeLocations(tree);
        flattenedTreeLocations.push(tree);
    });
};
flattenTreeLocations(assignChildrenForLocation({} as GlobalLocationTreeNode, mockTreeLocations));
export const mockFlattenedTreeLocations: GlobalLocationTreeNode[] = flattenedTreeLocations;

let treeLocationsMap: Map<GlobalLocationTreeNode["locationId"], GlobalLocationTreeNode> = new Map();
flattenedTreeLocations.forEach((tree) => treeLocationsMap.set(tree.locationId, tree));
export const mockTreeLocationsMap = treeLocationsMap;
