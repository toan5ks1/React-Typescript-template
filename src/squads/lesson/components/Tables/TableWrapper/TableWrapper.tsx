import { ElementType, ReactNode } from "react";

import { Box, TableContainer } from "@mui/material";
import AlertBase from "src/components/Alerts/AlertBase";
import { StyleKeys, TableBaseFooterProps } from "src/components/Table";
import TableBaseFooter from "src/components/Table/TableBaseFooter";

interface TableWrapperProps {
    component: ElementType;
    errorMessage?: string | ReactNode;
    styles?: Partial<StyleKeys>;
    children: ReactNode;
    footer?: TableBaseFooterProps;
}

const TableWrapper = (props: TableWrapperProps) => {
    const { children, component: Component, errorMessage, styles, footer } = props;

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
                {footer?.pagination && <TableBaseFooter {...footer} style={styles?.footer} />}
            </Box>
        </>
    );
};

export default TableWrapper;
