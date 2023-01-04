import {
    Calendar_LocationsListByLocationTypesQuery,
    Calendar_LocationsListByLocationTypesQueryVariables,
} from "src/squads/calendar/service/bob/bob-types";

export const mockVariables: Calendar_LocationsListByLocationTypesQueryVariables = {
    location_type_id: "01FR4M51XJY9E77GSN4QZ1Q9M5",
};

export const mockInvalidVariable: Calendar_LocationsListByLocationTypesQueryVariables = {
    location_type_id: "",
};

export const mockLocations: Calendar_LocationsListByLocationTypesQuery["locations"] = [
    {
        location_id: "location_id_1",
        name: "Manabie",
        locations: null,
        location_types: {
            location_type_id: "location_type_id_1",
            name: "01FR4M51XJY9E77GSN4QZ1Q9M5",
        },
        is_archived: false,
    },
    {
        location_id: "location_id_2",
        name: "JPREP",
        locations: null,
        location_types: {
            location_type_id: "location_type_id_2",
            name: "01FR4M51XJY9E77GSN4QZ1Q9M5",
        },
        is_archived: false,
    },
    {
        location_id: "location_id_3",
        name: "Demo",
        locations: {
            location_id: "location_id_4",
            name: "Brand Demo",
        },
        location_types: {
            location_type_id: "location_type_id_3",
            name: "01FR4M51XJY9E77GSN4QZ1Q9M5",
        },
        is_archived: false,
    },
];

export const mockLocationsV2: Calendar_LocationsListByLocationTypesQuery["locations"] = [
    {
        location_id: "location_id_1",
        name: "Manabie",
        locations: {
            location_id: "01G802ZD29SXWB6C143VV7EJGA",
            name: "Manabie A",
        },
        location_types: {
            location_type_id: "location_type_id_1",
            name: "01FR4M51XJY9E77GSN4QZ1Q9M5",
        },
        is_archived: false,
    },
    {
        location_id: "location_id_2",
        name: "JPREP",
        locations: {
            location_id: "01G802ZD4C73KKQAYVM72JMAXH",
            name: "JPREP A",
        },
        location_types: {
            location_type_id: "location_type_id_2",
            name: "01FR4M51XJY9E77GSN4QZ1Q9M5",
        },
        is_archived: false,
    },
];
