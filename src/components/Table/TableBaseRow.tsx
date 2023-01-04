import { useMemo } from "react";

import get from "lodash/get";

import { TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";

import TypographyBase from "../Typographys/TypographyBase";
import TableBaseCell from "./TableBaseCell";
import TableIndexCell from "./TableIndexCell";
import { TableBaseRowProps, TableColumn } from "./table-types";
import { calculateDataIndex, getRowKey } from "./utils";

const PREFIX = "TableBaseRow";

const classes = {
    selected: `${PREFIX}-selected`,
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [`&.${classes.selected}`]: {
        backgroundColor: theme.palette.primary.background,
    },
}));

const TableBaseRow = <T extends object>(props: TableBaseRowProps<T>) => {
    const {
        dataIndex,
        record,
        rowKey,
        columns,
        border,
        hover,
        selected,
        withIndex,
        pagination,
        render,
        styleIndexCol,
    } = props;

    const key = useMemo(() => getRowKey(record, rowKey) || dataIndex, [dataIndex, record, rowKey]);
    const actualDataIndex = calculateDataIndex(dataIndex, pagination);

    const renderCell = (column: TableColumn) => {
        if (typeof column.render === "function") {
            return column.render(record, dataIndex);
        }

        return (
            <TypographyBase variant="body2" data-testid={column.testId}>
                {column.dataIndex ? get(record, column.dataIndex) : column.emptyValue}
            </TypographyBase>
        );
    };

    return (
        <StyledTableRow
            hover={hover}
            data-testid="TableBase__row"
            selected={selected}
            data-value={key}
            classes={{
                selected: classes.selected,
            }}
        >
            {withIndex && (
                <TableIndexCell border={border} withIndex={withIndex} style={styleIndexCol}>
                    {actualDataIndex}
                </TableIndexCell>
            )}

            {!render &&
                columns.map((column, index) => {
                    const { cellProps } = column;
                    const columnCellProps = Object.assign({}, cellProps);
                    delete columnCellProps.headerStyle;

                    return (
                        <TableBaseCell
                            key={column.key}
                            {...columnCellProps}
                            border={border}
                            style={{
                                ...column.cellProps?.style,
                                ...(record as any).cellStyles,
                            }}
                            maxColumnIndex={columns.length - 1}
                            columnIndex={index}
                        >
                            {renderCell(column)}
                        </TableBaseCell>
                    );
                })}

            {render?.(columns)}
        </StyledTableRow>
    );
};

export default TableBaseRow;
