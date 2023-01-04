import { ReactNode } from "react";

import { Box } from "@mui/material";

export interface TableCellWithChipProps {
    children?: ReactNode;
    chip?: ReactNode;
}

const TableCellWithChip = (props: TableCellWithChipProps) => {
    const { children, chip } = props;

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            flexWrap="wrap"
            sx={{ wordBreak: "break-word" }}
        >
            {children && (
                <Box mr={1} data-testid="TableCellWithChip__content">
                    {children}
                </Box>
            )}

            {chip && (
                <Box my={0.5} data-testid="TableCellWithChip__chip">
                    {chip}
                </Box>
            )}
        </Box>
    );
};

export default TableCellWithChip;
