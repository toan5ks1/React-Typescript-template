import { useMemo, Fragment, ReactNode } from "react";

import { arrayHasItem } from "src/common/utils/other";

import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import useGlobalLocationTypesWithLocations from "src/hooks/useGlobalLocationTypesWithLocations";

const GlobalLocationsDisplay = () => {
    const { sortedLocationTypesWithLocations } = useGlobalLocationTypesWithLocations();

    const locationsInfoString = useMemo(() => {
        return sortedLocationTypesWithLocations.reduce<ReactNode[]>(
            (locationInfoLabelElements, locationType) => {
                if (!arrayHasItem(locationType.locations)) return locationInfoLabelElements;

                const clonedLocationsInfoLabelElements = locationInfoLabelElements;
                if (arrayHasItem(clonedLocationsInfoLabelElements))
                    clonedLocationsInfoLabelElements.push(
                        <Fragment key={`${locationType.locationTypeId}__middot`}>
                            {" "}
                            &middot;{" "}
                        </Fragment>
                    );
                const label =
                    locationType.locations.length > 1
                        ? `${locationType.locations[0].name} (+${
                              locationType.locations.length - 1
                          })`
                        : `${locationType.locations[0].name}`;
                clonedLocationsInfoLabelElements.push(
                    <Fragment key={locationType.locationTypeId}>{label}</Fragment>
                );

                return clonedLocationsInfoLabelElements;
            },
            []
        );
    }, [sortedLocationTypesWithLocations]);

    if (!arrayHasItem(sortedLocationTypesWithLocations) || !arrayHasItem(locationsInfoString))
        return null;

    return (
        <TypographyTextSecondary data-testid="GlobalLocationsDisplay__root">
            {locationsInfoString}
        </TypographyTextSecondary>
    );
};

export default GlobalLocationsDisplay;
