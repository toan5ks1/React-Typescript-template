import { Box, Grid } from "@mui/material";
import ButtonDelete from "src/components/Buttons/ButtonDelete";
import { DialogHFProps } from "src/components/Dialogs/types";
import DialogNotificationButtonGroup from "src/squads/communication/pages/Notification/components/DialogNotificationButtonGroup";

import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface NotificationDialogFooterProps<T> extends Pick<DialogHFProps<T>, "onSave"> {
    onSaveDraft: () => void;
    onDiscard: () => void;
    onSaveSchedule: () => void;
    isSendingNotification?: boolean;
    isCreatingNotification?: boolean;
    isSavingScheduleNotification?: boolean;
    shouldEnableScheduleMode?: boolean;
}

const NotificationDialogFooter = <T extends any>(props: NotificationDialogFooterProps<T>) => {
    const {
        onDiscard,
        onSave,
        onSaveDraft,
        onSaveSchedule,
        isCreatingNotification,
        isSendingNotification,
        isSavingScheduleNotification,
        shouldEnableScheduleMode,
    } = props;
    const t = useTranslate();

    const shouldFooterDisabled = isSendingNotification || isCreatingNotification;

    return (
        <Grid container data-testid="NotificationDialogFooter__actions">
            <Grid item xs={6}>
                <ButtonDelete
                    startIcon={undefined}
                    disabled={shouldFooterDisabled}
                    onClick={onDiscard}
                    data-testid="NotificationDialogFooter__buttonDiscard"
                >
                    {t("ra.common.action.discard")}
                </ButtonDelete>
            </Grid>

            <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-end">
                    <DialogNotificationButtonGroup
                        onSave={onSave!}
                        onSaveDraft={onSaveDraft}
                        onSaveSchedule={onSaveSchedule}
                        isSavingScheduleNotification={isSavingScheduleNotification!}
                        isCreatingNotification={isCreatingNotification!}
                        isSendingNotification={isSendingNotification!}
                        shouldFooterDisabled={shouldFooterDisabled!}
                        shouldEnableScheduleMode={shouldEnableScheduleMode!}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default NotificationDialogFooter;
