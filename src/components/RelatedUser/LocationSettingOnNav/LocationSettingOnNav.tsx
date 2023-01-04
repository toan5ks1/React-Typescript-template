import { useRef, useState } from "react";

import { GlobalLocationTypes } from "src/internals/reactive-storage";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import DialogLocationSelectOnNav from "src/components/RelatedUser/DialogLocationSelectOnNav";
import { DialogLocationSelectOnNavRefs } from "src/components/RelatedUser/DialogLocationSelectOnNav/DialogLocationSelectOnNav";

import useFetchGlobalLocationTypes from "src/hooks/useFetchGlobalLocationTypes";
import useFetchGlobalLocations from "src/hooks/useFetchGlobalLocations";
import useTranslate from "src/hooks/useTranslate";

export interface LocationSettingOnNavProps {
    isOpen: boolean;
    persistedLocationTypes: GlobalLocationTypes;
    onCloseDialog: () => void;
    onSubmitLocationDialog: (locations: GlobalLocationTypes) => void;
    updatePersistedLocationTypes: (locations: GlobalLocationTypes) => void;
}
const LocationSettingOnNav = ({
    onCloseDialog,
    isOpen,
    persistedLocationTypes,
    onSubmitLocationDialog,
    updatePersistedLocationTypes,
}: LocationSettingOnNavProps) => {
    const [isShowingDiscardDialog, setIsShowingDiscardDialog] = useState(false);
    const t = useTranslate();

    const dialogLocationSelectRef = useRef<DialogLocationSelectOnNavRefs>();

    const {
        data: locationTypesObject,
        isLoading: isLoadingLocationTypes,
        isFetched: isFetchedLocationTypes,
    } = useFetchGlobalLocationTypes({
        enabled: isOpen,
    });
    const { data: locationsObjects, isLoading: isLoadingLocations } = useFetchGlobalLocations({
        onSuccess: ({ locationsMap }) => {
            if (dialogLocationSelectRef.current) {
                dialogLocationSelectRef.current.checkLocationsBasedOnPersistedLocations(
                    locationsMap
                );
            }
        },
        enabled: isOpen && isFetchedLocationTypes,
    });

    return (
        <>
            <DialogLocationSelectOnNav
                locationTypesObject={locationTypesObject}
                locationsObjects={locationsObjects}
                isLoadingLocationTypes={isLoadingLocationTypes}
                isLoadingLocations={isLoadingLocations}
                showDiscardDialog={() => setIsShowingDiscardDialog(true)}
                isOpen={isOpen}
                onCloseDialog={onCloseDialog}
                ref={dialogLocationSelectRef}
                persistedLocationTypes={persistedLocationTypes}
                onSubmitLocationDialog={onSubmitLocationDialog}
                updatePersistedLocationTypes={updatePersistedLocationTypes}
            />
            <DialogCancelConfirm
                open={isShowingDiscardDialog}
                title={t("ra.common.discardChange")}
                textCancelDialog={t("ra.message.areYouSureYouWantToDiscardWhatYouSelected")}
                textSave={t("ra.action.discard")}
                onClose={() => setIsShowingDiscardDialog(false)}
                onSave={() => {
                    onCloseDialog();
                }}
            />
        </>
    );
};

export default LocationSettingOnNav;
