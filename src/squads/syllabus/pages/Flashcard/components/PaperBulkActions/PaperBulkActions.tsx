import { PropsWithChildren } from "react";

import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Box } from "@mui/material";
import DividerBase from "src/components/Divider/DividerBase";
import IconButtonBase from "src/components/IconButton/IconButtonBase";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface PaperBulkActionsProps {
    index?: number;
    actions?: React.ReactNode;
    onDelete?: () => void;
}

const PaperBulkActions = ({
    children,
    index,
    actions,
    onDelete,
}: PropsWithChildren<PaperBulkActionsProps>) => {
    return (
        <PaperRoundedBorders data-testid="PaperBulkActions__root">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={3}
                py={1.5}
                height={56}
            >
                <TypographyBase component="span" variant="body1" color="textPrimary">
                    {index}
                </TypographyBase>
                <Box>
                    {actions}
                    {onDelete && (
                        <Box ml={1}>
                            <IconButtonBase
                                size="large"
                                sx={{ width: 40, height: 40 }}
                                onClick={onDelete}
                                data-testid="PaperBulkActions__delete"
                            >
                                <DeleteOutline fontSize="small" />
                            </IconButtonBase>
                        </Box>
                    )}
                </Box>
            </Box>
            <DividerBase />
            <Box p={2}>{children}</Box>
        </PaperRoundedBorders>
    );
};

export default PaperBulkActions;
