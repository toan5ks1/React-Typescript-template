import {
    brand_1_prefectures,
    brand_2_prefectures,
    createMockLocationsObject,
    org_1_brands,
    prefecture_1_2_centers,
    prefecture_2_1_centers,
} from "src/test-utils/locations";
import {
    GlobalLocationTypeItem,
    GlobalLocationTypeWithLocations,
} from "src/typings/locations-provider";

import { FetchGlobalLocationsTypesDataMappedType } from "src/hooks/useFetchGlobalLocationTypes/useFetchGlobalLocationTypes";

const org_1_type: GlobalLocationTypeItem = {
    locationTypeId: "location_type_id_org_1",
    name: "org",
    displayName: "Manabie Org 1",
    parentName: "",
    parentLocationTypeId: "",
};
const brand_1_type: GlobalLocationTypeItem = {
    locationTypeId: "location_type_id_brand_1",
    name: "brand",
    displayName: "Manabie Brand",
    parentName: "org",
    parentLocationTypeId: "location_type_id_org_1",
};
const prefecture_1_type: GlobalLocationTypeItem = {
    locationTypeId: "location_type_id_prefecture_1",
    name: "prefecture",
    displayName: "Manabie Prefecture 1",
    parentName: "brand",
    parentLocationTypeId: "location_type_id_brand_1",
};
const center_1_type: GlobalLocationTypeItem = {
    locationTypeId: "location_type_id_center_1",
    name: "center",
    displayName: "Manabie Center",
    parentName: "prefecture",
    parentLocationTypeId: "location_type_id_prefecture_1",
};

export const mockSortedLocationTypes: GlobalLocationTypeItem[] = [
    org_1_type,
    brand_1_type,
    prefecture_1_type,
    center_1_type,
];

export const mockUnsortedLocationTypes: GlobalLocationTypeItem[] = [
    mockSortedLocationTypes[2],
    mockSortedLocationTypes[3],
    mockSortedLocationTypes[0],
    mockSortedLocationTypes[1],
];

export const createMockLocationTypesObject = (): FetchGlobalLocationsTypesDataMappedType => {
    const locationTypesMap = new Map<
        GlobalLocationTypeWithLocations["locationTypeId"],
        GlobalLocationTypeWithLocations
    >();

    mockSortedLocationTypes.forEach((locationType) => {
        locationTypesMap.set(locationType.locationTypeId, {
            ...locationType,
            locations: [],
        });
    });
    return {
        locationTypesMap,
    };
};

export const createMockHighestLevelLocations = () => {
    const locationTypesObject = createMockLocationTypesObject();
    const locationsObjects = createMockLocationsObject();
    const highestLevelLocationTypes = Array.from(
        locationTypesObject?.locationTypesMap.values() || []
    ).filter((locationType) => locationType.parentLocationTypeId === "");

    return (
        locationsObjects?.locationsArray.filter((location) =>
            highestLevelLocationTypes.find(
                (locationType) => locationType.locationTypeId === location.locationType
            )
        ) || []
    );
};

const mapUnsortedLocationTypes = new Map<
    GlobalLocationTypeItem["locationTypeId"],
    GlobalLocationTypeItem
>();
mockUnsortedLocationTypes.forEach((locationType) =>
    mapUnsortedLocationTypes.set(locationType.locationTypeId, locationType)
);
export const mockMapUnsortedLocationTypes = mapUnsortedLocationTypes;

// I made this variable based on mockTreeLocations inside src/test-utils/locations.ts
// This basically picks some of the nodes in the tree and sort by location types
// This is used when testing persisted locations
export const mockSortedPersistedLocationTypesWithChildrenHandPicked: GlobalLocationTypeWithLocations[] =
    [
        {
            ...brand_1_type,
            locations: [org_1_brands[1]],
        },
        {
            ...prefecture_1_type,
            locations: [brand_1_prefectures[1]],
        },
        {
            ...center_1_type,
            locations: [prefecture_2_1_centers[0]],
        },
    ];

// Given mockSortedPersistedLocationTypesWithChildrenHandPicked is saved in localStorage
// When the user submits the dialog
// They should see mockUnsortedPersistedLocationTypesWithChildrenHandPicked being called
export const mockUnsortedPersistedLocationTypesWithChildrenHandPicked: GlobalLocationTypeWithLocations[] =
    [
        {
            ...prefecture_1_type,
            locations: [...brand_2_prefectures, brand_1_prefectures[1]],
        },
        {
            ...center_1_type,
            locations: [...prefecture_2_1_centers, ...prefecture_1_2_centers],
        },
        {
            ...org_1_type,
            locations: [],
        },
        {
            ...brand_1_type,
            locations: [org_1_brands[1]],
        },
    ];

export const mockLowestLevelPersistedLocations =
    mockUnsortedPersistedLocationTypesWithChildrenHandPicked[1].locations;

export const mockFlattenPersistedLocations =
    mockUnsortedPersistedLocationTypesWithChildrenHandPicked.reduce<
        GlobalLocationTypeWithLocations["locations"]
    >((locations, locationType) => {
        return [...locations, ...locationType.locations];
    }, []);

export const mockSortedPersistedLocationTypesContainsOrgLocation: GlobalLocationTypeWithLocations[] =
    [
        {
            ...org_1_type,
            locations: [org_1_brands[0]],
        },
        {
            ...prefecture_1_type,
            locations: [brand_1_prefectures[0]],
        },
        {
            ...center_1_type,
            locations: [prefecture_2_1_centers[0]],
        },
    ];

export const mockLocationTypesContainsEmptyLocation: GlobalLocationTypeWithLocations[] = [
    {
        ...org_1_type,
        locations: [],
    },
    {
        ...prefecture_1_type,
        locations: [],
    },
    {
        ...center_1_type,
        locations: [],
    },
];
