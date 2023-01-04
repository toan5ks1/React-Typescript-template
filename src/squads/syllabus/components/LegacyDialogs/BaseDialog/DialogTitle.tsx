import { PropsWithChildren } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
    IconButton,
    Box,
    DialogTitle as MuiDialogTitle,
    DialogTitleProps as MuiDialogTitleProps,
    Theme,
} from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useTextCapitalize from "src/squads/syllabus/hooks/useTextCapitalize";

const sx = {
    root: (theme: Theme) => ({
        margin: 0,
        padding: theme.spacing(2),
        position: "relative",
    }),
    closeButton: (theme: Theme) => ({
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }),
};

export interface DialogTitleProps extends MuiDialogTitleProps {
    onClose?: () => void;
}

const DialogTitle = (props: PropsWithChildren<DialogTitleProps>) => {
    const { children, onClose, ...other } = props;

    return (
        <MuiDialogTitle sx={sx.root} {...other}>
            <TypographyBase
                component="span"
                variant="h4"
                sx={useTextCapitalize}
                data-testid="DialogTitle__title"
            >
                <Box mt={1}>{children}</Box>
            </TypographyBase>
            {onClose ? (
                <IconButton
                    data-testid="DialogTitle__close"
                    sx={sx.closeButton}
                    onClick={onClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
};

export default DialogTitle;
