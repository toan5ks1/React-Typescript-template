import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { GlobalLocationTypes } from "src/internals/reactive-storage";
import { NsMasterDataReaderService } from "src/services/master/master-reader-service-master/types";
import {
    GlobalLocationTreeNode,
    GlobalLocationTypeWithLocations,
} from "src/typings/locations-provider";

import { LocationSelectOnNavFormProps } from "src/components/RelatedUser/DialogLocationSelectOnNav/components/LocationSelectOnNavForm";

import { FetchGlobalLocationsDataMappedType } from "src/hooks/useFetchGlobalLocations/useFetchGlobalLocations";

interface DialogLocationSelectOnNavFormValues {
    [
        locationId: NsMasterDataReaderService.LocationObjectResponse["locationId"]
    ]: GlobalLocationTreeNode;
}

interface UseLocationTreeInteractionsProps {
    setValue: UseFormSetValue<DialogLocationSelectOnNavFormValues>;
    getValues: UseFormGetValues<DialogLocationSelectOnNavFormValues>;
    persistedLocationTypes: GlobalLocationTypes;
    locationsObjects: FetchGlobalLocationsDataMappedType | undefined;
}
const useLocationTreeInteractions = (props: UseLocationTreeInteractionsProps) => {
    const { setValue, getValues, persistedLocationTypes, locationsObjects } = props;

    const toggleCheckBox: LocationSelectOnNavFormProps["onLocationToggled"] = (
        location,
        isChecked
    ) => {
        const checkedLocation: GlobalLocationTreeNode = {
            ...location,
            isChecked,
            indeterminate: false,
        };

        setValue(location.locationId, checkedLocation);
    };

    const indeterminadeNode = (
        toggledLocation: GlobalLocationTreeNode,
        parentNode: GlobalLocationTreeNode
    ) => {
        if (parentNode.locationId === toggledLocation.locationId) return;
        // to avoid isChecked === indeterminate === true
        // because in that case UI will be indeterminade instead of being checked
        if (parentNode.isChecked) return;
        uncheckAndToggleIndeterminate(parentNode, true);
    };

    const indeterminateParentNodes = (
        toggledLocation: GlobalLocationTreeNode,
        locationsMap: Map<GlobalLocationTreeNode["locationId"], GlobalLocationTreeNode>
    ) => {
        traverseFromNearestParentToFarthestParent(toggledLocation, locationsMap, indeterminadeNode);
    };

    const traverseSubTree = (
        rootLocationNode: GlobalLocationTreeNode,
        callBack: (descendantNode: GlobalLocationTreeNode) => void
    ) => {
        callBack(rootLocationNode);
        rootLocationNode.children?.forEach((childLocation) => {
            traverseSubTree(childLocation, callBack);
        });
    };

    const toggleLocationAndItsChildren: LocationSelectOnNavFormProps["onLocationToggled"] = (
        location,
        isChecked
    ) => {
        traverseSubTree(location, (location) => {
            toggleCheckBox(location, isChecked);
        });
    };

    const traverseFromNearestParentToFarthestParent = (
        locationNode: GlobalLocationTreeNode,
        locationsMap: Map<GlobalLocationTreeNode["locationId"], GlobalLocationTreeNode>,
        callBack: (
            locationNode: GlobalLocationTreeNode,
            parentLocation: GlobalLocationTreeNode
        ) => void
    ) => {
        const parentLocationIds = locationNode.accessPath
            .split("/")
            .reverse() // Check from nearest parent
            .filter((locationId) => locationId !== locationNode.locationId);

        parentLocationIds.forEach((parentLocationId) => {
            const parentLocation =
                getValues(parentLocationId) || locationsMap.get(parentLocationId);

            parentLocation && callBack(locationNode, parentLocation);
        });
    };

    const uncheckAndToggleIndeterminate = (
        locationNode: GlobalLocationTreeNode,
        isCheckedOrIndeterminate: boolean
    ) => {
        setValue(locationNode.locationId, {
            ...locationNode,
            isChecked: false,
            indeterminate: isCheckedOrIndeterminate,
        });
    };

    const isAtLeastOneOfChildrenCheckedOrIndeterminate = (
        uncheckedLocation: GlobalLocationTreeNode,
        parentLocation: GlobalLocationTreeNode
    ) => {
        return parentLocation.children!.some((childLocation) => {
            if (childLocation.locationId === uncheckedLocation.locationId) return false;

            const childLocationFormValue = getValues(childLocation.locationId);
            if (!childLocationFormValue) return false;

            return childLocationFormValue.isChecked || childLocationFormValue.indeterminate;
        });
    };
    const uncheckAndToggleIndeterminateParents = (
        uncheckedLocation: GlobalLocationTreeNode,
        parentLocation: GlobalLocationTreeNode
    ) => {
        if (parentLocation.children?.length) {
            const isParentNodeIndeterminate = isAtLeastOneOfChildrenCheckedOrIndeterminate(
                uncheckedLocation,
                parentLocation
            );

            uncheckAndToggleIndeterminate(parentLocation, isParentNodeIndeterminate);
        }
    };

    const uncheckAndToggleIndeterminateParentsNodes = (
        uncheckedLocation: GlobalLocationTreeNode
    ) => {
        // When a node is unchecked, it's possible for it's parents to:
        // 1. become unchecked when ALL of its children are unchecked and not indeterminate
        // 2. become indeterminate when one of its children are checked or indeterminate
        // This function will change the parents nodes accordingly
        if (!locationsObjects || !uncheckedLocation.accessPath) return;

        traverseFromNearestParentToFarthestParent(
            uncheckedLocation,
            locationsObjects.locationsMap,
            uncheckAndToggleIndeterminateParents
        );
    };

    /**
     *  TODO: Move this to a unit test
     *  Given user X selects Parent A, which has Child 1, 2, 3
     *  And user X submit selection
     *  And user X sees data in module's pages filtered by Child 1, 2, 3
     *  When user Y creates a new Child 4 for Parent A
     *  And user X re-opens the dialog
     *  Then user X sees Child 4 being selected
     *  And user X sees the data in module's pages filtered by Child 1, 2, 3, 4
     *  to check which location is selected and update location tree with latest checked locations
     * @param {Map<GlobalLocationTreeNode["locationId"], GlobalLocationTreeNode>} locationsMap - array of all locations including parents and children
     * @param {( locationTypesFormValues: DialogLocationSelectOnNavFormValues) => void} persistNewlyCreatedLocations - to update location tree with latest checked locations
     */
    const checkLocationsBasedOnPersistedLocations = (
        locationsMap: Map<GlobalLocationTreeNode["locationId"], GlobalLocationTreeNode>,
        persistNewlyCreatedLocations: (
            locationTypesFormValues: DialogLocationSelectOnNavFormValues
        ) => void
    ) => {
        const persistedLocations = persistedLocationTypes.reduce<
            GlobalLocationTypeWithLocations["locations"]
        >((locations, locationType) => {
            return [...locations, ...locationType.locations];
        }, []);

        const selectedLocations: GlobalLocationTreeNode[] = [];

        persistedLocations.forEach((location) => {
            const fetchedLocation = locationsMap.get(location.locationId);
            if (fetchedLocation) selectedLocations.push({ ...fetchedLocation, isChecked: true });
        });
        // TODO: Refactor this fn to not traverse to nodes unnecessarily
        selectedLocations.forEach((location) => toggleLocationAndItsChildren(location, true));
        selectedLocations.forEach((location) => indeterminateParentNodes(location, locationsMap));

        const locationTypesFormValues = getValues();
        persistNewlyCreatedLocations(locationTypesFormValues);
    };

    return {
        toggleLocationAndItsChildren,
        indeterminateParentNodes,
        checkLocationsBasedOnPersistedLocations,
        uncheckedAndToggleIndeterminateParentsNodes: uncheckAndToggleIndeterminateParentsNodes,
    };
};

export default useLocationTreeInteractions;
