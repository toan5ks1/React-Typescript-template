import { arrayHasItem } from "src/common/utils/other";
import { GlobalLocationTypes } from "src/internals/reactive-storage";
import { GlobalLocationItem, GlobalLocationTypeItem } from "src/typings/locations-provider";

export const sortGlobalLocationsTypes = <T extends GlobalLocationTypeItem>(
    globalLocationTypes: T[],
    onError: (errorMessage: string) => void
): T[] => {
    // This is an inefficient way to do it
    // but globalLocationTypes is expect to have at most 4 items so I'd prefer a simple way to do it
    let rootLocationType = "";
    const result: T[] = [];
    while (result.length < globalLocationTypes.length) {
        const locationTypesChild = globalLocationTypes.filter(
            (locationType) => locationType.parentLocationTypeId === rootLocationType
        );

        if (locationTypesChild.length != 1) {
            // This is unlikely to happen in PROD but I want to warn us just in case
            onError(
                "Something is wrong with the location type data. Locations Settings may not work correctly. Please contact Admin for help"
            );

            return [];
        }

        result.push(locationTypesChild[0]);
        rootLocationType = locationTypesChild[0].locationTypeId;
    }

    return result;
};

export const isContainsOrgLocation = (locationTypesWithLocations: GlobalLocationTypes) => {
    const locationsOrg =
        locationTypesWithLocations.find((locationType) => locationType.name === "org")?.locations ||
        [];
    return arrayHasItem(locationsOrg);
};

export const isLocationsTypeWithEmptyLocation = (locationsType: GlobalLocationTypes) => {
    if (!arrayHasItem(locationsType)) return true;

    const isEmptyLocation = locationsType.every(
        (locationType) => !arrayHasItem(locationType.locations)
    );
    return isEmptyLocation;
};

export const inValidLocation: GlobalLocationItem = {
    locationId: "invalid_location",
    name: "Invalid Location",
    locationType: "",
    parentLocationId: "",
    accessPath: "",
    isUnauthorized: false,
};
