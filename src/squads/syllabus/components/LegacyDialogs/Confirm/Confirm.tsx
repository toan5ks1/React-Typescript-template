import {
    MouseEvent,
    isValidElement,
    cloneElement,
    ReactNode,
    PropsWithChildren,
    useCallback,
} from "react";

import { Button, Theme } from "@mui/material";

import FormDialog, { FormDialogProps } from "../FormDialog";

import useDialog from "src/squads/syllabus/hooks/useDialog";

const sx = {
    root: (theme: Theme) => ({
        minWidth: 570,
        background: theme.palette.common?.white,
        borderRadius: "8px",
    }),
    content: (theme: Theme) => ({
        textAlign: "center",
        background: theme.palette.common?.white,
    }),
    btn: (theme: Theme) => ({
        padding: theme.spacing(1, 2),
        textTransform: "capitalize",
    }),

    btnConfirm: (theme: Theme) => ({
        background: theme.palette.error?.main,
        color: theme.palette.common?.white,
        "&:hover": {
            opacity: 0.85,
            background: theme.palette.error?.main,
            color: theme.palette.common?.white,
        },
    }),
    btnCancel: {
        background: "transparent",
    },
};

export interface ConfirmProps extends Omit<FormDialogProps, "open"> {
    loading?: boolean;
    open?: boolean;
    onConfirm: (...args: any[]) => any;
    cancelText?: string;
    OKText?: string;
    onCancel?: () => void;
    renderer: {
        title?: ReactNode;
        content?: ReactNode;
    };
}

const Confirm = (props: PropsWithChildren<ConfirmProps>) => {
    const {
        children,
        open: overrideOpen,
        renderer,
        loading,
        OKText,
        cancelText,
        onConfirm,
        onCancel,
        onClick,
        ...rest
    } = props;

    const { open, onOpen, onClose } = useDialog(overrideOpen);

    const _onClose = useCallback(
        (e) => {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();

            onClose(e);
            return onCancel && onCancel();
        },
        [onClose, onCancel]
    );

    const _onClick = useCallback(
        (e: MouseEvent) => {
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();
            onOpen();
        },
        [onOpen]
    );
    return (
        <>
            {isValidElement(children)
                ? cloneElement(children, {
                      ...rest,
                      onClick: _onClick,
                  })
                : null}
            <FormDialog
                data-testid="Dialog__background"
                PaperProps={{ sx: sx.root }}
                sxContent={sx.content}
                title={renderer.title}
                handleClose={_onClose}
                onClick={onClick}
                open={open}
                action={
                    <>
                        <Button
                            data-testid="Confirm__cancel"
                            variant="outlined"
                            sx={[sx.btn, sx.btnCancel]}
                            onClick={_onClose}
                            aria-label={cancelText}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            variant="contained"
                            data-testid="Confirm__ok"
                            sx={[sx.btn, sx.btnConfirm]}
                            onClick={(e) => {
                                onConfirm(e);
                                onClose(e);
                            }}
                        >
                            {OKText}
                        </Button>
                    </>
                }
            >
                {renderer.content}
            </FormDialog>
        </>
    );
};

Confirm.defaultProps = {
    renderer: {
        title: "",
        content: "",
    },
};

export default Confirm;
