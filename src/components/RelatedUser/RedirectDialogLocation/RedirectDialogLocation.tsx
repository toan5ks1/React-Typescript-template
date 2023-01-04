import { useMemo, useState } from "react";

import { useHistory } from "react-router";
import { getTopPagePath, isTopPage } from "src/common/utils/other";
import { GlobalLocationTypes } from "src/internals/reactive-storage";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import LocationSettingOnNav from "src/components/RelatedUser/LocationSettingOnNav";
import { LocationSettingOnNavProps } from "src/components/RelatedUser/LocationSettingOnNav/LocationSettingOnNav";
import { useModules } from "src/providers/ModuleProvider";

import useTranslate from "src/hooks/useTranslate";

const RedirectDialogLocation = ({
    onSubmitLocationDialog,
    isOpen,
    onCloseDialog,
    persistedLocationTypes,
    updatePersistedLocationTypes,
}: LocationSettingOnNavProps) => {
    const modules = useModules();
    const t = useTranslate();
    const history = useHistory();
    const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
    const { basename, entity } = getTopPagePath(history.location.pathname);

    const topPageName = useMemo(() => {
        const topPageModule = modules.find((module) => module.key === entity);
        if (!(topPageModule?.name && topPageModule?.translateKey)) {
            return "";
        }
        return t(`resources.${topPageModule?.name}.${topPageModule?.translateKey}`);
    }, [modules, t, entity]);

    const [tmpConfirmLocations, setTmpConfirmLocations] =
        useState<GlobalLocationTypes>(persistedLocationTypes);

    const onClickSave = (data: GlobalLocationTypes) => {
        if (isTopPage(history.location.pathname)) {
            onSubmitLocationDialog(data);
            return;
        }
        setTmpConfirmLocations(data);
        setOpenDialogConfirm(true);
    };

    const onClickConfirm = () => {
        setOpenDialogConfirm(false);
        onSubmitLocationDialog(tmpConfirmLocations);

        history.push(`/${basename}/${entity}`);
    };

    const messageConfirm = useMemo(
        () => (
            <>
                {t("ra.auth.locationSetting.confirmApply")}
                <br />
                {t("ra.auth.locationSetting.confirmLeave", {
                    page: topPageName,
                })}
            </>
        ),
        [topPageName, t]
    );

    return (
        <>
            {isOpen && (
                <LocationSettingOnNav
                    isOpen={isOpen}
                    onCloseDialog={onCloseDialog}
                    onSubmitLocationDialog={onClickSave}
                    persistedLocationTypes={persistedLocationTypes}
                    updatePersistedLocationTypes={updatePersistedLocationTypes}
                />
            )}
            <DialogCancelConfirm
                open={openDialogConfirm}
                onClose={() => setOpenDialogConfirm(false)}
                title={t("ra.auth.locationSetting.confirmRedirect")}
                textCancelDialog={messageConfirm}
                onSave={onClickConfirm}
                footerConfirmButtonProps={{
                    color: "primary",
                }}
            />
        </>
    );
};

export default RedirectDialogLocation;
