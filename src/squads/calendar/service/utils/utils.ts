import { ArrayElement } from "src/common/constants/types";

import { Paging } from "manabuf/common/v1/requests_pb";

import { LocationTypesList } from "src/squads/calendar/domains/Calendar/types";

export function createEmptyResponse<T = any>(resp: T): Promise<T> {
    return Promise.resolve(resp);
}

export function getEmptyResponse() {
    return createEmptyResponse({
        data: {
            id: null,
        },
    });
}

export function getSearchString(text: string | null | undefined) {
    if (!text) return undefined;
    return `%${text}%`;
}

/**
 * Convert to "Paging" proto with only limit and offset
 *
 * @param paging paging object {limit: number; offsetInteger: number; offsetString: string; ...}
 * @returns proto class "Paging"
 */
export const toBasicPagingProto = (paging: Paging.AsObject) => {
    const result = new Paging();

    result.setLimit(paging.limit);

    // We only set the offset by one of 2 things, string or integer
    if (Boolean(paging.offsetString)) result.setOffsetString(paging.offsetString);
    else result.setOffsetInteger(paging.offsetInteger);

    return result;
};

export const getFileExtension = (filename: string) => {
    return filename.split(".").pop() || "";
};

export const getFileNameWithoutExtension = (filename: string) => {
    return filename.replace(`.${getFileExtension(filename)}`, "");
};

export interface getOptionsForSelectLocationTypeReturn {
    locationTypesOptions: LocationTypesList;
    defaultValue: ArrayElement<LocationTypesList> | undefined;
}

export const sortLocationTypes = (
    locationTypesList: LocationTypesList,
    currentParent: ArrayElement<LocationTypesList>,
    result: LocationTypesList = []
): LocationTypesList => {
    if (locationTypesList.length === 0 || !currentParent) return result;

    result.push(currentParent);

    locationTypesList = locationTypesList.filter(
        (locationType) => locationType.location_type_id !== currentParent.location_type_id
    );

    const nearestChild =
        locationTypesList.find(
            (locationType) =>
                locationType.parent_location_type_id === currentParent.location_type_id
        ) || locationTypesList[0];

    return sortLocationTypes(locationTypesList, nearestChild, result);
};

export const getOptionsForSelectLocationType = (
    locationTypes: LocationTypesList
): getOptionsForSelectLocationTypeReturn => {
    const highestLocationType = locationTypes.find(
        (locationType) =>
            locationType.parent_location_type_id === null && locationType.name === "org"
    );

    let locationTypesOptions = locationTypes.filter(
        (locationType) => locationType.parent_location_type_id && locationType.name !== "org"
    );

    const defaultValue = locationTypesOptions.find(
        (locationType) =>
            locationType.parent_location_type_id === highestLocationType?.location_type_id
    );

    if (defaultValue) locationTypesOptions = sortLocationTypes(locationTypesOptions, defaultValue);

    return {
        locationTypesOptions,
        defaultValue,
    };
};
