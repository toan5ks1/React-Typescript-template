import { useCallback, useState } from "react";

import { Delete as DeleteIcon, Image as ImageIcon } from "@mui/icons-material";
import { Box, Avatar, BoxProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";

const PREFIX = "AccordionSummaryBase";

const classes = {
    root: `${PREFIX}-root`,
    colorDefault: `${PREFIX}-content`,
};

const StyledAvatar = styled(Avatar)(({ theme }: { theme: Theme }) => {
    return {
        width: "100%",
        height: "100%",
        [`&.${classes.colorDefault}`]: {
            backgroundColor: theme.palette.grey[100],
        },
    };
});

const sx = {
    fullWidth: {
        width: "100%",
        height: "100%",
    },

    delete: (theme: Theme) => ({
        cursor: "pointer",
        color: theme.palette.common?.white,
    }),
};

export interface ImagePreviewProps extends BoxProps {
    src?: string;
    onDelete?: () => void;
    shouldConfirmDelete?: boolean;
    fullWidth?: boolean;
}

const ImagePreview = (props: ImagePreviewProps) => {
    const { src, onDelete, shouldConfirmDelete, className, fullWidth = true, ...rest } = props;

    const [visible, setVisible] = useState<boolean>(false);

    const _onDelete = useCallback(() => {
        if (shouldConfirmDelete) {
            setVisible(true);
            return;
        }
        onDelete && onDelete();
    }, [onDelete, shouldConfirmDelete]);

    return (
        <>
            <Box
                position="relative"
                data-testid="ImagePreview__root"
                className={className}
                sx={{
                    ...(fullWidth && sx.fullWidth),
                }}
                {...rest}
            >
                <StyledAvatar
                    classes={{
                        colorDefault: classes.colorDefault,
                    }}
                    src={src}
                    variant="rounded"
                    data-testid="ImagePreview__img"
                >
                    <ImageIcon data-testid="ImagePreview__default" />
                </StyledAvatar>
                {onDelete && (
                    <Box
                        sx={sx.delete}
                        display="inline-flex"
                        position="absolute"
                        bottom="7.5%"
                        right="7.5%"
                    >
                        <DeleteIcon
                            data-testid="ImagePreview__delete"
                            onClick={_onDelete}
                            color="inherit"
                        />
                    </Box>
                )}
            </Box>
            {shouldConfirmDelete && (
                <DialogCancelConfirm
                    open={visible}
                    onClose={() => setVisible(false)}
                    onSave={onDelete}
                />
            )}
        </>
    );
};

export default ImagePreview;
