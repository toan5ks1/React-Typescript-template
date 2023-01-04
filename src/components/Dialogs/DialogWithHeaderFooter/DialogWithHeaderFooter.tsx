import { cloneElement, isValidElement } from "react";

import { PORTAL_DIALOG_FOOTER } from "src/common/constants/other";

import { Box, DialogContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DialogBase from "../DialogBase";
import DialogFooterConfirm from "../DialogFooterConfirm";
import { DialogFooterType, DialogWithHeaderFooterProps } from "../types";
import DialogHeader from "./DialogHeader";

// https://github.com/mui-org/material-ui/blob/c8b7ad499c6573c63ccb7e1fb21eb2124c6e77c8/packages/material-ui/src/Dialog/Dialog.js#L49
const totalMarginOfDialog = "64px";

// https://github.com/mui-org/material-ui/blob/c8b7ad499c6573c63ccb7e1fb21eb2124c6e77c8/packages/material-ui/src/DialogTitle/DialogTitle.js#L11
// 16x2 vertical padding + 32px line height of variant h6
const heightOfDialogHeader = "64px";

const DialogWithHeaderFooter = ({ children, ...props }: DialogWithHeaderFooterProps) => {
    const {
        open,
        onClose,
        onDelete,
        onSave,
        onEdit,
        onCloseClick,
        maxWidthBox = "sm",
        minWidthBox = "sm",
        header,
        footer = "default",
        textClose,
        textSave,
        title,
        footerConfirmButtonProps,
        shouldDisableClosing,
        shouldShowCancelButton,
        additionalHeights = 0,
        ...rest
    } = props;

    const theme = useTheme();

    const renderFooter = (footer: DialogFooterType) => {
        if (isValidElement(footer)) {
            return (
                <Box p={3} pt={2}>
                    {footer}
                </Box>
            );
        }

        const mappingFooter = {
            empty: null,
            portal: <Box p={3} pt={2} id={PORTAL_DIALOG_FOOTER} />,
            default: (
                <Box p={3} pt={2}>
                    <DialogFooterConfirm
                        onClose={onClose}
                        onSave={onSave}
                        textClose={textClose}
                        textSave={textSave}
                        footerConfirmButtonProps={footerConfirmButtonProps}
                        shouldShowCancelButton={shouldShowCancelButton}
                    />
                </Box>
            ),
        };

        return mappingFooter[footer];
    };

    return (
        <DialogBase open={open} title={title} onClose={onClose} {...rest}>
            <Box
                data-testid="DialogWithHeaderFooter_wrapper"
                borderRadius="2px"
                boxShadow={24}
                minWidth={theme.breakpoints.values[minWidthBox]}
                maxWidth={theme.breakpoints.values[maxWidthBox]}
            >
                {header && (
                    <Box bgcolor={theme.palette.grey[100]}>
                        {cloneElement(header, {
                            onClose,
                            onEdit,
                            onDelete,
                            title,
                            onCloseClick,
                            shouldDisableClosing,
                        })}
                    </Box>
                )}

                <DialogContent
                    sx={(theme) => {
                        // Warning: these padding must matches the box that contains the footer
                        const footerPaddingTop = theme.spacing(2);
                        const footerPaddingBottom = theme.spacing(3);

                        // DialogFooterConfirm has the default height of 52px
                        const heightOfDialogFooter = `(52px + ${footerPaddingTop} + ${footerPaddingBottom})`;
                        return {
                            maxHeight: `calc(100vh - ${totalMarginOfDialog} - ${heightOfDialogHeader} - ${heightOfDialogFooter} - ${additionalHeights}px)`,
                        };
                    }}
                    data-testid="DialogWithHeaderFooter__dialogContent"
                >
                    <Box pt={1} pb={footer ? 0 : 2}>
                        {children}
                    </Box>
                </DialogContent>
                {renderFooter(footer)}
            </Box>
        </DialogBase>
    );
};

//hack props
DialogWithHeaderFooter.defaultProps = {
    header: <DialogHeader {...({} as any)} />,
};

export default DialogWithHeaderFooter;
