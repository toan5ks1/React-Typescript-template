import { Dialog as MaterialDialog, DialogProps as MaterialDialogProps } from "@mui/material";

export interface DialogBaseProps extends MaterialDialogProps {}

const DialogBase = (props: DialogBaseProps) => {
    return <MaterialDialog {...props} />;
};

export default DialogBase;
