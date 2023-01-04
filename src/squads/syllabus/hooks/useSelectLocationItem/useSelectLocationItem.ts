import { useMemo } from "react";

import { arrayHasItem } from "src/common/utils/other";
import { getLeafLocationsByRecursive } from "src/squads/syllabus/common/helpers/tree-locations";
import { LocationInformation } from "src/squads/syllabus/common/types/common";

import { TreeLocationProps } from "src/squads/syllabus/hooks/useMapTreeLocations";

interface UseSelectLocationItemReturn {
    indeterminate: boolean;
    checked: boolean;
    selectedLocations: LocationInformation[]; // List locations which user selected on UI
    restOfCheckedLocations: LocationInformation[];
}

interface UseSelectLocationItemProps {
    checkedList?: LocationInformation[];
    keyCompareEqual: string;
    location: TreeLocationProps;
}

export default function useSelectLocationItem(
    props: UseSelectLocationItemProps
): UseSelectLocationItemReturn {
    const { keyCompareEqual, checkedList, location } = props;

    return useMemo(() => {
        const defaultResult = {
            indeterminate: false,
            checked: true,
            selectedLocations: [location],
            restOfCheckedLocations: [location],
        };

        // Select on parent location
        if (arrayHasItem(location.children)) {
            // Get all leaf location of tree
            const lastChildrenLocations = getLeafLocationsByRecursive({ node: location });

            const checkedLocationIds = checkedList?.map((location) => location.locationId);

            // Remove location checked in leafLocations
            const removedCheckedLocations = lastChildrenLocations.filter(
                (leaf) => !checkedLocationIds?.includes(leaf.locationId)
            );

            const removedCheckedLocationsLength = removedCheckedLocations.length;
            const lastChildrenLocationsLength = lastChildrenLocations.length;

            const LocationsResult = {
                selectedLocations: lastChildrenLocations,
                restOfCheckedLocations: removedCheckedLocations,
            };

            // All selected locations were actually existed in list checkedList
            if (removedCheckedLocationsLength === 0)
                return { ...defaultResult, ...LocationsResult };

            // All selected locations  weren't existed in list checkedList
            if (removedCheckedLocationsLength === lastChildrenLocationsLength)
                return { ...defaultResult, checked: false, ...LocationsResult };

            // Some selected locations were existed in list checkedList
            if (removedCheckedLocationsLength < lastChildrenLocationsLength)
                return { indeterminate: true, checked: false, ...LocationsResult };
        }

        // This case location is a last child
        const positionElement = checkedList?.findIndex(
            (element) => element[keyCompareEqual] === location[keyCompareEqual]
        );
        return { ...defaultResult, checked: positionElement !== -1 };
    }, [checkedList, keyCompareEqual, location]);
}
