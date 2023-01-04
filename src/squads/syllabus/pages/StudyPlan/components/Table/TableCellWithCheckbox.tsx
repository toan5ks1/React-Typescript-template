import { ReactNode } from "react";

import { Box } from "@mui/material";
import type { CheckboxProps } from "@mui/material/Checkbox";
import { TableBaseCellProps } from "src/components/Table";
import TableBaseCell from "src/components/Table/TableBaseCell";
import TableCheckbox from "src/components/Table/TableWithCheckbox/TableCheckbox";

export interface TableCellWithCheckboxProps {
    checkboxProps: CheckboxProps;
    cellProps?: TableBaseCellProps;
    children: ReactNode;
}

const TableCellWithCheckbox = ({
    cellProps,
    checkboxProps,
    children,
}: TableCellWithCheckboxProps) => {
    return (
        <TableBaseCell {...cellProps}>
            <Box component="label" display="flex" alignItems="center">
                <Box mr={1.5} display="flex">
                    <TableCheckbox checkboxProps={{ ...checkboxProps, tabIndex: -1 }} />
                </Box>
                {children}
            </Box>
        </TableBaseCell>
    );
};

export default TableCellWithCheckbox;
