import { ReactNode } from "react";

import { Box } from "@mui/material";
import { StyleKeys } from "src/components/Table/table-types";

interface TableWrapperShadowProps {
    styles?: Partial<StyleKeys>;
    children: ReactNode;
}

const TableWrapperShadow = (props: TableWrapperShadowProps) => {
    const { children, styles } = props;

    return (
        <Box
            sx={(theme) => ({
                boxShadow: theme.shadows[3],
                borderRadius: "4px",
                // Force border-radius of table children component
                overflow: "hidden",
            })}
            style={styles?.root}
            position="relative"
        >
            {children}
        </Box>
    );
};

export default TableWrapperShadow;
