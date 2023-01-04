import { useEffect, useMemo } from "react";

import get from "lodash/get";
import { usePrevious } from "react-use";

import { Skeleton, TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableBaseCell from "src/components/Table/TableBaseCell";
import TableIndexCell from "src/components/Table/TableIndexCell";
import { TableBaseRowProps, TableColumn } from "src/components/Table/table-types";
import { calculateDataIndex, getRowKey } from "src/components/Table/utils";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useObserveVisibleElement from "src/squads/user/hooks/useObserveVisibleElement";

const PREFIX = "TableBaseRow";

const classes = {
    selected: `${PREFIX}-selected`,
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [`&.${classes.selected}`]: {
        backgroundColor: theme.palette.primary.background,
    },
}));
const TableBaseRowObserveVisible = <T extends object>(props: TableBaseRowProps<T>) => {
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
    const { intersectionRef, isVisible, rendered, resetRendered, placeholderHeight } =
        useObserveVisibleElement<HTMLTableRowElement>({
            defaultHeight: 105,
        });

    const previousPage = usePrevious(pagination?.page);

    useEffect(() => {
        if (previousPage !== pagination?.page) {
            resetRendered();
        }
    }, [pagination?.page, previousPage, resetRendered]);

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
            ref={intersectionRef}
        >
            {rendered || isVisible ? (
                <>
                    {withIndex ? (
                        <TableIndexCell border={border} withIndex={withIndex} style={styleIndexCol}>
                            {actualDataIndex}
                        </TableIndexCell>
                    ) : null}

                    {!render
                        ? columns.map((column, index) => (
                              <TableBaseCell
                                  key={column.key}
                                  {...column.cellProps}
                                  border={border}
                                  style={column.cellProps?.style}
                                  maxColumnIndex={columns.length - 1}
                                  columnIndex={index}
                              >
                                  {renderCell(column)}
                              </TableBaseCell>
                          ))
                        : null}

                    {render?.(columns)}
                </>
            ) : (
                <>
                    {withIndex ? (
                        <TableCell height={placeholderHeight.current}>
                            <Skeleton
                                height={20}
                                data-testid="TableBaseRowObserveVisible__skeleton"
                            />
                        </TableCell>
                    ) : null}
                    {columns.map((col) => {
                        return (
                            <TableCell key={col.key} height={placeholderHeight.current}>
                                <Skeleton
                                    height={20}
                                    data-testid="TableBaseRowObserveVisible__skeleton"
                                />
                            </TableCell>
                        );
                    })}
                </>
            )}
        </StyledTableRow>
    );
};

export default TableBaseRowObserveVisible;
