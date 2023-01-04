import { TableCell } from "@mui/material";

import { TableBaseCellProps } from "./table-types";
import { calcBorderRightBottomTable } from "./utils";

const TableBaseCell = (props: TableBaseCellProps) => {
    const {
        border = {},
        children,
        className,
        columnIndex,
        maxColumnIndex,
        sx = [],
        ...rest
    } = props;

    return (
        <TableCell
            sx={[
                {
                    position: "relative",
                    ...border,
                    ...(maxColumnIndex !== undefined && columnIndex !== undefined
                        ? calcBorderRightBottomTable(border, maxColumnIndex, columnIndex)
                        : {}),
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            className={className}
            {...rest}
        >
            {children}
        </TableCell>
    );
};

export default TableBaseCell;
