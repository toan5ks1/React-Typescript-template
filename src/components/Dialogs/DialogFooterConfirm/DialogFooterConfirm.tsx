import { Grid, DialogActions } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";

import { DialogFooterConfirmProps } from "../types";

import useTranslate from "src/hooks/useTranslate";

const StyledButton = styled(ButtonBase)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const DialogFooterConfirm = (props: DialogFooterConfirmProps) => {
    const t = useTranslate();

    const defaultFooterButtonVariant: DialogFooterConfirmProps["footerConfirmButtonProps"] = {
        color: "primary",
        variant: "contained",
        disabled: false,
    };
    const {
        onClose,
        onSave,
        textClose = t(`ra.common.action.cancel`),
        textSave = t(`ra.common.action.save`),
        footerConfirmButtonProps,
        shouldShowCancelButton = true,
    } = props;

    return (
        <DialogActions
            disableSpacing
            data-testid="DialogWithHeaderFooter__dialogActions"
            sx={{ padding: 0 }}
        >
            <Grid container justifyContent="flex-end">
                <Grid item>
                    {shouldShowCancelButton && (
                        <StyledButton
                            color="default"
                            variant="text"
                            onClick={onClose}
                            data-testid="FooterDialogConfirm__buttonClose"
                            aria-label={textClose}
                        >
                            {textClose}
                        </StyledButton>
                    )}
                </Grid>
                <Grid item>
                    <ButtonBase
                        onClick={onSave}
                        {...defaultFooterButtonVariant}
                        {...footerConfirmButtonProps}
                        data-testid="FooterDialogConfirm__buttonSave"
                        aria-label={textSave}
                    >
                        {textSave}
                    </ButtonBase>
                </Grid>
            </Grid>
        </DialogActions>
    );
};

export default DialogFooterConfirm;
