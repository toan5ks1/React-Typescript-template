import {
    flatTreeLocationByRecursive,
    getNodeTreeByRecursive,
} from "src/squads/user/common/helpers/tree-locations";
import { LocationInformation, LocationInformationHasura } from "src/squads/user/common/types";

import type {
    NodeLocationProps,
    TreeLocationProps,
} from "src/squads/user/hooks/useMapTreeLocations";

export const mockTreeLocations: TreeLocationProps[] = [
    {
        locationId: "org_1",
        name: "Organization",
        locationType: "0",
        parentLocationId: "",
        accessPath: "org_1",
        level: 0,
        children: [
            {
                locationId: "brand_1",
                name: "Individual Brand",
                locationType: "1",
                parentLocationId: "org_1",
                accessPath: "org_1/brand_1",
                level: 1,
                children: [
                    {
                        locationId: "prefecture_1_1",
                        name: "Nara prefecture",
                        locationType: "2",
                        parentLocationId: "brand_1",
                        accessPath: "org_1/brand_1/prefecture_1_1",
                        level: 2,
                        children: [
                            {
                                locationId: "center_1",
                                name: "Location 1",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_1",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_2",
                                name: "Location 2",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_2",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_3",
                                name: "Location 3",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_3",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_4",
                                name: "Location 4",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_4",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_5",
                                name: "Location 5",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_5",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_6",
                                name: "Location 6",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_6",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_7",
                                name: "Location 7",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_7",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_8",
                                name: "Location 8",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_8",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_9",
                                name: "Location 9",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_9",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_10",
                                name: "Location 10",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_10",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_11",
                                name: "Location 11",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_11",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_12",
                                name: "Location 12",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_12",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_13",
                                name: "Location 13",
                                locationType: "3",
                                parentLocationId: "prefecture_1_1",
                                accessPath: "org_1/brand_1/prefecture_1_1/center_13",
                                level: 3,
                                children: [],
                            },
                        ],
                    },
                    {
                        locationId: "prefecture_1_2",
                        name: "Osaka prefecture",
                        locationType: "2",
                        parentLocationId: "brand_1",
                        accessPath: "org_1/brand_1/prefecture_1_2",
                        level: 2,
                        children: [
                            {
                                locationId: "center_14",
                                name: "Location 14",
                                locationType: "3",
                                parentLocationId: "prefecture_1_2",
                                accessPath: "org_1/brand_1/prefecture_1_2/center_14",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_15",
                                name: "Location 15",
                                locationType: "3",
                                parentLocationId: "prefecture_1_2",
                                accessPath: "org_1/brand_1/prefecture_1_2/center_15",
                                level: 3,
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                locationId: "brand_2",
                name: "Group Brand",
                locationType: "1",
                parentLocationId: "org_1",
                accessPath: "org_1/brand_2",
                level: 1,
                children: [
                    {
                        locationId: "prefecture_2_1",
                        name: "Test prefecture",
                        locationType: "prefecture",
                        parentLocationId: "brand_2",
                        accessPath: "org_1/brand_2/prefecture_2_1",
                        level: 2,
                        children: [
                            {
                                locationId: "center_16",
                                name: "Location 16",
                                locationType: "3",
                                parentLocationId: "prefecture_2_1",
                                accessPath: "org_1/brand_2/prefecture_2_1/center_16",
                                level: 3,
                                children: [],
                            },
                            {
                                locationId: "center_17",
                                name: "Location 17",
                                locationType: "3",
                                parentLocationId: "prefecture_2_1",
                                accessPath: "org_1/brand_2/prefecture_2_1/center_17",
                                level: 3,
                                children: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const mockLowestNodeLocation: TreeLocationProps = getNodeTreeByRecursive(
    mockTreeLocations[0],
    "center_13"
);

export const mockListLocationsChecked: LocationInformation[] = [mockLowestNodeLocation];

export const mockBranchLocation: TreeLocationProps = getNodeTreeByRecursive(
    mockTreeLocations[0],
    "prefecture_1_1"
);

export const mockFlatLocations: NodeLocationProps[] = flatTreeLocationByRecursive(
    mockTreeLocations[0]
);

export const getMockLocations = (length: number = 20, start: number = 0): LocationInformation[] => {
    return Array(length)
        .fill("")
        .map((_, index) => ({
            locationId: `center_${index + 1 + start}`,
            name: `Location ${index + 1 + start}`,
            parentLocationId: `prefecture_1_1`,
            locationType: "center",
            accessPath: "",
        }));
};

export const getMockLocationsHasura = (
    length: number = 20,
    start: number = 0
): LocationInformationHasura[] => {
    return Array(length)
        .fill("")
        .map((_, index) => ({
            location_id: `center_${index + start}`,
            name: `Location ${index + 1 + start}`,
            parent_location_id: `prefecture_1_1`,
            location_type: "center",
            access_path: "",
            is_archived: false,
        }));
};
