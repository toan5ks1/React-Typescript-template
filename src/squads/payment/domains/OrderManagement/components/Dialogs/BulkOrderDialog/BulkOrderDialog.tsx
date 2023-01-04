import { ReactNode, useState } from "react";

import { Entities } from "src/common/constants/enum";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import DialogFullScreen from "src/components/Dialogs/DialogFullScreen";
import OrderDialogFooter from "src/squads/payment/domains/OrderManagement/components/Dialogs/OrderDialogFooter";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

type BulkOrderDialogCancelType = {
    isOpenDialogCancel: boolean;
    isBackButtonClicked?: boolean;
};
export interface BulkOrderDialogProps {
    isBulkSection: boolean;
    bulkComponentSection: ReactNode;
    isLoading: boolean;
    onHandleActionBulkSection: () => void;
    onBackToBulkSection: () => void;
    onCloseDialog: () => void;
}

const BulkOrderDialog = ({
    isBulkSection,
    bulkComponentSection,
    isLoading,
    onHandleActionBulkSection,
    onBackToBulkSection,
    onCloseDialog,
}: BulkOrderDialogProps) => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const [handleOpenDialogCancel, setHandleOpenDialogCancel] = useState<BulkOrderDialogCancelType>(
        { isOpenDialogCancel: false, isBackButtonClicked: false }
    );
    const { isOpenDialogCancel, isBackButtonClicked } = handleOpenDialogCancel;
    const isBackToBulkSectionCancelDialogText = !isBulkSection && isBackButtonClicked;

    const handleOpenDialogCancelState = ({
        isOpenDialogCancel,
        isBackButtonClicked = false,
    }: BulkOrderDialogCancelType) => {
        setHandleOpenDialogCancel({
            isOpenDialogCancel,
            isBackButtonClicked,
        });
    };

    const onCancelDialogButton = () => {
        handleOpenDialogCancelState({
            isOpenDialogCancel: true,
        });
    };

    const onCloseDialogButton = () => {
        setHandleOpenDialogCancel((prevState) => ({
            ...prevState,
            isOpenDialogCancel: false,
        }));
    };

    const onBackDialogButton = () => {
        handleOpenDialogCancelState({
            isOpenDialogCancel: true,
            isBackButtonClicked: true,
        });
    };

    const onSaveDialogButton = () => {
        onCloseDialogButton();

        if (isBackToBulkSectionCancelDialogText) {
            onBackToBulkSection();
        } else {
            onCloseDialog();
        }
    };

    return (
        <DialogFullScreen
            title={tOrder("title.createBulkOrder")}
            open={true}
            onClose={onCancelDialogButton}
            onSave={onHandleActionBulkSection}
            data-testid="BulkOrderDialog__dialog"
            footer={
                <OrderDialogFooter
                    submitButtonTitle={t("ra.common.action.submitAll")}
                    onCancel={onCancelDialogButton}
                    hasNextPage={isBulkSection}
                    onNextPage={onHandleActionBulkSection}
                    onPreviousPage={onBackDialogButton}
                    onSubmit={onHandleActionBulkSection}
                />
            }
            isShowingBackdrop={isLoading}
        >
            {bulkComponentSection}
            <DialogCancelConfirm
                open={isOpenDialogCancel}
                onClose={onCloseDialogButton}
                onSave={onSaveDialogButton}
                title={
                    isBackToBulkSectionCancelDialogText
                        ? t("ra.common.title.previousDialogTitle")
                        : t("ra.common.title.cancelDialogTitle")
                }
                textCancelDialog={
                    isBackToBulkSectionCancelDialogText
                        ? tOrder("dialog.previousDialogMessage")
                        : undefined
                }
                textSave={
                    isBackToBulkSectionCancelDialogText
                        ? t("ra.common.action.confirm")
                        : t("ra.common.action.leave")
                }
            />
        </DialogFullScreen>
    );
};

export default BulkOrderDialog;
