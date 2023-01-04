import { useContext } from "react";

import {
    LocationProviderContextValue,
    LocationTypesWithLocationsContext,
} from "src/providers/LocationsProvider";

// TODO: Replace context usage with __MANA__ in the future
// More discussion here: https://manabie.slack.com/archives/CPC6Y9BJN/p1644316049354239?thread_ts=1644299951.928949&cid=CPC6Y9BJN
export interface GlobalLocationTypesReturn {
    sortedLocationTypesWithLocations: LocationProviderContextValue["sortedLocationTypesWithLocations"];
    setLocationTypesWithLocations: LocationProviderContextValue["setLocationTypesWithLocations"];
}

const useGlobalLocationTypesWithLocations = (): GlobalLocationTypesReturn => {
    const { sortedLocationTypesWithLocations, setLocationTypesWithLocations } = useContext(
        LocationTypesWithLocationsContext
    );

    return { sortedLocationTypesWithLocations, setLocationTypesWithLocations };
};

export default useGlobalLocationTypesWithLocations;
