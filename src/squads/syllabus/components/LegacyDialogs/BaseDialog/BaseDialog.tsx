import { cloneElement, isValidElement, ReactNode, useCallback } from "react";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    IconButton,
    Theme,
} from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import CloseIcon from "src/squads/syllabus/components/SvgIcons/CloseIcon";

import DialogTitle from "./DialogTitle";

const sx = {
    closeButton: (theme: Theme) => ({
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        color: theme.palette.grey[500],
    }),
    rootContent: (theme: Theme) => ({
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3, 4),
    }),
};

type DialogCloseReason = "backdropClick" | "escapeKeyDown" | "cancelClick";

export interface BaseDialogProps extends Omit<DialogProps, "title" | "onClose"> {
    disabled?: boolean;
    title?: ReactNode;
    actions?: ReactNode;
    cancelLabel?: ReactNode;
    OKLabel?: ReactNode;
    onOK?: () => void;
    minWidth?: number | string;
    onClose: (event?: object, reason?: DialogCloseReason) => void;
}

const BaseDialog = (props: BaseDialogProps) => {
    const {
        children,
        title,
        actions,
        minWidth,
        onClose,
        disabled,

        disableEscapeKeyDown,
        ...rest
    } = props;

    const handleClose = useCallback(
        (event: object, reason: DialogCloseReason) => {
            if (reason === "backdropClick") {
                return false;
            }

            if (disableEscapeKeyDown && reason === "escapeKeyDown") {
                return false;
            }

            onClose(event, reason);
        },
        [disableEscapeKeyDown, onClose]
    );

    return (
        <Dialog data-testid="BaseDialog__root" {...rest} onClose={handleClose}>
            <DialogTitle data-testid="BaseDialog__title">
                <TypographyBase component="span" variant="h6">
                    {title}
                </TypographyBase>
                <IconButton
                    data-testid="BaseDialog__close"
                    aria-label="Close"
                    sx={sx.closeButton}
                    onClick={onClose}
                    disabled={disabled}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={sx.rootContent} style={{ minWidth: minWidth }}>
                {children}
            </DialogContent>
            {isValidElement(actions) ? (
                <DialogActions>{cloneElement(actions, props)}</DialogActions>
            ) : null}
        </Dialog>
    );
};

export default BaseDialog;
