import { Features } from "src/common/constants/enum";
import {
    inValidLocation,
    isContainsOrgLocation,
    isLocationsTypeWithEmptyLocation,
} from "src/common/utils/location-types";
import { arrayHasItem } from "src/common/utils/other";
import reactiveStorage from "src/internals/reactive-storage";
import { GlobalLocationItem } from "src/typings/locations-provider";

import useFeatureToggle from "src/hooks/useFeatureToggle";
import useGlobalLocationTypesWithLocations from "src/hooks/useGlobalLocationTypesWithLocations";

// TODO: Replace context usage with __MANA__ in the future
// More discussion here: https://manabie.slack.com/archives/CPC6Y9BJN/p1644316049354239?thread_ts=1644299951.928949&cid=CPC6Y9BJN
export interface GlobalLocationsReturn {
    locations: GlobalLocationItem[];
}

const useGlobalLocations = (): GlobalLocationsReturn => {
    const { sortedLocationTypesWithLocations } = useGlobalLocationTypesWithLocations();
    const { isEnabled: shouldEnableSelectFirstLocation } = useFeatureToggle(
        Features.ARCHITECTURE_ACCESSCONTROL_BACK_OFFICE_AUTO_SELECT_FIRST_LOCATION
    );

    if (shouldEnableSelectFirstLocation) {
        // Return a invalid location when localStorage not be set yet
        const locationsFromLocalStorage = reactiveStorage.get("SORTED_LOCATIONS_TYPES") || [];
        if (isLocationsTypeWithEmptyLocation(locationsFromLocalStorage)) {
            return {
                locations: [inValidLocation],
            };
        }
        // Return empty location when user select org location
        if (isContainsOrgLocation(sortedLocationTypesWithLocations)) {
            return { locations: [] };
        }
    } else {
        if (!arrayHasItem(sortedLocationTypesWithLocations)) return { locations: [] };
    }

    const lowestLevelLocations =
        sortedLocationTypesWithLocations[sortedLocationTypesWithLocations.length - 1].locations;

    return {
        locations: lowestLevelLocations,
    };
};

export default useGlobalLocations;
