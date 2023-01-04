import { ReactElement, ReactNode } from "react";

import type { DialogProps, SxProps } from "@mui/material";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Theme,
} from "@mui/material";
import { typographyClasses } from "@mui/material/Typography";
import CloseIcon from "src/squads/syllabus/components/SvgIcons/CloseIcon";

const sx = {
    header: (theme: Theme) => ({
        position: "relative",
        borderBottom: `1px solid ${theme.palette.border?.main ?? theme.palette.grey[300]}`,
        padding: theme.spacing(3, 4),
        minHeight: 40,
        [`&.${typographyClasses.root}`]: {
            minHeight: 26,
            fontSize: theme.typography.h5.fontSize ?? "1.5rem",
            textTransform: "capitalize", // because inside dialog title has typography component
        },
    }),
    content: (theme: Theme) => ({
        padding: `${theme.spacing(3, 4)} !important`,
        minWidth: 200,
    }),
    closeButton: (theme: Theme) => ({
        position: "absolute",
        right: theme.spacing(4),
        top: "50%",
        transform: "translateY(-50%)",
        padding: 0,
        color: theme.palette.grey[500],
    }),
    action: (theme: Theme) => ({
        padding: theme.spacing(0, 4, 3),
    }),
};

export interface FormDialogProps extends Omit<DialogProps, "classes" | "title"> {
    handleClose?: (...args: any[]) => any;
    title?: ReactNode;
    action?: ReactElement;
    sxContent?: SxProps<Theme>;
    anchor?: any;
}

const FormDialog = (props: FormDialogProps) => {
    const { sxContent = [], handleClose, title, children, action, ...rest } = props;

    return (
        <Dialog {...rest} onClose={handleClose}>
            <DialogTitle data-testid="FormDialog__title" sx={sx.header}>
                {title}
                <IconButton aria-label="Close" sx={sx.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                data-testid="FormDialog__content"
                sx={[sx.content, ...(Array.isArray(sx) ? sx : [sx])]}
            >
                {children}
            </DialogContent>
            {action && <DialogActions sx={sx.action}>{action}</DialogActions>}
        </Dialog>
    );
};

export default FormDialog;
