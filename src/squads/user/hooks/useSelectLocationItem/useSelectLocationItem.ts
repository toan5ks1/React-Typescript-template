import { arrayHasItem } from "src/common/utils/other";
import {
    getAncestralLocationByAccessPath,
    getLeafLocationsByRecursive,
} from "src/squads/user/common/helpers/tree-locations";
import { LocationInformation } from "src/squads/user/common/types";

import type { TreeLocationProps } from "src/squads/user/hooks/useMapTreeLocations";

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
    isolateParent?: boolean;
}

export default function useSelectLocationItem(
    props: UseSelectLocationItemProps
): UseSelectLocationItemReturn {
    const { keyCompareEqual, checkedList, location, isolateParent = false } = props;

    const renderLocationWithIsolateParent = (defaultResult: UseSelectLocationItemReturn) => {
        //check location is already on checked list
        const isOnCheckedList =
            checkedList?.findIndex(
                (item) => item[keyCompareEqual] === location[keyCompareEqual]
            ) !== -1;
        if (isOnCheckedList) return { ...defaultResult };

        // check is any ancestral location on checked list
        if (getAncestralLocationByAccessPath(location.accessPath, checkedList)) {
            return { ...defaultResult };
        }

        // check is any child location on checked list
        if (arrayHasItem(location.children)) {
            const hasChildLocationChecked = checkedList.some((item) =>
                item.accessPath.includes(location.accessPath)
            );
            if (hasChildLocationChecked)
                return { ...defaultResult, indeterminate: true, checked: false };
            return { ...defaultResult, checked: false };
        }

        return { ...defaultResult, checked: false };
    };

    const renderLocation = (defaultResult: UseSelectLocationItemReturn) => {
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
            if (removedCheckedLocationsLength === 0) {
                return { ...defaultResult, ...LocationsResult };
            }

            // All selected locations  weren't existed in list checkedList
            if (removedCheckedLocationsLength === lastChildrenLocationsLength) {
                return { ...defaultResult, checked: false, ...LocationsResult };
            }

            // Some selected locations were existed in list checkedList
            if (removedCheckedLocationsLength < lastChildrenLocationsLength) {
                return { indeterminate: true, checked: false, ...LocationsResult };
            }
        }
        // This case location is a last child
        const positionElement = checkedList?.findIndex(
            (element) => element[keyCompareEqual] === location[keyCompareEqual]
        );
        return { ...defaultResult, checked: positionElement !== -1 };
    };

    const defaultResult = {
        indeterminate: false,
        checked: true,
        selectedLocations: [location],
        restOfCheckedLocations: [location],
    };

    if (isolateParent) return renderLocationWithIsolateParent(defaultResult);
    else return renderLocation(defaultResult);
}
