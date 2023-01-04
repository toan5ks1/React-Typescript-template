import { ElementType, ReactNode } from "react";

import { Box, TableContainer } from "@mui/material";

import AlertBase from "../Alerts/AlertBase";
import { StyleKeys } from "./table-types";

interface TableWrapperProps {
    component: ElementType;
    errorMessage?: string | ReactNode;
    styles?: Partial<StyleKeys>;
    children: ReactNode;
}

const TableWrapper = (props: TableWrapperProps) => {
    const { children, component: Component, errorMessage, styles } = props;

    return (
        <>
            {errorMessage && (
                <Box mb={2}>
                    <AlertBase variant="standard" severity="error" elevation={0}>
                        {errorMessage}
                    </AlertBase>
                </Box>
            )}
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
                <TableContainer style={styles?.container} component={Component}>
                    {children}
                </TableContainer>
            </Box>
        </>
    );
};

export default TableWrapper;
