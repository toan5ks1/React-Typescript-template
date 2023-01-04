import { createContext, PropsWithChildren, useCallback, useMemo, useState } from "react";

import { Features } from "src/common/constants/enum";
import {
    isLocationsTypeWithEmptyLocation,
    sortGlobalLocationsTypes,
} from "src/common/utils/location-types";
import reactiveStorage, { GlobalLocationTypes } from "src/internals/reactive-storage";
import {
    GlobalLocationItem,
    GlobalLocationTypeWithLocations,
} from "src/typings/locations-provider";

import useFeatureToggle from "src/hooks/useFeatureToggle";
import useFetchGlobalLocationTypes from "src/hooks/useFetchGlobalLocationTypes";
import useFetchGlobalLocationsArray from "src/hooks/useFetchGlobalLocationsArray";
import useShowSnackbar from "src/hooks/useShowSnackbar";

export interface LocationProviderContextValue {
    sortedLocationTypesWithLocations: GlobalLocationTypes;
    setLocationTypesWithLocations: (locationTypes: GlobalLocationTypes) => void;
}

export const LocationTypesWithLocationsContext = createContext<LocationProviderContextValue>(
    {} as LocationProviderContextValue
);
const { Provider } = LocationTypesWithLocationsContext;

export const generateDefaultGlobalLocations = (
    locationsArray: GlobalLocationItem[],
    locationTypesMap:
        | Map<GlobalLocationTypeWithLocations["locationTypeId"], GlobalLocationTypeWithLocations>
        | undefined
): GlobalLocationTypeWithLocations[] => {
    // Default select location is center first in Location tree
    let result: GlobalLocationTypeWithLocations[] = [];
    if (!locationTypesMap) return result;
    locationsArray.some((location) => {
        const locationType = locationTypesMap.get(location.locationType);
        if (locationType?.name === "center") {
            locationType.locations.push(location);
            return true;
        }
    });

    locationTypesMap.forEach((locationTypeWithLocation) => {
        result.push(locationTypeWithLocation);
    });

    return result.reverse();
};

export const LocationTypesWithLocationsProvider = ({ children }: PropsWithChildren<{}>) => {
    const { isEnabled: shouldEnableSelectFirstLocation } = useFeatureToggle(
        Features.ARCHITECTURE_ACCESSCONTROL_BACK_OFFICE_AUTO_SELECT_FIRST_LOCATION
    );
    const isLogged = Boolean(reactiveStorage.get("PROFILE"));
    const locationsFromLocalStorage = reactiveStorage.get("SORTED_LOCATIONS_TYPES") || [];
    const [sortedLocationTypesWithLocations, setLocationTypesWithLocations] =
        useState<LocationProviderContextValue["sortedLocationTypesWithLocations"]>(
            locationsFromLocalStorage
        );

    const { data: locationTypesObject, isFetched: isFetchedLocationTypes } =
        useFetchGlobalLocationTypes(
            {
                enabled: Boolean(
                    isLocationsTypeWithEmptyLocation(locationsFromLocalStorage) &&
                        shouldEnableSelectFirstLocation &&
                        isLogged
                ),
            },
            "provider"
        );

    useFetchGlobalLocationsArray(
        {
            enabled: isFetchedLocationTypes,
            onSuccess: (locationsArray: GlobalLocationItem[]) => {
                const locationTypesWithLocations = generateDefaultGlobalLocations(
                    locationsArray,
                    locationTypesObject?.locationTypesMap
                );
                const sortedLocationTypesWithLocations = sortGlobalLocationsWithErrorHandling(
                    locationTypesWithLocations
                );

                reactiveStorage.set("SORTED_LOCATIONS_TYPES", sortedLocationTypesWithLocations);
                setLocationTypesWithLocations(sortedLocationTypesWithLocations);
            },
        },
        "provider"
    );

    const showSnackbar = useShowSnackbar();

    const sortGlobalLocationsWithErrorHandling = useCallback(
        (globalLocationTypes: GlobalLocationTypeWithLocations[]) => {
            return sortGlobalLocationsTypes(globalLocationTypes, (errorMessage) => {
                window.warner?.warn(errorMessage);
                showSnackbar(errorMessage, "error");
            });
        },
        [showSnackbar]
    );

    const contextValue: LocationProviderContextValue = useMemo(() => {
        const setPersistentLocationTypesWithLocations = (
            locationTypesWithLocations: LocationProviderContextValue["sortedLocationTypesWithLocations"]
        ) => {
            const sortedLocationTypesWithLocations = sortGlobalLocationsWithErrorHandling(
                locationTypesWithLocations
            );
            reactiveStorage.set("SORTED_LOCATIONS_TYPES", sortedLocationTypesWithLocations);
            setLocationTypesWithLocations(sortedLocationTypesWithLocations);
        };

        return {
            sortedLocationTypesWithLocations,
            setLocationTypesWithLocations: setPersistentLocationTypesWithLocations,
        };
    }, [sortedLocationTypesWithLocations, sortGlobalLocationsWithErrorHandling]);

    return <Provider value={contextValue}>{children}</Provider>;
};

export default LocationTypesWithLocationsProvider;
