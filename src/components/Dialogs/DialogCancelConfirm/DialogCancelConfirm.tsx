import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import DialogWithHeaderFooterHF from "../DialogWithHeaderFooterHF";
import { DialogCancelConfirmProps } from "../types";

import useTranslate from "src/hooks/useTranslate";

const DialogCancelConfirm = (props: DialogCancelConfirmProps) => {
    const t = useTranslate();
    const { textCancelDialog = t("ra.common.editedInformationWillBeLostIfLeave"), ...rest } = props;

    const defaultCancelDialog: Partial<DialogCancelConfirmProps> = {
        title: t("ra.common.cancelDialogTitle"),
        open: false,
        textSave: t("ra.common.action.confirm"),
        textClose: t("ra.common.action.cancel"),
    };

    return (
        <DialogWithHeaderFooterHF
            data-testid="DialogCancelConfirm__dialog"
            footerConfirmButtonProps={{
                color: "error",
                variant: "contained",
            }}
            {...defaultCancelDialog}
            {...rest}
        >
            <TypographyTextSecondary>{textCancelDialog}</TypographyTextSecondary>
        </DialogWithHeaderFooterHF>
    );
};

export default DialogCancelConfirm;
