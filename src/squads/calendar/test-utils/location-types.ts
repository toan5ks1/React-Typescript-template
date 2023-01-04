import {
    Calendar_LocationTypesListQuery,
    Calendar_LocationTypesListQueryVariables,
} from "src/squads/calendar/service/bob/bob-types";

export const mockVariables: Calendar_LocationTypesListQueryVariables = {};

export const mockLocationTypes = generateSampleLocationTypes(2);

function generateName(index: number) {
    return `Location ${index}`;
}

function generateLocationId(index: number) {
    return `location_id_${index}`;
}

export function generateSampleLocationTypes(
    numberLocationTypes: number
): Calendar_LocationTypesListQuery["location_types"] {
    const sample: Calendar_LocationTypesListQuery["location_types"] = [];

    for (let i = 0; i < numberLocationTypes; i++) {
        sample.push({
            name: generateName(i),
            location_type_id: generateLocationId(i),
            parent_location_type_id: "parent",
            is_archived: false,
        });
    }

    return sample;
}
