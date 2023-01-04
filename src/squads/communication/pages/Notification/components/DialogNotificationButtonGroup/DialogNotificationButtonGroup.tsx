import { Box } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";

import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface DialogNotificationButtonGroupProps {
    onSaveDraft: () => void;
    onSave: () => void;
    onSaveSchedule: () => void;
    shouldFooterDisabled: boolean;
    isCreatingNotification: boolean;
    isSendingNotification: boolean;
    isSavingScheduleNotification: boolean;
    shouldEnableScheduleMode: boolean;
}

const DialogNotificationButtonGroup = (props: DialogNotificationButtonGroupProps) => {
    const {
        onSaveDraft,
        onSave,
        onSaveSchedule,
        shouldFooterDisabled,
        isCreatingNotification,
        isSendingNotification,
        isSavingScheduleNotification,
        shouldEnableScheduleMode,
    } = props;

    const t = useTranslate();

    return shouldEnableScheduleMode ? (
        <ButtonPrimaryContained
            disableRipple
            data-testid="DialogNotificationButtonGroup__buttonSaveSchedule"
            onClick={onSaveSchedule}
            disabled={shouldFooterDisabled}
            isLoading={isSavingScheduleNotification}
        >
            {t("ra.common.saveSchedule")}
        </ButtonPrimaryContained>
    ) : (
        <>
            <Box mr={2}>
                <ButtonBase
                    data-testid="DialogNotificationButtonGroup__buttonSaveDraft"
                    disableRipple
                    onClick={onSaveDraft}
                    disabled={shouldFooterDisabled}
                    isLoading={isCreatingNotification}
                >
                    {t("ra.common.saveDraft")}
                </ButtonBase>
            </Box>
            <ButtonPrimaryContained
                disableRipple
                data-testid="DialogNotificationButtonGroup__buttonSend"
                onClick={onSave}
                disabled={shouldFooterDisabled}
                isLoading={isSendingNotification}
            >
                {t("ra.common.send")}
            </ButtonPrimaryContained>
        </>
    );
};

export default DialogNotificationButtonGroup;
