import get from "lodash/get";

import { Box } from "@mui/material";
import TableBaseCell from "src/components/Table/TableBaseCell";
import TableCheckbox from "src/components/Table/TableWithCheckbox/TableCheckbox";
import { TableColumn, TableRowWithCheckboxProps } from "src/components/Table/table-types";
import TypographyBase from "src/components/Typographys/TypographyBase";

import TableBaseRowObserveVisible from "./TableBaseRowObserveVisible";

const TableRowObserveVisibleCheckbox = <T extends object>(props: TableRowWithCheckboxProps<T>) => {
    const { onSelect, handleClickCheckbox, ...tableBaseRowProps } = props;
    const { dataIndex, border, record, selected, hasDraftProperty } = tableBaseRowProps;

    const renderCell = (column: TableColumn, index: number) => {
        // If table has checkbox list. We will show checkbox in first column
        if (onSelect && index === 0) {
            return (
                <Box display="flex" alignItems="center">
                    <Box mr={1.5} display="flex">
                        <TableCheckbox
                            data-testid="TableRowWithCheckbox__checkboxRow"
                            checkboxProps={{
                                checked: selected,
                                onClick: () => {
                                    handleClickCheckbox?.(record);
                                },
                                disabled: !record?.hasOwnProperty("isDraft") && hasDraftProperty,
                            }}
                        />
                    </Box>
                    {typeof column.render === "function" ? (
                        column.render(record, dataIndex)
                    ) : (
                        <TypographyBase variant="body2" data-testid={column.testId}>
                            {column.dataIndex ? get(record, column.dataIndex) : column.emptyValue}
                        </TypographyBase>
                    )}
                </Box>
            );
        }

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
        <TableBaseRowObserveVisible
            render={(columns) =>
                columns.map((column, index) => (
                    <TableBaseCell
                        key={column.key}
                        {...column.cellProps}
                        border={border}
                        style={column.cellProps?.style}
                        maxColumnIndex={columns.length - 1}
                        columnIndex={index}
                    >
                        {renderCell(column, index)}
                    </TableBaseCell>
                ))
            }
            {...tableBaseRowProps}
        />
    );
};

export default TableRowObserveVisibleCheckbox;
