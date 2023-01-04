import { cloneElement, useCallback } from "react";

import { useToggle } from "react-use";

import { Box, Theme } from "@mui/material";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";

import BackdropLoading from "../../Backdrops/BackdropLoading";
import DialogBase from "../DialogBase";
import DialogCancelConfirm from "../DialogCancelConfirm";
import DialogFooterConfirm from "../DialogFooterConfirm";
import { DialogCancelConfirmProps, DialogFullScreenProps } from "../types";
import DialogFullScreenHeader from "./Header";

const toolbarMinHeight = 65; // 64px + 1px for border
const footerHeight = 72; // The design team wants this

const maxContainerHeight = `calc(100vh 
    - ${toolbarMinHeight}px 
    - ${footerHeight}px 
)`;

const sx = {
    root: (theme: Theme) => ({
        height: "100vh",
        backgroundColor: theme.palette.grey[50],
    }),
    dialogContent: (theme: Theme) => ({
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(1),
        maxHeight: maxContainerHeight,
        overflowY: "auto",
        overflowX: "hidden",
        width: "100vw",
    }),
    forceWidthWrapper: {
        width: "100vw",
    },
    footer: {
        display: "flex",
        height: `${footerHeight}px`,
        justifyContent: "flex-end",
        alignItems: "center",
    },
};

const DialogFullScreen = ({ children, ...props }: DialogFullScreenProps) => {
    const {
        open,
        title,
        onSave,
        onClose,
        footer,
        isShowingBackdrop,
        dialogCancelConfirmProps,
        footerConfirmButtonProps,
        textSave,
        textClose,
        contentSize = "dialog-page",
        ...rest
    } = props;

    const [isOpenDialogCancel, setIsOpenDialogCancel] = useToggle(false);

    const _onClose = useCallback(() => {
        if (dialogCancelConfirmProps) return setIsOpenDialogCancel(true);

        onClose();
    }, [dialogCancelConfirmProps, onClose, setIsOpenDialogCancel]);

    return (
        <>
            <DialogBase
                fullScreen
                open={open}
                onClose={_onClose}
                data-testid="DialogFullScreen__dialog"
                {...rest}
            >
                {isShowingBackdrop && <BackdropLoading open />}
                <Box sx={sx.root}>
                    <DialogFullScreenHeader title={title} onClose={_onClose} />

                    <Box sx={sx.dialogContent}>
                        <Box sx={sx.forceWidthWrapper}>
                            <WrapperPageContent
                                data-testid="DialogFullScreen__content"
                                variant={contentSize}
                            >
                                {children}
                            </WrapperPageContent>
                        </Box>
                    </Box>

                    <WrapperPageContent
                        data-testid="DialogFullScreen__footer"
                        variant={contentSize}
                    >
                        {onSave && typeof onClose !== "undefined" && footer && (
                            <Box sx={sx.footer}>
                                {cloneElement(footer, {
                                    footerConfirmButtonProps: {
                                        disabled: isShowingBackdrop,
                                    },
                                    ...props,
                                    onClose: _onClose,
                                })}
                            </Box>
                        )}
                    </WrapperPageContent>
                </Box>
            </DialogBase>

            {/* Dialog cancel */}
            {dialogCancelConfirmProps && (
                <DialogCancelConfirm
                    open={isOpenDialogCancel}
                    onClose={() => setIsOpenDialogCancel(false)}
                    onSave={() => {
                        onClose();
                        setIsOpenDialogCancel(false);
                    }}
                    // https://github.com/microsoft/TypeScript/issues/49142
                    {...(dialogCancelConfirmProps as Pick<
                        DialogCancelConfirmProps,
                        "title" | "textCancelDialog" | "textSave"
                    >)}
                />
            )}
        </>
    );
};

DialogFullScreen.defaultProps = {
    footer: <DialogFooterConfirm {...({} as any)} />, // hack default props
};

export default DialogFullScreen;
