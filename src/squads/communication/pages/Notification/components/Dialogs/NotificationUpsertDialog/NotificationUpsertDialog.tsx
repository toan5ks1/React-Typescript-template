import { memo, useCallback, useMemo, useRef, useState } from "react";

import { useForm, useFormState } from "react-hook-form";
import { KeyNotificationStatus } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
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
import NotificationUpsertForm from "src/squads/communication/pages/Notification/components/Forms/NotificationUpsertForm";

import NotificationDialogFooter from "../NotificationDialogFooter";

import useDialog from "src/squads/communication/hooks/useDialog";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useSafeSetState from "src/squads/communication/hooks/useSafeState";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import { UseNotificationCategoriesReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationCategories";
import { emptyFormData } from "src/squads/communication/pages/Notification/hooks/useNotificationFormData";
import { UseNotificationListReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationList";
import useNotificationMutation from "src/squads/communication/pages/Notification/hooks/useNotificationMutation";

export interface NotificationUpsertDialogProps {
    onClose: () => void;
    notificationData?: NotificationFormData;
    notificationCategoriesRefetch: UseNotificationCategoriesReturn["notificationCategoriesRefetch"];
    readCountOfNotificationsRefetch: UseNotificationListReturn["readCountOfNotificationsRefetch"];
    notificationListRefetch: UseNotificationListReturn["notificationListRefetch"];
    resetPaginationOffset: UseNotificationListReturn["resetPaginationOffset"];
}

const NotificationUpsertDialog = ({
    onClose,
    notificationData,
    notificationCategoriesRefetch,
    readCountOfNotificationsRefetch,
    notificationListRefetch,
    resetPaginationOffset,
}: NotificationUpsertDialogProps) => {
    const shouldValidateFullForm = useRef(false);
    const [isSendLoading, setIsSendLoading] = useSafeSetState<boolean>(false);
    const [isSaveDraftLoading, setIsSaveDraftLoading] = useSafeSetState<boolean>(false);
    const [isSavingScheduleLoading, setIsSavingScheduleLoading] = useSafeSetState<boolean>(false);
    const [isScheduleMode, setEnableScheduleMode] = useState<boolean>(
        checkScheduleStatus(notificationData?.status)
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
        defaultValues: notificationData ?? emptyFormData,
    });

    const { handleSubmit, getValues, control } = methods;

    const { isDirty } = useFormState({ control });
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const tCommon = useTranslate();

    const notificationId = getValues("notificationId");

    const rerenderTableAndCategoryNotification = useCallback(() => {
        notificationListRefetch();
        notificationCategoriesRefetch();
    }, [notificationCategoriesRefetch, notificationListRefetch]);

    const { onDiscard, onSend, onUpsert } = useNotificationMutation();

    const sendNotification = useCallback(
        async (data: UpsertNotificationProps) => {
            try {
                setIsSendLoading(true);

                const notificationData: UpsertNotificationProps = {
                    ...data,
                    status: KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
                };

                // BE doesn't support send notification, we should create a draft and send it later
                const { notificationId: createdNotificationId } = await onUpsert({
                    data: notificationData,
                    shouldShowCreateNotificationNotify: false,
                    onClose,
                });

                // When we send a notification which is sent, we will still send the existed notificationID
                // In order to get the correct error message from the SendNotification API

                // When confirm to send this notification, it can raise an error:
                // The notification has been sent.
                await onSend({ data: { notificationId: notificationId || createdNotificationId } });
            } finally {
                rerenderTableAndCategoryNotification();
                void readCountOfNotificationsRefetch();
                setIsSendLoading(false);
                onClose();
                resetPaginationOffset();
            }
        },
        [
            onUpsert,
            onSend,
            notificationId,
            rerenderTableAndCategoryNotification,
            readCountOfNotificationsRefetch,
            onClose,
            resetPaginationOffset,
            setIsSendLoading,
        ]
    );

    const upsertNotification = useCallback(
        async (data: UpsertNotificationProps) => {
            try {
                setIsSaveDraftLoading(true);
                setIsSavingScheduleLoading(true);

                await onUpsert({
                    data,
                    shouldShowCreateNotificationNotify: true,
                    shouldShowEditSuccess: !!notificationId,
                    onClose,
                });
            } finally {
                rerenderTableAndCategoryNotification();
                void readCountOfNotificationsRefetch();
                setIsSaveDraftLoading(false);
                setIsSavingScheduleLoading(false);
                resetPaginationOffset();
            }
        },
        [
            onUpsert,
            notificationId,
            onClose,
            rerenderTableAndCategoryNotification,
            readCountOfNotificationsRefetch,
            resetPaginationOffset,
            setIsSaveDraftLoading,
            setIsSavingScheduleLoading,
        ]
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
                onConfirmCloseDialog();
            }
        }
        onClose();
    };

    const onCloseDialog = useCallback(() => {
        if (!!notificationId || isDirty) {
            openDisposeConfirmDialog();
            return;
        }

        onClose();
    }, [isDirty, notificationId, onClose, openDisposeConfirmDialog]);

    const onConfirmCloseDialog = useCallback(() => {
        onClose();
        rerenderTableAndCategoryNotification();
    }, [onClose, rerenderTableAndCategoryNotification]);

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
                data-testid="NotificationUpsertDialog__dialog"
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
                data-testid="NotificationUpsertDialog__dialogDiscardConfirm"
                textCancelDialog={tCommon("ra.common.areYouSureWantToDiscardThisMessage")}
                title={tCommon("ra.common.discardMessage")}
                textSave={tCommon("ra.common.action.discard")}
                open={isOpenDiscardConfirmDialog}
                onClose={closeDiscardConfirmDialog}
                onSave={onConfirmDiscard}
            />

            <DialogCancelConfirm
                data-testid="NotificationUpsertDialog__dialogDisposeConfirm"
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

export default memo(NotificationUpsertDialog);
