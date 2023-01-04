import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

import { useForm } from "react-hook-form";
import { GlobalLocationTypes } from "src/internals/reactive-storage";
import {
    GlobalLocationTreeNode,
    GlobalLocationTypeWithLocations,
} from "src/typings/locations-provider";

import { Box } from "@mui/material";
import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";
import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";
import { DialogLocationSelectOnNavFormValues } from "src/components/RelatedUser/DialogLocationSelectOnNav/components/CheckBoxLocation";
import LocationsDisplay from "src/components/RelatedUser/DialogLocationSelectOnNav/components/LocationDisplay";
import LocationSelectOnNavForm, {
    LocationSelectOnNavFormProps,
} from "src/components/RelatedUser/DialogLocationSelectOnNav/components/LocationSelectOnNavForm/LocationSelectOnNavForm";

import { FetchGlobalLocationsTypesDataMappedType } from "src/hooks/useFetchGlobalLocationTypes/useFetchGlobalLocationTypes";
import { FetchGlobalLocationsDataMappedType } from "src/hooks/useFetchGlobalLocations/useFetchGlobalLocations";
import useLocationTreeInteractions from "src/hooks/useLocationTreeInteractions";
import useTranslate from "src/hooks/useTranslate";

export interface DialogLocationSelectOnNavProps {
    locationsObjects: FetchGlobalLocationsDataMappedType | undefined;
    locationTypesObject: FetchGlobalLocationsTypesDataMappedType | undefined;
    isLoadingLocations: boolean;
    isLoadingLocationTypes: boolean;
    isOpen: boolean;
    persistedLocationTypes: GlobalLocationTypes;
    onCloseDialog: () => void;
    showDiscardDialog: () => void;
    onSubmitLocationDialog: (locations: GlobalLocationTypes) => void;
    updatePersistedLocationTypes: (locations: GlobalLocationTypes) => void;
}
export interface DialogLocationSelectOnNavRefs {
    checkLocationsBasedOnPersistedLocations: (
        locationsMap: Map<GlobalLocationTreeNode["locationId"], GlobalLocationTreeNode>
    ) => void;
}

/**
 * generate list of location types, in which each type includes a selected locations list
 * used to store locations and location types in local strorage in a standardized way
 * @param {GlobalLocationTreeNode[]} locations - array of all locations, no matter that is parents or children location
 * @param {Map<GlobalLocationTypeWithLocations["locationTypeId"], GlobalLocationTypeWithLocations>} locationTypesMap - all location types
 * @returns {GlobalLocationTypeWithLocations[]} -  all location types with selected locations list for each type
 */
const generateGlobalLocations = (
    locations: GlobalLocationTreeNode[],
    locationTypesMap:
        | Map<GlobalLocationTypeWithLocations["locationTypeId"], GlobalLocationTypeWithLocations>
        | undefined
): GlobalLocationTypeWithLocations[] => {
    let result: GlobalLocationTypeWithLocations[] = [];
    if (!locationTypesMap) return result;

    locations.forEach((location) => {
        if (!location.isChecked) return;

        const { children, isChecked, indeterminate, ...locationWithoutUIElements } = location;
        locationTypesMap
            .get(locationWithoutUIElements.locationType)
            ?.locations.push(locationWithoutUIElements);
    });

    locationTypesMap.forEach((locationTypeWithLocation) => {
        result.push(locationTypeWithLocation);
    });

    return result;
};

// TODO: use one source of truth instead of having 2 sources: form values and locationsMap
//       Consider improve immutability by not pushing directly to arrays in some cases

const DialogLocationSelectOnNav = forwardRef<
    DialogLocationSelectOnNavRefs | undefined,
    DialogLocationSelectOnNavProps
>((props: DialogLocationSelectOnNavProps, ref) => {
    const {
        isOpen,
        onCloseDialog,
        locationTypesObject,
        locationsObjects,
        isLoadingLocations,
        isLoadingLocationTypes,
        showDiscardDialog,
        onSubmitLocationDialog,
        updatePersistedLocationTypes,
        persistedLocationTypes,
    } = props;
    const methods = useForm<DialogLocationSelectOnNavFormValues>();
    const { handleSubmit, setValue, getValues } = methods;

    const {
        toggleLocationAndItsChildren,
        indeterminateParentNodes,
        uncheckedAndToggleIndeterminateParentsNodes,
        checkLocationsBasedOnPersistedLocations,
    } = useLocationTreeInteractions({
        setValue,
        getValues,
        persistedLocationTypes,
        locationsObjects,
    });

    const t = useTranslate();

    useImperativeHandle(ref, () => ({
        checkLocationsBasedOnPersistedLocations(locationsMap: Map<string, GlobalLocationTreeNode>) {
            void checkLocationsBasedOnPersistedLocations(
                locationsMap,
                persistNewlyCreatedLocations
            );
        },
    }));

    const isFormDirtyRef = useRef(false);

    const handleLocationToggled: LocationSelectOnNavFormProps["onLocationToggled"] = (
        toggledLocation,
        isChecked
    ) => {
        if (!locationsObjects) return;
        isFormDirtyRef.current = true;

        if (isChecked) {
            indeterminateParentNodes(toggledLocation, locationsObjects.locationsMap);
        } else {
            uncheckedAndToggleIndeterminateParentsNodes(toggledLocation);
        }

        toggleLocationAndItsChildren(toggledLocation, isChecked);
    };

    const highestLevelLocations = useMemo(() => {
        const highestLevelLocationTypes = Array.from(
            locationTypesObject?.locationTypesMap.values() || []
        ).filter((locationType) => locationType.parentLocationTypeId === "");

        return (
            locationsObjects?.locationsArray.filter((location) =>
                highestLevelLocationTypes.find(
                    (locationType) => locationType.locationTypeId === location.locationType
                )
            ) || []
        );
    }, [locationTypesObject?.locationTypesMap, locationsObjects?.locationsArray]);

    const handleSubmitForm = (locationTypesFormValues: DialogLocationSelectOnNavFormValues) => {
        const unsortedGlobalLocationTypes = generateGlobalLocations(
            Object.values(locationTypesFormValues),
            locationTypesObject?.locationTypesMap
        );

        onSubmitLocationDialog(unsortedGlobalLocationTypes);
    };

    const persistNewlyCreatedLocations = (
        locationTypesFormValues: DialogLocationSelectOnNavFormValues
    ) => {
        const unsortedGlobalLocationTypes = generateGlobalLocations(
            Object.values(locationTypesFormValues),
            locationTypesObject?.locationTypesMap
        );

        updatePersistedLocationTypes(unsortedGlobalLocationTypes);
    };

    return (
        <DialogWithHeaderFooterHF
            title={t("ra.auth.locationSetting.title")}
            open={isOpen}
            onClose={() => {
                isFormDirtyRef.current ? showDiscardDialog() : onCloseDialog();
            }}
            onSave={handleSubmit(handleSubmitForm)}
            data-testid="DialogLocationSelectOnNav__dialog"
            methods={methods}
            maxWidthBox="md"
            maxWidth="md"
            fullWidth={true}
        >
            {isLoadingLocations ||
            isLoadingLocationTypes ||
            !locationsObjects ||
            !locationTypesObject ? (
                <CircularProgressBase />
            ) : (
                <>
                    <LocationSelectOnNavForm
                        populatedLocationsTree={locationsObjects.locationsTree}
                        onLocationToggled={handleLocationToggled}
                    />
                    <Box mt={2}>
                        <LocationsDisplay
                            highestLevelLocations={highestLevelLocations}
                            locationTypesMap={locationTypesObject.locationTypesMap}
                        />
                    </Box>
                </>
            )}
        </DialogWithHeaderFooterHF>
    );
});

export default DialogLocationSelectOnNav;
