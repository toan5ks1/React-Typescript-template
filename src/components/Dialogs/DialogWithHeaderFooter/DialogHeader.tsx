import { Close, Create, Delete } from "@mui/icons-material";
import { Box, DialogTitle, Grid, IconButton } from "@mui/material";
import TypographyHeader from "src/components/Typographys/TypographyHeader";

import { DialogHeaderProps } from "../types";

const DialogHeader = (props: DialogHeaderProps) => {
    const {
        onClose,
        onDelete,
        onEdit,
        title,
        onCloseClick,
        shouldDisableClosing,
        disableBottomPadding = false,
        children,
    } = props;

    return (
        <DialogTitle
            data-testid="DialogWithHeaderFooter__dialogTitle"
            style={{ paddingBottom: disableBottomPadding ? 0 : undefined }}
        >
            <Grid container justifyContent="space-between">
                <Grid item>
                    <TypographyHeader>{title}</TypographyHeader>
                </Grid>
                <Grid item>
                    <Box display="inline-flex">
                        {onEdit && (
                            <Box ml={1}>
                                <IconButton
                                    size="small"
                                    onClick={onEdit}
                                    data-testid="DialogWithHeaderFooter__buttonEdit"
                                >
                                    <Create fontSize="medium" />
                                </IconButton>
                            </Box>
                        )}

                        {onDelete && (
                            <Box ml={1}>
                                <IconButton
                                    size="small"
                                    onClick={onDelete}
                                    data-testid="DialogWithHeaderFooter__buttonDelete"
                                >
                                    <Delete fontSize="medium" />
                                </IconButton>
                            </Box>
                        )}

                        <Box ml={1}>
                            <IconButton
                                disabled={shouldDisableClosing}
                                size="small"
                                onClick={onCloseClick || onClose}
                                data-testid="DialogWithHeaderFooter__buttonExit"
                            >
                                <Close fontSize="medium" />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {children}
        </DialogTitle>
    );
};

export default DialogHeader;
