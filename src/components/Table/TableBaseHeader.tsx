import { TableHead, TableRow } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

import TableBaseCell from "./TableBaseCell";
import TableIndexCell from "./TableIndexCell";
import { TableBaseHeaderProps } from "./table-types";

const TableBaseHeader = (props: TableBaseHeaderProps) => {
    const { visible, columns, border, style, withIndex, render, ...rest } = props;

    if (!visible) return null;

    return (
        <TableHead data-testid="TableBase__header" {...rest}>
            <TableRow style={style}>
                {withIndex && (
                    <TableIndexCell
                        withIndex={withIndex}
                        style={{
                            ...border,
                            width: typeof withIndex === "boolean" ? "60px" : withIndex.width,
                        }}
                    />
                )}

                {!render &&
                    columns.map((column, index) => {
                        const { cellProps } = column;
                        const columnCellProps = Object.assign({}, cellProps);
                        delete columnCellProps.headerStyle;

                        return (
                            <TableBaseCell
                                {...columnCellProps}
                                border={border}
                                style={
                                    cellProps?.headerStyle
                                        ? cellProps?.headerStyle
                                        : cellProps?.style
                                }
                                key={column.key}
                                maxColumnIndex={columns.length - 1}
                                columnIndex={index}
                            >
                                <TypographyBase
                                    data-testid="TableBase__cellHeader"
                                    variant="subtitle2"
                                >
                                    {column.title}
                                </TypographyBase>
                            </TableBaseCell>
                        );
                    })}

                {render?.(columns)}
            </TableRow>
        </TableHead>
    );
};

export default TableBaseHeader;
