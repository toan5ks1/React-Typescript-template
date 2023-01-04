import { DialogActions, Grid } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import { DialogFooterConfirmProps } from "src/components/Dialogs/types";

import { DialogConfirmStudyPlanItemProps } from "../types";

interface DialogFooterConfirmStudyPlanItemProps
    extends Omit<DialogFooterConfirmProps, "shouldShowCancelButton">,
        Pick<DialogConfirmStudyPlanItemProps, "onProceed" | "textProceed"> {}

const DialogFooterConfirmStudyPlanItem = (props: DialogFooterConfirmStudyPlanItemProps) => {
    const {
        footerConfirmButtonProps,
        textClose,
        textProceed,
        textSave,
        onClose,
        onProceed,
        onSave,
    } = props;

    return (
        <DialogActions
            disableSpacing
            data-testid="DialogFooterConfirmStudyPlanItem__dialogActions"
            sx={{ padding: 0 }}
        >
            <Grid container>
                <Grid item xs="auto">
                    <ButtonPrimaryOutlined
                        onClick={onProceed}
                        data-testid="DialogFooterConfirmStudyPlanItem__buttonProceed"
                        aria-label={textProceed}
                    >
                        {textProceed}
                    </ButtonPrimaryOutlined>
                </Grid>
                <Grid container item justifyContent="flex-end" xs>
                    <Grid item>
                        <ButtonBase
                            color="default"
                            variant="text"
                            onClick={onClose}
                            data-testid="DialogFooterConfirmStudyPlanItem__buttonClose"
                            aria-label={textClose}
                            sx={(theme) => ({ marginRight: theme.spacing(2) })}
                        >
                            {textClose}
                        </ButtonBase>
                    </Grid>
                    <Grid item>
                        <ButtonPrimaryContained
                            onClick={onSave}
                            data-testid="DialogFooterConfirmStudyPlanItem__buttonSave"
                            aria-label={textSave}
                            {...footerConfirmButtonProps}
                        >
                            {textSave}
                        </ButtonPrimaryContained>
                    </Grid>
                </Grid>
            </Grid>
        </DialogActions>
    );
};

export default DialogFooterConfirmStudyPlanItem;
