import { useCallback, useMemo, useRef, useState } from "react";

import { useForm, useFormState } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { KeyNotificationStatus } from "src/squads/communication/common/constants/const";
import {
    NotificationFormData,
    UpsertNotificationProps,
} from "src/squads/communication/common/constants/types";
import {
    checkScheduleStatus,
    getMappedNotificationUpsertData,
} from "src/squads/communication/common/utils/utils";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import { DialogFullScreenProps } from "src/components/Dialogs/types";
import NotificationDialogFooter from "src/squads/communication/pages/Notification/components/Dialogs/NotificationDialogFooter";
import NotificationUpsertForm from "src/squads/communication/pages/Notification/components/Forms/NotificationUpsertForm";

import useDialog from "src/squads/communication/hooks/useDialog";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useSafeSetState from "src/squads/communication/hooks/useSafeState";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import { emptyFormData } from "src/squads/communication/pages/Notification/hooks/useNotificationFormData";
import useNotificationMutation from "src/squads/communication/pages/Notification/hooks/useNotificationMutation";

export interface NotificationUpsertDialogV2Props {
    onClose: DialogFullScreenProps["onClose"];
    notificationFormData?: NotificationFormData;
}

const NotificationUpsertDialogV2 = ({
    onClose,
    notificationFormData,
}: NotificationUpsertDialogV2Props) => {
    const shouldValidateFullForm = useRef(false);
    const [isSendLoading, setIsSendLoading] = useSafeSetState<boolean>(false);
    const [isSaveDraftLoading, setIsSaveDraftLoading] = useSafeSetState<boolean>(false);
    const [isSavingScheduleLoading, setIsSavingScheduleLoading] = useSafeSetState<boolean>(false);
    const [isScheduleMode, setEnableScheduleMode] = useState<boolean>(
        checkScheduleStatus(notificationFormData?.status)
    );

    const isSendingOrCreating = isSendLoading || isSaveDraftLoading || isSavingScheduleLoading;

    const {
        onClose: closeDiscardConfirmDialog,
        open: isOpenDiscardConfirmDialog,
        onOpen: openDiscardConfirmDialog,
    } = useDialog();

    const {
        onClose: closeDisposeConfirmDialog,
        open: isOpenDisposeConfirmDialog,
        onOpen: openDisposeConfirmDialog,
    } = useDialog();

    const methods = useForm<NotificationFormData>({
        defaultValues: notificationFormData ?? emptyFormData,
    });

    const { handleSubmit, getValues, control } = methods;

    const { isDirty } = useFormState({ control });
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const tCommon = useTranslate();

    const notificationId = getValues("notificationId");

    const { onDiscard } = useNotificationMutation();

    const sendNotification = useCallback(
        async (data: UpsertNotificationProps) => {
            try {
                setIsSendLoading(true);
                // TODO: call onSend here
                // eslint-disable-next-line no-console
                console.log(data);
            } finally {
                setIsSendLoading(false);
                onClose();
            }
        },
        [onClose, setIsSendLoading]
    );

    const upsertNotification = useCallback(
        async (data: UpsertNotificationProps) => {
            try {
                setIsSaveDraftLoading(true);
                setIsSavingScheduleLoading(true);
                // TODO: call onUpsert here
                // eslint-disable-next-line no-console
                console.log(data);
            } finally {
                setIsSaveDraftLoading(false);
                setIsSavingScheduleLoading(false);
                onClose();
            }
        },
        [onClose, setIsSaveDraftLoading, setIsSavingScheduleLoading]
    );

    const onSubmit = useCallback(
        (status: string) => async () => {
            const formData: NotificationFormData = {
                ...getValues(),
                /* Because getValues() returns UnpackNestedValue<NotificationFormData>,
                [[Prototype]] of "content"(has type EditorState) is unpacked into object return,
                so we have to get separate "content" value to make sure it returns EditorState type
                This case happen on react-hook-form 7.17.2 */
                content: getValues("content"),
            };

            const data = getMappedNotificationUpsertData(formData);

            if (status === KeyNotificationStatus.NOTIFICATION_STATUS_SENT) {
                await sendNotification(data);
            } else {
                await upsertNotification(data);
            }
        },
        [getValues, sendNotification, upsertNotification]
    );

    const onConfirmDiscard = async () => {
        if (notificationId) {
            try {
                await onDiscard({ data: { notificationId } });
            } finally {
                onClose();
            }
        }
        onClose();
    };

    const onConfirmCloseDialog = async () => {
        onClose();
    };

    const onCloseDialog = useCallback(() => {
        if (!!notificationId || isDirty) {
            openDisposeConfirmDialog();
            return;
        }

        onClose();
    }, [isDirty, notificationId, onClose, openDisposeConfirmDialog]);

    const handleDiscardNotification = useCallback(() => {
        if (!!notificationId || isDirty) {
            openDiscardConfirmDialog();
            return;
        }
        onClose();
    }, [notificationId, onClose, openDiscardConfirmDialog, isDirty]);

    const onSaveDraft = useCallback(async () => {
        shouldValidateFullForm.current = false;
        await handleSubmit(onSubmit(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT))();
    }, [handleSubmit, onSubmit]);

    const upsertDialogTitle = useMemo(
        () =>
            Boolean(notificationId)
                ? tNotification("title.editMessage")
                : tNotification("title.composeMessage"),
        [notificationId, tNotification]
    );

    return (
        <>
            <DialogFullScreenHF
                data-testid="NotificationUpsertDialogV2__dialog"
                title={upsertDialogTitle}
                open
                onClose={onCloseDialog}
                onSave={async () => {
                    shouldValidateFullForm.current = true;
                    await handleSubmit(onSubmit(KeyNotificationStatus.NOTIFICATION_STATUS_SENT))();
                }}
                methods={methods}
                footer={
                    <NotificationDialogFooter
                        isSendingNotification={isSendLoading}
                        isCreatingNotification={isSaveDraftLoading}
                        isSavingScheduleNotification={isSavingScheduleLoading}
                        shouldEnableScheduleMode={isScheduleMode}
                        onSaveDraft={onSaveDraft}
                        onSaveSchedule={async () => {
                            shouldValidateFullForm.current = true;
                            await handleSubmit(
                                onSubmit(KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED)
                            )();
                        }}
                        onDiscard={handleDiscardNotification}
                    />
                }
            >
                <NotificationUpsertForm
                    shouldValidateFullForm={shouldValidateFullForm}
                    isSubmittingForm={isSendingOrCreating}
                    setEnableScheduleMode={setEnableScheduleMode}
                    shouldEnableScheduleMode={isScheduleMode}
                />
            </DialogFullScreenHF>

            <DialogCancelConfirm
                data-testid="NotificationUpsertDialogV2__dialogDiscardConfirm"
                textCancelDialog={tCommon("ra.common.areYouSureWantToDiscardThisMessage")}
                title={tCommon("ra.common.discardMessage")}
                textSave={tCommon("ra.common.action.discard")}
                open={isOpenDiscardConfirmDialog}
                onClose={closeDiscardConfirmDialog}
                onSave={onConfirmDiscard}
            />

            <DialogCancelConfirm
                data-testid="NotificationUpsertDialogV2__dialogDisposeConfirm"
                textCancelDialog={tCommon("ra.common.areYouSureWantToExitThisForm")}
                title={tCommon("ra.common.disposeNotification")}
                textSave={tCommon("ra.common.action.dispose")}
                open={isOpenDisposeConfirmDialog}
                onClose={closeDisposeConfirmDialog}
                onSave={onConfirmCloseDialog}
            />
        </>
    );
};

export default NotificationUpsertDialogV2;
