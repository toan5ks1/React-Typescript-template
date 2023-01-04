import { useMemo } from "react";

import { useWatch } from "react-hook-form";
import { sortGlobalLocationsTypes } from "src/common/utils/location-types";
import {
    GlobalLocationTreeNode,
    GlobalLocationTypeWithLocations,
} from "src/typings/locations-provider";

import { DialogLocationSelectOnNavFormValues } from "src/components/RelatedUser/DialogLocationSelectOnNav/components/CheckBoxLocation";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useShowSnackbar from "src/hooks/useShowSnackbar";
import useTranslate from "src/hooks/useTranslate";

export interface LocationsDisplayProps {
    highestLevelLocations: GlobalLocationTreeNode[];
    locationTypesMap: Map<
        GlobalLocationTypeWithLocations["locationTypeId"],
        GlobalLocationTypeWithLocations
    >;
}

const getLocationsToDisplay = (
    locationsFormValue: GlobalLocationTreeNode[],
    highestLevelLocations: GlobalLocationTreeNode[],
    locationsToDisplayArray: GlobalLocationTreeNode[] = []
) => {
    if (!locationsFormValue) return [];
    highestLevelLocations.forEach((location) => {
        const locationFormValue = locationsFormValue[location.locationId];
        if (!locationFormValue) return;

        if (locationFormValue.isChecked) locationsToDisplayArray.push(location);
        else if (location.children)
            getLocationsToDisplay(locationsFormValue, location.children, locationsToDisplayArray);
    });
    return locationsToDisplayArray;
};

const LocationsDisplay = ({ highestLevelLocations, locationTypesMap }: LocationsDisplayProps) => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const locationsFormValue = useWatch<DialogLocationSelectOnNavFormValues>();

    const sortedLocationsToDisplayArray: GlobalLocationTreeNode[] = useMemo(() => {
        const locationsToDisplayArray = getLocationsToDisplay(
            locationsFormValue,
            highestLevelLocations
        );
        const sortedGlobalLocationsTypes = sortGlobalLocationsTypes(
            Array.from(locationTypesMap.values()),
            (errorMessage) => {
                window.warner?.warn(errorMessage);
                showSnackbar(errorMessage, "error");
            }
        );

        return sortedGlobalLocationsTypes.reduce<GlobalLocationTreeNode[]>(
            (result, locationType) => {
                const locationsOfLocationType = locationsToDisplayArray.filter(
                    (location) => location.locationType === locationType.locationTypeId
                );
                return [...result, ...locationsOfLocationType];
            },
            []
        );
    }, [highestLevelLocations, locationTypesMap, locationsFormValue, showSnackbar]);

    return (
        <TypographyBase data-testid="LocationDisplay__LocationNames">
            {sortedLocationsToDisplayArray && t("ra.common.selected")}
            {": "}
            {sortedLocationsToDisplayArray.map((location) => location.name).join(", ")}
        </TypographyBase>
    );
};

export default LocationsDisplay;
